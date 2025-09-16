import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = user ? user._id : null;

    const handleCheckout = () => {
        toggleCartDrawer();
        if (!user) {
            navigate('/login/?redirect=checkout');
        } else {
            navigate('/checkout');
        }
    }

    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 font-serif ${drawerOpen ? "translate-x-0" : "translate-x-full"}`} >
            {/* Close Button */}
            <div className="flex justify-end p-6">
                <button onClick={toggleCartDrawer}>
                    < IoMdClose className="h-8 w-8 text-gray-900" />
                </button>
            </div>
            {/* Cart content with scrollable area */}
            <div className="flex-grow p-6 overflow-y-auto">
                <h2 className="text-3xl font-black mb-6 text-orange-500"> Your Cart</h2>
                {cart && cart?.products?.length > 0 ? (
                    <CartContents cart={cart} userId={userId} guestId={guestId} />
                ) : (
                    <p className="text-center text-gray-700">Your Cart is empty.</p>
                )}
            </div>
            {/* Checkout button fixed at the bottom */}
            <div className="p-6 bg-white sticky bottom-0 border-t-2 border-gray-200">
                {cart && cart?.products?.length > 0 && (
                    <>
                        <div className="flex justify-between items-center text-xl font-bold mb-4 text-gray-900">
                            <p>Subtotal</p>
                            <p>${cart.totalPrice?.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-yellow-500 text-black py-4 rounded-full font-bold hover:bg-orange-500 transition">
                            Checkout
                        </button>
                        <p className="text-sm tracking-wide text-gray-700 mt-4 text-center">
                            Shipping, taxes, and discount codes calculated at checkout.
                        </p>
                    </>
                )}
            </div>
        </div >
    )
}

export default CartDrawer