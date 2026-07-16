import {
    FaHeartbeat,
    FaCar,
    FaHome,
    FaUserShield
} from "react-icons/fa";

const types = [

    { icon: <FaHeartbeat />, name: "Health Insurance" },
    { icon: <FaCar />, name: "Vehicle Insurance" },
    { icon: <FaHome />, name: "Home Insurance" },
    { icon: <FaUserShield />, name: "Life Insurance" }

];

function InsuranceTypes() {

    return (

        <section className="py-20">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-12">

                    Insurance Services

                </h2>

                <div className="grid md:grid-cols-4 gap-6">

                    {

                        types.map((item, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:bg-blue-700 hover:text-white transition"
                            >

                                <div className="text-5xl mb-4 flex justify-center">

                                    {item.icon}

                                </div>

                                <h3 className="font-semibold">

                                    {item.name}

                                </h3>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default InsuranceTypes;