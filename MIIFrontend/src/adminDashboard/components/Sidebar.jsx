import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import dashboardIcon from "../../assets/sidebar/dashboardIcon.svg";
import profileIcon from "../../assets/sidebar/profileIcon.svg";
import logoutIcon from "../../assets/sidebar/logoutIcon.svg";
import backIcon from "../../assets/sidebar/backIcon.svg";

const Sidebar = ({ showSidebar }) => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sidebarLinks = [
    { title: "Dashboard", src: dashboardIcon, redirectTo: "/admin/dashboard" },
    { title: "Profile", src: profileIcon, redirectTo: "/admin/profile"  },
    { title: "Logout", src: logoutIcon, redirectTo: "/" },
  ];

  return (
    <div className={`${showSidebar ? "" : "hidden"} sm:block sm:sticky fixed bg-[var(--primary-color)] h-full z-10`}>
      <div className="text-white w-[110px] lg:w-[120px] px-4 flex flex-col items-center h-full pt-10 space-y-12">
        {/* Sidebar Icons */}
        <div className="flex flex-col space-y-9 w-full items-center">
          {sidebarLinks.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.title === "Profile" ? (
                <div className="relative" ref={dropdownRef}>
                  <div onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="cursor-pointer">
                    <img src={item.src} alt={`${item.title} icon`} className="h-14 transition-transform hover:scale-110" />
                    <div className="text-[1.4rem] mt-1 font-medium">{item.title}</div>
                  </div>
                  {showProfileDropdown && navigate("/admin/profile")}
                </div>
              ) : (
                <Link to={item.redirectTo} className="text-center text-[1.4rem] mt-1 font-medium flex flex-col items-center">
                  <img src={item.src} alt={`${item.title} icon`} className="h-14 transition-transform hover:scale-110" />
                  <div>{item.title}</div>
                </Link>
              )}
              {/* Divider Line */}
              <div className="bg-white h-0.5 w-2/3 mt-5"></div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-auto mb-10">
          <button onClick={() => navigate(-1)} className="flex flex-col items-center">
            <img src={backIcon} alt="Back icon" className="h-12 scale-90 transition-transform hover:scale-110" />
            <div className="text-[1.4rem] mt-1 font-medium">Back</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
