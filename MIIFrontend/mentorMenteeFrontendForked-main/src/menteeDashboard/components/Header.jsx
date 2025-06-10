import React, { useState } from "react";
import notificationBell from "../../assets/header/notificationBell.png";
import userLogo from "../../assets/header/profile.png";
import { GiHamburgerMenu } from "react-icons/gi";
import collegeLogo from "../../assets/header/navBarLogo.png";
import Notifications from "../COLLABORATORS/Aishwarya/Notifications";

const Header = ({
  name,
  department,
  scholarNo,
  showSidebar,
  setShowSidebar,
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="bg-white shadow-md p-4 h-full w-screen flex justify-between items-center">
      <div className="flex items-center">
        <div className="sm:hidden">
          <GiHamburgerMenu
            style={{ scale: "3", color: "var(--primary-color)" }}
            className="ml-6 mr-6"
            onClick={() => setShowSidebar((cur) => !cur)}
          />
        </div>
        <img
          src={collegeLogo}
          alt="logo"
          className="h-16 w-72 md:h-20 md:w-auto"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="border-black border-[2px] p-2.5 hidden rounded-lg text-lg md:flex items-center gap-3 shadow-custom">
          <div className="flex flex-col">
            <div className="text-xl font-medium">Class</div>
            <div className="flex flex-wrap">
              <div className="whitespace-nowrap">B.tech.: CS Xth SEM,</div>
              <div> Sec: CS-X</div>
            </div>
          </div>
          <div className="bg-black h-12 w-[1.7px]"></div>
          <div className="flex flex-col">
            <div className="text-xl font-medium">Scholar No.</div>
            <div>XXXXXX</div>
          </div>
        </div>

        {/* <div className="flex items-center gap-6"></div> */}
        <div className="relative">
          <img
            src={notificationBell}
            alt="Notification Bell"
            className="h-7 cursor-pointer"
            onClick={() => setIsNotificationOpen((prev) => !prev)}
          />
          {isNotificationOpen && (
            <div className="absolute top-12 right-0 z-50">
              <Notifications
                isVisible={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>
          )}
        </div>

        <div className="sm:bg-[var(--primary-color)] flex items-center px-1 rounded-full py-1">
          <div className="hidden sm:block text-white text-2xl px-4">{name}</div>
          <img src={userLogo} alt="user" className="h-[44px]" />
        </div>
      </div>
    </div>
  );
};

export default Header;
