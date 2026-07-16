function AdvisorQuestions({questions,onAnswer}){

    if(!questions.length){

        return null;

    }

    return(

        <div className="space-y-5">

            {

                questions.map((q,index)=>(

                    <div key={index}>

                        <p className="font-semibold mb-2">

                            {q.question}

                        </p>

                        <input

                            className="w-full border rounded-lg p-3"

                            placeholder="Your Answer"

                            onBlur={(e)=>onAnswer(index,e.target.value)}

                        />

                    </div>

                ))

            }

        </div>

    );

}

export default AdvisorQuestions;