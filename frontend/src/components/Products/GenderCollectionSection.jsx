import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
    return (
        <section className="py-24 px-4 bg-gray-100">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Women's Collection */}
                <Link
                    to="/collections/all?gender=Women"
                    className="relative group overflow-hidden rounded-xl shadow-lg flex-1"
                >
                    <img
                        src={`https://res.cloudinary.com/dyvnhonl6/image/upload/E%20commerce/womens-collection.jpg`}
                        alt="Women's Collection"
                        className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-start p-10 bg-gradient-to-t from-slate-900/70 to-transparent">
                        <div className="text-white mt-auto">
                            <h2 className="text-3xl font-black tracking-wide mb-2">
                                Women's Collection
                            </h2>
                            <Link
                                to="/collections/all?gender=Women"
                                className="text-yellow-200 underline text-lg font-bold hover:text-yellow-100 transition-colors">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </Link>
                {/* Men's Collection */}
                <Link
                    to="/collections/all?gender=Men"
                    className="relative group overflow-hidden rounded-xl shadow-lg flex-1"
                >
                    <img
                        src={`https://res.cloudinary.com/dyvnhonl6/image/upload/E%20commerce/mens-collection.jpg`}
                        alt="Men's Collection"
                        className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-start p-10 bg-gradient-to-t from-slate-900/70 to-transparent">
                        <div className="text-white mt-auto">
                            <h2 className="text-3xl font-black tracking-wide mb-2">
                                Men's Collection
                            </h2>
                            <Link
                                to="/collections/all?gender=Men"
                                className="text-yellow-200 underline text-lg font-bold hover:text-yellow-100 transition-colors">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </Link>
            </div>
        </section >
    )
}

export default GenderCollectionSection