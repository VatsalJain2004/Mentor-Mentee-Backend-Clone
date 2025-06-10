import { useState } from "react";
import axios from "axios";

const MentorAppointmentSchedule = ({ onClose, employeeId }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    purpose: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get token from local storage
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMywicm9sZSI6Im1lbnRvciIsImlhdCI6MTc0Mzc1Njc5MCwiZXhwIjoxNzQzNzYwMzkwfQ.siMT9L9LaBWuK_31iVeH0f0lLFn58Ww7iYXysdupMwY'; // Make sure it's stored after login

      if (!token) {
        alert("Authentication token not found.");
        return;
      }

      // Prepare request body
      const payload = {
        scholar_no: 2100116,
        appointment: formData
      };

      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:3000/api/mentee/scheduleAppointments",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Show success / handle response
      alert("Appointment scheduled successfully.");
      console.log(response.data);

      // Optionally call a parent function
      // onAddAppointment(response.data.appointments);

      onClose(); // Close modal
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("Failed to schedule appointment. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-red-700 text-white rounded-b-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-white text-black p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-white text-black p-2 rounded"
              required
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Purpose</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full bg-white text-black p-2 rounded h-20 resize-none"
            required
          />
        </div>
        <div className="mt-4 text-right">
          <button 
            type="submit" 
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default MentorAppointmentSchedule;
