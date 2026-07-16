import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/home/Navbar";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState("");

    const [showOTP, setShowOTP] = useState(false);

    const sendOTP = async () => {

        try {

            const formData = new URLSearchParams();

            formData.append("username", username);
            formData.append("password", password);
            formData.append("phone", phone);
            formData.append("email", email);

            const response = await API.post(
                "/register",
                formData
            );

            if (response.data.status === "OTP_SENT") {

                alert("OTP sent to your email.");

                setShowOTP(true);

            } else {

                alert(response.data.message);

            }

        } catch (error) {

            console.log(error);

            alert("Unable to send OTP");

        }

    };

    const verifyOTP = async () => {

        try {

            const formData = new URLSearchParams();

            formData.append("username", username);
            formData.append("password", password);
            formData.append("phone", phone);
            formData.append("email", email);
            formData.append("otp", otp);

            const response = await API.post(
                "/verifyRegisterOTP",
                formData
            );

            if (response.data.status === "SUCCESS") {

                alert("Registration Successful");

                navigate("/login");

            } else {

                alert("Invalid OTP");

            }

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

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

                                Create Account

                            </h1>

                            <p className="text-gray-500 mt-2">

                                Register to Signum Insurance

                            </p>

                        </div>

                        <div className="space-y-4">

                            <input
                                className="w-full border rounded-xl p-3"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />

                            <input
                                className="w-full border rounded-xl p-3"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <input
                                className="w-full border rounded-xl p-3"
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                            />

                            <input
                                className="w-full border rounded-xl p-3"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            {

                                !showOTP &&

                                <button

                                    onClick={sendOTP}

                                    className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"

                                >

                                    Send OTP

                                </button>

                            }

                            {

                                showOTP &&

                                <>

                                    <div className="bg-green-100 text-green-700 p-3 rounded-xl text-center">

                                        OTP has been sent to your email.

                                    </div>

                                    <input

                                        className="w-full border rounded-xl p-3"

                                        placeholder="Enter OTP"

                                        value={otp}

                                        onChange={(e) =>
                                            setOtp(e.target.value)
                                        }

                                    />

                                    <button

                                        onClick={verifyOTP}

                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"

                                    >

                                        Verify OTP & Register

                                    </button>

                                </>

                            }

                        </div>

                        <div className="text-center mt-8">

                            Already have an account?

                            <Link

                                to="/login"

                                className="text-blue-700 font-semibold ml-2"

                            >

                                Login

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Register;