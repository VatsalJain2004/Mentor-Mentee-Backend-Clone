import React from "react";

const MenteeDetails = () => {
  const mentee = {
    name: "Aayushi Maigale",
    scholarNo: "XXXXXX",
    branch: "CS-Core",
    faculty: "Engineering",
    department: "Computer Science",
    email: "enrollment@university.in",
    contact: "+91-9876543210",
    address: "123, Main Street, City, District, State"
  };

  return (
    <div className="max-w-[90%] mx-auto p-4">
      {/* Mentee Details Card */}
      <div className="bg-gray-100 p-12 rounded-lg shadow-md">
        <h2 className="text-6xl font-bold text-[#a91010] text-center">Mentee Details</h2>
        <hr className="border-none h-1 mt-2 bg-[#a91010] mb-5" />
        <div className="bg-[#a91010] text-white p-9 rounded-lg flex justify-between items-center">
          <div className="w-44 h-44 mr-20 flex-shrink-0 relative left-8">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="35" r="25" fill="white" />
              <path d="M50 65 C20 65 20 95 20 95 L80 95 C80 95 80 65 50 65" fill="white" />
            </svg>
          </div>
          <div className="relative right-80">
            <p className="text-3xl font-semibold">Name: {mentee.name}</p>
            <p className="text-3xl mt-4">Scholar no.: {mentee.scholarNo}</p>
            <p className="text-3xl">Branch: {mentee.branch}</p>
            <p className="text-3xl">Faculty: {mentee.faculty} | Department: {mentee.department}</p>
          </div>
          <button className="right-0 bottom-0 mt-28 bg-white text-[#a91010] px-8 py-2 rounded-lg text-2xl font-bold cursor-pointer hover:bg-gray-200">
            CHAT
          </button>
        </div>

        {/* Contact Details */}
        <div className="bg-white p-12 mt-8 rounded-lg shadow-md">
          <h3 className="text-[#a91010] text-3xl font-bold">Details</h3>
          <p className="text-2xl mt-4"><strong>Email:</strong> {mentee.email}</p>
          <p className="text-2xl"><strong>Contact no.:</strong> {mentee.contact}</p>
          <p className="text-2xl"><strong>Present Address:</strong> {mentee.address}</p>
        </div>
      </div>

      {/* Action Buttons with Outer Box */}
      <div className="bg-gray-100 p-12 rounded-lg shadow-md mt-10">
        <div className="grid grid-cols-2 gap-8 text-4xl">
          {["General Information", "Documentation", "Minutes of Meeting", "Feedback",
            "Major Absence Record", "In-disciplinary Activities Record", "Academic Records",
            "Co-curricular Activities", "Internship Details", "Semester-Wise Records"].map((item, index) => (
            <button key={index} className="bg-gray-200 p-5 rounded-lg shadow-md font-semibold text-center cursor-pointer hover:bg-gray-300">
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenteeDetails;




// import React from "react";

// const MenteeDetails = ({ mentee }) => {
//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {/* Mentee Details Card */}
//       <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold text-[#a91010] text-center">Mentee Details</h2>
//           <hr className="border-none h-0.5 bg-[#a91010] mb-5" />
//         <div className="bg-[#a91010] text-white p-4 rounded-lg flex justify-between items-center">
//           <div className="w-24 h-24 mr-0 flex-shrink-0">
//             <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="50" cy="35" r="25" fill="white"/>
//               <path d="M50 65 C20 65 20 95 20 95 L80 95 C80 95 80 65 50 65" fill="white"/>
//             </svg>
//           </div>
//           <div>
//             <p className="text-lg font-semibold">Name: {mentee.name}</p>
//             <p>Scholar no.: {mentee.scholarNo}</p>
//             <p>Branch: {mentee.branch}</p>
//             <p>Faculty: {mentee.faculty} | Department: {mentee.department}</p>
//           </div>
//           <button className="right-0 bottom-0 bg-white text-[#a91010] px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-gray-200">
//             CHAT
//           </button>
//         </div>

//         {/* Contact Details */}
//         <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
//           <h3 className="text-[#a91010] font-bold">Details</h3>
//           <p><strong>Email:</strong> {mentee.email}</p>
//           <p><strong>Contact no.:</strong> {mentee.contact}</p>
//           <p><strong>Present Address:</strong> {mentee.address}</p>
//         </div>
//       </div>

//       {/* Action Buttons with Outer Box */}
//       <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
//         <div className="grid grid-cols-2 gap-4">
//           {["General Information", "Documentation", "Minutes of Meeting", "Feedback",
//             "Major Absence Record", "In-disciplinary Activities Record", "Academic Records",
//             "Co-curricular Activities", "Internship Details", "Semester-Wise Records"].map((item, index) => (
//             <button key={index} className="bg-gray-200 p-3 rounded-lg shadow-md font-semibold text-center cursor-pointer hover:bg-gray-300">
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenteeDetails;

// import React from 'react';

// function MenteeDetails() {
//   return (
//     <div className="p-5 bg-gray-100">
//       <div className="max-w-6xl mx-auto bg-gray-50 rounded-lg p-5 shadow-md">
//         <h1 className="text-center text-[#a91010] text-3xl font-bold mb-2.5">Mentee Details</h1>
//         <hr className="border-none h-0.5 bg-[#a91010] mb-5" />
        
//         <div className="bg-[#a91010] text-white rounded-lg p-5 flex items-center mb-5 shadow-md relative">
//           <div className="w-24 h-24 mr-5 flex-shrink-0">
//             <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="50" cy="35" r="25" fill="white"/>
//               <path d="M50 65 C20 65 20 95 20 95 L80 95 C80 95 80 65 50 65" fill="white"/>
//             </svg>
//           </div>
//           <div className="flex-grow">
//             <h2 className="text-2xl mb-2.5 font-medium">Name: xyz</h2>
//             <p className="mb-1.5 text-base font-normal">Scholar no.: XXXXXXX</p>
//             <p className="mb-1.5 text-base font-normal">Branch: CS-Core</p>
//             <p className="mb-1.5 text-base font-normal">Faculty: Engineering | Department: Computer Science</p>
//           </div>
//           <button className="absolute right-5 top-5 bg-white text-[#a91010] border-none rounded px-4 py-2 font-bold cursor-pointer">
//             CHAT
//           </button>
//         </div>
        
//         <div className="bg-white rounded-lg p-5 mb-5 shadow-md">
//           <h2 className="text-[#a91010] mb-4 text-xl font-bold">Details</h2>
//           <p className="mb-2.5 text-base font-normal">Email: enrollment@university.in</p>
//           <p className="mb-2.5 text-base font-normal">Contact no.: +91-1234567890</p>
//           <p className="mb-2.5 text-base font-normal">Present Address: house/flat no., colony/street no., city, district, state</p>
//         </div>
        
//         <div className="grid grid-cols-2 gap-2.5 mb-5 md:grid-cols-2 sm:grid-cols-1">
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             General Information
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             Documentation
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             Minutes of Meeting
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             Feedback
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             Major Absence Record
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             In-disciplinary Activities Record
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             Academic Records
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             Co-curricular Activities
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             Internship Details
//           </button>
//           <button className="bg-[#e0e0e0] border-none rounded py-4 px-4 text-lg cursor-pointer shadow hover:bg-[#d0d0d0] font-medium text-gray-800 text-center">
//             Semester-Wise Records
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MenteeDetails;