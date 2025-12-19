import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { VITE_BACKEND_URL } from "../../api/api";

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(true);

    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNewArrivals();
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;

    };
    const handleMouseUpOrLeave = (e) => {
        setIsDragging(false);
    };

    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
    };

    // update Scroll Buttons
    const updateScrollButtons = () => {
        const container = scrollRef.current;

        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }

        // console.log({
        //     scrollLeft: container.scrollLeft,
        //     clientWidth: container.clientWidth,
        //     containerScrollWidth: container.scrollWidth,
        //     offsetLeft: container.offsetLeft
        // });
    }

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener("sroll", updateScrollButtons);
        }
    }, [newArrivals]);


    return (
        <section className='py-20 px-4'>
            <div className="max-w-6xl mx-auto text-center mb-16 relative">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Explore New Arrivals</h2>
                <p className="text-lg text-gray-700 mb-8">
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>
                {/* Scroll Buttons */}
                <div className="absolute right-0 bottom-[-40px] md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex space-x-4 z-10">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-3 rounded-full border-2 border-orange-500 transition-colors ${canScrollLeft
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-transparent text-orange-500 cursor-not-allowed opacity-50"}`}>
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-3 rounded-full border-2 border-orange-500 transition-colors ${canScrollRight
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-transparent text-orange-500 cursor-not-allowed opacity-50"}`}>
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>
            {/* Scrollable content  */}
            <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className='max-w-6xl mx-auto overflow-x-scroll flex space-x-8 relative py-4 hide-scrollbar'>
                {
                    newArrivals.map((product) => (
                        <div
                            key={product._id}
                            className={`min-w-[80%] sm:min-w-[50%] lg:min-w-[33.33%] relative group overflow-hidden rounded-xl shadow-lg ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
                            <img src={product.images[0].url}
                                alt={product.images[0].altText || product.name}
                                className='w-full h-[550px] object-cover transition-transform group-hover:scale-105'
                                draggable="false"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900/80 backdrop-blur-md text-white">
                                <Link to={`/product/${product._id}`} className="block">
                                    <h4 className="font-medium text-lg text-gray-100">{product.name}</h4>
                                    <p className="mt-1 text-base font-normal text-gray-200">${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default NewArrivals