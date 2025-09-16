import { useDispatch, useSelector } from 'react-redux'
import MyOrdersPage from './MyOrdersPage'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
    }


    return (
        <div className='min-h-screen flex flex-col bg-gray-100 font-serif'>
            <div className='flex-grow container mx-auto p-4 md:p-8'>
                <div className='flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0'>
                    {/* Left content  */}
                    <div className='w-full md:w-1/3 lg:w-1/4 bg-white shadow-xl rounded-xl p-8 h-fit'>
                        <h1 className='text-3xl font-bold mb-4 text-gray-900'>{user?.name}</h1>
                        <p className='text-lg text-gray-700 mb-6'>{user?.email}</p>
                        <button
                            onClick={handleLogout}
                            className='w-full bg-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:bg-orange-500 transition-colors'>
                            Logout
                        </button>
                    </div>
                    {/* Right Section: Orders Table  */}
                    <div className='w-full md:w-2/3 lg:w-3/4'>
                        <MyOrdersPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile