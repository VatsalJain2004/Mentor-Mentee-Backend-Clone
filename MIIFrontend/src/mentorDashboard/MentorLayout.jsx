import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./screens/Dashboard";
import ScheduleMeeting from "./COLLABORATORS/Akhilesh/ScheduleMeeting";
import MentorToAdminChatbox from "./COLLABORATORS/Gopika/MentorToAdminChatbox";
import MentorToMentorCoordinatorChatbox from "./COLLABORATORS/Suryansh/MentorToMentorCoordinatorChatbox";
import MenteeRecord from "./COLLABORATORS/Vedanshi/menteelist";
import MenteeDetails from "./COLLABORATORS/Aayushi/MenteeDetails";
import AppointmentRequests from "./COLLABORATORS/Anurag/AppointmentRequest";

const MentorLayout = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 640);

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
              <Route path="schedulemeeting" element={<ScheduleMeeting />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="mentorToAdminChatbox" element={<MentorToAdminChatbox />} />
              <Route path="mentorToMentorCoordinatorChatbox" element={<MentorToMentorCoordinatorChatbox />} />
              <Route path="menteerecord" element={<MenteeRecord />} />
              <Route path="menteedetails" element={<MenteeDetails />} />
              <Route path="appointment" element={<AppointmentRequests />} />


              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MentorLayout;
