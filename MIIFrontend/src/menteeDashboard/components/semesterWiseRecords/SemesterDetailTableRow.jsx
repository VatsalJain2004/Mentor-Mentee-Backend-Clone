import { BiEdit } from "react-icons/bi";
import propTypes from "prop-types";
import { useState } from "react";
import AddNewRecord from "./AddNewRecord";

const SemesterDetailTableRow = ({ detail = {} }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <tr className="bg-[#a01212] text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-xl">
      <th
        scope="row"
        className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
      >
        {detail.course_code}
      </th>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.mid_sem1_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.mid_sem2_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.end_term_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.practical_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.practical_attendance}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.theory_attendance}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.quiz_assignment_1_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.quiz_assignment_2_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.quiz_assignment_3_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.quiz_assignment_4_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.quiz_assignment_5_marks}</td>
      <td className="py-3 h-0">
        <div className="h-full w-1 border-r border-white"></div>
      </td>
      <td className="px-6 py-4">{detail.remarks}</td>
      <td className="px-6 py-4">
        <button onClick={() => setIsModalOpen(true)}>
          <BiEdit size={20} />
        </button>
        {/* Modal Component */}
        {isModalOpen && (
          <AddNewRecord
            title={"Update Details"}
            onClose={() => setIsModalOpen(false)}
            details={detail}
          />
        )}
      </td>
    </tr>
  );
};

export default SemesterDetailTableRow;
