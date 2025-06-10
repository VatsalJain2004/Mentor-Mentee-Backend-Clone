import React from "react";
import { User } from "lucide-react";
import collegeLogo from "../../assets/header/navBarLogo.png";
import userLogo from "../../assets/header/profile.png";
import notificationBell from "../../assets/header/notificationBell.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({
  name,
  department,
  scholarNo,
  showSidebar,
  setShowSidebar,
}) => {
  return (
    <div className="bg-white shadow-md p-4 h-full w-screen flex justify-between items-center">
      <div className="flex items-center">
        <div className="sm:hidden">
          <GiHamburgerMenu
            style={{ scale: "3", color: "var(--primary-color)" }}
            className="ml-6 mr-6"
            onClick={() => setShowSidebar((cur) => {
              console.log(!cur);
              return !cur
            })}
          />
        </div>
        <img
          src={collegeLogo}
          alt="logo"
          className="h-16 w-72 md:h-20 md:w-auto"
        />
      </div>
      {/* <div className="container mx-auto flex flex-col md:flex-row justify-between items-center"> */}
      {/* <div className="flex flex-col md:flex-row md:space-x-4 mb-2 md:mb-0">
          <span className="font-semibold">{name}</span>
          <span>{department}</span>
          <span>{scholarNo}</span>
        </div> */}
      <div className="flex items-center gap-6">
       
          <div className="flex flex-col">
           
            
         
        
          
        </div>
        <img src={notificationBell} alt="bell icon" className="h-[27px]" />
        <div className="sm:bg-[var(--primary-color)] flex  items-center px-1 rounded-full py-1">
          <div className="hidden sm:block text-white text-2xl px-4">{name}</div>
          <img src={userLogo} alt="user" className="h-[44px]" />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Header;

// box-shadow: 1.57434px 3.14869px 3.14869px rgba(0, 0, 0, 0.25);
