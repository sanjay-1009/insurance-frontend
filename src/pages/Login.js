import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/home/Navbar";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async () => {

        try {

            const formData = new URLSearchParams();

            formData.append("username", username);
            formData.append("password", password);

            const response = await API.post(
                "/login",
                formData
            );

            console.log(response.data);

            if (response.data.status === "SUCCESS") {

                localStorage.setItem(
                    "userId",
                    response.data.userId
                );

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "role",
                    response.data.role
                );

                localStorage.setItem(
                    "username",
                    username
                );

                alert("Login Successful");

                navigate("/dashboard");

            } else {

                alert("Invalid Username or Password");

            }

        } catch (error) {

            console.log(error);

            alert("Login Failed");

        }

    };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">

                <div className="w-full max-w-md">

                    <div className="bg-white rounded-3xl shadow-2xl p-10">

                        <div className="text-center mb-8">

                            <div className="text-6xl mb-4">
                                🛡️
                            </div>

                            <h1 className="text-3xl font-bold text-slate-800">
                                Insurance Claim System
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Login to your account
                            </p>

                        </div>

                        <div className="space-y-4">

                            <input
                                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />

                            <input
                                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <button
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition"
                                onClick={login}
                            >
                                Login
                            </button>

                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500">

                            Don't have an account?

                            <a
                                href="/register"
                                className="text-blue-700 font-semibold ml-2"
                            >
                                Register
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Login;