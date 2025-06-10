import { BiEdit } from "react-icons/bi";
import React from "react";
import propTypes from "prop-types";
import { useState } from "react";
import AddNewRecord from "./AddNewRecord";

const SemesterDetailTableBody = ({ semesterDetails = [
  {
    course_code: "CS3C011",
    mid_sem_i_marks: 30,
    mid_sem_ii_marks: 30,
    end_term_marks: null,
    practical_marks: null,
    practical_attendance: null,
    theory_attendance: null,
    presentation_i: null,
    presentation_ii: null,
    remark: null
  },
  {
    course_code: "CS3C012",
    mid_sem_i_marks: 30,
    mid_sem_ii_marks: 30,
    end_term_marks: null,
    practical_marks: null,
    practical_attendance: null,
    theory_attendance: null,
    presentation_i: null,
    presentation_ii: null,
    remark: null
  },
  {
    course_code: "CS3C013",
    mid_sem_i_marks: 30,
    mid_sem_ii_marks: 30,
    end_term_marks: null,
    practical_marks: null,
    practical_attendance: null,
    theory_attendance: null,
    presentation_i: null,
    presentation_ii: null,
    remark: null
  }] }) => {

  // State to track the selected row details
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Define the keys we want to display in the order they should appear
  const columns = [
    "course_code",
    "mid_sem_i_marks",
    "mid_sem_ii_marks",
    "end_term_marks",
    "practical_marks",
    "practical_attendance",
    "theory_attendance",
    "presentation_i",
    "presentation_ii",
    "remark"
  ];

  return (
    <tbody>
      {semesterDetails.map((detail, index) => (
        <tr
          key={index}
          className="bg-[#a01212] text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-xl"
        >
          {columns.map((key, i) => (
            <React.Fragment key={i}>
              <td className={`px-6 py-4 ${key === "remark" ? "w-80" : ""}`}>
                {detail[key]}
              </td>
              <td className="py-3 h-0" style={{ display: key === "remark" ? "none" : "table-cell" }}>
                <div className="h-full w-1 border-r border-white"></div>
              </td>
            </React.Fragment>
          ))}
          {/* Edit Button */}
          <td className="px-6 py-4">
            <button onClick={() => setSelectedDetail(detail)}>
              <BiEdit size={20} />
            </button>
          </td>
        </tr>
      ))}
      
      {/* Modal Component - Show only if selectedDetail exists */}
      {selectedDetail && (
        <AddNewRecord
          title="Update Details"
          isOpen={!!selectedDetail} // Convert object to boolean
          onClose={() => setSelectedDetail(null)}
          details={selectedDetail}
        />
      )}
    </tbody>
  );
};

SemesterDetailTableBody.propTypes = {
  semesterDetails: propTypes.array
};

export default SemesterDetailTableBody;
