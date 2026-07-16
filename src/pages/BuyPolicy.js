import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import API from "../services/api";
import BuyPolicyModal from "../components/buyPolicy/BuyPolicyModal";
import FloatingAI from "../components/AI/FloatingAI";
import FloatingAdvisor from "../components/Advisor/FloatingAdvisor";
import { VscRobot } from "react-icons/vsc";

import {
    FaHeartbeat,
    FaCar,
    FaHome,
    FaUserShield
} from "react-icons/fa";

function BuyPolicy() {

    const [selectedPolicy, setSelectedPolicy] = useState(null);

const [showModal, setShowModal] = useState(false);

    const [policies, setPolicies] = useState([]);

    const [advisorOpen, setAdvisorOpen] = useState(false);
    useEffect(() => {

    fetchPolicies();

}, []);

const fetchPolicies = async () => {

    try {

        const response = await API.get("/getPolicies");

        setPolicies(response.data);

    }

    catch (error) {

        console.log(error);

    }

};
const getIcon = (type) => {

    switch (type) {

        case "Health":
            return <FaHeartbeat size={40} className="text-red-500" />;

        case "Vehicle":
            return <FaCar size={40} className="text-blue-500" />;

        case "Home":
            return <FaHome size={40} className="text-orange-500" />;

        case "Life":
            return <FaUserShield size={40} className="text-green-500" />;

        default:
            return <FaUserShield size={40} className="text-green-500" />;

    }

};

const openModal = (policy) => {

    setSelectedPolicy(policy);

    setShowModal(true);

};

const closeModal = () => {

    setShowModal(false);

    setSelectedPolicy(null);

};

const buyPolicy = async (policy) => {

    try {

        const formData = new URLSearchParams();

        formData.append(
            "userId",
            localStorage.getItem("userId")
        );

        formData.append(
            "policyId",
            policy.policyId
        );

        formData.append(
            "premium",
            policy.premiumAmount
        );

        formData.append(
            "maturityAmount",
            policy.coverageAmount
        );

        const response = await API.post(
            "/buyPolicy",
            formData
        );

        if (response.data.status === "SUCCESS") {

            alert("Policy Purchased Successfully");

            fetchPolicies();

        } else {

            alert(response.data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Purchase Failed");

    }

};

    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 overflow-auto p-8">

                <div className="flex justify-between items-center mb-8">

    <div>

        <h1 className="text-4xl font-bold text-slate-800">

            Buy Insurance Policy

        </h1>

        <p className="text-gray-500 mt-2">

            Choose the insurance plan that best suits your needs.

        </p>

    </div>

    <button
    onClick={() => setAdvisorOpen(true)}
    className="
        flex
        items-center
        gap-3
        px-6
        py-4
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-indigo-700
        text-white
        shadow-xl
        hover:scale-105
        hover:shadow-2xl
        transition
    "
>
    <VscRobot size={30}/>

    <div>

        <div className="font-bold">

            Compare Policies

        </div>

        <div className="text-xs text-blue-100">

            Using Signum AI

        </div>

    </div>

</button>

</div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">

                    {

                        policies.map((policy) => (

                            <div

                                key={policy.id}

                                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"

                            >

                                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6">

                                    <div className="flex items-center gap-5">

                                        {getIcon(policy.policyType)}

                                        <div>

                                            <h2 className="text-2xl font-bold">

                                                {policy.policyName}

                                            </h2>

                                            <p>

                                                Coverage

                                                {" "}

                                                Coverage ₹{policy.coverageAmount}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="p-6">

                                    <div className="space-y-2">

    <p>
        <strong>Policy Type :</strong> {policy.policyType}
    </p>

    <p>
        <strong>Coverage :</strong> ₹{policy.coverageAmount}
    </p>

    <p>
        <strong>Premium :</strong> ₹{policy.premiumAmount}
    </p>

</div>
                                    <div className="mt-6">

                                        <h2 className="text-3xl font-bold text-blue-700">

                                            ₹{policy.premiumAmount}

                                        </h2>

                                    </div>

                                    <div className="flex gap-4 mt-8">

                                        <button

    className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition"

    onClick={() => openModal(policy)}

>

    View Details

</button>

                                        <button

                                            className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"

                                            onClick={() =>
                                                buyPolicy(policy)
                                            }

                                        >

                                            Buy Now

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>
            {

    showModal &&

    <BuyPolicyModal

        policy={selectedPolicy}

        closeModal={closeModal}

        refresh={fetchPolicies}

    />

}
{
    advisorOpen &&

    <FloatingAdvisor

        close={() => setAdvisorOpen(false)}

    />

}
<FloatingAI />

        </div>

    );

}

export default BuyPolicy;