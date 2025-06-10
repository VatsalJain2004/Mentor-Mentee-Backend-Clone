import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import AddRecordForm from "./meetingMinutesEnterDetails";

const MinutesOfMeeting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Array(8).fill({
  //   date: "12/06/2024",
  //   activity: "initial activity",
  //   attendance: "98%",
  //   advice: "null",
  // })

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A";
        const scholar_no = 3; // Replace with dynamic value if needed

        const response = await axios.get(
          "http://localhost:3000/api/mentee/getMinutesOfMeeting",
          {
            params: { scholar_no },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data?.data?.mom_record) {
          setAttendanceData(response.data.data.mom_record);
        } else {
          setAttendanceData([]);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to add new record to the table and close modal
  const addNewRecord = useCallback(
    (newRecord) => {
      // console.log(newRecord);
      setAttendanceData((prevData) => [...prevData, newRecord]);
      // toggleModal();
    },
    [toggleModal]
  );

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 mx-20 my-10 px-10 py-10">
      {/* Page Title */}
      <h2 className="text-5xl font-bold text-black mb-4">
        Minutes of Meeting with Mentor
      </h2>
      {error && <div>error</div>}
      {loading ? (
        "...Loading"
      ) : (
        <main
          className={`bg-gray-200 rounded-lg shadow-md p-10 w-full ${
            isOpen ? "blur-sm" : ""
          }`}
        >
          {/* Table Container */}
          <div className="bg-grey rounded-lg p-6 w-full border-inherit">
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse border-2 border-white shadow-lg">
                <thead>
                  <tr className="bg-white text-black text-2xl">
                    <th className="py-6 px-7 text-center border-b-2 border-gray-300 text-4xl">
                      Date
                    </th>
                    <th className="py-3 h-0">
                      <div className="border-r border-black w-1 h-full"></div>
                    </th>
                    <th className="py-6 px-7 text-center border-b-2 border-gray-300 text-4xl">
                      Activity
                    </th>
                    <th className="py-3 h-0">
                      <div className="border-r border-black w-1 h-full"></div>
                    </th>
                    <th className="py-6 px-7 text-center border-b-2 border-gray-300 text-4xl">
                      Tentative Attendance (%)
                    </th>
                    <th className="py-3 h-0">
                      <div className="border-r border-black w-1 h-full"></div>
                    </th>
                    <th className="py-6 px-7 text-center border-b-2 border-gray-300 text-4xl">
                      Advice Given by the Mentor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((entry, index) => (
                    <tr key={index} className="border-b-2 border-white">
                      <td className="py-7 px-7 bg-[var(--primary-color)] text-white text-center text-3xl">
                        {entry.date}
                      </td>
                      <td className="bg-[var(--primary-color)] py-3 h-0">
                        <div className="border-r border-white w-1 h-full"></div>
                      </td>
                      <td className="py-7 px-7 bg-[var(--primary-color)] text-white text-center text-3xl">
                        {entry.activity}
                      </td>
                      <td className="bg-[var(--primary-color)] py-3 h-0">
                        <div className="border-r border-white w-1 h-full"></div>
                      </td>
                      <td className="py-7 px-7 bg-[var(--primary-color)] text-white text-center text-3xl">
                        {entry.tentative_attendance}
                      </td>
                      <td className="bg-[var(--primary-color)] py-3 h-0">
                        <div className="border-r border-white w-1 h-full"></div>
                      </td>
                      <td className="py-7 px-7 bg-[var(--primary-color)] text-white text-center text-3xl">
                        {entry.advice_given_by_mentor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add button section */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={toggleModal}
                className="bg-black text-white px-10 py-5 rounded-2xl text-3xl font-semibold shadow-md hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Modal overlay - closes when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          {/* Modal content - stops click propagation to prevent closing when clicking inside */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-11/12 max-w-4xl"
          >
            <AddRecordForm
              toggleModal={toggleModal}
              addNewRecord={addNewRecord}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MinutesOfMeeting;

// code with logic

// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import AddRecordForm from "./meetingMinutesEnterDetails";

// const MinutesOfMeeting = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [attendanceData, setAttendanceData] = useState([]);

//   const toggleModal = useCallback(() => {
//     setIsOpen((prev) => !prev);
//   }, []);

//   // Fetch data from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token =
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A";
//         const scholar_no = 3; // Replace with dynamic value if needed

//         const response = await axios.get(
//           "http://localhost:3000/api/mentee/getMinutesOfMeeting",
//           {
//             params: { scholar_no },
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data?.data?.mom_record) {
//           setAttendanceData(response.data.data.mom_record);
//         } else {
//           setAttendanceData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const addNewRecord = useCallback(
//     (newRecord) => {
//       setAttendanceData((prevData) => [...prevData, newRecord]);
//       toggleModal();
//     },
//     [toggleModal]
//   );
//   return (
//     <div className="flex flex-col w-full h-screen bg-gray-100 mx-20 my-10 px-10 py-10">
//       <h2 className="text-5xl font-bold text-black mb-4">
//         Minutes of Meeting with Mentor
//       </h2>

//       <main
//         className={`bg-gray-200 rounded-lg shadow-md p-10 w-full ${
//           isOpen ? "blur-sm" : ""
//         }`}
//       >
//         <div className="bg-grey rounded-lg p-6 w-full border-inherit">
//           <div className="overflow-x-auto w-full">
//             <table className="w-full border-collapse border-2 border-white shadow-lg">
//               <thead>
//                 <tr className="bg-white text-black text-2xl">
//                   <th className="py-6 px-7 text-center border-b-2 border-gray-300 text-4xl">
//                     Date
//                   </th>
//                   <th className="py-6 px-7 text-center border-b-2 border-gray-300 text-4xl">
//                     Activity
//                   </th>
//                   <th className="py-6 px-7 text-center border-b-2 border-gray-300 text-4xl">
//                     Tentative Attendance (%)
//                   </th>
//                   <th className="py-6 px-7 text-center border-b-2 border-gray-300 text-4xl">
//                     Advice Given by the Mentor
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {attendanceData.map((entry, index) => (
//                   <tr key={index} className="border-b-2 border-white">
//                     <td className="py-7 px-7 bg-blue-500 text-white text-center text-3xl">
//                       {entry.date}
//                     </td>
//                     <td className="py-7 px-7 bg-blue-500 text-white text-center text-3xl">
//                       {entry.activity}
//                     </td>
//                     <td className="py-7 px-7 bg-blue-500 text-white text-center text-3xl">
//                       {entry.tentative_attendance}
//                     </td>
//                     <td className="py-7 px-7 bg-blue-500 text-white text-center text-3xl">
//                       {entry.advice_given_by_mentor}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-4 flex justify-end">
//             <button
//               onClick={toggleModal}
//               className="bg-black text-white px-10 py-5 rounded-2xl text-3xl font-semibold shadow-md hover:bg-gray-800"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       </main>

//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={toggleModal}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="w-11/12 max-w-4xl"
//           >
//             <AddRecordForm
//               toggleModal={toggleModal}
//               addNewRecord={addNewRecord}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MinutesOfMeeting;
