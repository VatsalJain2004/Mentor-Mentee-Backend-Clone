import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const minutesOfmeeting = () => {
  const [meetings, setMeetings] = useState(
    Array(8).fill().map(() => ({ date: "", attendance: "", advice: "" }))
  );

  const [modalData, setModalData] = useState(null);

  const handleInputChange = (index, field, value) => {
    const updatedMeetings = [...meetings];
    updatedMeetings[index][field] = value;
    setMeetings(updatedMeetings);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-[944.84px] w-[1450px] pr-[58px] gap-[50px]">
    <div className="h-[944.842041015625px] w-[1240px] pt-[40px] pb-[40px] gap-[25px] pl-[58px]">
      <div className="text-[24px] font-semibold h-[29px] w-[445px] mb-[2rem]">
      <h2 >MINUTES OF MEETING WITH MENTOR</h2></div>
      <div className="h-[810.842041015625px] w-[1240px] pt-[26.32px] pb-[26.32px] pl-[31.58px] pr-[31.58px] gap-[10.53px] bg-[#F3F3F3] shadow-[inset_0px_4.21px_4.21px_#00000040]">
        <div className="h-[758.21044921875px] w-[1176.842041015625px] gap-[10.53px]">
          <div className="h-[709.6841430664062px] w-[1176.842041015625px] border-[0.63px] border-[#D6D6D6] gap-[6px] pt-[10.53px] pb-[15.79px] pl-[15.79px] pr-[15.79px] bg-[#F5F5F5]">
        <table >
          <thead >
            <div className="h-[51.26315689086914px] w-[1145.2630615234375px] rounded-[9.28px] pb-[8px] gap-[16.84px] mb-[2.2rem]">
            <tr>
              <th className="h-[23px] w-[172px]  pt-[15px] pr-[10.53px]  pl-[10.53px] gap-[65.26px] text-[18.95px]">Date</th>

              <th className="h-[80px] w-[230px] text-[18.95px] pr-[25px] pl-[15px]  pb-[10px] ">Cumulative Attendance (%)</th>
              <th className="h-[23px] w-[680.2630615234375px] pt-[15px] pr-[35rem] pl-[10px] gap-[189.47px] text-[18.95px]">Advice Given by the Mentor</th>
            </tr>
            </div>
          </thead>
          <tbody className="h-[626.105224609375px] w-[1145.2630615234375px] flex-col items-center justify-evenly " >
            {meetings.map((meeting, index) => (
              <tr key={index} className="bg-[#a01212] text-white h-[78.26315307617188px] w-[1145.2630615234375px] border-b-[1px] pt-[15px] pb-[15px] gap-[68.42px]">
                <div className="h-[48.26315689086914px] w-[1145.2630615234375px] rounded-[9.28px] pr-[20px] pb-[5.26px]">
                <td className="h-[23px] w-[172px]     pl-[11.53px] gap-[65.26px] text-[18.95px]"><input
                  type="date"
                  value={meeting.date}
                  onChange={(e) => handleInputChange(index, "date", e.target.value)}
                  className=" p-1 rounded bg-[#a01212]"
                /></td>
                <td className="h-[80px] w-[230px] text-[17px]  pl-[40px]  pb-[10px]"><input
                  type="text"
                  value={meeting.attendance}
                  onChange={(e) => handleInputChange(index, "attendance", e.target.value)}
                  className="rounded bg-[#a01212]"

                /></td>
                <td className="h-[23px] w-[600px]  pl-[70px] gap-[189.47px] text-[18.95px]"><input
                  type="text"
                  value={meeting.advice}
                  onChange={(e) => handleInputChange(index, "advice", e.target.value)}
                  className=" rounded bg-[#a01212]"

                /></td>
                <td className="">
                  <button  onClick={() => setModalData(meeting)}
                  className="mt-[2rem] bg-white text-[18.93px] text-[#a01212] h-[43px] w-[191px] pt-[7px] pb-[10px] pl-[15px] pr-[15px] gap-[10px] rounded-[5px]" >
                    View Action Taken
                  </button>
                </td>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="h-[38px] w-[1176.842041015625px] gap-[4.21px] pr-[10.53px] pt-[10px] pl-[10.53px] flex justify-end">
        <button className="h-[38px] w-[114px] rounded-[5.35px] border-[2.14px] text-[19.26px] text-center border-[#A01212] gap-[33px] pt-[2px] pl-[6px] pr-[8px] pb-[10px] font-bold text-[#a01212]"
         onClick={handlePrint} >
          Print</button>
          {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[422.3898620605469px] w-[587.0781860351562px] rounded-[12.35px] p-[10px] bg-white">
            <div className="h-[40.66970443725586px] w-[567.0781860351562px] rounded-t-[4.12px] flex justify-between pt-[8.23px] pb-[8.23px]  bg-[#C3C3C3] pl-[20.58px] pr-[20.58px]">
            <h3 className="h-[18px] w-[146px] text-[14.81px] font-bold ">Action Taken Report</h3>
            <RxCross2 onClick={() => setModalData(null)} className="size-[2.5rem]"/></div>
            <div className="h-[361.72015380859375px] w-[567.0781860351562px] bg-[#B72929]">
          <div className="h-[328.79833984375px] w-[534.1563720703125px] gap-[8.23px] pl-[0.6rem]">
             <div className="h-[53.753089904785156px] w-[534.1563720703125px] gap-[8.23px] pt-[1rem] pl-[1rem] flex">
                <div className="h-[53.753089904785156px] w-[262.96295166015625px] pr-[8.23px] pl-[8.23px] gap-[3.29px]">
                  <label htmlFor="" className="h-[16px] w-[50px] text-[13.17px] text-white ">Session</label><br />
                      <input type="text"
                      placeholder=" from - to"
                      className="h-[34.460906982421875px] w-[246.50204467773438px] mt-[4px] pt-[8.23px] pb-[8.23px] pl-[16.46px] pr-[16.46px] gap-[8.23px]"
                      />
                </div>
                <div className="h-[53.753089904785156px] w-[262.96295166015625px] pr-[8.23px] pl-[8.23px] gap-[3.29px]">
                  <label htmlFor="" className="h-[16px] w-[50px] text-[13.17px] text-white ">Year / Semester</label><br />
                      <input type="text"
                      placeholder=" enter details"
                      className="h-[34.460906982421875px] w-[246.50204467773438px] mt-[4px] pt-[8.23px] pb-[8.23px] pl-[16.46px] pr-[16.46px] gap-[8.23px]"
                      />
                </div>
            </div>
            <div className="h-[125.29px] w-[534.1563720703125px] pr-[8.23px] pl-[2rem] gap-[3.29px] mt-[2rem]">
            <label htmlFor="" className="h-[16px] w-[50px] text-[13.17px] text-white ">Complaint / Grievance raised by student</label><br />
                      <input type="text"
                      placeholder=" enter details"
                      className="h-[106px] w-[517.6954956054688px] mt-[4px] pt-[8.23px] pb-[6rem] pl-[16.46px] pr-[16.46px] gap-[8.23px]"
                      />
            </div>
            <div className="h-[133.29217529296875px] w-[534.1563720703125px] pr-[8.23px] pl-[2rem] gap-[3.29px] mt-[1rem]">
            <label htmlFor="" className="h-[16px] w-[50px] text-[13.17px] text-white ">Action taken against the complaint / grievance raised</label><br />
                      <input type="text"
                      placeholder=" enter details"
                      className="h-[114px] w-[517.6954956054688px] mt-[4px] pt-[8.23px] pb-[6rem] pl-[16.46px] pr-[16.46px] gap-[8.23px]"
                      />
            </div>
          </div>

          </div>
          </div>
        </div>
      )}
      </div>
      </div>

      </div>
    </div>
    </div>
  );
};

export default minutesOfmeeting;