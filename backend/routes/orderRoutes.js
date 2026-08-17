const express = require("express");
const Order = require("../Models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @ GET /api/orders/my-orders
// Get logged-in user's order
// @access private 
router.get("/my-orders", protect, async (req, res) => {
    try {
        // find orders for authenticated user 
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });  // sort by most recent orders
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});


// @ GET /api/orders/:id 
// get order details by id
// @access private
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
        if (String(order.user._id) !== String(req.user._id) && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to view this order." });
        }

        // return full order details 
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});


module.exports = router;