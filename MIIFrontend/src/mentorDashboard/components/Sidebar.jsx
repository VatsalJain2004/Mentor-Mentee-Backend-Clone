import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
// import dashboardIcon from "../../assets/sidebar/dashboardIcon.png";
import dashboardIcon from "../../assets/sidebar/dashboardIcon.svg";
import profileIcon from "../../assets/sidebar/profileIcon.svg";
import logoutIcon from "../../assets/sidebar/logoutIcon.svg";
import chatboxIcon from "../../assets/sidebar/chatboxIcon.svg";
import backIcon from "../../assets/sidebar/backIcon.svg";
import ChatApp from "../screens/ChatApp";

import { set } from "react-hook-form";
// import ChatBox from "../components/Chatbox";

const Sidebar = ({ showSidebar }) => {
  const navigate = useNavigate();
  const [showChatBox, setShowChatBox] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const topElements = [
    {
      title: "Dashboard",
      src: dashboardIcon,
      redirectTo: "/mentor/dashboard",
    },
    {
      title: "Profile",
      src: profileIcon,
    },
    {
      title: "Logout",
      src: logoutIcon,
      redirectTo: "/",
    },
  ];

  const bottomElements = [
    {
      title: "Chat Box",
      src: chatboxIcon,
    },
    {
      title: "Back",
      src: backIcon,
      redirectTo: "/",
      hidden: true,
    },
  ];

  function handleBottomElementsClick() {
    setShowChatBox((cur) => !cur);
  }

  return (
    <div
      className={`${
        showSidebar ? "" : "hidden"
      } sm:block sm:sticky fixed bg-[var(--primary-color)] h-full scroll-smooth z-10`}
    >
      <div
        className={`text-white max-w-[110px] lg:min-w-[110px] px-4 flex flex-col items-center sm:justify-between justify-normal h-full`}
      >
        <div className="flex flex-col justify-center w-[120px]">
          {topElements.map((element, i) => (
            <div
              key={i}
              className="flex flex-col justify-center mt-9 items-center"
            >
              {element.title === "Profile" ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="text-center text-[1.4rem] mt-1 font-medium flex flex-col items-center cursor-pointer"
                  >
                    <img
                      src={element.src}
                      alt="profile icon"
                      className="h-14"
                    />
                    <div>{element.title}</div>
                  </div>
                  {showProfileDropdown && (
                    <div className="absolute w-52 bg-[var(--primary-color)] shadow-lg left-[7.5rem] rounded-r-2xl -top-[2rem] z-0 py-3">
                      <div className="flex flex-col text-white">
                        {/* <Link
                          to="/mentee"
                          className="block px-4 py-3  text-white transition-colors text-center text-2xl"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Mentee Profile
                        </Link> */}
                        {/* Gradient Line */}
                        <div className="h-[1px] mx-4 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        <Link
                          to="/mentee/mentorProfile"
                          className="block px-4 py-3  text-white transition-colors text-center text-2xl"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Mentor Profile
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={element.redirectTo}
                  className="text-center text-[1.4rem] mt-1 font-medium flex flex-col items-center"
                >
                  <img
                    src={element.src}
                    alt="dashboard icon"
                    className="h-14"
                  />
                  <div>{element.title}</div>
                </Link>
              )}
              <div className="bg-white h-0.5 w-2/3 mt-5"></div>
            </div>
          ))}
        </div>
        <Link
          to={"/login"}
          className="border-2 border-white rounded-xl p-3 text-xl"
        >
          Redirect to main app
        </Link>
        <div className="flex flex-col mb-6 w-[120px]">
          {bottomElements.map((element, i) => (
            <div
              key={i}
              className={`${
                element.hidden ? "hidden" : ""
              } md:flex flex-col cursor-pointer`}
            >
              <div className="flex flex-col justify-center mt-7 relative">
                {element.title !== "Back" ? (
                  <div
                    onClick={handleBottomElementsClick}
                    className="text-center text-[1.4rem] mt-1 font-medium flex flex-col items-center"
                  >
                    <img
                      src={element.src}
                      alt="dashboard icon"
                      className={`h-12 ${
                        element.title === "Back" && "scale-90"
                      } ${element.title === "Chat Box" && "scale-125"}`}
                    />
                    <div>{element.title}</div>
                  </div>
                ) : (
                  <div
                    onClick={() => navigate(-1)}
                    className="text-center text-[1.4rem] mt-1 font-medium flex flex-col items-center"
                  >
                    <img
                      src={element.src}
                      alt="dashboard icon"
                      className={`h-12 ${
                        element.title === "Back" && "scale-90"
                      } ${element.title === "Chat Box" && "scale-125"}`}
                    />
                    <div>{element.title}</div>
                  </div>
                )}
                {showChatBox && (
                  <div>
                  <Link to="/chatapp" className="cursor-pointer">
                    <ChatApp />
                  </Link>
                </div>
                )}
                {bottomElements.length - 1 !== i && (
                  <div
                    className={`${
                      !element.hidden ? "hidden" : ""
                    } bg-white h-0.5 w-full mt-5`}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
