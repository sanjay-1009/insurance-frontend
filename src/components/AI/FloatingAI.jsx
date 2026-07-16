import { useState } from "react";

import ChatWindow from "./ChatWindow";

import { AiFillWechatWork } from "react-icons/ai";

function FloatingAI() {

    const [open, setOpen] = useState(false);

    return (

        <>

            <button

                onClick={() =>
                    setOpen(!open)
                }

                className="fixed bottom-8 right-8 bg-blue-600 text-white w-16 h-16 rounded-full shadow-2xl text-3xl hover:scale-110 transition z-50"

            >
                <div className="w-full flex justify-center">
                <AiFillWechatWork  size={40}/>
                </div>
            </button>

            {

                open &&

                <div className="fixed bottom-28 right-8 w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50">

                    <ChatWindow />

                </div>

            }

        </>

    );

}

export default FloatingAI;