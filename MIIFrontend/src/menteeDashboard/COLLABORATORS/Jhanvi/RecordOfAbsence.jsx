import { useState, useEffect } from "react";
import axios from "axios";
const RecordOfAbsence = () => {
  const [absenceRecords, setAbsenceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scholar_no = 3; // Replace with dynamic value if needed

  useEffect(() => {
    const fetchAbsenceRecords = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk0MzQ0MDEsImV4cCI6MTczOTQzODAwMX0.V5qR5Nac0p9fNXd8h5tozR8jwI86FPZ5Oe1Pn4cxen4";
        const response = await axios.get(
          "http://localhost:3000/api/mentee/getRecordofMajorAbsenceDetails",
          {
            params: { scholar_no },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          setAbsenceRecords(response.data.data.majorabsence || []);
          console.log(response.data.data.majorabsence);
        } else {
          setAbsenceRecords([]);
        }
      } catch (err) {
        console.error("Error fetching absence records:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAbsenceRecords();
  }, []);

  return (
    <>
      <div className="h-[801.8px] w-[1240px] gap-[25px] pt-[20px] pb-[40px]">
        <div>
          <h3 className="mx-[6rem] my-[4rem] font-inter font-bold text-[24px] leading-[29.05px]">
            RECORDS OF MAJOR ABSENCE
          </h3>
        </div>
        <div>
          <div className="bg-[#F3F3F3] h-[667.8px] w-[1240px] mx-[6rem] shadow-[inset_0px_4.21px_4.21px_#00000040] gap-[10.53px] pt-[26.32px] pr-[31.58px] pl-[31.58px] pb-[26.32px]">
            <div className="bg-white h-[412.74px] w-[1176.84px] border-[0.63px] gap-[6.32px] pt-[10.53px] pr-[15.79px] pl-[15.79px] pb-[15.79px]">
              {/* Table Header */}
              <div className="w-full bg-[#F3F3F3] text-black font-bold flex p-4">
                <div className="w-[10%] text-center font-inter text-[18.96px] font-semi-bold border-r border-black">
                  Sr. No
                </div>
                <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold border-r border-black">
                  From
                </div>
                <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold border-r border-black">
                  To
                </div>
                <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold">
                  Reason
                </div>
              </div>

              {loading && <p className="text-center mt-4">Loading...</p>}
              {error && (
                <p className="text-center mt-4 text-red-500">{error}</p>
              )}

              {/* Table Rows */}

              <div className="mt-4">
                {absenceRecords.map((item, i) => (
                  <div
                    key={i}
                    className="w-full bg-[#a01212] text-white flex border-b border-[#f3f3f3] p-4"
                  >
                    <div className="w-[10%] text-center font-inter text-[18.96px] font-semi-bold border-r border-white">
                      {i + 1}
                    </div>
                    <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold border-r border-white">
                      {item.period_from}
                    </div>
                    <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold border-r border-white">
                      {item.period_to}
                    </div>
                    <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold">
                      {item.reason}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button className="px-8 py-4 text-3xl h-[44.05px] w-[121.05px] text-white bg-black rounded-[10.35px] hover:bg-gray-800">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordOfAbsence;

// code with logic
/*
import { useState, useEffect } from "react";
import axios from "axios";

const RecordOfAbsence = () => {
  const [absenceRecords, setAbsenceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scholar_no = 3; // Replace with dynamic value if needed

  useEffect(() => {
    const fetchAbsenceRecords = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk0MzQ0MDEsImV4cCI6MTczOTQzODAwMX0.V5qR5Nac0p9fNXd8h5tozR8jwI86FPZ5Oe1Pn4cxen4";
        const response = await axios.get(
          "http://localhost:3000/api/mentee/getRecordofMajorAbsenceDetails",
          {
            params: { scholar_no },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          setAbsenceRecords(response.data.data.majorabsence || []);
        } else {
          setAbsenceRecords([]);
        }
      } catch (err) {
        console.error("Error fetching absence records:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchAbsenceRecords();
  }, []);

  return (
    <div className="h-[801.8px] w-[1240px] gap-[25px] pt-[20px] pb-[40px]">
      <h3 className="mx-[6rem] my-[4rem] font-inter font-bold text-[24px] leading-[29.05px]">
        RECORDS OF MAJOR ABSENCE
      </h3>

      <div className="bg-[#F3F3F3] h-[667.8px] w-[1240px] mx-[6rem] shadow-[inset_0px_4.21px_4.21px_#00000040] gap-[10.53px] pt-[26.32px] pr-[31.58px] pl-[31.58px] pb-[26.32px]">
        <div className="bg-white h-[412.74px] w-[1176.84px] border-[0.63px] gap-[6.32px] pt-[10.53px] pr-[15.79px] pl-[15.79px] pb-[15.79px]">
          <div className="w-full bg-[#F3F3F3] text-black font-bold flex p-4">
            <div className="w-[10%] text-center font-inter text-[18.96px] font-semi-bold border-r border-black">
              Sr. No
            </div>
            <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold border-r border-black">
              From
            </div>
            <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold border-r border-black">
              To
            </div>
            <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold">
              Reason
            </div>
          </div>

          {loading && <p className="text-center mt-4">Loading...</p>}
          {error && <p className="text-center mt-4 text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="mt-4">
              {absenceRecords.length > 0 ? (
                absenceRecords.map((record, index) => (
                  <div
                    key={record.recordNo}
                    className="w-full bg-[#a01212] text-white flex border-b border-[#f3f3f3] p-4"
                  >
                    <div className="w-[10%] text-center font-inter text-[18.96px] font-semi-bold border-r border-white">
                      {index + 1}
                    </div>
                    <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold border-r border-white">
                      {record.period_from}
                    </div>
                    <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold border-r border-white">
                      {record.period_to}
                    </div>
                    <div className="w-[30%] text-center font-inter text-[18.96px] font-semi-bold">
                      {record.reason}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-4">No records found.</p>
              )}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button className="px-8 py-4 text-3xl h-[44.05px] w-[121.05px] text-white bg-black rounded-[10.35px] hover:bg-gray-800">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordOfAbsence;
*/
