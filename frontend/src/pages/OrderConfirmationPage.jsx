import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

// const checkout = {
//     _id: "12323",
//     createdAt: new Date(),
//     checkoutItems: [

//         {
//             productId: "3",
//             name: "Shirt",
//             color: "white",
//             size: "M",
//             price: 200,
//             quantity: 2,
//             image: "https://picsum.photos/150?random=3",
//         },
//     ],
//     shippingAddress: {
//         address: "123 Fashion street",
//         city: "Pune",
//         country: "India"
//     }
// };

const OrderConfirmationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    // clear cart when order is confirmed
    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/my-orders");
        }
    }, [checkout, dispatch, navigate]);

    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10);
        return orderDate.toLocaleDateString();
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen font-serif">
            <h1 className="text-4xl font-bold text-center text-teal-700 mb-8" >
                Thank you for your purchase
            </h1>
            {checkout && (
                <div className="p-8 rounded-xl shadow-lg bg-white">
                    <div className="flex justify-between mb-12 border-b-2 border-gray-200 pb-8">
                        {/* Order Id and date */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Order ID: {checkout._id}
                            </h2>
                            <p className="text-gray-600 font-medium mt-1">
                                Order date:{new Date(checkout.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        {/* Estimated delivery  */}
                        <div>
                            <p className="text-teal-700 text-lg font-bold">
                                Estimated Delivery:{" "}
                                {calculateEstimatedDelivery(checkout.createdAt)}
                            </p>
                        </div>
                    </div>
                    {/* Ordered items  */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Ordered Items</h3>
                        {
                            checkout.checkoutItems.map((item) => (
                                <div key={item.productId} className="flex items-center mb-4 border-b border-gray-200 pb-4">
                                    <img src={item.image}
                                        alt={item.name}
                                        className="h-20 w-20 object-cover rounded-lg mr-6"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {item.color} | {item.size}
                                        </p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="text-lg font-medium text-gray-800">${item.price}</p>
                                        <p className="text-sm text-gray-600" > Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* Payment and delivery info  */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-700">
                        {/* Payment Info */}
                        <div>
                            <h4 className="text-xl font-bold mb-2 text-gray-800">Payment</h4>
                            <p className="font-medium">PayPal</p>
                        </div>
                        {/* Delivery Info */}
                        <div>
                            <h4 className="text-xl font-bold mb-2 text-gray-800">Delivery</h4>
                            <p className="font-medium">
                                {checkout.shippingAddress.address}
                            </p>
                            <p className="font-medium">
                                {checkout.shippingAddress.city},{" "}{checkout.shippingAddress.country}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderConfirmationPage