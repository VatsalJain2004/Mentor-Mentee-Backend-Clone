import { useState } from "react";
import axios from "axios";

export default function AddRecordForm({ toggleModal, addNewRecord }) {
  // State to manage all form input values
  const [formData, setFormData] = useState({
    activity: "",
    date: "",
    tentative_attendance: "",
    advice_given_by_mentor: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Updates form state when inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit form and send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const scholar_no = 3; // Replace with dynamic scholar_no if needed
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A"; // Replace with actual token

    const requestData = {
      scholar_no,
      mom_record: {
        date: formData.date,
        activity: formData.activity,
        record_id: 0, // Backend will assign actual ID
        tentative_attendance: parseInt(formData.tentative_attendance, 10),
        advice_given_by_mentor: formData.advice_given_by_mentor,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/mentee/minutesOfMeeting",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data.data.mom_record.slice(-1)[0]); // TODO
      addNewRecord(response.data.data.mom_record.slice(-1)[0]); // Update UI with new record
      toggleModal(); // Close the modal
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to add record. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main modal container
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      {/* Modal header with close button */}
      <div className="bg-[#D3D3D3] px-8 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Add New Record</h2>
        <button
          className="text-black text-3xl hover:opacity-70"
          onClick={toggleModal}
        >
          ×
        </button>
      </div>
      {/* Form section with red background */}
      <form onSubmit={handleSubmit} className="p-8 bg-[#B22222] text-white">
        <div className="space-y-8 flex flex-col gap-5">
          {/* Activities input section */}
          <div>
            <label className="block mb-2 text-2xl">Activities</label>
            <input
              type="text"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="w-full p-4 text-gray-600 rounded bg-white text-xl"
              placeholder="enter details"
            />
          </div>

          {/* Date and Attendance inputs in a row */}
          <div className="flex gap-10">
            <div className="flex-1">
              <label className="block mb-2 text-2xl">Date</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-4 text-gray-600 rounded bg-white text-xl"
                placeholder="__/__/__"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-2xl whitespace-nowrap">
                Tentative Attendance (%)
              </label>
              <input
                type="text"
                name="tentative_attendance"
                value={formData.tentative_attendance}
                onChange={handleChange}
                className="w-full p-4 text-gray-600 rounded bg-white text-xl"
                placeholder="enter details"
              />
            </div>
          </div>

          {/* Advice textarea section */}
          <div>
            <label className="block mb-2 text-2xl">
              Advice Given by the Mentor
            </label>
            <textarea
              name="advice_given_by_mentor"
              value={formData.advice_given_by_mentor}
              onChange={handleChange}
              className="w-full p-4 text-gray-600 rounded bg-white min-h-[200px] text-xl"
              placeholder="enter details"
            ></textarea>
          </div>

          {/* Submit button section */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-10 py-3 rounded-md text-xl hover:bg-opacity-90"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

//Code with logic
/*import { useState } from "react";
import axios from "axios";

export default function AddRecordForm({ toggleModal, addNewRecord }) {
  const [formData, setFormData] = useState({
    activity: "",
    date: "",
    attendance: "",
    advice: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  // Submit form and send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const scholar_no = 3; // Replace with dynamic scholar_no if needed
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk0MzQ0MDEsImV4cCI6MTczOTQzODAwMX0.V5qR5Nac0p9fNXd8h5tozR8jwI86FPZ5Oe1Pn4cxen4'; // Replace with actual token

    const requestData = {
      scholar_no,
      mom_record: {
        date: formData.date,
        activity: formData.activity,
        record_id: 0, // Backend will assign actual ID
        tentative_attendance: parseInt(formData.tentative_attendance, 10),
        advice_given_by_mentor: formData.advice_given_by_mentor,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/mentee/minutesOfMeeting",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      addNewRecord(response.data.data); // Update UI with new record
      toggleModal(); // Close the modal
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to add record. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      /* Modal Header */
//     <div className="bg-[#D3D3D3] px-8 py-4 flex justify-between items-center">
//       <h2 className="text-2xl font-semibold">Add New Record</h2>
//       <button className="text-black text-3xl hover:opacity-70" onClick={toggleModal}>
//         ×
//       </button>
//     </div>

//     {/* Form */}
//     <form onSubmit={handleSubmit} className="p-8 bg-[#B22222] text-white">
//       <div className="space-y-8 flex flex-col gap-5">
//         <div>
//           <label className="block mb-2 text-2xl">Activities</label>
//           <input
//             type="text"
//             name="activity"
//             value={formData.activity}
//             onChange={handleChange}
//             className="w-full p-4 text-gray-600 rounded bg-white text-xl"
//             placeholder="Enter details"
//             required
//           />
//         </div>

//         <div className="flex gap-10">
//           <div className="flex-1">
//             <label className="block mb-2 text-2xl">Date</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-4 text-gray-600 rounded bg-white text-xl"
//               required
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block mb-2 text-2xl whitespace-nowrap">
//               Tentative Attendance (%)
//             </label>
//             <input
//               type="number"
//               name="attendance"
//               value={formData.attendance}
//               onChange={handleChange}
//               className="w-full p-4 text-gray-600 rounded bg-white text-xl"
//               min="0"
//               max="100"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block mb-2 text-2xl">Advice Given by the Mentor</label>
//           <textarea
//             name="advice"
//             value={formData.advice}
//             onChange={handleChange}
//             className="w-full p-4 text-gray-600 rounded bg-white min-h-[200px] text-xl"
//             placeholder="Enter details"
//             required
//           ></textarea>
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-black text-white px-10 py-3 rounded-md text-xl hover:bg-opacity-90"
//             disabled={loading}
//           >
//             {loading ? "Adding..." : "Add"}
//           </button>
//         </div>
//       </div>
//     </form>
//   // </div>
// );
// }
