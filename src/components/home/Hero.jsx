import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaRobot,
    FaShieldAlt,
    FaFileInvoice,
    FaArrowRight
} from "react-icons/fa";

function Hero() {

    return (

        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24">

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                <motion.div

                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}

                >

                    <h1 className="text-5xl font-bold leading-tight">

                        AI Powered Insurance
                        <br />
                        Claim Processing

                    </h1>

                    <p className="mt-6 text-lg text-blue-100">

                        Fast claim submission,
                        secure policy management
                        and intelligent AI assistance.

                    </p>

                    <div className="mt-8 flex gap-4">

                        <Link
                            to="/register"
                            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"
                        >
                            Get Started
                            <FaArrowRight />
                        </Link>

                        <Link
                            to="/login"
                            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
                        >
                            Login
                        </Link>

                    </div>

                </motion.div>

                <motion.div

                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}

                    className="grid grid-cols-2 gap-5"

                >

                    <div className="bg-white text-blue-700 rounded-2xl p-6 shadow-xl">
                        <FaRobot size={45} />
                        <h3 className="font-bold mt-4">AI Assistant</h3>
                    </div>

                    <div className="bg-white text-green-600 rounded-2xl p-6 shadow-xl">
                        <FaShieldAlt size={45} />
                        <h3 className="font-bold mt-4">Secure Policies</h3>
                    </div>

                    <div className="bg-white text-purple-700 rounded-2xl p-6 shadow-xl">
                        <FaFileInvoice size={45} />
                        <h3 className="font-bold mt-4">Easy Claims</h3>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-xl">
                        <h1 className="text-5xl font-bold text-blue-700">24×7</h1>
                        <p className="text-gray-600 mt-2">Support</p>
                    </div>

                </motion.div>

            </div>

        </section>

    );

}

export default Hero;