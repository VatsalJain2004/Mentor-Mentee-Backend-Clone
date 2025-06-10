import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

function Modal1({ onClose, setRows, semNo }) {
  const [details, setdetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDetailsChange = (event) => setdetails(event.target.value);

  const handleAddDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const scholar_no = 3; // Replace with dynamic scholar_no if needed
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A"; // Replace with actual token

    const sendData = {
      scholar_no,
      cocurricularActivities: [
        {
          semester_number: semNo,
          details: details,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/mentee/addCoCurricularDetails",
        sendData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data.data); // TODO
      setRows((curRows) => [
        ...curRows,
        { record_id: curRows.length + 1, details: details },
      ]); // Update UI with new record
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to add activity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //   const handleAddDetails = (event) => {
  //     event.preventDefault();
  //     setRows((curRows) => [
  //       ...curRows,
  //       { id: curRows.length + 1, details: details },
  //     ]);
  //     onClose();
  // alert(` Details : ${details}\n`);
  //   };

  //   const addRow = () => {
  // setRows((curRows) => [
  //   ...curRows,
  //   { id: curRows.length + 1, details: details },
  // ]);
  //   };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm">
      <div className="h-[244.88px] w-[600px] bg-white rounded-xl flex flex-col p-[1.3rem] place-self-center mt-[28rem]">
        <div className="h-[37.54px] w-[573.33px] gap-[6.67px] flex justify-between bg-[#C3C3C3] rounded-t-[3.33px] pt-[6.67px] pb-[6.67px] pl-[16.67px] pr-[16.67px]">
          <h5 className="h-[15px] w-[100px] text-[1.3rem] pt-[1.5px] font-semibold">
            Add New Record
          </h5>
          <button onClick={onClose} className="place-self-end">
            <X size={20} />
          </button>
        </div>
        <div className="h-[180.67px] w-[573.33px] rounded-b-[3.33px] p-[13.33px] bg-[#B72929]">
          <form action="" onSubmit={handleAddDetails}>
            <div className="h-[264.33px] w-[546.67px]">
              <div className="h-[44px] w-[564.67px]  text-white font-semibold text-[12px]  ">
                <label htmlFor="Activities">Details </label>
                <br />
                <input
                  type="text"
                  id="activityInput"
                  value={details}
                  onChange={handleDetailsChange}
                  placeholder="   enter details :"
                  className="bg-white text-left text-[1.5rem] h-[9.8rem] w-[533.33px] mt-[0.5rem]  pb-[5rem] place-self-start text-black "
                  style={{ paddingLeft: "10px" }}
                />
              </div>
              <br />
              {error ? (
                <div>{error}</div>
              ) : (
                <div>
                  <button
                    type="submit"
                    className=" ml-[49rem] mt-[7.2rem] h-[28.33px] w-[76.67] rounded-[6.67px] gap-[6.67px] pt-[6.67px] pb-[6.67px] pl-[13.33px] pr-[13.33px] bg-black text-white text-center "
                    //   onClick={addRow}
                  >
                    {loading ? "...Adding" : "Add"}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal1;
