import React, { useState } from "react";

const Documentation = () => {
  // Define form state
  const [formState, setFormState] = useState({
    antiRagging: false,
    nadRegistration: false,
    ndlDigilocker: false,
    swayamMooc: false,
    facebook: false,
    twitter: false,
    linkedin: false,
    instagram: false,
    youtube: false,
    accSoft: false,
    stl: false,
    busUser: false,
    hosteller: false,
  });

  // Toggle handler for switches and checkboxes
  const handleToggle = (field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = () => {
    alert("Form Submitted!");
    console.log("Form Data:", formState);
  };

  return (
    <div className="h-[801.8px] w-[1240px] gap-[25px] pt-[20px] pb-[40px]">
      <div>
        <h3 className="mx-[6rem] my-[4rem] font-inter font-bold text-[24px] leading-[29.05px]">
          DOCUMENTATION
        </h3>
      </div>
      <div>
        <div className="bg-[#F3F3F3] h-[667.8px] w-[1220px] mx-[6rem] shadow-[inset_0px_4.21px_4.21px_#00000040] gap-[10.53px] pt-[26.32px] pr-[31.58px] pl-[31.58px] pb-[26.32px]">
          {/* First Box */}
          <div className="h-[351.84px] w-[1145.26px] gap-[23.16px]">
            <div className="bg-[#C3C3C3] h-auto w-full p-4 rounded-lg">
              {/* Dynamic Switches */}
              {[
                {
                  label: "Anti-Ragging Affidavit filled",
                  field: "antiRagging",
                },
                { label: "NAD Registration", field: "nadRegistration" },
                {
                  label: "NDL and Digilocker Registration",
                  field: "ndlDigilocker",
                },
                { label: "Swayam/MOOC Registration", field: "swayamMooc" },
              ].map((item) => (
                <React.Fragment key={item.field}>
                  <div className="flex items-center justify-between mb-4 font-semi-bold font-inter text-[18.96px]">
                    <span>{item.label}</span>
                    <button
                      onClick={() => handleToggle(item.field)}
                      className={`w-12 h-6 flex items-center rounded-full ${
                        formState[item.field] ? "bg-red-500" : "bg-gray-500"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                          formState[item.field] ? "translate-x-6" : ""
                        }`}
                      ></div>
                    </button>
                  </div>
                  <hr className="my-4 border-t-2 border-black" />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Second Box */}
          <div className="inner-box h-[351.84px] w-[1145.26px] gap-[23.16px] mt-[-110px]">
            <div className="bg-[#C3C3C3] h-auto w-full p-4 rounded-lg">
              {/* Connected to Medi-Caps */}
              <div className="font-semi-bold font-inter text-[18.96px] mb-4">
                <span>Connected to Medi-Caps through</span>
              </div>
              <hr className="my-4 border-t-2 border-black" />
              <div className="grid grid-cols-3 gap-4 mb-4 font-inter text-[18.96px] font-semi-bold">
                {/* Checkbox Options */}
                {[
                  { label: "Facebook", field: "facebook" },
                  { label: "Twitter", field: "twitter" },
                  { label: "LinkedIn", field: "linkedin" },
                  { label: "Instagram", field: "instagram" },
                  { label: "YouTube", field: "youtube" },
                  { label: "AccSoft", field: "accSoft" },
                  { label: "STL", field: "stl" },
                ].map((item) => (
                  <label
                    key={item.field}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={formState[item.field]}
                      onChange={() => handleToggle(item.field)}
                      className="flex items-center justify-center w-8 h-8 border-2 border-gray-500 rounded-md appearance-auto checked:bg-red-500 checked:border-white-500 checked:text-white"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Third Box */}
          <div className="third-box h-[351.56px] w-[1145.26px] gap-[23.16px] mt-[-140px]">
            <div className="bg-[#C3C3C3] h-auto w-full p-4 rounded-lg">
              <div className="flex flex-col gap-4 font-inter text-[18.96px] font-semi-bold">
                {[
                  { label: "Bus User", field: "busUser" }, // Fixed field names
                  { label: "Hosteller", field: "hosteller" }, // Fixed field names
                ].map((item) => (
                  <label
                    key={item.field}
                    className="flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <button
                      onClick={() => handleToggle(item.field)}
                      className={`w-12 h-6 flex items-center rounded-full ${
                        formState[item.field] ? "bg-red-500" : "bg-gray-500"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                          formState[item.field] ? "translate-x-6" : ""
                        }`}
                      ></div>
                    </button>
                  </label>
                ))}
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-end mt-10">
              <button
                onClick={handleSubmit}
                className="px-8 py-4 text-2xl font-semibold text-[#A01212] transition-all bg-[#F3F3F3] border-2 border-[#A01212] rounded-[5.35px] shadow-lg "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
