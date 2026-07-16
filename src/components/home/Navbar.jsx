import { Link, useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    return (

        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-700"
                >
                    🛡️ Signum Insurance
                </Link>

                <div className="space-x-3">

                    {location.pathname !== "/" && (
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-700"
                        >
                            Home
                        </Link>
                    )}

                    {location.pathname !== "/login" && (
                        <Link
                            to="/login"
                            className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
                        >
                            Login
                        </Link>
                    )}

                    {location.pathname !== "/register" && (
                        <Link
                            to="/register"
                            className="border border-blue-700 text-blue-700 px-5 py-2 rounded-lg hover:bg-blue-700 hover:text-white"
                        >
                            Register
                        </Link>
                    )}

                </div>

            </div>

        </nav>

    );
}

export default Navbar;