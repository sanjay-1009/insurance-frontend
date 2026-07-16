import { useState } from "react";
import axios from "axios";

function AIChat() {

    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        if(message.trim()==="") return;

        setLoading(true);

        try{

            const res = await axios.post(
                "https://signum-ai-service.onrender.com/ai/chat",
                message,
                {
                    headers:{
                        "Content-Type":"text/plain"
                    }
                }
            );

            setResponse(res.data);

        }catch(e){

            console.log(e);

            setResponse("AI Server not responding.");

        }

        setLoading(false);

    };

    return(

<div className="bg-white rounded-2xl shadow-xl p-6">

<h2 className="text-2xl font-bold mb-5">

🤖 Signum AI Assistant

</h2>

<textarea

rows="4"

className="w-full border rounded-xl p-4"

placeholder="Ask anything about insurance..."

value={message}

onChange={(e)=>setMessage(e.target.value)}

/>

<button

onClick={askAI}

className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3"

>

Ask AI

</button>

<div className="mt-6">

{

loading ?

<p>Thinking...</p>

:

<p className="whitespace-pre-wrap">

{response}

</p>

}

</div>

</div>

    );

}

export default AIChat;