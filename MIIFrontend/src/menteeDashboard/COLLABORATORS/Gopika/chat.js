import { X, Send } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Good Morning Sir.", sent: true },
    { text: "Good morning.", sent: false },
    { text: "What is the last date of course registration?", sent: true },
    { text: "It is 30 January.", sent: false },
    { text: "Thank You Sir.", sent: true },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sent: true }]);
      setInputMessage("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50">
      <div
        className="w-full bg-white rounded-lg border-2 border-red-600 overflow-hidden flex flex-col
                      sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
      >
        {/* Header */}
        <div className="bg-gray-700 text-white p-2 sm:p-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold">CHAT</h1>
          <button className="hover:bg-gray-600 p-1 rounded">
            <X className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Messages Container */}
        <div
          className="flex-1 p-2 sm:p-4 space-y-2 sm:space-y-4 overflow-y-auto 
                        max-h-[50vh] sm:max-h-[60vh] min-h-[300px] sm:min-h-[400px]"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sent ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] sm:max-w-[80%] break-words text-sm sm:text-base
                  ${
                    message.sent
                      ? "bg-gray-200 text-black"
                      : "bg-gray-700 text-white"
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="border-t-2 border-red-600 p-2 sm:p-4 flex gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter your query"
            className="flex-1 px-3 py-1 sm:px-4 sm:py-2 border rounded-full text-sm sm:text-base focus:outline-none focus:border-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
          >
            <Send className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
