import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { formatINR } from "../utils/currency";

const OrderConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storedCheckout = useSelector((state) => state.checkout.checkout);
    const order = location.state?.order || storedCheckout;
    const items = order?.orderItems || order?.checkoutItems || [];
    useEffect(() => { if (order?._id) { dispatch(clearCart()); localStorage.removeItem("cart"); } else navigate("/my-orders"); }, [order, dispatch, navigate]);
    if (!order) return null;
    return <div className="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen font-serif"><h1 className="text-4xl font-bold text-center text-orange-500 mb-8">Thank you for your purchase</h1><div className="p-8 rounded-xl shadow-lg bg-white"><div className="flex justify-between mb-8 border-b-2 pb-6"><div><h2 className="text-xl font-bold">Order ID: {order._id}</h2><p>{new Date(order.createdAt).toLocaleDateString()}</p></div><p className="font-bold">Payment received</p></div><h3 className="text-2xl font-bold mb-4">Ordered items</h3>{items.map((item) => <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center mb-4 border-b pb-4"><img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded-lg mr-6" /><div><h4 className="font-semibold">{item.name}</h4><p>{item.color} | {item.size} | Qty {item.quantity}</p></div><p className="ml-auto font-bold">{formatINR(item.price * item.quantity)}</p></div>)}<div className="grid grid-cols-2 gap-8 mt-8"><div><h4 className="text-xl font-bold">Payment</h4><p>Razorpay</p></div><div><h4 className="text-xl font-bold">Delivery</h4><p>{order.shippingAddress.address}</p><p>{order.shippingAddress.city}, {order.shippingAddress.country}</p></div></div></div></div>;
};
export default OrderConfirmationPage;
