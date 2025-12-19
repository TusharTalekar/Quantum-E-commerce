import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productsSlice";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../api/api.js";

const EditProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedProduct, loading, error } = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: []
    });

    const [uploading, setUploading] = useState(false);  // image uploading state
    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
            setUploading(true);
            const { data } = await axios.post(
                `${VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "" }],
            }));
            setUploading(false);
        } catch (err) {
            console.error(err);
            setUploading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id, productData }));
        navigate("/admin/products");
    }

    if (loading) return <p className="text-center">Loading ...</p>
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>


    return (
        <div className="max-w-5xl mx-auto p-8 shadow-xl rounded-xl bg-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* Name  */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-gray-900">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required />
                </div>

                {/* Description  */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-gray-900">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        rows={4}
                        required />
                </div>

                {/* Price  */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-gray-900">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required />
                </div>

                {/* Count in stock  */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-gray-900">Count in Stock</label>
                    <input
                        type="number"
                        name="countInStock"
                        value={productData.countInStock}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required />
                </div>

                {/* sku  */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-gray-900">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={productData.sku}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required />
                </div>

                {/* Sizes  */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-gray-900">Sizes (comma-separated)</label>
                    <input
                        type="text"
                        name="sizes"
                        value={productData.sizes.join(", ")}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                sizes: e.target.value.split(",").map((size) => size.trim()),
                            })
                        }
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required />
                </div>

                {/* Colors  */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-gray-900">Colors (comma-separated)</label>
                    <input
                        type="text"
                        name="colors"
                        value={productData.colors.join(", ")}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                colors: e.target.value.split(",").map((color) => color.trim()),
                            })
                        }
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required />
                </div>


                {/* Image Upload  */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2 text-gray-900">Upload Image</label>
                    <input type="file" onChange={handleImageUpload}
                        className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors" />
                    {uploading && <p>Uploading Image...</p>}
                    <div className="flex gap-4 mt-4">
                        {productData.images.map((image, index) => (
                            <div key={index}>
                                <img src={image.url} alt={image.altText || "Product Image"}
                                    className="w-20 h-20 object-cover rounded-lg shadow-md " />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                    Update Product
                </button>

            </form>
        </div>
    )
}

export default EditProductPage