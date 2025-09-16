import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity, removeFromCart } from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    // adding or subtracting to cart 
    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity: newQuantity,
                userId,
                guestId,
                color,
                size
            }));
        }
    };
    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({ productId, userId, guestId, size, color }));
    };


    return (
        <div>
            {
                cart.products.map((product, index) => (
                    <div
                        key={index}
                        className="flex items-start justify-between py-6 border-b-2 border-gray-200">
                        <div className="flex items-start">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-28 object-cover mr-6 rounded-lg" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-700">
                                    size: {product.size} | color:{product.color}
                                </p>
                                <div className="flex items-center mt-4">
                                    <button
                                        onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}
                                        className="border-2 border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg text-gray-900 hover:bg-gray-300 transition">
                                        -
                                    </button>
                                    <span className="mx-4 text-lg font-bold text-gray-900">{product.quantity}</span>
                                    <button
                                        onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}
                                        className="border-2 border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg text-gray-900 hover:bg-gray-300 transition">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</p>
                            <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}>
                                <RiDeleteBin3Line className="h-6 w-6 mt-4 text-red-500 hover:text-red-700 transition-colors" />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CartContents