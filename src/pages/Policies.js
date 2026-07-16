import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

function Policies() {

    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);

    useEffect(() => {

        loadPolicies();

    }, []);

    const loadPolicies = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await API.get(
                "/myPolicy?userId=" + userId
            );

            

            setPolicies(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="max-w-7xl mx-auto p-8">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold text-slate-800">

                        My Policies

                    </h1>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {

                        policies.map((policy, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6"
                            >

                                <div className="flex justify-between items-center">

                                    <h2 className="text-xl font-bold text-slate-800">

                                        {policy.policyName}

                                    </h2>

                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                                        {policy.policyType}

                                    </span>

                                </div>

                                <div className="mt-6 space-y-4">

                                    <div>

                                        <p className="text-gray-500">

                                            Premium Paid

                                        </p>

                                        <p className="text-lg font-bold text-blue-600">

                                            ₹ {policy.premiumPaid}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">

                                            Maturity Amount

                                        </p>

                                        <p className="text-lg font-bold text-green-600">

                                            ₹ {policy.maturityAmount}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">

                                            Start Date

                                        </p>

                                        <p className="font-semibold">

                                            {policy.startDate}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">

                                            End Date

                                        </p>

                                        <p className="font-semibold">

                                            {policy.endDate}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">

                                            Days Left

                                        </p>

                                        <p className="text-xl font-bold text-orange-500">

                                            {policy.daysLeft} Days

                                        </p>

                                    </div>

                                </div>

                                <button
                                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                                    onClick={() =>
                                        navigate("/claim", {
                                            state: {
                                                policyId: policy.policyId,
                                                policyName: policy.policyName,
                                                claimantName: localStorage.getItem("username")
                                            }
                                        })
                                    }
                                >
                                    Submit Claim
                                </button>

                            </div>

                        ))

                    }

                </div>

            </div>

        </Layout>

    );

}

export default Policies;