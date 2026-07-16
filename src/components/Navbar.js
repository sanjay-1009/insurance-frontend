import { Link } from "react-router-dom";

function Navbar() {

    const role =
        localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("token");

        window.location.href = "/";
    };

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container">

                <span className="navbar-brand">
                    Insurance Claim System
                </span>

                <div>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>

                    {role === "ADMIN" && (

                        <>
                            <Link
                                className="btn btn-outline-light me-2"
                                to="/policy"
                            >
                                Policy
                            </Link>

                            <Link
                                className="btn btn-outline-light me-2"
                                to="/approval"
                            >
                                Approval
                            </Link>

                            <Link
                                className="btn btn-outline-light me-2"
                                to="/reports"
                            >
                                Reports
                            </Link>
                        </>
                    )}

                    {role === "USER" && (

                        <Link
                            className="btn btn-outline-light me-2"
                            to="/claim"
                        >
                            Claim
                        </Link>
                    )}

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;