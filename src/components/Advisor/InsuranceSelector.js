import {
    FaHeartbeat,
    FaCar,
    FaHome,
    FaUserShield
} from "react-icons/fa";

function InsuranceSelector({ selectType }) {

    const cards = [

        {
            title: "Health",
            icon: <FaHeartbeat size={38}/>,
            color: "bg-red-100 text-red-600"
        },

        {
            title: "Vehicle",
            icon: <FaCar size={38}/>,
            color: "bg-blue-100 text-blue-600"
        },

        {
            title: "Life",
            icon: <FaUserShield size={38}/>,
            color: "bg-green-100 text-green-600"
        },

        {
            title: "Home",
            icon: <FaHome size={38}/>,
            color: "bg-orange-100 text-orange-600"
        }

    ];

    return (

        <div className="p-6">

            <h2 className="text-2xl font-bold mb-2">

                👋 Welcome to Signum Advisor

            </h2>

            <p className="text-gray-500 mb-8">

                Let's find the best insurance for you.

            </p>

            <div className="grid grid-cols-2 gap-5">

                {

                    cards.map(card => (

                        <button

                            key={card.title}

                            onClick={() =>
                                selectType(card.title)
                            }

                            className="border rounded-2xl p-6 hover:shadow-xl transition"

                        >

                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${card.color}`}>

                                {card.icon}

                            </div>

                            <h3 className="mt-4 font-bold">

                                {card.title}

                            </h3>

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default InsuranceSelector;