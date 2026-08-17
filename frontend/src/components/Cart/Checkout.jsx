import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import PayButton from "./PayButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../api/api";
import { formatINR } from "../../utils/currency";

const initialAddress = { firstName: "", lastName: "", city: "", address: "", postalCode: "", country: "India", phone: "" };

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const [shippingAddress, setShippingAddress] = useState(initialAddress);
    const [payment, setPayment] = useState(null);
    const [paying, setPaying] = useState(false);

    useEffect(() => { if (!cart?.products?.length) navigate("/"); }, [cart, navigate]);
    const updateAddress = (event) => setShippingAddress((current) => ({ ...current, [event.target.name]: event.target.value }));

    const createPaymentOrder = async (event) => {
        event.preventDefault();
        const result = await dispatch(createCheckout({ checkoutItems: cart.products, shippingAddress }));
        if (result.payload?.razorpayOrder) setPayment(result.payload);
        else toast.error(result.payload?.message || "Unable to start payment.");
    };
    const verifyPayment = async (razorpayResponse) => {
        setPaying(true);
        try {
            const response = await axios.post(`${VITE_BACKEND_URL}/api/checkout/${payment.checkout._id}/verify-payment`, razorpayResponse, {
                headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
            });
            navigate("/order-confirmation", { state: { order: response.data.order } });
        } catch (err) {
            toast.error(err.response?.data?.message || "Payment verification failed. Contact support if payment was deducted.");
        } finally { setPaying(false); }
    };

    if (loading) return <p className="text-center py-10 text-gray-700">Loading cart...</p>;
    if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;
    if (!cart?.products?.length) return null;

    return <div className="bg-gray-100 min-h-screen font-serif text-gray-900"><div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-12 px-6">
        <div className="bg-white rounded-xl shadow-lg p-8"><h2 className="text-3xl font-black uppercase mb-8 text-orange-500">Checkout</h2>
            <form onSubmit={createPaymentOrder}>
                <h3 className="text-xl font-bold mb-4">Contact details</h3>
                <input type="email" value={user?.email || ""} disabled className="w-full p-3 mb-6 border-2 border-gray-300 rounded-lg bg-gray-100" />
                <h3 className="mb-4 text-xl font-bold">Delivery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">{[["firstName", "First name"], ["lastName", "Last name"], ["city", "City"], ["postalCode", "Postal code"]].map(([name, label]) => <input key={name} name={name} aria-label={label} placeholder={label} value={shippingAddress[name]} onChange={updateAddress} required className="p-3 border-2 border-gray-300 rounded-lg" />)}</div>
                <input name="address" placeholder="Address" value={shippingAddress.address} onChange={updateAddress} required className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><input name="country" placeholder="Country" value={shippingAddress.country} onChange={updateAddress} required className="p-3 border-2 border-gray-300 rounded-lg" /><input name="phone" placeholder="Phone" value={shippingAddress.phone} onChange={updateAddress} required className="p-3 border-2 border-gray-300 rounded-lg" /></div>
                {!payment ? <button type="submit" className="w-full py-4 rounded-full bg-yellow-500 text-black font-bold hover:bg-orange-500">Continue to payment</button> : <PayButton order={payment.razorpayOrder} keyId={payment.keyId} customer={{ name: `${shippingAddress.firstName} ${shippingAddress.lastName}`, email: user?.email, phone: shippingAddress.phone }} onSuccess={verifyPayment} onError={(message) => toast.error(message)} />}
                {paying && <p className="mt-3 text-center">Verifying payment…</p>}
            </form>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8"><h3 className="text-3xl font-bold mb-6 text-orange-500">Order Summary</h3>{cart.products.map((product, index) => <div key={index} className="flex justify-between py-4 border-b border-gray-200"><div className="flex gap-4"><img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-lg" /><div><h4 className="font-semibold">{product.name}</h4><p className="text-sm">{product.size} · {product.color} · Qty {product.quantity}</p></div></div><b>{formatINR(Number(product.price) * product.quantity)}</b></div>)}<div className="flex justify-between text-2xl font-bold mt-6 pt-4 border-t-2"><p>Total</p><p>{formatINR(cart.totalPrice)}</p></div></div>
    </div></div>;
};

export default Checkout;
