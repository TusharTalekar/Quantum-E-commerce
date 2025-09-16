import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { useEffect } from "react";

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts);
    const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector((state) => state.adminOrders);

    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-slate-900">Admin Dashboard</h1>
            {productsLoading || ordersLoading ? (
                <p className="text-center text-gray-600">Loading ...</p>
            ) : productsError ? (
                <p className="text-rose-500 text-center">Error fetching products: {productsError}</p>
            ) : ordersError ? (
                <p className="text-rose-500 text-center">Error fetching orders: {ordersError}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-white shadow-xl rounded-xl">
                        <h2 className="text-xl font-semibold mb-2 text-slate-900">Revenue</h2>
                        <p className="text-3xl font-bold text-teal-600">${totalSales.toFixed(2)}</p>
                    </div>
                    <div className="p-6 bg-white shadow-xl rounded-xl">
                        <h2 className="text-xl font-semibold mb-2 text-slate-900">Total orders</h2>
                        <p className="text-3xl font-bold text-slate-900">{totalOrders}</p>
                        <Link
                            to={`/admin/orders`}
                            className="text-teal-600 hover:underline mt-2 inline-block font-medium" >
                            Manage Orders
                        </Link>
                    </div>
                    <div className="p-6 bg-white shadow-xl rounded-xl">
                        <h2 className="text-xl font-semibold mb-2 text-slate-900">Total Products</h2>
                        <p className="text-3xl font-bold text-slate-900">{products.length}</p>
                        <Link
                            to={`/admin/products`}
                            className="text-teal-600 hover:underline mt-2 inline-block font-medium" >
                            Manage Products
                        </Link>
                    </div>
                </div>
            )}

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Recent Orders</h2>
                <div className="overflow-x-auto shadow-xl rounded-xl">
                    <table className="min-w-full text-left bg-white text-gray-600">
                        <thead className="bg-teal-100 text-sm uppercase text-teal-800 font-semibold">
                            <tr>
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Total Price</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-b border-gray-200 hover:bg-teal-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">{order._id}</td>
                                        <td className="p-4 font-medium text-gray-800">{order.user.name}</td>
                                        <td className="p-4 font-bold text-gray-900">${order.totalPrice.toFixed(2)}</td>
                                        <td className="p-4">
                                            <span className='bg-teal-100 text-teal-800 text-sm font-semibold px-2 py-1 rounded-full'>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-600">
                                        No recent order
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage