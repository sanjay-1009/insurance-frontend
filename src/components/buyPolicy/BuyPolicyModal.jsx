import API from "../../services/api";

function BuyPolicyModal({

    policy,

    closeModal,

    refresh

}) {

    if (!policy) return null;

    const buyPolicy = async () => {

        try {

            const formData = new URLSearchParams();

            formData.append(

                "userId",

                localStorage.getItem("userId")

            );

            formData.append(

                "policyId",

                policy.policyId

            );

            formData.append(

                "premium",

                policy.premiumAmount

            );

            formData.append(

                "maturityAmount",

                policy.coverageAmount

            );

            const response = await API.post(

                "/buyPolicy",

                formData

            );

            if (

                response.data.status ===

                "SUCCESS"

            ) {

                alert(

                    "Policy Purchased Successfully"

                );

                refresh();

                closeModal();

            }

            else {

                alert(

                    "Unable to Buy Policy"

                );

            }

        }

        catch (error) {

            console.log(error);

            alert(

                "Server Error"

            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-white rounded-3xl w-[550px] p-8 shadow-2xl">

                <h2 className="text-3xl font-bold text-blue-700">

                    Buy Policy

                </h2>

                <hr className="my-5"/>

                <div className="space-y-4">

                    <div className="flex justify-between">

                        <span>

                            Policy Name

                        </span>

                        <strong>

                            {policy.policyName}

                        </strong>

                    </div>

                    <div className="flex justify-between">

                        <span>

                            Policy Type

                        </span>

                        <strong>

                            {policy.policyType}

                        </strong>

                    </div>

                    <div className="flex justify-between">

                        <span>

                            Coverage

                        </span>

                        <strong>

                            ₹{policy.coverageAmount}

                        </strong>

                    </div>

                    <div className="flex justify-between">

                        <span>

                            Premium

                        </span>

                        <strong>

                            ₹{policy.premiumAmount}

                        </strong>

                    </div>

                    <div className="flex justify-between">

                        <span>

                            Duration

                        </span>

                        <strong>

                            1 Year

                        </strong>

                    </div>

                    <div className="flex justify-between">

                        <span>

                            Maturity Amount

                        </span>

                        <strong>

                            ₹{policy.coverageAmount}

                        </strong>

                    </div>

                </div>

                <div className="mt-8">

    <button
        onClick={closeModal}
        className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition"
    >
        Close
    </button>

</div>

            </div>

        </div>

    );

}

export default BuyPolicyModal;