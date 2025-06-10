import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Information from "./screens/GeneralInformation";
import Profile from "./screens/MenteeProfile";
import Dashboard from "./screens/Dashboard";
import InternshipDetails from "./COLLABORATORS/Akhilesh/InternDetailsTest";
import SemesterWiseRecords from "./screens/SemesterWiseRecord";
import SemesterDetail from "./components/semesterWiseRecords/SemesterDetail";
import MentorProfile from "./screens/MentorProfile";
import ChatBox from "./COLLABORATORS/Gopika/Chatbox";
import MinutesOfMeeting from "./COLLABORATORS/Suryansh/MinutesOfMeeting";
import IndisciplineRecord from "./COLLABORATORS/Vidhi/IndisciplineRecord";
import Documentation from "./COLLABORATORS/Jhanvi/documentation";
import RecordOfAbsence from "./COLLABORATORS/Jhanvi/RecordOfAbsence";
import ExaminationCleared from "./COLLABORATORS/Vidhi/ExaminationCleared";
import CoCurricularActivity from "./COLLABORATORS/Vidhi/CoCurricularActivity";
import { SemesterRecordsProvider } from "./context/SemesterRecordsContext";
import { useAuth } from "../context/AuthContext"; 

const MenteeLayout = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 640);
  const { userId, token, role } = useAuth(); // ✅ Get userId, token, and role
  

  const userName = "John Doe"; // You may fetch these from context or user profile API
  const userDepartment = "IT";
  const userScholarNo = "12345";

  return (
    <div className="menteeContainer h-full w-full bg-[var(--primary-color)] flex flex-col">
      <div className="h-[7%] min-h-[65px]">
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          name={userName}
          department={userDepartment}
          scholarNo={userScholarNo}
          userId={userId}
          token={token}
          role={role}
        />
      </div>
      <div className="flex h-[93%]">
        <Sidebar showSidebar={showSidebar} userId={userId} token={token} role={role} />
        <div className="flex grow bg-white overflow-auto border-t-8 border-[var(--primary-color)]">
          <SemesterRecordsProvider>
            <Routes>
              <Route index element={<Profile />} />
              <Route
                path="/semesterWiseRecords/semesterDetails/:value"
                element={<SemesterDetail />}
              />
              <Route path="minutesOfMeeting" element={<MinutesOfMeeting />} />
              <Route path="generalInformation" element={<Information />} />
              <Route path="mentorProfile" element={<MentorProfile />} />
              <Route path="internshipDetails" element={<InternshipDetails />} />
              <Route
                path="indisciplineRecord"
                element={<IndisciplineRecord />}
              />
              <Route
                path="examinationCleared"
                element={<ExaminationCleared />}
              />
              <Route
                path="coCurricularActivity"
                element={<CoCurricularActivity />}
              />
              <Route
                path="semesterWiseRecords"
                element={<SemesterWiseRecords />}
              />
              <Route path="dashboard" element={
                <Dashboard userId={userId} token={token} role={role} />
              } />
              <Route path="chatbox" element={<ChatBox />} />
              <Route path="documentation" element={<Documentation />} />
              <Route path="recordOfAbsence" element={<RecordOfAbsence />} />
              <Route path="*" element={<Navigate to="/mentee" replace />} />
            </Routes>
          </SemesterRecordsProvider>
        </div>
      </div>
    </div>
  );
};

export default MenteeLayout;
