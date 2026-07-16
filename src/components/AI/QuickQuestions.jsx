function QuickQuestions({ ask }) {

    const questions = [

        "Explain Health Insurance",

        "What is deductible?",

        "Claim submission process",

        "Vehicle insurance",

        "Travel insurance"

    ];

    return (

        <div className="flex flex-wrap gap-2 mb-4">

            {

                questions.map((q, index) => (

                    <button

                        key={index}

                        onClick={() => ask(q)}

                        className="bg-gray-100 hover:bg-blue-100 px-3 py-2 rounded-full text-sm"

                    >

                        {q}

                    </button>

                ))

            }

        </div>

    );

}

export default QuickQuestions;