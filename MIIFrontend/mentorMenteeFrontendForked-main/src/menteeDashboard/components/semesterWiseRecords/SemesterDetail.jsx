import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SemesterDetailTable from "./SemesterDetailTable";
import AddNewRecord from "./AddNewRecord"; // Import Modal Component
import { FaPlus } from "react-icons/fa6";
import { useSemesterRecords } from "../../context/SemesterRecordsContext";

const SemesterDetail = () => {
  const { semesterRecordsData } = useSemesterRecords();
  const { value } = useParams();
  const navigate = useNavigate();
  const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  // State to handle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (semesterRecordsData.length == 0) {
      navigate("/mentee/semesterWiseRecords");
    }
  }, []);
  return (
    <div className="w-full px-5 sm:px-10 py-3 font-[arial] font-semibold">
      <h1 className="my-7 uppercase text-5xl">
        Semester {semester[value - 1]}
      </h1>
      <div className="mx-auto max-w-full p-4 px-5 md:px-10 bg-[#f3f3f3] shadow-[#b9b9b9] shadow-inner">
        <h1 className="text-3xl my-5">Exam</h1>
        {semesterRecordsData.length > 0 && (
          <SemesterDetailTable
            resultData={semesterRecordsData.find(
              (element) => element.semester_number == value
            )}
          />
        )}

        <div className="flex justify-between">
          <button
            type="button"
            className="flex items-center justify-center text-white bg-[#a01212] font-medium rounded-[5px] text-lg px-5 py-2.5"
          >
            <FaPlus className="inline" size={20} />
            <span className="px-2 text-2xl font-bold">Upload Document</span>
          </button>

          {/* Open Modal Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white bg-black font-bold rounded-[5px] text-lg px-10 py-2.5"
          >
            Add
          </button>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <AddNewRecord
          title={"Add New Record"}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SemesterDetail;
