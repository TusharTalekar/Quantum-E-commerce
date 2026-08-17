import { Link } from "react-router-dom";
import { formatINR } from "../../utils/currency";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12'>
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="group block">
          <div className="bg-white p-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex flex-col h-full">
            <div className="w-full h-80 overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {/* New: Flex container with fixed height for consistent text alignment */}
            <div className="flex-grow min-h-[80px] overflow-hidden">
              <h3 className="text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
              <p className="text-base font-normal text-gray-800">
                {formatINR(product.price)}
              </p>
            </div>
          </div>

        </Link>
      ))
      }
    </div >
  )
}

export default ProductGrid