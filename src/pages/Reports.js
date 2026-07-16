import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/layout/Layout";

function Reports() {

    const [claims, setClaims] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const response =
                await API.get("/reports");

                 

                console.log(response.data);

            const data =
    typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;

         console.log("Parsed Data =", data);
        console.log("Is Array =", Array.isArray(data));
        console.log("Length =", data.length);

setClaims(data);

console.log("Parsed Data =", data);
console.log("Length =", data.length);

        } catch (error) {

            console.log(error);

        }

    };
    console.log("State Claims =", claims);
console.log("State Length =", claims.length);

    const filteredClaims = claims.filter((claim) =>
        claim.claimantName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalClaims = claims.length;

    const approvedClaims =
        claims.filter(c => c.status === "Approved").length;

    const rejectedClaims =
        claims.filter(c => c.status === "Rejected").length;

    const pendingClaims =
        claims.filter(c => c.status === "Pending").length;

    const badge = (status) => {

        if (status === "Approved")
            return "bg-green-100 text-green-700";

        if (status === "Rejected")
            return "bg-red-100 text-red-700";

        return "bg-yellow-100 text-yellow-700";

    };

    return (

        <Layout>

            <div className="min-h-screen bg-slate-100 p-8">

                <div className="max-w-7xl mx-auto">

                    {/* Header */}

                    <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-3xl shadow-xl text-white p-8 mb-8">

                        <h1 className="text-4xl font-bold">

                            Insurance Reports

                        </h1>

                        <p className="mt-2 text-blue-100">

                            Complete claim history and analytics.

                        </p>

                    </div>

                    {/* Statistics */}

                    <div className="grid md:grid-cols-4 gap-6 mb-8">

                        <div className="bg-white rounded-2xl shadow-lg p-6">

                            <p className="text-gray-500">

                                Total Claims

                            </p>

                            <h2 className="text-4xl font-bold text-blue-700">

                                {totalClaims}

                            </h2>

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">

                            <p className="text-gray-500">

                                Approved

                            </p>

                            <h2 className="text-4xl font-bold text-green-600">

                                {approvedClaims}

                            </h2>

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">

                            <p className="text-gray-500">

                                Pending

                            </p>

                            <h2 className="text-4xl font-bold text-yellow-500">

                                {pendingClaims}

                            </h2>

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">

                            <p className="text-gray-500">

                                Rejected

                            </p>

                            <h2 className="text-4xl font-bold text-red-600">

                                {rejectedClaims}

                            </h2>

                        </div>

                    </div>

                    {/* Search */}

                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                        <input

                            type="text"

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                            placeholder="Search Claimant..."

                            className="w-full border rounded-xl p-4"

                        />

                    </div>

                    {/* Claims */}

                    <div className="grid lg:grid-cols-2 gap-8">

                        {

                            filteredClaims.map((claim) => (

                                <div

                                    key={claim.claimId}

                                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"

                                >

                                    <div className="flex justify-between items-center mb-5">

                                        <h2 className="text-xl font-bold">

                                            Claim #{claim.claimId}

                                        </h2>

                                        <span

                                            className={`px-4 py-1 rounded-full font-semibold ${badge(claim.status)}`}

                                        >

                                            {claim.status}

                                        </span>

                                    </div>

                                    <div className="grid grid-cols-2 gap-5">

                                        <div>

                                            <p className="text-gray-500">

                                                Claimant

                                            </p>

                                            <h3 className="font-semibold">

                                                {claim.claimantName}

                                            </h3>

                                        </div>

                                        <div>

                                            <p className="text-gray-500">

                                                Policy ID

                                            </p>

                                            <h3 className="font-semibold">

                                                {claim.policyId}

                                            </h3>

                                        </div>

                                        <div>

                                            <p className="text-gray-500">

                                                Claim Amount

                                            </p>

                                            <h3 className="text-blue-600 text-xl font-bold">

                                                ₹ {claim.claimAmount}

                                            </h3>

                                        </div>

                                        <div>

                                            <p className="text-gray-500">

                                                Incident Date

                                            </p>

                                            <h3>

                                                {claim.incidentDate}

                                            </h3>

                                        </div>

                                    </div>

                                    <div className="mt-6">

                                        <p className="text-gray-500 mb-2">

                                            Description

                                        </p>

                                        <div className="bg-slate-100 rounded-xl p-4">

                                            {claim.description}

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Reports;