import {
    FaHome,
    FaClipboardList,
    FaFileInvoiceDollar,
    FaCheckCircle,
    FaChartBar,
    FaSignOutAlt,
    FaShoppingCart
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const username = localStorage.getItem("username");

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <div className="w-72 bg-slate-900 text-white flex flex-col">

            <div className="text-center py-8 border-b border-slate-700">

                <h1 className="text-3xl font-bold">

                    🛡 INSURANCE

                </h1>

                <p className="text-gray-400 mt-2">

                    Claim Processing

                </p>

            </div>

            <div className="flex-1 px-5 py-6 space-y-3">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition">

                    <FaHome />

                    Dashboard

                </button>

                {role === "ADMIN" && (

                    <>

                        <button
                            onClick={() => navigate("/policy")}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition">

                            <FaClipboardList />

                            Policies

                        </button>

                        <button
                            onClick={() => navigate("/approval")}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition">

                            <FaCheckCircle />

                            Approvals

                        </button>

                        <button
                            onClick={() => navigate("/reports")}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition">

                            <FaChartBar />

                            Reports

                        </button>

                    </>

                )}

                {role === "USER" && (

    <>

        <button
            onClick={() => navigate("/buy-policy")}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition">

            <FaShoppingCart />

            Buy Policy

        </button>

        <button
            onClick={() => navigate("/policies")}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition">

            <FaClipboardList />

            My Policies

        </button>

        <button
            onClick={() => navigate("/claim")}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition">

            <FaFileInvoiceDollar />

            Submit Claim

        </button>

        <button
            onClick={() => navigate("/myclaims")}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition">

            <FaChartBar />

            My Claims

        </button>

    </>

)}

            </div>

            <div className="border-t border-slate-700 p-5">

                <div className="mb-4">

                    <h3 className="font-bold">

                        {username}

                    </h3>

                    <p className="text-gray-400">

                        {role}

                    </p>

                </div>

                <button
                    onClick={logout}
                    className="w-full bg-red-600 hover:bg-red-700 rounded-xl p-3 flex items-center justify-center gap-3">

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Sidebar;