import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const ChatBox = ({ user, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "user", text: "Good morning Sir" },
    { sender: "admin", text: "Good Morning " },
    { sender: "user", text: "What is the last date of course registration?" },
    { sender: "admin", text: "It is 30 January." },
    { sender: "user", text: "Thank You Sir." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="h-[874.8071899414062px] w-[788px] rounded-[16px] border-[8px]  border-[#A0A0A0] ">
    <div className=" bg-white flex flex-col rounded-t-[10px] h-[858.8071899414062px] w-[768px] ">
        <div>
        <div className="h-[38.400001525878906px] rounded-t-[10px] w-[772px] flex justify-between pr-[16px] pl-[16px] bg-[#646464]">
            <p className="h-[27px] w-[62px] text-[22px] font-bold text-white pt-[6px]">CHAT</p>
        <button onClick={onClose} className="text-white text-xl"><RxCross2 className="size-[30px]"/></button>
        </div>
      {/* Chat Header */}
      <div className="h-[70px] w-[772px] bg-[#A01212] text-white pt-[10px] pr-[15px] pb-[10px] pl-[15px] gap-[4.55px] flex justify-between items-center ">
        <div className="flex h-[50px] w-[742px] gap-[15px]" >
            <FaUserCircle className="text-white size-[44px] pt-[2px]" />
            <div className="pt-[2px]">
          <h3 className="h-[22px] w-[110px] text-[18px] font-bold  text-white"> Name : {user.name}</h3>
          <p className="h-[15px] w-[347px] gap-[5.46px] text-[12px] text-[#FFFFFF] pt-[6px]">Scholar no.: {user.scholarNo}</p>
        </div>
        </div>
        </div>
      </div>


      <div className="w-[772px] h-[377.9px]  pt-[4rem]  ">
      {/* Chat Messages */}
      <div className="w-[772px] h-[294px] gap-[11.2px] pr-[20px] pl-[20px] ">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2  w-[732px]  h-[44.79999923706055px] max-w-xs text-[14px] p-[14px] ${
              msg.sender === "user" ? "bg-[#D9D9D9] ml-auto rounded-t-[24px] h-[auto] w-[auto]  rounded-l-[24px] text-center " : "text-center w-[160px] h-[44.79999923706055px] bg-[#8C8C8C] rounded-[24px] "
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex justify-between p-[7.24px] bg-[#a01212] border-t h-[75.9047622680664px] w-[770px] mt-[34rem] rounded-b-[6px]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex pt-[21.71px] pb-[21.71px] pr-[28.95px] pl-[28.95px] gap-[14.48px] rounded-[21.71px] h-[55.42857360839844px] text-[15px] w-[698.2000122070312px]"
          placeholder="Enter your query"
        />
        <button onClick={sendMessage} className="ml-2 h-[46.32381057739258px] w-[46.32381057739258px] bg-white text-[#A01212] mr-[4px] mt-[2px]  rounded-[70px]">
        <IoIosSend size={37} className=" pl-[10px] text-[#A01212]"/>
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ChatBox;