import {
    FaRobot,
    FaLock,
    FaChartLine,
    FaFileSignature
} from "react-icons/fa";

const features = [

    {
        icon: <FaRobot size={35} />,
        title: "AI Assistant",
        desc: "Ask questions about policies and claims."
    },

    {
        icon: <FaFileSignature size={35} />,
        title: "Easy Claims",
        desc: "Submit insurance claims in minutes."
    },

    {
        icon: <FaChartLine size={35} />,
        title: "Track Claims",
        desc: "View claim status instantly."
    },

    {
        icon: <FaLock size={35} />,
        title: "Secure",
        desc: "Protected using secure authentication."
    }

];

function Features() {

    return (

        <section className="py-20 bg-slate-100">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-12">

                    Why Choose Signum?

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {

                        features.map((feature, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition"
                            >

                                <div className="text-blue-700 mb-5 flex justify-center">

                                    {feature.icon}

                                </div>

                                <h3 className="font-bold text-xl">

                                    {feature.title}

                                </h3>

                                <p className="text-gray-500 mt-3">

                                    {feature.desc}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Features;