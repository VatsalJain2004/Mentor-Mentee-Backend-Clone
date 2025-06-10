import { useState, useEffect } from "react";
import axios from "axios";
import DashboardRow from "../components/DashboardRow";

function Dashboard({userId, token, role}) {
  const [userData, setUserData] = useState(null);
  const [scheduledMeeting, setScheduledMeeting] = useState(null);

  // Helper function to format time to 12-hour format with AM/PM
  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(+hour);
    date.setMinutes(+minute);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const scholar_no = userId;
  
        const response = await axios.get(
          "http://localhost:3000/api/mentee/getPersonalMenteeDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              scholar_no,
              role,
            },
          }
        );
  
        console.log("Full User Data:", response.data);
  
        setUserData(response.data);
  
        const meetings = response.data.data?.scheduled_meetings;
  
        if (meetings && meetings.length > 0) {
          // Sort meetings by date and time if needed
          const sortedMeetings = [...meetings].sort((a, b) => {
            const aDateTime = new Date(`${a.date}T${a.timeFrom}`);
            const bDateTime = new Date(`${b.date}T${b.timeFrom}`);
            return bDateTime - aDateTime; // descending
          });
  
          const latestMeeting = sortedMeetings[0]; // get the latest one
  
          setScheduledMeeting({
            time: formatTime(latestMeeting.timeFrom),
            date: latestMeeting.date,
            link: latestMeeting.MeetingLink,
            agenda: latestMeeting.Agenda,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
        }
      }
    };
  
    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token, role]);
  

  const categories = [
    {
      title: "Personal Information",
      elementsInfo: [
        { name: "General Information", redirectTo: "/mentee/generalInformation" },
        { name: "Documentation", redirectTo: "/mentee/documentation" },
      ],
    },
    {
      title: "Mentoring Diary",
      elementsInfo: [
        { name: "Minutes of Meeting", redirectTo: "/mentee/minutesOfMeeting" },
        { name: "Records of Major Absence", redirectTo: "/mentee/recordOfAbsence" },
        { name: "Records of In-disciplinary Activities", redirectTo: "/mentee/indisciplineRecord" },
      ],
    },
    {
      title: "Academic Details",
      elementsInfo: [
        { name: "Examinations Cleared", redirectTo: "/mentee/examinationCleared" },
        { name: "Co-curricular Activities", redirectTo: "/mentee/coCurricularActivity" },
        { name: "Internship Details", redirectTo: "/mentee/internshipDetails" },
        { name: "Semester Wise Records", redirectTo: "/mentee/semesterWiseRecords" },
      ],
    },
  ];

  return (
    <div className="bg-white flex-grow overflow-auto">
      <div className="my-10 mx-5 md:my-16 md:mx-40 lg:mx-80 flex flex-col gap-8">
        {scheduledMeeting && (
          <div
            className="p-5 text-lg md:text-xl font-bold text-white text-center rounded-lg shadow-lg 
            cursor-pointer animate-pulse transition-transform hover:scale-105"
            style={{ backgroundColor: "#A01213" }}
            onClick={() => window.open(scheduledMeeting.link, "_blank")}
          >
            📅 {scheduledMeeting.agenda} on {scheduledMeeting.date} at {scheduledMeeting.time} — 
            <span className="underline"> Click to Join</span>
          </div>
        )}

        {categories.map((category, i) => (
          <DashboardRow key={i} title={category.title} elementsInfo={category.elementsInfo} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
