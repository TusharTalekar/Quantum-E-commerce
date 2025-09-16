import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.png";
import womensCollectionImage from "../../assets/womens-collection.png";

const GenderCollectionSection = () => {
    return (
        <section className="py-24 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Women's Collection */}
                <div className="relative group overflow-hidden rounded-xl shadow-lg flex-1">
                    <img
                        src={womensCollectionImage}
                        alt="Women's Collection"
                        className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-start p-10 bg-gradient-to-t from-slate-800/70 to-transparent">
                        <div className="text-white mt-auto">
                            <h2 className="text-3xl font-black tracking-wide mb-2">
                                Women's Collection
                            </h2>
                            <Link to="/collections/all?gender=Women"
                                className="text-teal-200 underline text-lg font-bold hover:text-teal-100 transition-colors">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Men's Collection */}
                <div className="relative group overflow-hidden rounded-xl shadow-lg flex-1">
                    <img
                        src={mensCollectionImage}
                        alt="Men's Collection"
                        className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-start p-10 bg-gradient-to-t from-slate-800/70 to-transparent">
                        <div className="text-white mt-auto">
                            <h2 className="text-3xl font-black tracking-wide mb-2">
                                Men's Collection
                            </h2>
                            <Link to="/collections/all?gender=Men"
                                className="text-teal-200 underline text-lg font-bold hover:text-teal-100 transition-colors">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GenderCollectionSection