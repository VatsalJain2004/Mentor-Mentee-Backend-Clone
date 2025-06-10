import React, { useState } from "react";
import ChatSidebar from "../components/ChatSideBar";
import ChatBox from "../components/ChatBox";

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);


  // Dummy User List
  const users = Array(9).fill({
    id: Math.random(),
    name: "xyz",
    scholarNo: "XXXXXXX",
  });

  return (
    <div className="h-[954.81px] w-[1250px] pt-[40px] pb-[40px] gap-[25px] pl-[30px]">
    <div className="h-[874.81px] w-[1250px] gap-[25px] flex shadow-[inset_0px_4.21px_4.21px_#00000040] bg-[#F3F3F3]">
      {/* Sidebar */}
      <ChatSidebar users={users} onSelectUser={setSelectedUser} />

      {/* Chat Box */}
      {selectedUser && <ChatBox user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
    </div>
  );
};

export default ChatApp;