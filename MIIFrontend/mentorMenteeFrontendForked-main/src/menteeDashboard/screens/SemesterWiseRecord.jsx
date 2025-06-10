import { useEffect, useState } from "react";
import SemesterWiseRecordNavigationButton from "../components/semesterWiseRecords/SemesterWiseRecordNavigationButton";
import propTypes from "prop-types";
import axios from "axios";
import { useSemesterRecords } from "../context/SemesterRecordsContext";
const SemesterWiseRecord = () => {
  const { setSemesterRecordsData, semesterRecordsData } = useSemesterRecords();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetching semesterRecords
  useEffect(() => {
    const getSemesterRecords = async () => {
      const scholar_no = 3;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A";
      try {
        const response = await axios.get(
          "http://localhost:3000/api/mentee/getSemesterWiseDetails",
          {
            params: { scholar_no: scholar_no },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSemesterRecordsData(response.data.data.semester_details);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getSemesterRecords();
  }, []);
  return (
    <>
      <div className="w-full">
        <div className="w-full px-5 sm:px-10 py-3 font-[arial] font-semibold">
          <h1 className="my-7 uppercase text-5xl">Semester wise Record</h1>
          {error && error}
          {loading ? (
            "...Loading"
          ) : (
            <div className="mx-auto max-w-full p-4 px-10 bg-[#f3f3f3] shadow-[#b9b9b9] shadow-inner mb-5">
              <h1 className="text-4xl my-5">Select Semester</h1>
              <SemesterWiseRecordNavigationButton
                currentSem={semesterRecordsData.length + 1}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

SemesterWiseRecord.propTypes = {
  currentSem: propTypes.any,
};
export default SemesterWiseRecord;
