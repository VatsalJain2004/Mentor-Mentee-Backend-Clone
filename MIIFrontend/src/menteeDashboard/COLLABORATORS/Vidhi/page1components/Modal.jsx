import React, { useState } from 'react'
import { X } from 'lucide-react';

function Modal({onClose}) {
  const [date6, setDate6] = useState('');
  const [activity6, setactivity6] = useState('');
  const [punishment6, setpunishment6] = useState('');
  const [remarks6, setremarks6] = useState('');

  const handleDateChange6 = (event) => setDate6(event.target.value);
  const handleActivityChange6 = (event) => setactivity6(event.target.value);
  const handlePunishmentChange6 = (event) => setpunishment6(event.target.value);
  const handleRemarksChange6 = (event) => setremarks6(event.target.value);

  const handleAddDetails = (event) => {
    event.preventDefault();
    alert(`Activity: ${activity}\nPunishment: ${punishment}\nRemarks: ${remarks} Date: ${selectedDate}\n`);
    
};




  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className='h-[355.21px] w-[600px] bg-white rounded-lg flex flex-col p-[1.3rem] '>
        <div className='h-[37.54px] w-[573.33px] gap-[6.67px] flex justify-between bg-[#C3C3C3] rounded-t-[3.33px] pt-[6.67px] pb-[6.67px] pl-[16.67px] pr-[16.67px]'>
          <h5 className="h-[15px] w-[100px] text-[1.3rem] pt-[1.5px] font-semibold">Add New Record</h5>
          <button onClick={onClose} className="place-self-end"><X size={20}/></button>
        </div>
<div className='h-[291px] w-[573.33px] rounded-b-[3.33px] p-[13.33px] bg-[#B72929]'>
<form action="" onSubmit={handleAddDetails}>
  <div className="h-[264.33px] w-[546.67px]">
          <div className="h-[44px] w-[564.67px]  text-white font-semibold text-[12px]  ">
            <label htmlFor="Activities">Activities</label><br />
              <input
                  type="text"
                  id="activityInput"
                  value={activity6}
                  onChange={handleActivityChange6}
                  placeholder="   enter details :"
                  className="bg-white text-left text-[1.5rem] h-[28.33px] w-[533.33px] text-black "
                  style={{ paddingLeft: '10px' }}
                  
              />
          </div><br />
          <div className="h-[23px] w-[132px] text-white font-semibold text-[12px] ">
          <label htmlFor="Punishment" >Punishment</label><br />
                    <input
                        type="text"
                        id="punishmentInput"
                        value={punishment6}
                        onChange={handlePunishmentChange6}
                        placeholder="   enter details : "
                        className="bg-white text-left h-[28.33px] w-[533.33px] text-[1.5rem] text-black  "
                        style={{ paddingLeft: '10px' }}
                    />
          </div><br />
          <div className="h-[115.67px] w-[546.67px]  text-white font-semibold text-[12px] pt-[1.6rem]">
          <label htmlFor="Remarks">Remarks</label><br />
                    <input
                        type="text"
                        id="activityInput"
                        value={remarks6}
                        onChange={handleRemarksChange6}
                        placeholder="  enter details : "
                        className="bg-white text-left h-[95px] w-[533.33px] text-[1.5rem] pb-[5rem] text-black"
                        style={{ paddingLeft: '10px' }}
                    />
          </div>

  <div className="h-[42.67px] w-[546.67px] pr-[6.67px] gap-[2.67px] flex pt-[2.4rem] justify-between">
          <div className="h-[42.67px] w-[460.67px]">
            
          <div className="h-[23px] w-[132px]  text-white font-semibold  ">
                    <label htmlFor="">Date:</label><br />
                    <input
                        type="date"
                        id="dateInput"
                        value={date6}
                        onChange={handleDateChange6}
                        placeholder=' /  /  '
                        className="text-black text-left text-[1rem] "
                    />
                    
                </div>
          </div>
          <div>
            <button  type="submit" className="h-[28.33px] w-[76.67] rounded-[6.67px] gap-[6.67px] pt-[6.67px] pb-[6.67px] pl-[13.33px] pr-[13.33px] bg-black text-white text-center">Add</button>
          </div>
          </div>
  </div>
  </form>
</div>
      </div>
      
    </div>
  )
}

export default Modal

