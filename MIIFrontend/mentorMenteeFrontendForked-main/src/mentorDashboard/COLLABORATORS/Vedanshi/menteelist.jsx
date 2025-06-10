import React, { useState } from "react";
import { Search } from "lucide-react";
import { FiUser } from "react-icons/fi";

const mentees = Array(30).fill({
  name: "xyz",
  scholarno: "XXXXXXX",
  branch: "CS-Core",
  faculty: "Engineering",
  department: "Computer Science"
});

const MenteeList = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter mentees based on the search query
  const filteredMentees = mentees.filter((mentee) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      mentee.scholarno.toLowerCase().includes(lowerCaseQuery) ||
      mentee.name.toLowerCase().includes(lowerCaseQuery) ||
      mentee.branch.toLowerCase().includes(lowerCaseQuery) ||
      mentee.faculty.toLowerCase().includes(lowerCaseQuery) ||
      mentee.department.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="h-[801.8px] w-[1240px] gap-[25px] pt-[20px] pb-[40px]">
      <div className="bg-[#F3F3F3] h-auto w-[1238px] mx-[6rem] shadow-[inset_0px_4.21px_4.21px_#00000040] gap-[10.53px] pt-[26.32px] pr-[31.58px] pl-[31.58px] pb-[26.32px]">
        <h2 className="relative mb-9 text-5xl font-bold text-center text-red-700  after:content-[''] after:block after:w-full after:h-[2px] after:bg-red-700 after:mt-8">
          Mentee(s) List
        </h2>
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center bg-red-700 border-2 border-red-700 rounded-2xl pl-[18px] pr-[10px]">
            {/* Search Icon */}
            <Search className="w-20 text-white bg-red-700 ml-3" />
            <input
              type="text"
              placeholder="Search by enrollment number, name, branch, etc."
              className="font-semibold rounded-2xl gap-[8px] bg-red-700 text-white placeholder-white text-3xl w-[571px] h-[44px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="p-2 text-white bg-red-700 rounded-xl hover:bg-red-800 w-[300px] font-semibold flex items-center justify-center pl-[20px] pr-[20px] gap-[15px] w-[106px] h-[43px] text-3xl"
          >
            <span>Search</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-[32px] pl-8 pt-8 md:grid-cols-2">
          {filteredMentees.length > 0 ? (
            filteredMentees.map((mentee, index) => (
              <div
                key={index}
                className="flex items-center gap-4 pt-[18.67px] pb-[18.67px] pr-[31.12px] pl-[31.12px] text-white bg-red-700 rounded-lg shadow-md w-[554px] h-[136.84px]"
              >
                <div className="flex items-center justify-center w-[93.36px] h-[93.36px] font-bold text-red-700 bg-white border border-red-700 rounded-full text-lg">
                  <FiUser className="w-[53.04px] h-[53.04px]" />
                </div>
                <div>
                  <p className="text-3xl font-bold pl-16 pb-5">Name: {mentee.name}</p>
                  <p className="text-l font-bold pl-16 p-1">Scholar No: {mentee.scholarno}</p>
                  <p className="text-l font-bold pl-16 p-1">Branch: {mentee.branch}</p>
                  <div className="bg-[rgba(160, 18, 18, 1)] text-white p-2">
                    <span className="ml-14 p-1 font-bold">Faculty: {mentee.faculty}</span>
                    <span className="mx-2">|</span>
                    <span className="font-bold">Department: {mentee.department}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No mentees found matching the search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Testing = () => {
  return (
    <>
      <MenteeList />
    </>
  );
};

export default Testing;
