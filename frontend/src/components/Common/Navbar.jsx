import { Link } from 'react-router-dom';
import {
    HiOutlineUser,
    HiOutlineShoppingBag,
    HiBars3BottomRight
} from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0);

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-6 px-4 md:px-6 font-serif">
                {/* Left Logo */}
                <div>
                    <Link to="/" className="text-3xl font-black text-orange-500">
                        Quantum
                    </Link>
                </div>
                {/* Center Navigation Links */}
                <div className="hidden md:flex space-x-8">
                    <Link to="/collections/all?gender=Men" className="text-gray-700 hover:text-orange-500 text-lg font-semibold uppercase transition-colors">
                        Men
                    </Link>
                    <Link to="/collections/all?gender=Women" className="text-gray-700 hover:text-orange-500 text-lg font-semibold uppercase transition-colors">
                        Women
                    </Link>
                    <Link to="/collections/all?category=Top Wear" className="text-gray-700 hover:text-orange-500 text-lg font-semibold uppercase transition-colors">
                        Top Wear
                    </Link>
                    <Link to="/collections/all?category=Bottom Wear" className="text-gray-700 hover:text-orange-500 text-lg font-semibold uppercase transition-colors">
                        Bottom Wear
                    </Link>
                </div>
                {/* Right icons  */}
                <div className='flex items-center space-x-6'>
                    {user && user.role === "admin" && (
                        <Link
                            to={`/admin`}
                            className='block bg-orange-500 px-3 py-1 rounded text-sm text-white font-semibold'>
                            Admin
                        </Link>
                    )}
                    <Link to="/profile" className="hover: text-orange-500">
                        <HiOutlineUser className="h-7 w-7 text-gray-700" />
                    </Link>
                    <button
                        onClick={toggleCartDrawer}
                        className="relative hover: text-orange-500">
                        <HiOutlineShoppingBag className="h-7 w-7 text-gray-700" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-sm font-bold rounded-full px-2 py-0.5">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                    {/* Search */}
                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>
                    <button onClick={toggleNavDrawer} className="md:hidden">
                        <HiBars3BottomRight className="h-7 w-7 text-gray-700" />
                    </button>
                </div>
            </nav>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Mobile Navigation */}
            <div
                className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-gray-100 shadow-lg transform transition-transform duration-300 z-50  ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-6">
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className="h-8 w-8 text-gray-900" />
                    </button>
                </div>
                <div className="p-6">
                    <h2 className='text-3xl font-black mb-6 text-orange-500'>Menu</h2>
                    <nav className='space-y-6'>
                        <Link
                            to="/collections/all?gender=Men"
                            onClick={toggleNavDrawer} className='block text-xl text-gray-900 hover:text-orange-500 transition-colors'>
                            Men
                        </Link>
                        <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer} className='block text-xl text-gray-900 hover:text-orange-500 transition-colors'>
                            Women
                        </Link>
                        <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-xl text-gray-900 hover:text-orange-500 transition-colors'>
                            Top Wear
                        </Link>
                        <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-xl text-gray-900 hover:text-orange-500 transition-colors'>
                            Bottom Wear
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar