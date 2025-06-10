import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./screens/Dashboard";
import MinutesofMeeting from "./screens/minutesOfmeeting";
import MentorChatBox  from   "./screens/ChatAppMentor";
import MenteeChatBox  from   "./screens/ChatAppMentee";
import MenteeList  from   "./screens/menteelist";
import MentorList from "./COLLABORATORS/VIdhi/MentorList"
import MeetingStatus from "./screens/MeetingStatus";
import MOMMenteeList from "./COLLABORATORS/Vedanshi/MOMMenteeList";
import MOMMentorList from "./COLLABORATORS/Vedanshi/MOMMentorList";


const MentorCoordinatorLayout = () => {
  const [showSidebar, setShowSidebar] = useState(() => window.innerWidth >= 640);

  // Example user data
  const userRole = "Mentor";
  const userName = "John Doe";
  const userDepartment = "IT";
  const userScholarNo = "12345";

  return (
    <div className="menteeContainer h-full w-full bg-[var(--primary-color)] flex flex-col">
      {/* Header Section */}
      <div className="h-[7%] min-h-[65px]">
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          name={userName}
          department={userDepartment}
          scholarNo={userScholarNo}
        />
      </div>

      {/* Sidebar & Main Content */}
      <div className="flex h-[93%]">
        <Sidebar showSidebar={showSidebar} />
        <div className="flex grow bg-white overflow-auto border-t-8 border-[var(--primary-color)]">
          <main className="p-6 w-full">
            <Routes>
              {/* Default Route */}
              {/* <Route index element={<Profile />} /> */}

              {/* Routes for Components */}
              
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="minutesofmeeting" element={<MinutesofMeeting />} />
              <Route path="mentorchatbox" element={<MentorChatBox />} />
              <Route path="menteechatbox" element={<MenteeChatBox />} />
              <Route path="menteelist" element={<MenteeList />} />
              <Route path="mentorlist" element={<MentorList />} />
              <Route path="meetingstatus" element={<MeetingStatus />} />
              <Route path="mommenteelist" element={<MOMMenteeList />} />
              <Route path="mommentorlist" element={<MOMMentorList />} />

              {/* Fallback Route */}
              {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MentorCoordinatorLayout;
