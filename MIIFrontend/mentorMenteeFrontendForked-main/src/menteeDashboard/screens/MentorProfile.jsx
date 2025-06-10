import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import profileIcon from "../../assets/mentorProfile/profileIcon.svg";
import MentorAppointmentSchedule from "../COLLABORATORS/Aishwarya/MentorAppointmentSchedule";

function MentorProfile() {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const modalRef = useRef(null);

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    // Add event listener if modal is open
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  // Function to handle adding a new appointment
  const handleAddAppointment = (appointmentData) => {
    // Add new appointment to state
    setAppointments([...appointments, appointmentData]);
  };

  return (
    <div className="px-4 sm:px-8 md:px-14 py-6 md:py-11 h-full w-full">
      <div className="flex flex-col gap-6 md:gap-10 mt-2 m-2 md:m-5">
        <div className="bg-[var(--primary-color)] p-3 md:p-5 rounded-2xl size-fit">
          <div className="text-white uppercase text-2xl md:text-4xl font-bold whitespace-nowrap">
            Mentor Profile
          </div>
        </div>
        <div className="h-auto w-ful p-6 md:p-14 bg-[var(--primary-color)] gap-6 md:gap-10 rounded-2xl lg:px-28 md:flex-row flex items-center flex-col md:gap-24 justify-start">
          <div>
            <img src={profileIcon || "/placeholder.svg"} alt="icon" className="h-32 md:h-44 lg:h-64" />
          </div>
          <div>
            <div className="text-white text-3xl md:text-5xl font-semibold mb-4 md:mb-8">
              Name: xyz
            </div>
            <div className="flex flex-col gap-2 md:gap-3 text-xl md:text-3xl text-white">
              <div>
                <span className="font-semibold">Designation:</span> Assistant
                Professor , Computer Science Department
              </div>
              <div className="flex flex-col md:flex-row md:gap-10 lg:gap-60">
                <div>
                  <span className="font-semibold">Contact:</span>{" "}
                  xyz@university.com
                </div>
                <div>| +91-1234567890</div>
              </div>
              <div>
                <span className="font-semibold">Mentor ID:</span> MNT12345
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-10 py-6 md:py-9 rounded-xl px-6 md:px-12 bg-[var(--secondary-bgColor)]">
          <div className="text-2xl md:text-4xl font-bold text-[var(--primary-color)]">
            Details and Bio
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="text-xl md:text-3xl">
              <span className="font-semibold">Department:</span> Computer
              Science
            </div>
            <div className="text-xl md:text-3xl">
              <span className="font-semibold"> Expertise Areas:</span>{" "}
              Artificial Intelligence, Machine Learning
            </div>
            <div className="text-xl md:text-3xl">
              <span className="font-semibold">Experience: </span> +10 years in
              Academic and Industry
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-10 py-6 md:py-9 rounded-xl px-6 md:px-12 bg-[var(--secondary-bgColor)]">
          <div className="text-2xl md:text-4xl font-bold text-[var(--primary-color)]">
            Mentorship Information
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="text-xl md:text-3xl">
              <span className="font-semibold">Cabin no.:</span> Computer Science
            </div>
            <div className="text-xl md:text-3xl">
              <span className="font-semibold"> Office Hours:</span> Artificial
              Intelligence, Machine Learning
            </div>
            <div className="text-xl md:text-3xl">
              <span className="font-semibold">Preferred Communication: </span>{" "}
              +10 years in Academic and Industry
            </div>
          {/* </div> */}

          {/* Schedule Appointment Button */}
          <button
            onClick={() => setShowModal(true)} // Open the modal
            className="flex bg-[var(--primary-color)] text-white text-xl md:text-2xl font-semibold size-fit py-2 md:py-3 px-6 md:px-9 rounded-xl gap-2 md:gap-3 items-center"
          >
            <div className="scale-125 mb-1">+</div>
            <div>Schedule Appointment</div>
          </button>
        </div>

        {/* Modal Component */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-[90%] max-w-[500px]">
              <div className="flex justify-between items-center p-3 bg-gray-300 rounded-t-lg">
                <h2 className="font-semibold">Schedule Appointment</h2>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="text-xl font-bold"
                >
                  &times;
                </button>
              </div>
              <MentorAppointmentSchedule 
                onClose={() => setShowModal(false)} 
                onAddAppointment={handleAddAppointment}
              />
            </div>
          </div>
        )}
        </div>
          
        <div className="flex flex-col gap-6 md:gap-10 py-6 md:py-9 rounded-xl px-6 md:px-12 bg-[var(--secondary-bgColor)]">
          <div className="text-2xl md:text-4xl font-bold text-[var(--primary-color)]">
            About Mentor-Mentee Program
          </div>
          <div className="text-xl md:text-3xl py-2 md:py-3 px-3 md:px-5 bg-[var(--text-bgColor)] rounded-lg">
            Know more
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-10 py-6 md:py-9 rounded-xl px-6 md:px-12 bg-[var(--secondary-bgColor)] mb-8 md:mb-16">
          <div className="text-2xl md:text-4xl font-bold text-[var(--primary-color)]">
            Feedback
          </div>
          <div className="w-full">
            <textarea
              className="text-xl md:text-3xl py-2 md:py-3 px-3 md:px-5 w-full bg-[var(--text-bgColor)] rounded-lg h-32 md:h-48 pl-4 md:pl-8"
              placeholder="Provide your feedback here!"
            ></textarea>
            <div className="flex justify-end">
              <div className="py-1 md:py-2 px-4 md:px-6 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-xl text-xl md:text-3xl size-fit mt-2">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorProfile;