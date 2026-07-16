import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/layout/Layout";

function MyClaims() {
    

    const [claims, setClaims] = useState([]);

    const [filter, setFilter] = useState("ALL");

    useEffect(() => {

        loadClaims();

    }, []);

    const loadClaims = async () => {

        

        try {

            const userId =
                localStorage.getItem("userId");

            const response =
                await API.get(
                    "/myClaims",
                    {
                        params: {
                            userId
                        }
                    }

                    
                );

            setClaims(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const badgeColor = (status) => {

    status = status.toUpperCase().trim();

    if (status === "APPROVED")
        return "bg-green-100 text-green-700";

    if (status === "REJECTED")
        return "bg-red-100 text-red-700";

    return "bg-yellow-100 text-yellow-700";

};

    const filteredClaims =
    filter === "ALL"
        ? claims
        : claims.filter(
              claim =>
                  claim.status
                      .toUpperCase()
                      .trim() ===
                  filter.toUpperCase()
          );

            

    return (

        <Layout>

            <div className="max-w-7xl mx-auto p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">

                            My Claims

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Track all your submitted insurance claims.

                        </p>

                    </div>

                    <select

                        value={filter}

                        onChange={(e) =>
                            setFilter(
                                e.target.value
                            )
                        }

                        className="border rounded-xl p-3"

                    >

                        <option value="ALL">

                            All Claims

                        </option>

                        <option value="Pending">

                            Pending

                        </option>

                        <option value="Approved">

                            Approved

                        </option>

                        <option value="Rejected">

                            Rejected

                        </option>

                    </select>

                </div>

                {

                    filteredClaims.length === 0 &&

                    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">

                        No Claims Found

                    </div>

                }

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {

                        filteredClaims.map((claim) => (

                            <div

                                key={claim.claimId}

                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"

                            >

<div className="flex justify-between items-center">

    <h2 className="text-xl font-bold">
        Claim #{claim.claimId}
    </h2>

    <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(claim.status)}`}
    >
        {claim.status}
    </span>

</div>

                                <hr className="my-5" />

                                {
    claim.adminRemark && (

        <div
            className={`mb-5 rounded-xl p-4 ${
                claim.status === "Rejected"
                    ? "bg-red-50 border border-red-300"
                    : "bg-blue-50 border border-blue-300"
            }`}
        >

            <h3 className="font-semibold mb-2">

                {
                    claim.status === "Rejected"
                        ? "Rejection Reason"
                        : "Admin Remarks"
                }

            </h3>

            <p>

                {claim.adminRemark}

            </p>

        </div>

    )
}

                                <div className="space-y-4">

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

                                            ₹ {claim.amount}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">

                                            Submitted Date

                                        </p>

                                        <h3>

                                            {claim.date}

                                        </h3>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </Layout>

    );

}

export default MyClaims;