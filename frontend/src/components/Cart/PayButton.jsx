import { useEffect, useState } from "react";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const PayButton = ({ order, keyId, customer, onSuccess, onError }) => {
    const [ready, setReady] = useState(Boolean(window.Razorpay));

    useEffect(() => {
        if (window.Razorpay) return;
        const script = document.createElement("script");
        script.src = RAZORPAY_SCRIPT;
        script.onload = () => setReady(true);
        script.onerror = () => onError("Could not load Razorpay. Please try again.");
        document.body.appendChild(script);
    }, [onError]);

    const openRazorpay = () => {
        if (!window.Razorpay || !order) return;
        const payment = new window.Razorpay({
            key: keyId,
            amount: order.amount,
            currency: order.currency,
            name: "Quantum",
            description: "Order payment",
            order_id: order.id,
            prefill: { name: customer.name, email: customer.email, contact: customer.phone },
            handler: onSuccess,
            modal: { ondismiss: () => onError("Payment was cancelled.") },
            theme: { color: "#f59e0b" },
        });
        payment.open();
    };

    return <button type="button" onClick={openRazorpay} disabled={!ready}
        className="w-full py-4 rounded-full bg-yellow-500 text-black font-bold hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition">
        {ready ? "Pay securely with Razorpay" : "Loading Razorpay..."}
    </button>;
};

export default PayButton;
