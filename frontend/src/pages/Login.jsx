import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId, loading } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    // get redirect parameter and check if it's checkout or else
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    }

    return (
        <div className="flex bg-gray-100 min-h-screen font-serif">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-10 rounded-xl border border-gray-300 shadow-xl">
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-bold text-orange-500">Quantum</h2>
                    </div>
                    <h2 className="text-3xl font-black italic text-center mb-4 text-gray-900">Welcome Back! &#128075;</h2>
                    <p className="text-center mb-6 text-gray-700">
                        Enter your email and password to Login
                    </p>
                    <div className="mb-4 ">
                        <label className='block text-sm font-semibold mb-2 text-gray-900'>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow'
                            placeholder='Enter your email address' />
                    </div>
                    <div className="mb-6 ">
                        <label className='block text-sm font-semibold mb-2 text-gray-900'>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow'
                            placeholder='Enter your password' />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-yellow-500 text-black p-3 rounded-full font-bold hover:bg-orange-500 transition'
                    >
                        {loading ? "loading..." : "Sign In"}
                    </button>
                    <p className='mt-8 text-center text-sm text-gray-700'>
                        Don't have an account?{" "}
                        <Link
                            to={`/register?redirect=${encodeURIComponent(redirect)}`}
                            className='text-orange-500 font-bold hover:underline'>
                            Register
                        </Link>
                    </p>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-slate-900'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img
                        src={`https://res.cloudinary.com/dyvnhonl6/image/upload/E%20commerce/login.jpg`}
                        alt="Login to account"
                        className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default Login