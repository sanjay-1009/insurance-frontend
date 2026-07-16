function HowItWorks() {

    const steps = [

        "Register",

        "Login",

        "Choose Policy",

        "Submit Claim",

        "Track Claim"

    ];

    return (

        <section className="bg-slate-100 py-20">

            <div className="max-w-6xl mx-auto">

                <h2 className="text-4xl font-bold text-center mb-12">

                    How It Works

                </h2>

                <div className="grid md:grid-cols-5 gap-6">

                    {

                        steps.map((step, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-8 text-center"
                            >

                                <div className="w-14 h-14 bg-blue-700 text-white rounded-full mx-auto flex items-center justify-center font-bold text-xl">

                                    {index + 1}

                                </div>

                                <h3 className="mt-5 font-bold">

                                    {step}

                                </h3>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default HowItWorks;