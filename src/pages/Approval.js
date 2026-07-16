import { useState } from "react";
import API from "../services/api";
import Layout from "../components/layout/Layout";

function Approval() {

    const [claimId, setClaimId] = useState("");
    const [status, setStatus] = useState("");
    const [claim, setClaim] = useState(null);
    const [documents, setDocuments] = useState([]);
const [adminRemark, setAdminRemark] = useState("");

    const loadClaim = async () => {

        if (Number(claimId) <= 0) {

            alert("Enter Valid Claim ID");
            return;

        }

        try {

            const response =
                await API.get("/getClaim?claimId=" + claimId);

            if (response.data.message === "Claim Not Found") {

                alert("Claim Not Found");
                setClaim(null);

            } else {

                setClaim(response.data);
                try {

    const docs =
        await API.get(
            "/claimDocuments?claimId=" + claimId
        );

    setDocuments(docs.data);

} catch (e) {

    console.log(e);

}

            }

        } catch (error) {

            console.log(error);
            alert("Failed to Load Claim");

        }

    };

    const updateStatus = async () => {

        if (!claim) {

            alert("Load a claim first");
            return;

        }

        if (status === "") {

            alert("Select Status");
            return;

        }

        try {

            const formData = new URLSearchParams();

            formData.append("claimId", claimId);
            formData.append("status", status);

            formData.append(
    "adminRemark",
    adminRemark
);

            const response =
                await API.post("/approveClaim", formData);

            alert(response.data);

            if (response.data.includes("Updated")) {

                setClaimId("");
                setStatus("");
                setClaim(null);

            }

        } catch (error) {

            console.log(error);
            alert("Failed to Update Claim");

        }

    };

    return (

        <Layout>

            <div className="min-h-screen bg-slate-100 p-8">

                <div className="max-w-5xl mx-auto">

                    {/* Header */}

                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl shadow-xl p-8 text-white mb-8">

                        <h1 className="text-3xl font-bold">

                            Claim Approval

                        </h1>

                        <p className="mt-2">

                            Search and verify insurance claims before approval.

                        </p>

                    </div>

                    {/* Search */}

                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                        <label className="font-semibold text-gray-700">

                            Claim ID

                        </label>

                        <div className="flex gap-4 mt-3">

                            <input

                                type="number"

                                value={claimId}

                                min="1"

                                onChange={(e) =>
                                    setClaimId(e.target.value)
                                }

                                placeholder="Enter Claim ID"

                                className="flex-1 border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"

                            />

                            <button

                                onClick={loadClaim}

                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl"

                            >

                                Load Claim

                            </button>

                        </div>

                    </div>

                    {/* Claim Card */}

                    {

                        claim && (

                            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">

                                <div className="flex justify-between items-center mb-8">

                                    <h2 className="text-2xl font-bold">

                                        Claim Details

                                    </h2>

                                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">

                                        {claim.status}

                                    </span>

                                </div>

                                <div className="grid md:grid-cols-2 gap-8">

                                    <div>

                                        <p className="text-gray-500">

                                            Policy ID

                                        </p>

                                        <h3 className="text-xl font-semibold">

                                            {claim.policyId}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">

                                            Claimant Name

                                        </p>

                                        <h3 className="text-xl font-semibold">

                                            {claim.claimantName}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">

                                            Claim Amount

                                        </p>

                                        <h3 className="text-2xl font-bold text-blue-600">

                                            ₹ {claim.claimAmount}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-gray-500">

                                            Incident Date

                                        </p>

                                        <h3 className="font-semibold">

                                            {claim.incidentDate}

                                        </h3>

                                    </div>

                                </div>

                                <div className="mt-8">

                                    <p className="text-gray-500 mb-2">

                                        Incident Description

                                    </p>

                                    <div className="bg-slate-100 rounded-xl p-5">

                                        {claim.description}

                                    </div>

                                    <div className="mt-8">

    <h3 className="text-xl font-bold mb-4">

        Uploaded Documents

    </h3>

    {

        documents.length === 0 ?

        (

            <p>No documents uploaded.</p>

        )

        :

        documents.map((doc,index)=>(

            <div
                key={index}
                className="flex justify-between items-center border rounded-lg p-3 mb-3"
            >

                <span>

                    {doc.documentName}

                </span>

                <a

                    href={doc.documentUrl}

                    target="_blank"

                    rel="noreferrer"

                    className="bg-blue-600 text-white px-4 py-2 rounded"

                >

                    Open

                </a>

            </div>

        ))

    }

</div>

                                </div>

                            </div>

                        )

                    }

                    {/* Approval */}

                    {

                        claim && (

                            <div className="bg-white rounded-2xl shadow-xl p-8">

                                <h2 className="text-2xl font-bold mb-6">

    Update Claim Status

</h2>

{/* Admin Remark */}

<div className="mb-6">

    <label className="block mb-2 font-semibold">

        Admin Remarks

    </label>

    <textarea

        rows="4"

        value={adminRemark}

        onChange={(e) =>
            setAdminRemark(e.target.value)
        }

        placeholder="Enter reason for approval/rejection..."

        className="w-full border rounded-xl p-4"

    />

</div>

{/* Status */}

<select

    value={status}

    onChange={(e) =>
        setStatus(e.target.value)
    }

    className="w-full border rounded-xl p-4 mb-6"

>

                                    <option value="">

                                        Select Status

                                    </option>

                                    <option value="Approved">

                                        Approve Claim

                                    </option>

                                    <option value="Rejected">

                                        Reject Claim

                                    </option>

                                </select>

                                <button

                                    onClick={updateStatus}

                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold"

                                >

                                    Update Status

                                </button>

                            </div>

                        )

                    }

                </div>

            </div>

        </Layout>

    );

}

export default Approval;