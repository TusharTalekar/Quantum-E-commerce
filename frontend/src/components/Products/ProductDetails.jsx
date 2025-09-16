import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";


const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
    const { user, guestId } = useSelector((state) => state.auth);

    const [mainImage, setMainImage] = useState(" ");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productFetchId = productId || id;

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    }, [dispatch, productFetchId]);


    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (operation) => {
        if (operation === 'minus' && quantity > 1) {
            setQuantity((prev) => prev - 1);
        } else if (operation === 'plus') {
            setQuantity((prev) => prev + 1);
        }
    }
    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error('Please select size and color.', {
                duration: 1000
            });
            return;
        }
        setIsButtonDisabled(true);

        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
                userId: user?._id,
            })
        ).then(() => {
            toast.success("Product added to cart!", {
                duration: 1000
            });
        })
            .finally(() => {
                setIsButtonDisabled(false);
            })
    };

    if (loading) {
        return <p className="text-center text-lg py-10 text-gray-700">Loading...</p>
    }
    if (error) {
        return <p className="text-center text-lg py-10 text-red-500">Error: {error}</p>
    }



    return (
        <div className="py-16 px-4 bg-gray-100">
            {selectedProduct && (
                <div className="max-w-6xl mx-auto bg-white p-10 rounded-xl shadow-lg">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Left Thumbnails and Main Image */}
                        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:w-1/2">
                            {/* Left Thumbnails */}
                            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                                {selectedProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={image.altText || `Thumbnail ${index}`}
                                        className={`w-24 h-24 rounded-lg object-cover cursor-pointer border-2 transition-all 
                                            ${mainImage === image.url ? "border-orange-500 shadow-md" : "border-gray-300 hover:border-gray-400"}`}
                                        onClick={() => setMainImage(image.url)}
                                    />
                                ))}
                            </div>
                            {/* Main Image  */}
                            <div className='flex-1'>
                                <img
                                    src={mainImage}
                                    alt="Main Product"
                                    className='w-full h-auto max-h-[650px] object-cover rounded-xl shadow-md' />
                            </div>
                        </div>
                        {/* Right side */}
                        <div className='lg:w-1/2'>
                            <h1 className='text-3xl md:text-4xl font-semibold text-gray-900 mb-2'>
                                {selectedProduct.name}
                            </h1>
                            <p className='text-base text-gray-500 font-normal mb-2 line-through'>
                                {selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}
                            </p>
                            <p className='text-xl text-gray-900 font-bold mb-6'>
                                {selectedProduct.price && `$${selectedProduct.price}`}
                            </p>
                            <p className="text-gray-700 mb-8 leading-relaxed">
                                {selectedProduct.description}
                            </p>
                            <div className='mb-8'>
                                <p className="text-gray-900 font-bold mb-3">Color:</p>
                                <div className='flex gap-4'>
                                    {selectedProduct.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-12 h-12 rounded-full border-4 transition-all
                                            ${selectedColor === color
                                                    ? "border-orange-500 ring-4 ring-offset-2 ring-yellow-300"
                                                    : "border-gray-300 hover:border-gray-400"
                                                }`}
                                            style={{
                                                backgroundColor: color.toLocaleLowerCase(),
                                                filter: 'brightness(0.9)'
                                            }}
                                            aria-label={`Select color ${color}`}
                                        >
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='mb-8'>
                                <p className='text-gray-900 font-bold mb-3'>Size:</p>
                                <div className='flex gap-4'>
                                    {selectedProduct.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-6 py-3 rounded-full border-2 transition-all font-semibold
                                                ${selectedSize === size
                                                    ? "bg-yellow-500 text-black border-yellow-500 shadow-md"
                                                    : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='mb-10'>
                                <p className='text-gray-900 font-bold mb-3'>Quantity:</p>
                                <div className='flex items-center space-x-6 mt-2'>
                                    <button
                                        onClick={() => handleQuantityChange('minus')}
                                        className='px-4 py-2 bg-gray-200 rounded-full text-2xl hover:bg-gray-300 transition-colors'>
                                        -
                                    </button>
                                    <span className='text-3xl font-bold'>{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('plus')}
                                        className='px-4 py-2 bg-gray-200 rounded-full text-2xl hover:bg-gray-300 transition-colors'>
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={isButtonDisabled}
                                className={`bg-yellow-500 text-black font-bold tracking-wide rounded-full w-full px-8 py-4 text-xl transition-colors mb-4
                                    ${isButtonDisabled
                                        ? "cursor-not-allowed opacity-50"
                                        : "hover:bg-orange-500"
                                    }`}
                            >
                                {isButtonDisabled ? "ADDING..." : "ADD TO CART"}
                            </button>

                            <div className='mt-12 text-gray-700'>
                                <h3 className='text-3xl font-bold mb-4'>Characteristics</h3>
                                <table className='w-full text-left text-base text-gray-700 border-collapse'>
                                    <tbody>
                                        <tr className='border-b border-gray-300'>
                                            <td className='py-3 pr-6 font-bold text-gray-900'>Brand</td>
                                            <td className='py-3'>{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-3 pr-6 font-bold text-gray-900'>Material</td>
                                            <td className='py-3'>{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24">
                        <h2 className="text-3xl text-center font-bold mb-8 text-gray-900">
                            You May Also Like
                        </h2>
                        <ProductGrid products={similarProducts} loading={loading} error={error} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails