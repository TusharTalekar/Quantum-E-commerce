import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import PayButton from "./PayButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        postalCode: "",
        country: "",
        phone: ""
    });

    // ensure cart is loaded before proceeding
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(createCheckout({
                checkoutItems: cart.products,
                shippingAddress,
                paymentMethod: "Paypal",
                totalPrice: cart.totalPrice,
            }));
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id);//set checkout id if checkout successful
            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                },
            );
            await handleFinalizeCheckout(checkoutId); //finalize checkout if payment is success
        } catch (err) {
            console.error(err);
        }
    };

    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                },
            );
            navigate("/order-confirmation");
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return <p className="text-center py-10 text-gray-700">Loading Cart ...</p>
    }
    if (error) {
        return <p className="text-center py-10 text-red-500">Error: {error}</p>
    }
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p className="text-center py-10 text-gray-700">Your Cart is empty.</p>
    }


    return (
        <div className="bg-gray-100 min-h-screen font-serif text-gray-900">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-12 px-6">
                {/* Left section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-black uppercase mb-8 text-orange-500">Checkout</h2>
                    <form onSubmit={handleCreateCheckout}>
                        <h3 className="text-xl font-bold mb-4">Contact Details</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={user ? user.email : ""}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                disabled
                            />
                        </div>
                        <h3 className="mb-4 text-xl font-bold">Delivery</h3>
                        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={shippingAddress.firstName}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            firstName: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={shippingAddress.lastName}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            lastName: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required />
                            </div>
                        </div>


                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Address</label>
                            <input
                                type="text"
                                value={shippingAddress.address}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        address: e.target.value,
                                    })
                                }
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required />
                        </div>


                        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">City</label>
                                <input
                                    type="text"
                                    value={shippingAddress.city}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            city: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Postal Code</label>
                                <input
                                    type="text"
                                    value={shippingAddress.postalCode}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            postalCode: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required />
                            </div>
                        </div>


                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Country</label>
                            <input
                                type="text"
                                value={shippingAddress.country}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        country: e.target.value,
                                    })
                                }
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required />
                        </div>


                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Phone</label>
                            <input
                                type="text"
                                value={shippingAddress.phone}
                                onChange={(e) =>
                                    setShippingAddress({
                                        ...shippingAddress,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required />
                        </div>


                        <div>
                            {!checkoutId ? (
                                <button type="submit" className="w-full py-4 rounded-full bg-yellow-500 text-black font-bold hover:bg-orange-500 transition">
                                    Continue to Payment
                                </button>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-bold mb-4 ">Pay</h3>
                                    <PayButton
                                        amount={cart.totalPrice}
                                        onSuccess={handlePaymentSuccess}
                                        onError={(err) => alert("Payment failed. Try again. ")}
                                    />
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                {/* Right section  */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-3xl font-bold mb-6 text-orange-500">Order Summary</h3>
                    <div className="border-t-2 border-gray-200 mb-6 pt-6" >
                        {
                            cart.products.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex items-start justify-between py-4 border-b border-gray-200">
                                    <div className="flex items-start">
                                        <img src={product.image} alt={product.name}
                                            className="w-24 h-28 object-cover mr-6 rounded-lg" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-700">Size: {product.size}</p>
                                            <p className="text-sm text-gray-700">Color: {product.color}</p>
                                            <p className="text-lg font-bold text-gray-900 mt-2">${product.price?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="flex justify-between items-center text-lg mb-4 text-gray-700">
                        <p>Subtotal</p>
                        <p>${cart.totalPrice?.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center text-lg text-gray-700">
                        <p>Shipping</p>
                        <p>Free</p>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold mt-6 border-t-2 border-gray-200 pt-4 text-gray-900">
                        <p>Total</p>
                        <p>${cart.totalPrice?.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout