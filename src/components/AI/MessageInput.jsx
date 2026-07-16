import { useState } from "react";

function MessageInput({ onSend }) {

    const [text, setText] = useState("");

    const send = () => {

        if (!text.trim()) return;

        onSend(text);

        setText("");

    };

    return (

        <div className="flex gap-3 border-t p-4">

            <input

                className="flex-1 border rounded-xl px-4 py-3"

                placeholder="Ask anything..."

                value={text}

                onChange={(e) =>
                    setText(e.target.value)
                }

                onKeyDown={(e) => {

                    if (e.key === "Enter")
                        send();

                }}

            />

            <button

                onClick={send}

                className="bg-blue-600 text-white px-6 rounded-xl"

            >

                Send

            </button>

        </div>

    );

}

export default MessageInput;