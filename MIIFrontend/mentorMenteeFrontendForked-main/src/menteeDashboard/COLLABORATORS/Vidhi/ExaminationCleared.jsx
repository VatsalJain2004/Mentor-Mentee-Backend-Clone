import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const sections = [
  { title: "10th", key: "tenth", examName: "10thDetails" },
  { title: "12th / Diploma", key: "twelfth", examName: "12thDetails" },
  { title: "Bachelor’s Degree", key: "bachelors", examName: "bachelorDegree" },
  { title: "Master’s Degree", key: "masters", examName: "masterDegree" },
];

const FormSection = ({
  title,
  isOpen,
  toggleSection,
  openPopup,
  examDetails,
}) => {
  return (
    <div className="mb-10  rounded-lg">
      <div
        className="flex justify-between p-3 text-black rounded-xl font-inter text-[19.26px] h-[44.4px] w-[1300px]  font-semi-bold cursor-pointer bg-[#C3C3C3]"
        onClick={toggleSection}
      >
        <span>{title}</span>
        <span className="pr-[2rem] text-[2.5rem] place-self-center">
          {isOpen ? "−" : "+"}
        </span>
      </div>
      {isOpen && (
        <div className=" p-4 text-white bg-[#B72929] h-[262.48px] w-[1260.81px] mr-[1.4rem] ml-[2rem] pt-[2rem]  rounded-[5.35px]">
          <div className=" pl-[1rem]  flex h-[69.68px] w-[1190.81px] justify-between">
            <div className="w-[557.9px] h-[69.68px] ">
              <label htmlFor="" className="text-[1.8rem] ">
                {" "}
                Board / University
              </label>
              <br />
              <input
                disabled={true}
                value={examDetails?.University || ""}
                className="mt-[0.3rem] pt-[10.7px] pr-[21.4px] pb-[10.7px] pl-[21.4px] h-[44.4px] w-[600.9px] text-[1.5rem] gap-[10.7px] text-black bg-white "
                placeholder="enter detail"
              />
            </div>
            <div className="w-[557.9px] h-[69.68px]">
              <label htmlFor="" className="text-[1.8rem] ">
                {" "}
                Branch
              </label>
              <br />
              <input
                disabled={true}
                value={examDetails?.Branch || ""}
                className=" mt-[0.3rem] pt-[10.7px] pr-[21.4px] pb-[10.7px] pl-[21.4px] h-[44.4px] w-[600.9px] gap-[10.7px] text-[1.5rem] text-black bg-white "
                placeholder="enter detail"
              />
            </div>
          </div>
          <div className="flex gap-[4rem] h-[70px] w-[1351.81px] pr-[10px] pl-[10px]">
            <div className="gap-[4.28px] h-[69.68px] w-[371.98px] mt-[2rem]">
              <label htmlFor="" className="text-[1.8rem]">
                {" "}
                % Marks / CGPA
              </label>
              <br />
              <input
                disabled={true}
                value={examDetails?.cGPA || ""}
                className="h-[44.4px] w-[401.94px] gap-[10.7px] text-black bg-white mt-[0.3rem] pt-[10.7px] pr-[21.4px] pb-[10.7px] pl-[21.4px] text-[1.4rem]"
                placeholder="enter detail"
              />
              <br />
            </div>
            <div className="gap-[4.28px] h-[69.68px] w-[371.98px] mt-[2rem]">
              <label htmlFor="" className="text-[1.8rem]">
                {" "}
                Division
              </label>
              <br />
              <input
                disabled={true}
                value={examDetails?.Division || ""}
                className="h-[44.4px] w-[401.94px] gap-[10.7px] text-black bg-white mt-[0.3rem] pt-[10.7px] pr-[21.4px] pb-[10.7px] pl-[21.4px] text-[1.4rem]"
                placeholder="enter detail"
              />
              <br />
            </div>
            <div className="gap-[4.28px] h-[69.68px] w-[371.98px] mt-[2rem]">
              <label htmlFor="" className="text-[1.8rem]">
                {" "}
                Passing Year
              </label>
              <br />
              <input
                disabled={true}
                value={examDetails?.PassingYear || ""}
                className="h-[44.4px] w-[401.94px] gap-[10.7px] text-black bg-white mt-[0.3rem] pt-[10.7px] pr-[21.4px] pb-[10.7px] pl-[21.4px] text-[1.4rem]"
                placeholder="enter detail"
              />
              <br />
            </div>
          </div>

          {/* Button Container: Upload Marksheet on Left, Add on Right */}
          <div className="flex pr-[20px] pl-[20px] h-[44.4px] w-[1251.81px] mt-[4.3rem] justify-between">
            <div className="w-[1890.77px] h-[44.4px] gap-[10.7px]">
              <button className="px-[26.75px] pt-[0.6rem] text-[19.26px] text-white border-2 border-white bg-[#b72929] w-[252.31px] h-[44.4px] rounded-[5.35px] gap-[10.7px]">
                <p className="mb-[3rem]">+ Upload Marksheet</p>
              </button>
            </div>
            <div className="">
              <button
                className="px-[22px] py-[10px] text-white bg-black rounded-[5.35px] font-bold w-[123.04px] h-[43px] text-[1.6rem]"
                onClick={openPopup} // Trigger the popup when "Add" is clicked
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExaminationCleared = () => {
  const [openSections, setOpenSections] = useState({
    tenth: true,
    twelfth: true,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
  const [formData, setFormData] = useState({
    University: "",
    Branch: "",
    cGPA: "",
    Division: "",
    PassingYear: "",
  });
  const [examinationsClearedData, setExaminationsClearedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openPopup = (examName) => {
    setSelectedExam(examName);
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const handleChange = (e) => {
    const curValue = e.target.value;
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: curValue };
    });
    //       const {Branch,value}=e.target.value;
    //   setFormData((prevState) => {
    // return{...prevState,[Branch]:value};
    //   })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data submitted", formData);
    const examRecord = {
      ...examinationsClearedData,
      [selectedExam]: formData,
    };
    console.log(examRecord);
    const scholar_no = 4; // Replace with dynamic scholar_no if needed
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A"; // Replace with actual token
    const requestData = {
      scholar_no,
      examRecord,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/mentee/addExamClearedDetails",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setExaminationsClearedData(examRecord);
      // console.log("Success:", response.data.data.mom_record.slice(-1)[0]);
      // addNewRecord(response.data.data.mom_record.slice(-1)[0]); // Update UI with new record
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      closePopup();
    }
  };

  const [isOn, setIsOn] = useState(false);
  async function handleQualifyingExamToggle() {
    const examRecord = {
      ...examinationsClearedData,
      admission_through_JEE: !isOn,
    };
    console.log(examRecord);
    const scholar_no = 4; // Replace with dynamic scholar_no if needed
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A"; // Replace with actual token
    const requestData = {
      scholar_no,
      examRecord,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/mentee/addExamClearedDetails",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setExaminationsClearedData(examRecord);
      setIsOn((cur) => !cur);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  }

  useEffect(() => {
    async function getExamimnationsClearedData() {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A";
        const scholar_no = 4; // Replace with dynamic value if needed

        const response = await axios.get(
          "http://localhost:3000/api/mentee/getExamClearedDetails",
          {
            params: { scholar_no },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setExaminationsClearedData(response.data.data.examRecord);
        setIsOn(response.data.data.examRecord.admission_through_JEE);
      } catch (error) {
        if (
          error.response.data.message !=
          "No record found for this scholar number"
        ) {
          setError(error);
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    }
    getExamimnationsClearedData();
  }, []);

  return (
    <div className="h-[801.8px] w-[1240px] gap-[25px] pt-[20px] pb-[40px]">
      <div>
        <h3 className="mx-[6rem] my-[4rem] font-inter font-bold text-[24px] leading-[29.05px]">
          EXAMINATION CLEARED
        </h3>
      </div>
      {loading ? (
        <div>...Loading Data</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <div className="bg-[#F3F3F3] h-[900px] w-[1370px] mx-[6rem]  shadow-[inset_0px_4.21px_4.21px_#00000040] gap-[10.53px] pt-[26.32px] pr-[31.58px] pl-[31.58px] pb-[26.32px]">
            <div className="w-[1176.84px] h-[467.32] gap-[10.53px]">
              {sections.map(({ title, key, examName }) => (
                <FormSection
                  key={key}
                  title={title}
                  isOpen={openSections[key] || false}
                  toggleSection={() => toggleSection(key)}
                  openPopup={() => openPopup(examName)}
                  examDetails={examinationsClearedData[examName] || {}}
                />
              ))}

              <div
                className="flex justify-between p-3 text-black rounded-xl font-inter text-[19.26px] h-[44.4px] w-[1300px]  font-semi-bold cursor-pointer bg-[#C3C3C3]"
                onClick={toggleSection}
              >
                <p> Admission Through (JEE / Qualifying Exam)</p>
                <button
                  onClick={handleQualifyingExamToggle}
                  className={`relative w-[53.32px] h-[27.35px] mr-[1rem] flex items-center rounded-full  transition-all ${
                    isOn ? "bg-green-600" : "bg-[#DADEE3]"
                  }`}
                >
                  <div
                    className={`w-[24.61px] h-[24.61px] bg-white rounded-full shadow-md transform transition-all ${
                      isOn ? "translate-x-11" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm">
          <div className="h-[223.88px] w-[600px] bg-white rounded-xl flex flex-col p-[1.3rem] place-self-center mt-[28rem]">
            <div className="h-[37.54px] w-[573.33px] gap-[6.67px] flex justify-between bg-[#C3C3C3] rounded-t-[3.33px] pt-[6.67px] pb-[6.67px] pl-[16.67px] pr-[16.67px]">
              <h5 className="h-[15px] w-[100px] text-[1.3rem] pt-[1.5px] font-semibold whitespace-nowrap">
                Add New Record
              </h5>
              <button onClick={closePopup} className="place-self-end">
                <X size={20} />
              </button>
            </div>
            <div className="h-[159.67px] w-[573.33px] rounded-b-[3.33px] p-[13.33px] bg-[#B72929]">
              <form onSubmit={handleSubmit}>
                <div className="h-[264.33px] w-[546.67px]">
                  <div className="h-[44px] w-[564.67px] flex  ">
                    <div className="h-[44px] w-[269.83px]  text-white font-semibold text-[12px] ">
                      <label htmlFor="Activities">Board / University </label>
                      <br />
                      <input
                        type="text"
                        name="University"
                        value={formData.University}
                        onChange={handleChange}
                        placeholder="   enter details :"
                        className="bg-white text-left text-[1.2rem] mt-[0.3rem] h-[28.33px] w-[256.5px] place-self-start text-black pt-[6.67px] pb-[6.67px] pr-[13.33px] pl-[13.33px]"
                      />
                    </div>
                    <div className="h-[44px] w-[269.83px]  text-white font-semibold text-[12px] pr-[6.67px] pl-[6.67px] gap-[2.67px]">
                      <label htmlFor="Activities">Branch </label>
                      <br />
                      <input
                        type="text"
                        name="Branch"
                        value={formData.Branch}
                        onChange={handleChange}
                        placeholder="   enter details :"
                        className="bg-white text-left text-[1.2rem] h-[28.33px] w-[256.5px]  place-self-start text-black mt-[0.3rem] pt-[6.67px] pb-[6.67px] pr-[13.33px] pl-[13.33px] "
                        style={{ paddingLeft: "10px" }}
                      />
                    </div>
                  </div>
                  <div className="h-[44px] w-[546.67px]  flex justify-between">
                    <div className="h-[44px] w-[182.22px] gap-[2.67px] pl-[6.67px] pr-[6.67px] text-white font-semibold text-[12px] mt-[1rem]">
                      <label htmlFor="Activities">% Marks / CGPA </label>
                      <br />
                      <input
                        type="text"
                        name="cGPA"
                        value={formData.cGPA}
                        onChange={handleChange}
                        placeholder="   enter details :"
                        className="bg-white text-left text-[1rem] h-[28.33px] w-[168.89px]  place-self-start text-black mt-[0.3rem] pt-[6.67px] pb-[6.67px] pr-[13.33px] pl-[13.33px] "
                      />
                    </div>
                    <div className="h-[44px] w-[182.22px] gap-[2.67px] pl-[6.67px] pr-[6.67px] text-white font-semibold text-[12px] mt-[1rem]">
                      <label htmlFor="Activities">Division </label>
                      <br />
                      <input
                        type="text"
                        name="Division"
                        value={formData.Division}
                        onChange={handleChange}
                        placeholder="   enter details :"
                        className="bg-white text-left text-[1.2rem] h-[28.33px] w-[168.89px]  place-self-start text-black mt-[0.3rem] pt-[6.67px] pb-[6.67px] pr-[13.33px] pl-[13.33px] "
                        style={{ paddingLeft: "10px" }}
                      />
                    </div>
                    <div className="h-[44px] w-[182.22px] gap-[2.67px] pl-[6.67px] pr-[6.67px] text-white font-semibold text-[12px] mt-[1rem]">
                      <label htmlFor="Activities">
                        Passing Year
                        <br />
                        <input
                          type="number"
                          name="PassingYear"
                          value={formData.PassingYear}
                          onChange={handleChange}
                          placeholder="   enter details :"
                          className="bg-white text-left text-[1.2rem] h-[28.33px] w-[168.89px]  place-self-start text-black mt-[0.3rem] pt-[6.67px] pb-[6.67px] pr-[13.33px] pl-[13.33px] "
                          style={{ paddingLeft: "10px" }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className=" ml-[49rem] mt-[2.2rem] h-[28.33px] w-[76.67] rounded-[6.67px] gap-[6.67px] pt-[6.67px] pb-[6.67px] pl-[13.33px] pr-[13.33px] bg-black text-white text-center "
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminationCleared;
