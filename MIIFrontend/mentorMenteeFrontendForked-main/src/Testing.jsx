import React, { useState } from "react";

const ScheduleAppointment = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[500px] rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-3 border-b">
              <h2 className="text-lg font-semibold">Schedule Appointment</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-black text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="bg-red-700 p-4 text-white">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 mt-1 bg-white text-black rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Time</label>
                  <input
                    type="time"
                    className="w-full p-2 mt-1 bg-white text-black rounded outline-none"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-semibold">Purpose</label>
                <textarea
                  rows="3"
                  className="w-full p-2 mt-1 bg-white text-black rounded outline-none"
                  placeholder="Enter details"
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleAppointment;