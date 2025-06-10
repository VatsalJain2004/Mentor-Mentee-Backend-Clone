import { useState } from "react";
import Modal from "./page1components/Modal";

const IndisciplineRecord = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [date4, setDate4] = useState("");
  const [date5, setDate5] = useState("");

  const [activity1, setactivity1] = useState("");
  const [activity2, setactivity2] = useState("");
  const [activity3, setactivity3] = useState("");
  const [activity4, setactivity4] = useState("");
  const [activity5, setactivity5] = useState("");

  const [punishment1, setpunishment1] = useState("");
  const [punishment2, setpunishment2] = useState("");
  const [punishment3, setpunishment3] = useState("");
  const [punishment4, setpunishment4] = useState("");
  const [punishment5, setpunishment5] = useState("");

  const [remarks1, setremarks1] = useState("");
  const [remarks2, setremarks2] = useState("");
  const [remarks3, setremarks3] = useState("");
  const [remarks4, setremarks4] = useState("");
  const [remarks5, setremarks5] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleAddDetails = (event) => {
    event.preventDefault();
    alert(
      `Activity: ${activity}\nPunishment: ${punishment}\nRemarks: ${remarks} Date: ${selectedDate}\n`
    );
  };

  const handleDateChange1 = (event) => setDate1(event.target.value);
  const handleDateChange2 = (event) => setDate2(event.target.value);
  const handleDateChange3 = (event) => setDate3(event.target.value);
  const handleDateChange4 = (event) => setDate4(event.target.value);
  const handleDateChange5 = (event) => setDate5(event.target.value);

  const handleActivityChange1 = (event) => setactivity1(event.target.value);
  const handleActivityChange2 = (event) => setactivity2(event.target.value);
  const handleActivityChange3 = (event) => setactivity3(event.target.value);
  const handleActivityChange4 = (event) => setactivity4(event.target.value);
  const handleActivityChange5 = (event) => setactivity5(event.target.value);

  const handlePunishmentChange1 = (event) => setpunishment1(event.target.value);
  const handlePunishmentChange2 = (event) => setpunishment2(event.target.value);
  const handlePunishmentChange3 = (event) => setpunishment3(event.target.value);
  const handlePunishmentChange4 = (event) => setpunishment4(event.target.value);
  const handlePunishmentChange5 = (event) => setpunishment5(event.target.value);

  const handleRemarksChange1 = (event) => setremarks1(event.target.value);
  const handleRemarksChange2 = (event) => setremarks2(event.target.value);
  const handleRemarksChange3 = (event) => setremarks3(event.target.value);
  const handleRemarksChange4 = (event) => setremarks4(event.target.value);
  const handleRemarksChange5 = (event) => setremarks5(event.target.value);

  return (
    <>
      <div className="h-[801.8px] w-[1240px] gap-[25px] pt-[20px] pb-[40px]">
        <div>
          <h3 className="mx-[6rem] my-[4rem] font-inter font-bold text-[24px] leading-[29.05px]">
            RECORDS OF IN-DISCIPLINARY ACTIVITIES
          </h3>
        </div>
        <div>
          <div className="bg-[#F3F3F3] h-[700.8px] w-[1400px] mx-[6rem]  shadow-[inset_0px_4.21px_4.21px_#00000040] gap-[10.53px] pt-[26.32px] pr-[31.58px] pl-[31.58px] pb-[26.32px]">
            <div className="w-[1176.84px] h-[467.32] gap-[10.53px]">
              <div className="bg-white h-[412.74px] w-[1325.90px] border-[0.63px] gap-[6.32px] pt-[10.53px] pr-[15.79px] pl-[15.79px] pb-[15.79px]">
                <div className="h-[28.26px] w-[1070px] pb-[30px] flex justify-around">
                  <div className="h-[132px] w-[23px]  font-inter text-[18.95px] font-bold ">
                    Date
                  </div>

                  <div className="h-[337.75px] w-[23px]   font-inter text-[18.95px] font-bold">
                    Activities
                  </div>

                  <div className="h-[337.75px] w-[23px]   font-inter text-[18.95px] font-bold">
                    Punishment
                  </div>

                  <div className="h-[337.75px] w-[23px]   font-inter text-[18.95px] font-bold">
                    Remarks
                  </div>
                </div>
                <div className="h-[351.84px] w-[1290.26px] gap-[23.16px]">
                  <div className="h-[70.37px] w-[1290.26px] gap-[68.42px] pt-[21.05px] pb-[21.05px] border-b-[1px] bg-[#a01212] ">
                    <form onSubmit={handleAddDetails}>
                      <div className="h-[28.26px] w-[1070.47px]  flex justify-around pt-[2px] mb-[40px]">
                        <div className="h-[23px] w-[132px]  text-white font-semibold text-[15px] ">
                          <input
                            type="date"
                            id="dateInput"
                            value={date1}
                            onChange={handleDateChange1}
                            className="bg-[#a01212] text-center text-[2rem] "
                          />
                        </div>
                        <div className="h-[23px] w-[132px]  text-white font-semibold text-[15px] pl-[5.5rem] ">
                          <input
                            type="text"
                            id="activityInput"
                            value={activity1}
                            onChange={handleActivityChange1}
                            className="bg-[#a01212] text-left text-[2rem] h-[3rem] w-[10rem]  "
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[6.3rem]">
                          <input
                            type="text"
                            id="punishmentInput"
                            value={punishment1}
                            onChange={handlePunishmentChange1}
                            className="bg-[#a01212] text-left h-[3rem] w-[15rem] text-[2rem] "
                          />
                        </div>
                        <div className="h-[23px] w-[132px]  text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={remarks1}
                            onChange={handleRemarksChange1}
                            className="bg-[#a01212] text-left h-[3rem] w-[30rem] text-[2rem]"
                          />
                        </div>
                      </div>

                      <div className="h-[28.26px] w-[1070.47px]  pb-[5.26px] flex justify-around mb-[40px]">
                        <div className="h-[23px] w-[132px]  text-white font-semibold text-[15px]">
                          <input
                            type="date"
                            id="dateInput"
                            value={date2}
                            onChange={handleDateChange2}
                            className="bg-[#a01212] text-center text-[2rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px]  text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={activity2}
                            onChange={handleActivityChange2}
                            className="bg-[#a01212]  text-left text-[2rem] h-[3rem] w-[10rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[6.3rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={punishment2}
                            onChange={handlePunishmentChange2}
                            className="bg-[#a01212] text-left h-[3rem] w-[15rem] text-[2rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={remarks2}
                            onChange={handleRemarksChange2}
                            className="bg-[#a01212] text-left h-[3rem] w-[30rem] text-[2rem]"
                          />
                        </div>
                      </div>

                      <div className="h-[28.26px] w-[1070.47px]  pb-[5.26px] flex justify-around mb-[40px] ">
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px]">
                          <input
                            type="date"
                            id="dateInput"
                            value={date3}
                            onChange={handleDateChange3}
                            className="bg-[#a01212] text-center text-[2rem]"
                          />
                        </div>

                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={activity3}
                            onChange={handleActivityChange3}
                            className="bg-[#a01212] text-left text-[2rem] h-[3rem] w-[10rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[6.3rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={punishment3}
                            onChange={handlePunishmentChange3}
                            className="bg-[#a01212] text-left h-[3rem] w-[15rem] text-[2rem] "
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={remarks3}
                            onChange={handleRemarksChange3}
                            className="bg-[#a01212] text-left h-[3rem] w-[30rem] text-[2rem]"
                          />
                        </div>
                      </div>

                      <div className="h-[28.26px] w-[1070.47px]  pb-[5.26px] flex justify-around mb-[39px]">
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px]">
                          <input
                            type="date"
                            id="dateInput"
                            value={date4}
                            onChange={handleDateChange4}
                            className="bg-[#a01212] text-center text-[2rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={activity4}
                            onChange={handleActivityChange4}
                            className="bg-[#a01212] text-left text-[2rem] h-[3rem] w-[10rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[6.3rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={punishment4}
                            onChange={handlePunishmentChange4}
                            className="bg-[#a01212] text-left h-[3rem] w-[15rem] text-[2rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={remarks4}
                            onChange={handleRemarksChange4}
                            className="bg-[#a01212] text-left h-[3rem] w-[30rem] text-[2rem]"
                          />
                        </div>
                      </div>

                      <div className="h-[28.26px] w-[1070.47px]  flex justify-around pt-[2px] mb-[40px]">
                        <div className="h-[23px] w-[132px]  text-white font-semibold text-[15px] ">
                          <input
                            type="date"
                            id="dateInput"
                            value={date5}
                            onChange={handleDateChange5}
                            className="bg-[#a01212] text-center text-[2rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px]  text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={activity5}
                            onChange={handleActivityChange5}
                            className="bg-[#a01212]  text-left text-[2rem] h-[3rem] w-[10rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px] text-white font-semibold text-[15px] pl-[6.3rem]">
                          <input
                            type="text"
                            id="punishmentInput"
                            value={punishment5}
                            onChange={handlePunishmentChange5}
                            className="bg-[#a01212]  text-left h-[3rem] w-[15rem] text-[2rem]"
                          />
                        </div>
                        <div className="h-[23px] w-[132px]  text-white font-semibold text-[15px] pl-[5.5rem]">
                          <input
                            type="text"
                            id="activityInput"
                            value={remarks5}
                            onChange={handleRemarksChange5}
                            className="bg-[#a01212] text-left h-[3rem] w-[30rem] text-[2rem]"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="h-[70.37px] w-[1290.26px] gap-[68.42px] pt-[21.05px] pb-[21.05px] border-b-[1px] bg-[#a01212]">
                    <div className="h-[28.26px] w-[1290.26px] flex justify-between pb-[5.26px] text-[15px]"></div>
                  </div>
                  <div className="h-[70.37px] w-[1290.26px] gap-[68.42px] pt-[21.05px] pb-[21.05px] border-b-[1px] bg-[#a01212]">
                    <div className="h-[28.26px] w-[1290.26px] flex justify-between pb-[5.26px] text-[15px]"></div>
                  </div>
                  <div className="h-[70.37px] w-[1290.26px] gap-[68.42px] pt-[21.05px] pb-[21.05px] border-b-[1px] bg-[#a01212]">
                    <div className="h-[28.26px] w-[1290.26px] flex justify-between pb-[5.26px] text-[15px]"></div>
                  </div>
                  <div className="h-[70.37px] w-[1290.26px] gap-[68.42px] pt-[21.05px] pb-[21.05px] border-b-[1px] bg-[#a01212]">
                    <div className="h-[28.26px] w-[1290.26px] flex justify-between pb-[5.26px] text-[15px]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[44.05px] w-[1335.84px] pr-[10.53px] pl-[10.53px] gap-[4.21px] flex justify-end pt-[1rem]">
              <button
                onClick={() => setShowModal(true)}
                className="w-[121.05px] h-[44.05px] pt-[10.53px] pb-[10.53px] pl-[21.05px] pr-[21.05px] bg-[#000000] rounded-2xl text-white font-inter text-[18.95px] flex justify-center"
              >
                {" "}
                Add
              </button>
              {showModal && <Modal onClose={() => setShowModal(false)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndisciplineRecord;
