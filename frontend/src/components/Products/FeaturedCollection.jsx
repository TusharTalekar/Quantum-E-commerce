import { Link } from "react-router-dom"
import featured from "../../assets/featured.png";

const FeaturedCollection = () => {
    return (
        <section className='py-24 px-4 bg-teal-100'>
            <div className='max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center rounded-xl overflow-hidden'>
                {/* Left content  */}
                <div className='lg:w-1/2 p-12 text-center lg:text-left'>
                    <h2 className='text-xl font-medium text-teal-900 mb-4'>
                        Comfort and Style
                    </h2>
                    <h2 className='text-4xl lg:text-5xl font-bold leading-tight mb-8 text-slate-900'>
                        Apparel made for your everyday life
                    </h2>
                    <p className='text-lg text-gray-700 mb-10'>
                        This project demonstrates a robust e-commerce platform built with modern technologies to deliver a smooth and responsive user experience.
                    </p>
                    <Link to="collections/all" className="bg-teal-700 text-white px-10 py-4 font-bold text-lg hover:bg-teal-600 transition-colors rounded-full">
                        Shop Now
                    </Link>
                </div>

                {/* Right content  */}
                <div className="lg:w-1/2">
                    <img
                        src={featured}
                        alt=""
                        className="h-full w-full object-cover" />
                </div>
            </div>
        </section>
    )
}

export default FeaturedCollection