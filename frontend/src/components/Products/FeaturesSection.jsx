import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi2"


const FeaturesSection = () => {
    return (
        <section className="py-24 px-4 bg-teal-100">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                {/* Feature 1 */}
                <div className="flex flex-col items-center">
                    <div className="p-5 rounded-full bg-teal-200 mb-6">
                        <HiShoppingBag className="text-4xl text-teal-700" />
                    </div>
                    <h4 className="tracking-wide text-2xl font-bold text-teal-700 mb-2">FREE INTERNATIONAL SHIPPING</h4>
                    <p className="text-gray-600 text-lg">
                        On all orders over $100.00
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col items-center">
                    <div className="p-5 rounded-full bg-teal-200 mb-6">
                        <HiArrowPathRoundedSquare className="text-4xl text-teal-700" />
                    </div>
                    <h4 className="tracking-wide text-2xl font-bold text-teal-700 mb-2">45 DAYS RETURN</h4>
                    <p className="text-gray-600 text-lg">
                        Money back guarantee
                    </p>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col items-center">
                    <div className="p-5 rounded-full bg-teal-200 mb-6">
                        <HiOutlineCreditCard className="text-4xl text-teal-700" />
                    </div>
                    <h4 className="tracking-wide text-2xl font-bold text-teal-700 mb-2">SECURED CHECKOUT</h4>
                    <p className="text-gray-600 text-lg">
                        100% secured checkout process
                    </p>
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection