import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/layout/Layout";

function Claim() {

    const navigate = useNavigate();

    const location = useLocation();

    const passedPolicy = location.state || {};

    const userId = localStorage.getItem("userId");

    const [policyId] = useState(
        passedPolicy.policyId || ""
    );

    const [claimantName] = useState(
        passedPolicy.claimantName || ""
    );

    const [claimAmount, setClaimAmount] =
        useState("");

    const [incidentDate, setIncidentDate] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [requiredDocuments, setRequiredDocuments] = useState([]);

    const [uploadedFiles, setUploadedFiles] = useState({});

    const loadPolicy = async (policyId) => {
        

    const token = localStorage.getItem("token");

    const response = await API.get(
        "/policy?id=" + policyId,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        
    );

    setRequiredDocuments(

    response.data.requiredDocuments
        ? response.data.requiredDocuments.split(",")
        : []

);


};
useEffect(() => {

    if (policyId) {
        loadPolicy(policyId);
    }

}, [policyId]);
    
    const submitClaim = async () => {

        if (!policyId) {
            alert("Please select a policy first.");
            navigate("/policies");
            return;
        }

        if (claimAmount === "") {
            alert("Enter Claim Amount");
            return;
        }

        if (Number(claimAmount) <= 0) {
            alert("Claim Amount must be greater than zero");
            return;
        }

        if (incidentDate === "") {
            alert("Select Incident Date");
            return;
        }

        if (description.trim() === "") {
            alert("Enter Incident Description");
            return;
        }

        try {

            const formData = new FormData();

            formData.append(
                "policyId",
                policyId
            );

            formData.append(
                "userId",
                userId
            );

            formData.append(
                "claimantName",
                claimantName
            );

            formData.append(
                "claimAmount",
                claimAmount
            );

            formData.append(
                "incidentDate",
                incidentDate
            );

            formData.append(
                "description",
                description
            );

            Object.keys(uploadedFiles).forEach((doc) => {
    formData.append("documents", uploadedFiles[doc]);
    formData.append("documentNames", doc);
});

            const response = await API.post(
    "/submitClaim",
    formData
);

            alert(response.data);

            if (
                response.data.includes("Successfully")
            ) {

                navigate("/myclaims");

            }

        }
        catch (error) {

            console.log(error);

            alert("Failed to Submit Claim");

        }

    };

    return (

        <Layout>

            <div className="max-w-3xl mx-auto mt-10">

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <h1 className="text-3xl font-bold mb-8 text-slate-800">

                        Submit Insurance Claim

                    </h1>

                    {/* Policy ID */}

                    <div className="mb-5">

                        <label className="block mb-2 font-semibold">

                            Policy ID

                        </label>

                        <input

                            className="w-full border rounded-lg p-3 bg-gray-100"

                            value={policyId}

                            readOnly

                        />

                    </div>

                    {/* Claimant */}

                    <div className="mb-5">

                        <label className="block mb-2 font-semibold">

                            Claimant Name

                        </label>

                        <input

                            className="w-full border rounded-lg p-3 bg-gray-100"

                            value={claimantName}

                            readOnly

                        />

                    </div>

                    {/* Amount */}

                    <div className="mb-5">

                        <label className="block mb-2 font-semibold">

                            Claim Amount

                        </label>

                        <input

                            type="number"

                            className="w-full border rounded-lg p-3"

                            placeholder="Enter Claim Amount"

                            value={claimAmount}

                            onChange={(e) =>
                                setClaimAmount(
                                    e.target.value
                                )
                            }

                        />

                    </div>

                    {/* Date */}

                    <div className="mb-5">

                        <label className="block mb-2 font-semibold">

                            Incident Date

                        </label>

                        <input

                            type="date"

                            className="w-full border rounded-lg p-3"

                            value={incidentDate}

                            onChange={(e) =>
                                setIncidentDate(
                                    e.target.value
                                )
                            }

                        />

                    </div>

                    <div className="bg-white p-6 rounded-xl shadow mt-4">

<h2 className="text-xl font-bold mb-4">

Required Documents

</h2>

{

requiredDocuments.map((doc,index)=>(

<div
key={index}
className="mb-4"
>

<label className="font-semibold">

{doc}

</label>

<input

type="file" 

className="block mt-2"

onChange={(e)=>{

setUploadedFiles({

...uploadedFiles,

[doc]:e.target.files[0]

})

}}

 />

</div>

))

}

</div>

                    {/* Description */}

                    <div className="mb-8">

                        <label className="block mb-2 font-semibold">

                            Incident Description

                        </label>

                        <textarea

                            rows="5"

                            className="w-full border rounded-lg p-3"

                            placeholder="Describe what happened..."

                            value={description}

                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }

                        />

                    </div>

                    <button

                        onClick={submitClaim}

                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"

                    >

                        Submit Claim

                    </button>

                </div>

            </div>

        </Layout>

    );

}

export default Claim;