import { useEffect, useState } from "react";
import Modal1 from "./page1components/Modal1";
import axios from "axios";

const SemesterAccordion = ({ title, semNo, semActivities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState(semActivities); // Default rows

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const [showModal, setShowModal] = useState(false);

  // const addRow = () => {
  //   setRows([...rows, { record_id: rows.length + 1 }]);
  // };

  return (
    <div className="rounded-lg mb-2 pt-[3rem]">
      {/* Header Button */}
      <button
        className="h-[44.4px] w-[1350px] flex justify-between items-center  bg-[#C3C3C3]  p-3 rounded-xl"
        onClick={toggleAccordion}
      >
        <span className="font-bold text-[1.5rem] ">{title}</span>
        <span className=" text-[2rem] pr-[2rem]">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Expandable Content */}
      {isOpen && (
        <div className="bg-[#B72929] h-[262.48px] w-[1315.81px] mr-[1.4rem] ml-[1.4rem] pt-[2rem] rounded-b-xl">
          <div className="h-[33.7px] w-[1155.81px] pb-[10.7px]  gap-[17.12px] flex pt-[2.4rem] pl-[3.5rem]">
            <div className="h-[23px] w-[60.8px] text-[1.8rem] font-bold text-white  ">
              <p>Sr. No</p>
            </div>
            <div className="border-[1px] h-[1rem] pt-[2rem]"></div>
            <div className="h-[23px] w-[1030.19px] pr-[21.4px] pl-[10px] gap-[10.7px]">
              <div className="h-[23px] w-[65px] text-[1.8rem] font-bold text-white pl-[2rem]">
                <p>Details</p>
              </div>
            </div>
          </div>
          <table className="h-[115.8px] w-[1267.81px] bg-white ml-[2rem] mt-[2rem]  pt-[1.8rem] pl-[3.8rem]">
            <tbody className="">
              {rows.map((row) => (
                <tr key={row.record_id} className="border-black border-b">
                  <td className="p-2  text-center font-bold h-[23px] w-[70.8px] text-[1.8rem]  ">
                    {row.record_id}.
                  </td>
                  <td className="pl-[2rem] ">
                    {" "}
                    <div className="border h-[2.2rem] w-[0.2rem]  border-black "></div>
                  </td>

                  <td className="pl-[4rem] ">
                    <input
                      type="text"
                      className="w-[100rem]  p-2 rounded h-[3rem] text-[2rem] font-bold"
                      placeholder="Enter details..."
                      value={row.details}
                      onChange={(e) =>
                        handleInputChange(row.id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Another Button */}
          <div className="w-[1290px] h-[44.4px]  flex justify-end">
            <button
              className="mt-2 text-[1.5rem] bg-black text-white px-4 py-2 rounded-xl w-[160px] h-[40.05px] flex items-center justify-center"
              onClick={() => setShowModal(true)}
            >
              <span className="mr-2 text-[1.8rem] pr-[1rem]">+</span> Add
              another
            </button>
            {showModal && (
              <Modal1
                onClose={() => setShowModal(false)}
                setRows={setRows}
                semNo={semNo}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const semesters = new Map([
  [1, "Semester I"],
  [2, "Semester II"],
  [3, "Semester III"],
  [4, "Semester IV"],
  [5, "Semester V"],
  [6, "Semester VI"],
  [7, "Semester VII"],
  [8, "Semester VIII"],
]);

const CoCurricularActivity = () => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCoCurricularActivities() {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A";
      const scholar_no = 3; // Replace with dynamic value if needed
      try {
        const response = await axios.get(
          "http://localhost:3000/api/mentee/getCoCurricularDetails",
          {
            params: { scholar_no },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setActivityData(response.data.data.cocurricularActivities);
        console.log(response.data.data.cocurricularActivities);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCoCurricularActivities();
  }, []);

  return (
    <div className="w-[100rem]   mt-[5rem] ">
      <div>
        <h3 className="mx-[6rem] my-[3rem] font-inter font-bold text-[24px] leading-[29.05px]">
          CO-CURRICULAR ACTIVITES
        </h3>
      </div>
      {error && <div>{error}</div>}
      {loading ? (
        "...Loading"
      ) : (
        <div className="bg-[#F3F3F3] h-[1300px] w-[1400px] mx-[6rem]  shadow-[inset_0px_4.21px_4.21px_#00000040] gap-[10.53px] pt-[26.32px] pr-[31.58px] pl-[31.58px] pb-[26.32px]">
          {activityData.map((eachSemesterDetail, index) => (
            <SemesterAccordion
              key={index}
              title={semesters.get(eachSemesterDetail.semester_number)}
              semNo={eachSemesterDetail.semester_number}
              semActivities={eachSemesterDetail.details}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoCurricularActivity;
