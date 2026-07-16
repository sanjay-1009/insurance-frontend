import { useState } from "react";
import API from "../../services/api";

function AdvisorWindow() {

    const [insuranceType, setInsuranceType] = useState("");

    const [questionOrder, setQuestionOrder] = useState(1);

    const [currentQuestion, setCurrentQuestion] = useState(null);

    const [answer, setAnswer] = useState("");

    const [answers, setAnswers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [recommendation, setRecommendation] = useState(null);

    //---------------------------------------------------------
    // Load First Question
    //---------------------------------------------------------

    const loadQuestions = async (type) => {

        try {

            setLoading(true);

            setInsuranceType(type);

            setRecommendation(null);

            setAnswers([]);

            setQuestionOrder(1);

            setAnswer("");

            const response = await API.get(
                "/advisorNextQuestion",
                {
                    params: {
                        insuranceType: type,
                        questionOrder: 1
                    }
                }
            );

            console.log(response.data);

            setCurrentQuestion(response.data);

        }
        catch (err) {

            console.log(err);

            alert("Unable to load questions.");

        }
        finally {

            setLoading(false);

        }

    };

    //---------------------------------------------------------
    // Next Question
    //---------------------------------------------------------

    const nextQuestion = async () => {

        if (answer === "") {

            alert("Please answer the question.");

            return;

        }

        const updatedAnswers = [

            ...answers,

            {

                questionId: currentQuestion.questionId,

                question: currentQuestion.question,

                answer: answer

            }

        ];

        setAnswers(updatedAnswers);

        setAnswer("");

        try {

            setLoading(true);

            const nextOrder = questionOrder + 1;

            const response = await API.get(
                "/advisorNextQuestion",
                {
                    params: {
                        insuranceType,
                        questionOrder: nextOrder
                    }
                }
            );

            console.log(response.data);

            if (response.data.finished) {

                const aiResponse = await API.post(
                    "/advisorRecommend",
                    {
                        insuranceType,
                        answers: updatedAnswers,
                        userId: Number(localStorage.getItem("userId"))
                    }
                );

                setRecommendation(aiResponse.data);

            }
            else {

                setCurrentQuestion(response.data);

                setQuestionOrder(nextOrder);

            }

        }
        catch (err) {

            console.log(err);

            alert("Recommendation failed.");

        }
        finally {

            setLoading(false);

        }

    };

    //---------------------------------------------------------
    // Restart
    //---------------------------------------------------------

    const restart = () => {

        setInsuranceType("");

        setQuestionOrder(1);

        setCurrentQuestion(null);

        setAnswer("");

        setAnswers([]);

        setRecommendation(null);

    };

    //---------------------------------------------------------

    return (

        <div className="h-[650px] flex flex-col">

            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-5">

                <h2 className="text-xl font-bold">

                    Signum AI Advisor

                </h2>

                <p className="text-sm">

                    Compare Policies using AI

                </p>

            </div>

            <div className="flex-1 overflow-auto p-5 bg-slate-50">

                {/* Select Insurance */}

                {

                    insuranceType === "" && (

                        <div>

                            <h2 className="text-xl font-bold mb-6">

                                Select Insurance Type

                            </h2>

                            <div className="grid grid-cols-2 gap-4">

                                <button

                                    onClick={() => loadQuestions("Health")}

                                    className="bg-white rounded-xl shadow p-5 hover:bg-green-100"

                                >

                                    ❤️<br/>

                                    Health

                                </button>

                                <button

                                    onClick={() => loadQuestions("Vehicle")}

                                    className="bg-white rounded-xl shadow p-5 hover:bg-blue-100"

                                >

                                    🚗<br/>

                                    Vehicle

                                </button>

                                <button

                                    onClick={() => loadQuestions("Life")}

                                    className="bg-white rounded-xl shadow p-5 hover:bg-purple-100"

                                >

                                    👨<br/>

                                    Life

                                </button>

                                <button

                                    onClick={() => loadQuestions("Home")}

                                    className="bg-white rounded-xl shadow p-5 hover:bg-orange-100"

                                >

                                    🏠<br/>

                                    Home

                                </button>

                            </div>

                        </div>

                    )

                }

                {

                    loading &&

                    <div className="text-center mt-10">

                        Loading...

                    </div>

                }

                {

                    currentQuestion &&
                    !loading &&
                    !recommendation && (

                        <div className="bg-white rounded-xl shadow p-6">

                            <p className="text-sm text-gray-500">

                                Question {questionOrder}

                            </p>

                            <h2 className="text-xl font-bold mt-3 mb-1">

                                {currentQuestion.question}

                            </h2>

                            <p className="text-xs text-gray-400 mb-5">

                                Type : {currentQuestion.inputType}

                            </p>

                            {/* TEXT */}

                            {

                                currentQuestion.inputType?.toLowerCase() === "text" && (

                                    <input

                                        value={answer}

                                        onChange={(e)=>setAnswer(e.target.value)}

                                        className="w-full border rounded-xl p-3"

                                        placeholder="Enter answer"

                                    />

                                )

                            }

                            {/* NUMBER */}

                            {

                                currentQuestion.inputType?.toLowerCase() === "number" && (

                                    <input

                                        type="number"

                                        value={answer}

                                        onChange={(e)=>setAnswer(e.target.value)}

                                        className="w-full border rounded-xl p-3"

                                        placeholder="Enter number"

                                    />

                                )

                            }

                            {/* BUTTONS */}

                            {

                                currentQuestion.inputType?.toLowerCase() === "buttons" && (

                                    <div className="grid grid-cols-2 gap-3">

                                        {

                                            currentQuestion.options?.split(",")

                                            .map((option,index)=>(

                                                <button

                                                    key={index}

                                                    onClick={()=>setAnswer(option)}

                                                    className={

                                                        answer===option

                                                        ?

                                                        "bg-green-600 text-white rounded-xl p-3"

                                                        :

                                                        "border rounded-xl p-3 hover:bg-green-50"

                                                    }

                                                >

                                                    {option}

                                                </button>

                                            ))

                                        }

                                    </div>

                                )

                            }

                            {/* DROPDOWN */}

                            {

                                currentQuestion.inputType?.toLowerCase() === "dropdown" && (

                                    <select

                                        value={answer}

                                        onChange={(e)=>setAnswer(e.target.value)}

                                        className="w-full border rounded-xl p-3"

                                    >

                                        <option value="">

                                            Select Option

                                        </option>

                                        {

                                            currentQuestion.options?.split(",")

                                            .map((option,index)=>(

                                                <option

                                                    key={index}

                                                    value={option}

                                                >

                                                    {option}

                                                </option>

                                            ))

                                        }

                                    </select>

                                )

                            }

                            <button

                                onClick={nextQuestion}

                                className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl"

                            >

                                Next

                            </button>

                        </div>

                    )

                }

                {

                    recommendation && (

                        <div className="bg-white rounded-xl shadow p-6">

                            <h2 className="text-2xl font-bold text-green-700 mb-5">

                                Recommended Policy

                            </h2>

                            <div className="whitespace-pre-wrap">

                                {

                                    typeof recommendation === "string"

                                    ?

                                    recommendation

                                    :

                                    recommendation.reply

                                }

                            </div>

                            <button

                                onClick={restart}

                                className="mt-8 w-full bg-blue-600 text-white rounded-xl py-3"

                            >

                                Compare Another Policy

                            </button>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default AdvisorWindow;