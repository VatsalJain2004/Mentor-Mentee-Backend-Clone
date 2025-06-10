import { IoClose } from "react-icons/io5";
import propTypes, { func } from "prop-types";
import Input from "./addNewRecordComponent/input";
import { useParams } from "react-router";
import { useSemesterRecords } from "../../context/SemesterRecordsContext";
import { useState } from "react";
import axios from "axios";

const AddNewRecord = ({ title, onClose, details = {} }) => {
  const { setSemesterRecordsData } = useSemesterRecords();
  const { value: semNo } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const existingData = details;

  // Function to determine if a field should be disabled
  const isFieldDisabled = (field) =>
    existingData[field] !== undefined && existingData[field] !== null;

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues); // Logs an object with all form inputs

    setLoading(true);
    setError(null);

    const scholar_no = 3; // Replace with dynamic scholar_no if needed
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A"; // Replace with actual token
    const sendData = {
      scholar_no: scholar_no,
      semesterrecords: [{ courses: [formValues], semester_number: +semNo }],
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/mentee/addSemesterWiseDetails",
        sendData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data.data); // TODO
      setSemesterRecordsData(response.data.data.semester_details); // Update UI with new record
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to add activity. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-4xl bg-white rounded-[10px] shadow-sm mx-5 md:mx-0">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b bg-[#c3c3c3] rounded-s-[2px] rounded-t-[2px]">
          <h3 className="capitalize text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-black text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <IoClose size={20} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-5 space-y-4 bg-[#b72929] rounded-e-[2px] rounded-b-[2px]">
          <form
            className="w-full mx-auto grid grid-cols-12 gap-x-2 sm:gap-x-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-5 col-span-12">
              <Input
                title="Course Registered"
                id="course_code"
                defaultValue={existingData.course_code || ""}
                disabled={isFieldDisabled("course_code")}
              />
            </div>

            <div className="mb-5 col-span-4">
              <Input
                title="Mid Sem I Marks"
                id="mid_sem1_marks"
                defaultValue={existingData.mid_sem1_marks || ""}
                disabled={isFieldDisabled("mid_sem1_marks")}
              />
            </div>

            <div className="mb-5 col-span-4">
              <Input
                title="Mid Sem II Marks"
                id="mid_sem2_marks"
                defaultValue={existingData.mid_sem2_marks || ""}
                disabled={isFieldDisabled("mid_sem2_marks")}
              />
            </div>

            <div className="mb-5 col-span-4">
              <Input
                title="End Term Marks/Grade"
                id="end_term_marks"
                defaultValue={existingData.end_term_marks || ""}
                disabled={isFieldDisabled("end_term_marks")}
              />
            </div>

            <div className="col-span-12 sm:col-span-6 mb-5 sm:mb-0">
              <p className="block text-sm font-medium text-white">
                Attendance %
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-2 sm:gap-x-0 sm:gap-y-1">
                {["theory", "practical"].map((label, index) => (
                  <div
                    key={index}
                    className="w-full grid grid-cols-12 bg-white py-2.5"
                  >
                    <label
                      htmlFor={`${label}_attendance`}
                      className="text-md font-bold text-black col-span-5 sm:col-span-3 border-r border-black h-full px-2.5 flex place-content-center place-items-center capitalize"
                    >
                      {label}
                    </label>
                    <input
                      type="text"
                      id={`${label}_attendance`}
                      name={`${label}_attendance`}
                      className="text-gray-900 text-sm block w-full col-span-7 sm:col-span-9 px-2.5 outline-none"
                      placeholder="Enter details"
                      defaultValue={existingData[`${label}_attendance`] || ""}
                      disabled={isFieldDisabled(`${label}_attendance`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 col-span-12 sm:col-span-6">
              <p className="block text-sm font-medium text-white">
                Quiz/Assignments
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-1">
                {["1", "2", "3", "4", "5"].map((label, index) => (
                  <div
                    key={index}
                    className="col-span-1 w-full grid grid-cols-12 bg-white py-2.5"
                  >
                    <label
                      htmlFor={`quiz_assignment_${label}_marks`}
                      className="text-md font-bold text-black col-span-2 border-r border-black h-full px-2.5 flex place-content-center place-items-center uppercase"
                    >
                      {label}
                    </label>
                    <input
                      type="text"
                      id={`quiz_assignment_${label}_marks`}
                      name={`quiz_assignment_${label}_marks`}
                      className="text-gray-900 text-sm block w-full col-span-9 px-2.5 outline-none"
                      placeholder="Enter details"
                      defaultValue={
                        existingData[`quiz_assignment_${label}_marks`] || ""
                      }
                      disabled={isFieldDisabled(
                        `quiz_assignment_${label}_marks`
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 col-span-12">
              <label
                htmlFor="remark"
                className="block text-sm font-medium text-white capitalize"
              >
                Remark
              </label>
              <textarea
                id="remarks"
                name="remarks"
                rows="4"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 outline-none"
                placeholder="Enter details"
                defaultValue={existingData.remarks || ""}
                disabled={isFieldDisabled("remarks")}
              ></textarea>
            </div>

            <div className="col-span-12 flex justify-end">
              <button
                className="text-white bg-black font-bold rounded-[5px] text-lg px-10 py-2.5 col-span-2"
                type="submit"
              >
                {error && error}
                {loading ? "...Loading" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AddNewRecord.propTypes = {
  title: propTypes.string,
  onClose: propTypes.func.isRequired,
  details: propTypes.object,
};

export default AddNewRecord;
