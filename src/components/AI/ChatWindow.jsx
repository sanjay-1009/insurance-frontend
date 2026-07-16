import { useState } from "react";
import API from "../../services/api";

import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import QuickQuestions from "./QuickQuestions";
import { VscRobot } from "react-icons/vsc";

function ChatWindow() {

    const username =
        localStorage.getItem("username");

    const [messages, setMessages] = useState([
        {
            role: "ai",
            text:
                "Hello " +
                username +
                " 👋\nHow can I help you today?"
        }
    ]);

    

    const askAI = async (question) => {

        const userMessage = {

            role: "user",

            text: question

        };

        setMessages((prev) => [

            ...prev,

            userMessage

        ]);

        try {

            const response =

                await API.post(

                    "https://signum-ai-service.onrender.com/ai/chat",

                    {

                        message: question,
                        userId: Number(localStorage.getItem("userId"))
                        

                    }

                );

            setMessages((prev) => [

                ...prev,

                {

                    role: "ai",

                    text: response.data.reply

                }

            ]);

        }

        catch {

            setMessages((prev) => [

                ...prev,

                {

                    role: "ai",

                    text:
                        "Unable to connect to AI."

                }

            ]);

        }

    };

    return (

        <div className="flex flex-col h-[600px]">

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-4 rounded-t-2xl flex justify-between items-center">

    <div>

        <h2 className="font-bold text-lg">

            <VscRobot size={30} />

             Signum AI Assistant

        </h2>

        <p className="text-xs text-blue-100">

            Online • AI Powered

        </p>

    </div>

    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

</div>

            <div className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4">

                <QuickQuestions ask={askAI} />

                {

                    messages.map((msg, index) => (

                        <ChatMessage

                            key={index}

                            message={msg}

                        />

                    ))

                }

            </div>

            <MessageInput

                onSend={askAI}

            />

        </div>

    );

}

export default ChatWindow;