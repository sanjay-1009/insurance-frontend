import AdvisorWindow from "./AdvisorWindow";

function FloatingAdvisor({ close }) {

    return (

        <>

            {/* Dark Background */}

            <div

                onClick={close}

                className="fixed inset-0 bg-black/30 z-40"

            ></div>

            {/* Sliding Panel */}

            <div

                className="
                    fixed
                    top-0
                    right-0
                    h-screen
                    w-[500px]
                    bg-white
                    shadow-2xl
                    z-50
                    flex
                    flex-col
                    animate-slideLeft
                "

            >

                <div className="flex justify-between items-center px-6 py-4 border-b">

                    <div>

                        <h2 className="text-2xl font-bold text-blue-700">

                            🤖 Signum Advisor

                        </h2>

                        <p className="text-sm text-gray-500">

                            AI Powered Policy Recommendation

                        </p>

                    </div>

                    <button

                        onClick={close}

                        className="text-3xl text-gray-500 hover:text-red-600"

                    >

                        ×

                    </button>

                </div>

                <div className="flex-1 overflow-auto">

                    <AdvisorWindow />

                </div>

            </div>

        </>

    );

}

export default FloatingAdvisor;