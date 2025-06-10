import { useState, useEffect } from "react";

const MentorAppointments = () => {
  // Simulated fetched data
  const [appointments, setAppointments] = useState([]);
  const [modalData, setModalData] = useState(null);

  // Simulate API fetch from mentee-side data
  useEffect(() => {
    const fetchedData = [
      { menteeName: "John Doe", date: "2025-04-07", time: "10:00", purpose: "Project discussion" },
      { menteeName: "Jane Smith", date: "2025-04-08", time: "14:30", purpose: "Career guidance" },
      { menteeName: "Aarav Mehta", date: "2025-04-09", time: "11:15", purpose: "Internship support" },
    ];
    setAppointments(fetchedData);
  }, []);

  return (
    <div className="h-auto w-full px-[58px] py-[40px]">
      <h2 className="text-[24px] font-semibold mb-[2rem] text-[#a01212]">Incoming Appointment Requests</h2>

      <div className="bg-[#F3F3F3] p-6 rounded shadow-inner">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-[18.95px] text-[#a01212]">
              <th>Mentee Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Purpose</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, index) => (
              <tr key={index} className="bg-[#a01212] text-white rounded">
                <td className="p-3">{app.menteeName}</td>
                <td className="p-3">{app.date}</td>
                <td className="p-3">{app.time}</td>
                <td className="p-3">{app.purpose}</td>
                <td className="p-3">
                  <button
                    onClick={() => setModalData(app)}
                    className="bg-white text-[#a01212] px-4 py-2 rounded"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">
              <div className="flex justify-between items-center bg-[#C3C3C3] p-3 rounded-t">
                <h3 className="font-bold text-[16px]">Appointment Details</h3>
                <button onClick={() => setModalData(null)} className="text-[24px] font-bold">×</button>
              </div>
              <div className="p-4 space-y-4 text-black">
                <p><strong>Mentee Name:</strong> {modalData.menteeName}</p>
                <p><strong>Date:</strong> {modalData.date}</p>
                <p><strong>Time:</strong> {modalData.time}</p>
                <p><strong>Purpose:</strong> {modalData.purpose}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorAppointments;