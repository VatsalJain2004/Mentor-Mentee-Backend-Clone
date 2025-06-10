import { IoSearch } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import profilePic from "../../../../public/student.png"; // Ensure this is correctly handled
import { Link } from "react-router-dom";
import axios from "axios";

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [openSections, setOpenSections] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NDY5NDU4NCwiZXhwIjoxNzQ0Njk4MTg0fQ.Hw7ultwssDYOaG0B-tzv7fJS2GybGFBDraFNDELDEUc";
        const res = await axios.get('http://localhost:3000/api/admin/mentorsWithMentees', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data?.mentorsWithMentees) {
          setMentors(res.data.mentorsWithMentees);
          setOpenSections(Array(res.data.mentorsWithMentees.length).fill(false));
        }
      } catch (err) {
        console.error('Error fetching mentor data', err);
      }
    };
    getData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenSections((prev) => prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
  };

  return (
    <div className="w-90 mx-20 my-10">
      <h1 className="uppercase text-4xl font-bold">Mentor List</h1>

      <div className="mt-6">
        {mentors.map((mentor, index) => (
          <div key={mentor.mentorId} className="border rounded-lg mb-4 shadow-md">
            {/* Mentor Header */}
            <div
              className="flex justify-between items-center px-6 py-4 bg-gray-100 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <div>
                <h2 className="text-xl font-semibold">{mentor.name}</h2>
                <p className="text-sm text-gray-600">{mentor.department}</p>
              </div>
              <FaMinus
                className={`transition-transform duration-300 ${openSections[index] ? "rotate-180" : "rotate-0"}`}
              />
            </div>

            {/* Mentee List */}
            {openSections[index] && (
              <div className="p-4 bg-white">
                {mentor.scholars?.length > 0 ? (
                  mentor.scholars.map((mentee) => (
                    <div
                      key={mentee.scholarId}
                      className="flex items-center space-x-4 border-b py-2"
                    >
                      <img src={profilePic} alt="Student" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium">{mentee.name}</p>
                        <p className="text-sm text-gray-500">
                          Scholar ID: {mentee.scholarId}{" "}
                          {mentee.branch && ` | Branch: ${mentee.branch}`}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No assigned mentees.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorList;
