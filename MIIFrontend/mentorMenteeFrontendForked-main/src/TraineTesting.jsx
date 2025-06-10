import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import Sidebar from "./menteeDashboard/components/Sidebar";
import Header from "./menteeDashboard/components/Header";
import Testing from "./Testing";

const TraineTesting = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth>=640);
  const userRole = "Mentee"; // Example user data
  const userName = "John Doe";
  const userDepartment = "IT";
  const userScholarNo = "12345";

  return (
    <div className="menteeContainer h-full w-full bg-[var(--primary-color)] flex flex-col">
      <div className="h-[6.5%] min-h-[65px]">
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          name={userName}
          department={userDepartment}
          scholarNo={userScholarNo}
        />
      </div>
      <div className="flex h-[93.5%]">
        <Sidebar showSidebar={showSidebar}/>
        <div className="flex grow bg-white overflow-auto border-t-8 border-[var(--primary-color)]">
            <Testing />
        </div>
        
      </div>
    </div>
  );
};

export default TraineTesting;
