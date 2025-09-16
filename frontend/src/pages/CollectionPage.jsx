import { useEffect, useRef, useState } from "react"
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const queryString = searchParams.toString();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, queryString]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen font-serif text-gray-900">
            {/* Mobile filter button */}
            <button onClick={toggleSidebar} className="lg:hidden border-b-2 border-yellow-500 p-4 bg-yellow-100 text-gray-900 font-bold flex justify-center items-center rounded-lg m-4">
                <FaFilter className="mr-2" />Filters
            </button>

            {/* Filter Sidebar  */}
            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 h-full w-72 bg-gray-50 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:w-80 lg:shadow-lg`}>
                <FilterSidebar />
            </div>

            <div className=" flex-grow p-4 lg:p-8">
                <h2 className="text-3xl mb-6 uppercase font-black tracking-wide text-orange-500">All Collections</h2>

                {/* sort option */}
                <SortOptions />

                {/* products grid  */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage