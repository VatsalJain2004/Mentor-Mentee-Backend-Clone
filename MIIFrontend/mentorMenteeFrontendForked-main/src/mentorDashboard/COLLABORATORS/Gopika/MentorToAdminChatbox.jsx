"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";

const MentorToAdminChatbox = () => {
  const [messages, setMessages] = useState([
    { text: "Good Morning Sir.", sent: true },
    { text: "Good morning.", sent: false },
    { text: "What is the last date of course registration?", sent: true },
    { text: "It is 30 January.", sent: false },
    { text: "Thank You Sir.", sent: true },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Handle message send
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages((prev) => [...prev, { text: inputMessage, sent: true }]);
      setInputMessage("");
    }
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50">
      <div ref={chatRef} className="chat-container w-full bg-white rounded-lg overflow-hidden flex flex-col border-4 border-[#A0A0A0] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
        {/* Chat Bar */}
        <div className="bg-[#646464] text-white p-3 flex items-center justify-between">
          <span className="text-lg font-bold">CHAT</span>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="bg-[#a01212] text-white p-3 font-bold">Admin</div>

        {/* Chat Messages */}
        <div className="flex-1 p-2 sm:p-4 space-y-2 sm:space-y-4 overflow-y-auto max-h-[50vh] sm:max-h-[60vh] min-h-[300px] sm:min-h-[400px] bg-[#f0f0f0]">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] sm:max-w-[80%] break-words text-sm sm:text-base ${
                  message.sent ? "bg-gray-200 text-black" : "bg-white text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-2 sm:p-4 flex gap-2 bg-[#a01212]">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter your query"
            className="flex-1 px-3 py-1 sm:px-4 sm:py-2 border rounded-full text-sm sm:text-base focus:outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white transition-transform hover:scale-105"
            aria-label="Send message"
          >
            <Send className="w-6 h-6 text-[#a01212]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorToAdminChatbox;
