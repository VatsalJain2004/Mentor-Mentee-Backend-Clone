import { useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import AddNewRecord from "./AddNewRecord"; 
import { FaPlus } from "react-icons/fa6";
import SemesterDetailTableBody from "./SemesterDetailTableBody";
import { Key } from "lucide-react";

const SemesterDetail = () => {
  const { value } = useParams();
  const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  // State to handle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full px-5 sm:px-10 py-3 font-[arial] font-semibold text-xl">
      <h1 className="my-7 uppercase text-5xl">Semester {semester[value - 1]}</h1>
      <div className="mx-auto max-w-full p-4 px-5 md:px-10 bg-[#f3f3f3] shadow-[#b9b9b9] shadow-inner">
        <h1 className="text-3xl my-5">Exam</h1>
        <div className="relative overflow-x-auto bg-white p-3 pt-0 my-3 border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-2xl text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {["Course Registration", "Mid Sem I Marks", "Mid Sem II Marks", "End Term Marks/Grade", "Practical Marks/Grade", "Attendance %", "Presentation", "Remark"].map((title, index) => (
                  <React.Fragment key={index}>
                    <th scope="col" className={"px-6 py-3"} rowSpan={["Attendance %", "Presentation"].indexOf(title) >= 0 ? 1 : 2} colSpan={["Attendance %", "Presentation", "Remark"].indexOf(title) >= 0 ? title == "Remark" ? 2 : 3 : 1}>
                      {title}
                    </th>
                    <th className="py-3 h-0" rowSpan={2} style={{display: title == "Remark" ? 'none' : 'table-cell'}}>
                      <div className="h-full w-1 border-r border-black"></div>
                    </th>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {["P", "T", "I", "II"].map((title, index) => (
                  <React.Fragment key={index}>
                    <th scope="col" className="px-6 py-3 text-center">
                      {title}
                    </th>
                    <th className="py-3 h-0" style={{ display: index % 2 == 0 ? 'table-cell' : 'none' }}>
                      <div className="h-full w-1 border-r border-black"></div>
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            {<SemesterDetailTableBody />}
          </table>
        </div>

        <div className="flex justify-between">
          <button type="button" className="flex items-center justify-center text-white bg-[#a01212] font-medium rounded-[5px] text-lg px-5 py-2.5">
            <FaPlus className="inline" size={20} />
            <span className="px-2 text-2xl font-bold">Upload Document</span>
          </button>

          {/* Open Modal Button */}
          <button onClick={() => setIsModalOpen(true)} className="text-white bg-black font-bold rounded-[5px] text-lg px-10 py-2.5">
            Add
          </button>
        </div>
      </div>

      {/* Modal Component */}
      <AddNewRecord title={"Add New Record"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SemesterDetail;
