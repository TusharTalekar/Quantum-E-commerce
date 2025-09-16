import { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // fetch product for specific collection 
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className='bg-gray-100 min-h-screen font-serif text-gray-900'>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* best seller */}
      <h2 className='text-4xl text-center font-bold tracking-wide my-16 text-orange-500'>Popular Products</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center text-gray-700">Loading Best Seller product...</p>
      )}

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h2 className='text-4xl text-center font-bold tracking-wide mb-10 text-orange-500'>
          Top Apparel for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home