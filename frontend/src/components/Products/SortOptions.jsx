import { useSearchParams } from "react-router-dom"

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  }

  return (
    <div className='mb-6 flex items-center justify-end font-serif'>
      <label htmlFor="sort" className="mr-3 font-semibold text-gray-900">Sort by:</label>
      <select
        id="sort"
        className='border border-gray-400 p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow'
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortOptions