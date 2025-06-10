import { IoSearch } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import profilePic from "../../../../public/student.png";
import { Link } from "react-router-dom";
import axios from "axios";

const MentorCoordinatorList = () => {
  const [mentorCoordinatorData, setMentorCoordinatorData] = useState([]);
  const [openSections, setOpenSections] = useState([]);

  useEffect(() => {
    const fetchMentorCoordinators = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NDY5NDU4NCwiZXhwIjoxNzQ0Njk4MTg0fQ.Hw7ultwssDYOaG0B-tzv7fJS2GybGFBDraFNDELDEUc"; // You can change where you store the token
        const response = await axios.get("http://localhost:3000/api/admin/mentorCoordinatorWithMentors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.coordinatorWithMentors || [];

        // Initialize openSections state
        setOpenSections(Array(data.length).fill(false));
        setMentorCoordinatorData(data);
      } catch (error) {
        console.error("Error fetching mentor coordinators:", error);
      }
    };

    fetchMentorCoordinators();
  }, []);

  const toggleAccordion = (index) => {
    setOpenSections((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  // Filter out duplicate mentors by employeeid
  const uniqueMentors = (mentors) => {
    const seen = new Set();
    return mentors.filter((mentor) => {
      if (seen.has(mentor.employeeid)) return false;
      seen.add(mentor.employeeid);
      return true;
    });
  };

  return (
    <div className="w-90 mx-20 my-10">
      <h1 className="uppercase text-4xl font-bold">Mentor Coordinator List</h1>

      <div className="bg-[#F3F3F3] mt-10 border shadow-[inset_0px_3px_2px_rgba(0,0,0,0.25)] py-10 px-5 pr-10">
        {/* Search and Filter */}
        <div className="flex justify-between h-16">
          <div className="grow h-full">
            <form className="flex max-w-5xl h-full">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full mx-5">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IoSearch color="#D2D2D2" size={20} />
                </div>
                <input type="text" id="simple-search" className="bg-[#A01212] border border-[#A01212] text-white text-4xl rounded-[10px] block w-full h-full px-14 font-semibold placeholder-[#D2D2D2]" placeholder="Search mentor" />
              </div>
              <button type="submit" className="h-full ms-2 text-4xl font-semibold text-white bg-[#A01212] border border-[#A01212] rounded-[10px] px-10">Search</button>
            </form>
          </div>
          <div className="h-full">
            <button type="button" className="h-full ms-2 text-4xl font-semibold text-white bg-[#A01212] border border-[#A01212] rounded-[10px] px-10">Filter</button>
          </div>
        </div>

        {/* Accordion */}
        <div id="accordion-open" className="ms-5">
          {mentorCoordinatorData.map((mentorCoordinator, index) => (
            <div key={mentorCoordinator.mentor_coordinator_id}>
              {/* Accordion Header */}
              <h2 className="mt-10">
                <button type="button" onClick={() => toggleAccordion(index)} className={` ${!openSections[index] ? "rounded-xl" : "rounded-t-xl"} flex items-center justify-between w-full p-5 font-bold text-black bg-[#C3C3C3] border gap-3`}>
                  <div className="text-start">
                    <div className="text-2xl">Name: {mentorCoordinator.name}</div>
                    <div className="text-xl">Mentor ID: {mentorCoordinator.mentor_coordinator_id}</div>
                    <div className="text-lg">Department: {mentorCoordinator.department}</div>
                  </div>
                  <FaMinus size={20} />
                </button>
              </h2>

              {/* Accordion Body */}
              {openSections[index] && (
                <div className="mx-3 p-5 bg-[#B72929] rounded-b-xl">
                  {uniqueMentors(mentorCoordinator.mentors).map((mentor, idx) => (
                    <Link to="/" key={`${mentor.employeeid}-${idx}`} className="mx-5 my-2.5 bg-white text-[#A01212] font-bold flex py-2.5 rounded-[3px]">
                      <img className="w-14 h-14 rounded-[100%] border border-[#A01212] mx-5" src={profilePic} alt="mentor" />
                      <div className="text-start">
                        <div className="text-2xl">Name: {mentor.name}</div>
                        <div className="text-xl">Mentor ID: {mentor.employeeid}</div>
                        <div className="text-md">Department: {mentor.department}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Print Button */}
      <div className="w-full flex justify-end my-5 pb-20">
        <button type="button" className="h-16 ms-2 text-4xl font-semibold text-[#A01212] bg-white border-2 border-[#A01212] rounded-[10px] px-10">Print</button>
      </div>
    </div>
  );
};

export default MentorCoordinatorList;
