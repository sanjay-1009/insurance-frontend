function Topbar() {

    const username = localStorage.getItem("username");

    return (

        <div className="bg-white shadow px-8 py-3 flex justify-between items-center">

            <div>

                <h2 className="text-3xl font-bold">

                    Dashboard

                </h2>

                <p className="text-gray-500">

                    Welcome back, {username}

                </p>

            </div>

            <div className="flex items-center gap-4">

                <button className="bg-blue-100 rounded-full w-12 h-12">

                    🔔

                </button>

                <button className="bg-green-100 rounded-full w-12 h-12">

                    👤

                </button>

            </div>

        </div>

    );

}

export default Topbar;