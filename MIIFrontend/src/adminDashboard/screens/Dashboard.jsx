import React from "react";
import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Data for different dashboard sections
  const sections = [
    {
      title: "MENTOR COORDINATOR LIST",
      assigned: "10200 / 12000",
      link: "/admin/mentorcoordinatorlist",
    },
    {
      title: "MENTOR LIST",
      assigned: "8500 / 10000",
      link: "/admin/mentorList",
    },
    {
      title: "MENTEE LIST",
      assigned: "25000 / 30000",
      link: "/admin/menteeList",
    },
  ];

  // Chat section navigation options
  const chatOptions = [
    {
      text: "Mentor Coordinators",
      link: "/admin/mentorcoordinatorchat",
    },
    { text: "Mentors", link: "/admin/mentorchat" },
    { text: "Mentees", link: "/admin/menteechat" },
  ];

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center">
      {/* Main Layout: Profile & Lists */}
      <div className="w-full flex flex-col md:flex-row gap-8 max-w-9xl">
        {/* Profile Card */}
        <div className="bg-gray-200 rounded-xl shadow-lg p-10 min-h-[400px] flex flex-col items-center w-full md:w-2/6">
          {/* Profile Avatar */}
          <div className="w-40 h-40 mt-20 bg-gradient-to-r from-red-700 to-red-900 rounded-3xl flex items-center justify-center mb-8 shadow-lg">
            <User className="w-20 h-20 text-white" />
          </div>

          {/* Admin Details */}
          <h1 className="text-5xl font-inter font-bold text-red-800 text-center tracking-wide">
            NAME
          </h1>
          <p className="text-2xl text-red-800 font-medium mt-3">
            Admin ID: XC651A
          </p>

          {/* Manage Button */}
          <button className="w-full md:w-2/4 bg-red-800 text-white text-3xl font-semibold py-4 rounded-xl shadow-md mt-10 hover:bg-red-700 hover:scale-105 transition-all">
            Manage
          </button>
        </div>

        {/* Dashboard Lists Section */}
        <div className="w-full h-10vh md:w-5/7 flex flex-col gap-6">
          {sections.map(({ title, assigned, link }, index) => (
            <div
              key={index}
              className="bg-gray-200 p-8 rounded-xl shadow-md border border-gray-300"
            >
              {/* Header + View Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-4xl font-bold uppercase text-red-800">
                  {title}
                </h3>
                <button
                  onClick={() => navigate(link)}
                  className="text-lg text-gray-600 bg-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 border border-gray-300 hover:bg-gray-100 transition"
                >
                  View <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Assigned Count */}
              <div className="bg-gray-100 mt-4 p-7 rounded-xl flex justify-between items-center border border-gray-300">
                <p className="text-2xl text-gray-700 font-medium">
                  Assigned {title.toLowerCase().replace(" list", "s")}:
                </p>
                <p className="font-bold text-2xl text-black">{assigned}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat & Query Section */}
      <div className="w-full flex justify-start">
        <div className="w-[100%] mt-8 bg-gray-200 p-6 rounded-xl shadow-lg border border-gray-300 flex flex-col md:flex-row items-center">
          {/* Heading */}
          <h3 className="text-[32px] font-bold text-red-800 w-full md:w-1/3 pl-4 text-center md:text-left leading-none tracking-tight">
            CHAT & QUERY SECTION
          </h3>

          {/* Chat Buttons */}
          <div className="bg-white p-9 rounded-xl shadow-md border border-gray-300 flex flex-col md:flex-row gap-4 md:gap-7 justify-center mt-4 md:mt-0">
            {chatOptions.map(({ text, link }, index) => (
              <button
                key={index}
                onClick={() => navigate(link)}
                className="bg-red-800 text-white px-6 md:px-8 py-3 md:py-9 rounded-md font-inter font-semibold text-[28px] md:text-[36px] leading-none tracking-tight text-center shadow-md border border-gray-300 cursor-pointer"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
