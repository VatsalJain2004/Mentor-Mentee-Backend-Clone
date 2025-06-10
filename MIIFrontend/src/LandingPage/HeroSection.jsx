import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const MentorMenteePortal = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src="/loginbg.webp"
        alt="Medi-Caps University"
        className="absolute w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full backdrop-blur-[5px] p-8 flex justify-between items-center z-50">
        <img src="/landing1.png" alt="Medi-Caps University Logo" className="h-20" />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex text-white space-x-6 pr-6 text-3xl">
          <a href="#about" className="hover:text-gray-500 cursor-pointer font-semibold">About</a>
          <a href="#developers" className="hover:text-gray-500 cursor-pointer font-semibold">Developers</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white z-50" onClick={() => setMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar & Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 text-white p-6 transform z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white" onClick={() => setMenuOpen(false)}>
          <X size={28} />
        </button>

        {/* Menu Items */}
        <div className="mt-16 space-y-6 text-2xl font-semibold">
          <a href="#about" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#developers" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>Developers</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-12 ml-[10%] space-y-5"
        style={{ textShadow: "0px 4.22581px 4.22581px rgba(0, 0, 0, 0.5)" }}>
        <h2 className="text-7xl font-semibold">Welcome to</h2>
        <h1 className="text-8xl font-bold">Mentor- Mentee</h1>
        <h2 className="text-7xl font-semibold">Portal</h2>
        <button className="bg-red-800 hover:bg-white hover:text-red-800 text-white font-bold p-4 px-16 border border-red-800 rounded text-3xl rounded-xl cursor-pointer">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default MentorMenteePortal;
