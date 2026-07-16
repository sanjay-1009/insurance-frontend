import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import FloatingAI from "../components/AI/FloatingAI";

import Layout from "../components/layout/Layout";

function Dashboard() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    const [stats, setStats] = useState({
        totalPolicies: 0,
        totalClaims: 0,
        approvedClaims: 0,
        rejectedClaims: 0,
        pendingClaims: 0
    });

    const [policies,setPolicies]=useState([]);

    useEffect(() => {

        if(role === "ADMIN"){

            loadStats();

        }else{

            loadPolicy();

        }

    }, []);

    // ---------------- ADMIN ----------------

    const loadStats = async () => {

        try{

            const response =
                await API.get("/dashboard");

            setStats(response.data);

        }catch(error){

            console.log(error);

        }

    };

    // ---------------- USER ----------------

    const loadPolicy = async () => {

        try{

            const response =
                await API.get(
                    "/myPolicy?userId=" + userId
                );

            setPolicies(response.data);

        }catch(error){

            console.log(error);

        }

    };

    return (

<Layout>

<div className="min-h-screen bg-slate-100">

{/* HEADER */}

<div className="bg-slate-900 text-white shadow">

<div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

<div>

<h1 className="text-3xl font-bold">

Insurance Claim Processing System

</h1>

<p className="text-gray-300">

Welcome, {username}

</p>

</div>

<div>

<span className="bg-blue-600 px-5 py-2 rounded-full">

{role}

</span>

</div>

</div>

</div>

{/* ========================= ADMIN ========================= */}

{

role === "ADMIN" && (

<>

<div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

<div className="bg-white rounded-xl shadow-lg p-6">

<p className="text-gray-500">

Policies

</p>

<h2 className="text-4xl font-bold text-blue-600">

{stats.totalPolicies}

</h2>

</div>

<div className="bg-white rounded-xl shadow-lg p-6">

<p className="text-gray-500">

Claims

</p>

<h2 className="text-4xl font-bold text-indigo-600">

{stats.totalClaims}

</h2>

</div>

<div className="bg-white rounded-xl shadow-lg p-6">

<p className="text-gray-500">

Approved

</p>

<h2 className="text-4xl font-bold text-green-600">

{stats.approvedClaims}

</h2>

</div>

<div className="bg-white rounded-xl shadow-lg p-6">

<p className="text-gray-500">

Pending

</p>

<h2 className="text-4xl font-bold text-yellow-500">

{stats.pendingClaims}

</h2>

</div>

<div className="bg-white rounded-xl shadow-lg p-6">

<p className="text-gray-500">

Rejected

</p>

<h2 className="text-4xl font-bold text-red-600">

{stats.rejectedClaims}

</h2>

</div>

</div>

<div className="max-w-7xl mx-auto mt-10">

<h2 className="text-2xl font-bold mb-6">

Quick Actions

</h2>



<div className="grid md:grid-cols-3 gap-6">

<div
className="bg-blue-600 text-white rounded-xl p-8 cursor-pointer hover:scale-105 transition"
onClick={()=>navigate("/policy")}
>

<h3 className="text-xl font-bold">

Add Policy

</h3>

<p className="mt-2">

Create new insurance policies.

</p>

</div>

<div
className="bg-yellow-500 text-white rounded-xl p-8 cursor-pointer hover:scale-105 transition"
onClick={()=>navigate("/approval")}
>

<h3 className="text-xl font-bold">

Approve Claims

</h3>

<p className="mt-2">

Review submitted claims.

</p>

</div>

<div
className="bg-purple-600 text-white rounded-xl p-8 cursor-pointer hover:scale-105 transition"
onClick={()=>navigate("/reports")}
>

<h3 className="text-xl font-bold">

Reports

</h3>

<p className="mt-2">

View analytics & reports.

</p>

</div>

</div>

</div>

</>

)

}

{/* ========================= USER ========================= */}



{role === "USER" && (

<div className="max-w-7xl mx-auto mt-10">

<h2 className="text-3xl font-bold mb-8">

My Policies

</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

{policies.map((policy,index)=>(

<div
key={index}
className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">

<div className="flex justify-between items-center mb-5">

<h2 className="text-2xl font-bold text-blue-700">

{policy.policyName}

</h2>

<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

{policy.policyType}

</span>

</div>

<div className="space-y-3">

<div className="flex justify-between">

<span className="text-gray-500">

Premium Paid

</span>

<span className="font-semibold text-blue-600">

₹ {policy.premiumPaid}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

Maturity Amount

</span>

<span className="font-semibold text-green-600">

₹ {policy.maturityAmount}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

Start Date

</span>

<span>

{policy.startDate}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

End Date

</span>

<span>

{policy.endDate}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

Days Left

</span>

<span className="text-orange-500 font-bold">

{policy.daysLeft} Days

</span>

</div>

</div>

</div>

))}

</div>

{/* Quick Actions */}

<div className="mt-12">

<h2 className="text-2xl font-bold mb-6">

Quick Actions

</h2>

<div className="mt-12">

<FloatingAI />

</div>

<div className="grid md:grid-cols-3 gap-6">

<div
className="bg-blue-600 text-white rounded-xl p-8 cursor-pointer hover:scale-105 transition"
onClick={()=>navigate("/policies")}
>

<h3 className="text-xl font-bold">

My Policies

</h3>

<p className="mt-2">

View all enrolled policies.

</p>

</div>

<div
className="bg-green-600 text-white rounded-xl p-8 cursor-pointer hover:scale-105 transition"
onClick={()=>navigate("/claim")}
>

<h3 className="text-xl font-bold">

Submit Claim

</h3>

<p className="mt-2">

Raise a new insurance claim.

</p>

</div>

<div
className="bg-slate-700 text-white rounded-xl p-8 cursor-pointer hover:scale-105 transition"
onClick={()=>navigate("/myclaims")}
>

<h3 className="text-xl font-bold">

Track Claims

</h3>

<p className="mt-2">

View claim approval status.

</p>

</div>

</div>

</div>

</div>

)}



</div>

</Layout>

    );

}

export default Dashboard;