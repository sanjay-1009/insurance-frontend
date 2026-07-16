import { useState } from "react";
import API from "../services/api";
import Layout from "../components/layout/Layout";
import { GrDocumentPdf } from "react-icons/gr";



function Policy() {

    const analyzePolicy = async () => {

    if (!policyPdf) {

        alert("Please upload a Policy PDF");

        return;

    }

    try {

        setLoadingAI(true);

        const formData = new FormData();
formData.append("policyPdf", policyPdf);

const token = localStorage.getItem("token");

const response = await API.post(
    "/policy/analyze",
    formData,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }
);

console.log(response.data);

        const data = response.data;

        setPolicyName(data.policyName || "");

        setPolicyType(data.policyType || "");

        setCoverageAmount(data.coverage || "");

        setPremiumAmount(data.premium || "");

        setEligibility(data.eligibility || "");

        setWaitingPeriod(data.waitingPeriod || "");

        setClaimProcess(data.claimProcess || "");

        setRiskLevel(data.riskLevel || "");

        setRequiredDocuments(data.requiredDocuments || []);

        setBenefits(data.benefits || []);

setExclusions(data.exclusions || []);

setWhoShouldBuy(data.whoShouldBuy || []);

        setAdvantages(data.advantages || []);

        setDisadvantages(data.disadvantages || []);

        setPlainSummary(data.plainEnglishSummary || "");

        setTamilSummary(data.tamilSummary || "");

        setHindiSummary(data.hindiSummary || "");

        alert("Signum AI Analysis Completed");

    }

    catch (e) {

        console.log(e);

        alert("AI Analysis Failed");

    }

    finally {

        setLoadingAI(false);

    }

};

    const [policyName, setPolicyName] = useState("");
    const [policyType, setPolicyType] = useState("");
    const [coverageAmount, setCoverageAmount] = useState("");
    const [premiumAmount, setPremiumAmount] = useState("");
    const [policyPdf, setPolicyPdf] = useState(null);

const [loadingAI, setLoadingAI] = useState(false);

const [eligibility, setEligibility] = useState("");

const [waitingPeriod, setWaitingPeriod] = useState("");

const [claimProcess, setClaimProcess] = useState("");

const [riskLevel, setRiskLevel] = useState("");

const [requiredDocuments, setRequiredDocuments] = useState([]);

const [advantages, setAdvantages] = useState([]);

const [disadvantages, setDisadvantages] = useState([]);

const [plainSummary, setPlainSummary] = useState("");

const [benefits, setBenefits] = useState([]);
const [exclusions, setExclusions] = useState([]);
const [whoShouldBuy, setWhoShouldBuy] = useState([]);

const [tamilSummary, setTamilSummary] = useState("");

