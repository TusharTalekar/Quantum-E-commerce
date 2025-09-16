import { FaBoxOpen, FaClipboardList, FaSignInAlt, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate('/');
    }

    return (
        <div className='p-6'>
            <div className="mb-8 text-center">
                <Link to={`/admin`} className='text-3xl font-black text-white'>
                    Quantum
                </Link>
            </div>
            <h2 className='text-2xl font-bold mb-8 text-center'>Admin Dashboard</h2>

            <nav className='flex flex-col space-y-3'>
                <NavLink
                    to={`/admin/users`}
                    className={({ isActive }) => isActive ? "bg-teal-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors" : "text-gray-100 hover:bg-teal-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors"} >
                    <FaUser />
                    <span className="font-semibold">Users</span>
                </NavLink>
                <NavLink
                    to={`/admin/products`}
                    className={({ isActive }) => isActive ? "bg-teal-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors" : "text-gray-100 hover:bg-teal-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors"} >
                    <FaBoxOpen />
                    <span className="font-semibold">Products</span>
                </NavLink>
                <NavLink
                    to={`/admin/orders`}
                    className={({ isActive }) => isActive ? "bg-teal-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors" : "text-gray-100 hover:bg-teal-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors"} >
                    <FaClipboardList />
                    <span className="font-semibold">Orders</span>
                </NavLink>

                <NavLink
                    to={`/`}
                    className={({ isActive }) =>
                        isActive
                            ? "bg-teal-700 text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors"
                            : "text-gray-100 hover:bg-teal-700 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors"} >
                    <FaStore />
                    <span className="font-semibold">Shop</span>
                </NavLink>
            </nav>

            <div className='mt-8'>
                <button
                    onClick={handleLogout}
                    className='w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors'>
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default AdminSidebar