const crypto = require("crypto");
const express = require("express");
const Checkout = require("../Models/Checkout");
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");
const Order = require("../Models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress } = req.body;
    if (!checkoutItems?.length) return res.status(400).json({ message: "No items in checkout." });
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ message: "Razorpay is not configured on the server." });
    }

    try {
        const products = await Product.find({ _id: { $in: checkoutItems.map((item) => item.productId) } });
        const productById = new Map(products.map((product) => [String(product._id), product]));
        const verifiedItems = checkoutItems.map((item) => {
            const product = productById.get(String(item.productId));
            const quantity = Number(item.quantity);
            if (!product || !Number.isInteger(quantity) || quantity < 1 || product.countInStock < quantity) {
                throw new Error("One or more products are unavailable.");
            }
            return {
                productId: product._id, name: product.name, image: product.images[0]?.url || "",
                price: product.price, size: item.size, color: item.color, quantity,
            };
        });
        const totalPrice = verifiedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (!Number.isFinite(totalPrice) || totalPrice <= 0) throw new Error("Invalid order amount.");

        const credentials = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
        const response = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Basic ${credentials}` },
            body: JSON.stringify({ amount: Math.round(totalPrice * 100), currency: "INR", receipt: `rcpt_${Date.now()}` }),
        });
        const razorpayOrder = await response.json();
        if (!response.ok) {
            console.error("Razorpay order creation failed:", razorpayOrder);
            return res.status(502).json({ message: "Unable to create a Razorpay order." });
        }

        const checkout = await Checkout.create({
            user: req.user._id, checkoutItems: verifiedItems, shippingAddress,
            paymentMethod: "Razorpay", totalPrice, razorpayOrderId: razorpayOrder.id,
            paymentStatus: "Pending", isPaid: false,
        });
        res.status(201).json({ checkout, razorpayOrder, keyId: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
        console.error("Checkout creation failed:", err);
        res.status(400).json({ message: err.message || "Unable to create checkout." });
    }
});

router.post("/:id/verify-payment", protect, async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    try {
        const checkout = await Checkout.findOne({ _id: req.params.id, user: req.user._id });
        if (!checkout || checkout.razorpayOrderId !== razorpay_order_id) {
            return res.status(404).json({ message: "Checkout not found." });
        }
        const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
        if (!razorpay_signature || razorpay_signature.length !== expected.length ||
            !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature))) {
            return res.status(400).json({ message: "Payment signature verification failed." });
        }
        if (checkout.isFinalized) {
            const order = await Order.findOne({ "paymentDetails.razorpayPaymentId": razorpay_payment_id });
            return res.status(200).json({ order, checkout });
        }

        const paymentDetails = { razorpayOrderId: razorpay_order_id, razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature };
        checkout.isPaid = true;
        checkout.paymentStatus = "paid";
        checkout.paymentDetails = paymentDetails;
        checkout.paidAt = Date.now();
        const order = await Order.create({
            user: checkout.user, orderItems: checkout.checkoutItems, shippingAddress: checkout.shippingAddress,
            paymentMethod: "Razorpay", totalPrice: checkout.totalPrice, isPaid: true, paidAt: checkout.paidAt,
            paymentStatus: "paid", paymentDetails,
        });
        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now();
        await checkout.save();
        await Cart.findOneAndDelete({ user: checkout.user });
        res.status(201).json({ order, checkout });
    } catch (err) {
        console.error("Payment verification failed:", err);
        res.status(500).json({ message: "Unable to verify payment." });
    }
});

module.exports = router;