const [hindiSummary, setHindiSummary] = useState("");

    const addPolicy = async () => {

        if (policyName.trim() === "") {
            alert("Enter Policy Name");
            return;
        }

        if (policyType.trim() === "") {
            alert("Enter Policy Type");
            return;
        }

        if (Number(coverageAmount) <= 0) {
            alert("Coverage Amount must be greater than 0");
            return;
        }

        if (Number(premiumAmount) <= 0) {
            alert("Premium Amount must be greater than 0");
            return;
        }

        try {

            const formData = new URLSearchParams();

            formData.append("policyName", policyName);
            formData.append("policyType", policyType);
            formData.append("coverageAmount", coverageAmount);
            formData.append("premiumAmount", premiumAmount);
            formData.append("eligibility", eligibility);

formData.append("benefits", benefits.join(","));

formData.append("exclusions", exclusions.join(","));

formData.append("coveredDiseases", advantages.join(","));

formData.append("waitingPeriod", waitingPeriod);

formData.append("requiredDocuments", requiredDocuments.join(","));

formData.append("claimProcess", claimProcess);

formData.append("whoShouldBuy", whoShouldBuy.join(","));

formData.append("plainEnglishSummary", plainSummary);

            const response =
                await API.post("/policy", formData)

            alert(response.data);

            if (response.data.includes("Successfully")) {

                setPolicyName("");
                setPolicyType("");
                setCoverageAmount("");
                setPremiumAmount("");

            }

        } catch (error) {

            console.log(error);
            alert("Failed to Add Policy");

        }

    };

    return (

        <Layout>

            <div className="min-h-screen bg-slate-100 p-8">

                <div className="max-w-3xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                        {/* Header */}

                        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-8">

                            <h1 className="text-3xl font-bold">

                                Create Insurance Policy

                            </h1>

                            <p className="mt-2 text-blue-100">

                                Add a new insurance policy to the system.

                            </p>

                        </div>

                        {/* Form */}

                        <div className="p-8 space-y-6">

                            <div>

                                <label className="block mb-2 font-semibold text-gray-700">

                                    Policy Name

                                </label>

                                <input

                                    type="text"

                                    value={policyName}

                                    onChange={(e) =>
                                        setPolicyName(e.target.value)
                                    }

                                    placeholder="Enter Policy Name"

                                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"

                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-gray-700">

                                    Policy Type

                                </label>

                                <select

                                    value={policyType}

                                    onChange={(e) =>
                                        setPolicyType(e.target.value)
                                    }

                                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"

                                >

                                    <option value="">

                                        Select Policy Type

                                    </option>

                                    <option>

                                        Life Insurance

                                    </option>

                                    <option>

                                        Health Insurance

                                    </option>

                                    <option>

                                        Vehicle Insurance

                                    </option>

                                    <option>

                                        Home Insurance

                                    </option>

                                    <option>

                                        Travel Insurance

                                    </option>

                                </select>

                            </div>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div>

                                    <label className="block mb-2 font-semibold text-gray-700">

                                        Coverage Amount

                                    </label>

                                    <input

                                        type="number"

                                        min="1"

                                        value={coverageAmount}

                                        onChange={(e) =>
                                            setCoverageAmount(e.target.value)
                                        }

                                        placeholder="₹ Coverage"

                                        className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"

                                    />

                                </div>

                                <div>

                                    <label className="block mb-2 font-semibold text-gray-700">

                                        Premium Amount

                                    </label>

                                    <input

                                        type="number"

                                        min="1"

                                        value={premiumAmount}

                                        onChange={(e) =>
                                            setPremiumAmount(e.target.value)
                                        }

                                        placeholder="₹ Premium"

                                        className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"

                                    />

                                </div>

                                <div className="border rounded-2xl p-6 bg-slate-50">

    <h2 className="text-xl font-bold mb-4">

        <GrDocumentPdf size={30} />
         Signum AI Extractor

    </h2>

    <input

        type="file"

        accept=".pdf"

        onChange={(e) =>
            setPolicyPdf(e.target.files[0])
        }

    />

    <button

        onClick={analyzePolicy}

        disabled={loadingAI}

        className="mt-5 bg-indigo-700 text-white px-6 py-3 rounded-xl hover:bg-indigo-800"

    >

        {

            loadingAI ?

            "Analyzing Policy..."

            :

            "Analyze using Signum AI"

        }

    </button>

</div>
{

plainSummary && (

<div className="bg-green-50 border rounded-2xl p-6">

    <h2 className="text-2xl font-bold mb-4">

        AI Extracted Information

    </h2>

    <p>

        <b>Eligibility :</b>

        {eligibility}

    </p>

    <p>

        <b>Waiting Period :</b>

        {waitingPeriod}

    </p>

    <p>

        <b>Risk Level :</b>

        {riskLevel}

    </p>

    <p className="mt-3">

        <b>Summary</b>

    </p>

    <p>

        {plainSummary}

    </p>

</div>

)}

                            </div>

                            <button

                                onClick={addPolicy}

                                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-lg font-semibold transition"

                            >

                                Create Policy

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Policy;