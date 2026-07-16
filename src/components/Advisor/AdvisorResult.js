function AdvisorResult({result}){

    if(!result){

        return null;

    }

    return(

        <div className="bg-green-50 rounded-xl p-5 mt-5">

            <h2 className="font-bold text-xl text-green-700">

                Recommended Policy

            </h2>

            <hr className="my-3"/>

            <p>

                <b>Name :</b> {result.policyName}

            </p>

            <p>

                <b>Coverage :</b> ₹ {result.coverage}

            </p>

            <p>

                <b>Premium :</b> ₹ {result.premium}

            </p>

            <p className="mt-3 text-gray-700">

                {result.reason}

            </p>

        </div>

    );

}

export default AdvisorResult;