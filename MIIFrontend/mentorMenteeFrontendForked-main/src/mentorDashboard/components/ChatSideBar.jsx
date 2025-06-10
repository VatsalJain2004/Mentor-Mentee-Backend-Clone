import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const ChatSidebar = ({ users, onSelectUser }) => {
  return (
    <div className="h-[874.81px] w-[462px] max-w-[462px] gap-[10px] p-[10px] ]">
        <div className="h-[58px] w-[442px]  border-b-[2px] pb-[10px] gap-[12.8px] border-[#A01212] pl-[20px] ">
      <h2 className="h-[48px] w-[286px] text-center border-b-[1.28px] text-[30px] pl-[100px] text-[#A01212] font-bold">Chat Section</h2></div>


      {/* Search Box */}
      <div className="flex h-[35px] w-[442px] gap-[10px] pt-[10px] pl-[10px]" >
      <div className="  flex h-[35px] w-[321px] rounded-[10px] gap-[8px] bg-[#A01212] pt-[10px] pr-[10px] pb-[10px] pl-[18px]">
      <FiSearch className="text-white size-[15px]"/>
        <input
          type="text"
          placeholder="Enter enrollment number"
          className="w-[180px] h-[18px] text-white text-[15px] bg-[#A01212] pl-[8px] border-none"
        />
        </div>
        <div className="h-[35px] w-[106px] rounded-[10px] gap-[15px] bg-[#A01212] pt-[5px] pr-[20px] pb-[10px] pl-[20px]">
        <button className="w-[66px] h-[23px] text-white text-[17px] bg-[#A01212] ">Search</button>
        </div>
      </div>
      {/* User List */}
      {users.map((user, index) => (
        <div className="h-[70px] w-[442px] gap-[10px] pt-[20px] mb-[1rem] pl-[10px]">
        <div
          key={index}
          className=" h-[70px] w-[442px] pt-[10px] pr-[15px] pb-[10px]   pl-[15px] bg-[#A01212] gap-[4.55px] drop-shadow-[0px_1.82px_1.82px_rgba(0,0,0,0.5)]
 cursor-pointer hover:bg-red-600 flex items-center"
          onClick={() => onSelectUser(user)}
        >
            <div className="h-[50px] w-[412px] gap-[15px] flex">
          <FaUserCircle className="text-white size-[44px] pt-[2px]" />
          <div className="h-[48.37060546875px] w-[347px] flex-col justify-between pt-[2.5px] pb-[2.5px]">
            <div className="h-[22px] w-[110px] text-[18px] font-bold  text-white">
            Name : {user.name}</div>
            <p className="h-[15px] w-[347px] gap-[5.46px] text-[12px] text-[#FFFFFF] pt-[3px]">Scholar no.: {user.scholarNo}</p>
          </div>
          </div>
        </div>
        </div>

      ))}
    </div>
  );
};

export default ChatSidebar;