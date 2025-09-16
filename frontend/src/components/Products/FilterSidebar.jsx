import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100
    });
    const [priceRange, setPriceRange] = useState([0, 100]);

    const categories = ["Top Wear", "Bottom Wear"];
    const colors = [
        "Red",
        "Blue",
        "Black",
        "Green",
        "Yellow",
        "Gray",
        "White",
        "Pink",
        "Beige",
        "Navy",
    ];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const materials = [
        "Cotton",
        "Wool",
        "Denim",
        "Polyester",
        "Silk",
        "Linen",
        "Viscose",
        "Fleece",
    ];
    const brands = [
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle",
    ];

    const genders = ["Men", "Women"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: Number(params.minPrice) || 0,
            maxPrice: Number(params.maxPrice) || 100,
        });
        setPriceRange([0, params.maxPrice || 100]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };

        if (type === 'checkbox') {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else {
            newFilters[name] = value;
        }
        setFilters(newFilters);
        updateURLParams(newFilters);
    }


    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","));
            } else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });
        setSearchParams(params);
        navigate(`?${params.toString()}`);
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice]);
        const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
        setFilters(newFilters); // <-- fix here
        updateURLParams(newFilters);
    };


    return (
        <div className="p-8 font-serif">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Filter</h3>
            {/* Category Filter */}
            <div className="mb-6">
                <label className="block text-gray-900 font-bold mb-2">Category</label>
                {categories.map((category) => (
                    <div key={category} className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="category"
                            value={category}
                            onChange={handleFilterChange}
                            checked={filters.category === category}
                            className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300" />
                        <span className="text-gray-700">{category}</span>
                    </div>
                ))}
            </div>

            {/* Gender Filter */}
            <div className="mb-6">
                <label className="block text-gray-900 font-bold mb-2">Gender</label>
                {genders.map((gender) => (
                    <div key={gender} className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="gender"
                            value={gender}
                            onChange={handleFilterChange}
                            checked={filters.gender === gender}
                            className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300" />
                        <span className="text-gray-700">{gender}</span>
                    </div>
                ))}
            </div>

            {/* Color Filter */}
            <div className="mb-6">
                <label className="block text-gray-900 font-bold mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            name="color"
                            value={color}
                            onClick={handleFilterChange}
                            className={`w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer transform hover:scale-105 
                                ${filters.color === color ? "ring-2 ring-yellow-500 ring-offset-2" : ""}`}
                            style={{ backgroundColor: color.toLowerCase() }}>
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
                <label className="block text-gray-900 font-bold mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <div
                            key={size}
                            className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                name="size"
                                value={size}
                                onChange={handleFilterChange}
                                checked={filters.size.includes(size)}
                                className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded" />
                            <span className="text-gray-700">{size}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Material Filter */}
            <div className="mb-6">
                <label className="block text-gray-900 font-bold mb-2">Material</label>
                <div className="flex flex-wrap gap-2">
                    {materials.map((material) => (
                        <div
                            key={material}
                            className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                name="material"
                                value={material}
                                onChange={handleFilterChange}
                                checked={filters.material.includes(material)}
                                className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded" />
                            <span className="text-gray-700">{material}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
                <label className="block text-gray-900 font-bold mb-2">Brand</label>
                <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                        <div
                            key={brand}
                            className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                name="brand"
                                value={brand}
                                onChange={handleFilterChange}
                                checked={filters.brand.includes(brand)}
                                className="mr-3 h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded" />
                            <span className="text-gray-700">{brand}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price range */}
            <div className="mb-8">
                <label className="block text-gray-900 mb-2 font-bold">
                    Price Range
                </label>
                <input
                    type="range"
                    name="priceRange"
                    min={0}
                    max={100}
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
                <div className="flex justify-between text-gray-700 mt-2">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>
    )
}
export default FilterSidebar