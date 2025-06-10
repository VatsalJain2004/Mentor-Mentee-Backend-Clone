import { useState, useRef } from "react";
import React from "react";
import { FaSearch } from "react-icons/fa";

const mentorsData = [
  { id: 1, name: "Nikhil", meetings: 24 },
  { id: 2, name: "xyz", meetings: 55 },
  { id: 3, name: "xyz", meetings: 39 },
  { id: 4, name: "xyz", meetings: 31 },
  { id: 5, name: "xyz", meetings: 42 },
  { id: 5, name: "xyz", meetings: 42 },
];

const MeetingStatus = () => {
  const [filteredMentors, setFilteredMentors] = useState(mentorsData);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = mentorsData.filter((mentor) =>
      mentor.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredMentors(filtered);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 max-w-9xl">
      <h2 className="text-4xl font-bold mb-4">MEETING STATUS OF MENTORS</h2>
      <div className=" bg-gray-100 p-6 drop-shadow-xl">
      <div className="flex gap-2 mb-4 items-center bg-gray-100 p-2 rounded">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-4 text-white text-3xl cursor-text" />
          <input
            type="text"
            ref={searchRef}
            placeholder="Enter Mentor Name"
            className="border rounded-xl pl-16 p-3 w-full bg-red-800 text-white text-3xl placeholder-white cursor-text"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <button className="bg-red-800 text-white text-3xl px-8 py-2 rounded-xl cursor-pointer">Search</button>
        <button className="bg-red-800 text-white text-3xl px-8 py-2 rounded-xl cursor-pointer">Filter</button>
      </div>
      <div id="printable-content" className="bg-gray-200 p-5 rounded-xl shadow border border-black">
        <div className="grid grid-cols-2 text-2xl font-bold p-2">
          <p>Mentor Name</p>
          <p className="text-right">No. of meetings</p>
        </div>
        {filteredMentors.map((mentor, index) => (
          <div key={mentor.id} className="bg-white p-4 mb-2 rounded-xl shadow flex items-center">
            <p className="text-2xl font-bold mr-4">{index + 1}.</p>
            <div className="w-full text-2xl flex justify-between">
              <div>
                <p className="font-bold">Name: {mentor.name}</p>
                <p>Mentor ID: XXXXXXXX</p>
              </div>
              <p className="font-bold">{mentor.meetings}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={handlePrint} className="bg-white font-bold text-3xl text-red-800 px-8 py-1 rounded border border-red-800 cursor-pointer">
          Print
        </button>
      </div>
      </div>
    </div>
  );
};

export default MeetingStatus;