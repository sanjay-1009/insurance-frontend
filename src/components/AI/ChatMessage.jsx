function ChatMessage({ message }) {

    const isUser = message.role === "user";

    return (

        <div
            className={`flex mb-4 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >

            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                }`}
            >

                <div className="space-y-2">
  {message.text.split("\n").map((line, index) => (
    <p key={index}>{line}</p>
  ))}
</div>

            </div>

        </div>

    );

}

export default ChatMessage;