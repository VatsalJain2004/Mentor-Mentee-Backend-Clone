import { useState } from "react"
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const InternshipDetails = () => {
  // temporary data for testing
  const internshipData = [
    {
      srNo: "1.",
      companyName: "xyz",
      natureOfInternship: "Hybrid",
      startDate: "01/02/2024",
      endDate: "18/03/24",
      certificate: "www.google.com",
    },
    {
      srNo: "2.",
      companyName: "abc",
      natureOfInternship: "Online",
      startDate: "05/02/2024",
      endDate: "20/03/24",
      certificate: "www.google.com",
    },
    {
      srNo: "3.",
      companyName: "lmn",
      natureOfInternship: "Offline",
      startDate: "05/01/2024",
      endDate: "20/02/24",
      certificate: null,
    },
  ];
  // end of temporary data

  const [openSections, setOpenSections] = useState(false);
  const toggleAccordion = () => {
    setOpenSections((prev) => !prev);
  }

  const [openModel, setOpenModel] = useState(false);

  return (
    <>
      {/* Main Container  */}
      <div className="w-full mx-20 my-10">
        {/* Header text */}
        <h1 className="uppercase text-4xl font-bold">Internship Details</h1>
        {/* Inner Container  */}
        <div className="bg-[#F3F3F3] mt-10 border shadow-[inset_0px_3px_2px_rgba(0,0,0,0.25)] py-10 px-5 pr-10">
          <div id="accordion-open" className="ms-5">
            {/* Accordion Button */}
            <h2 className="mt-10">
              <button type="button" onClick={() => toggleAccordion()} className={` ${!openSections ? "rounded-xl" : "rounded-t-xl"} flex items-center justify-between w-full p-5 font-bold text-black bg-[#C3C3C3] border gap-3`}>
                <p className="text-2xl">Record</p>
                <FaMinus size={20} />
              </button>
            </h2>
            {/* Accordion Body  */}
            {openSections && (
              <div className="mx-3 bg-[#B72929] rounded-b-xl">
                {internshipData.map((internship, index) => (
                  <div key={index} className="w-full border-b-2 border-white p-5">
                    <div className="gap-6 mb-6 flex">
                      <div className="w-20">
                        <label className="block text-xl text-white">Sr. No.</label>
                        <input
                          type="text"
                          className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 text-center"
                          value={internship.srNo}
                          readOnly
                        />
                      </div>
                      <div className="grow">
                        <label className="block text-xl text-white">Company Name</label>
                        <input
                          type="text"
                          className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5"
                          value={internship.companyName}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-xl text-white">Nature of Internship</label>
                        <input
                          type="text"
                          className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5"
                          value={internship.natureOfInternship}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-xl text-white">Start Date</label>
                        <input
                          type="text"
                          className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5"
                          value={internship.startDate}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-xl text-white">End Date</label>
                        <input
                          type="text"
                          className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5"
                          value={internship.endDate}
                          readOnly
                        />
                      </div>
                      {internship.certificate && ( 
                        <div className="flex items-end">
                          <button className="text-2xl text-black bg-[#C3C3C3] rounded-[8px] px-10 py-2.5 flex justify-between items-center">
                            View Certificate
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Toggle Button */}
          <div className="flex justify-end my-5">
            <button onClick={() => setOpenModel(true)} type="button" className="h-full ms-2 text-4xl text-white bg-[#B72929] border border-[#A01212] rounded-[10px] px-10 py-2.5 flex justify-between items-center gap-2">
              <FaPlus />
              <p>Add Another</p>
            </button>
          </div>

          {/* Main Modal */}
          {openModel && (
            <div
              className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
              aria-hidden="true"
            >
              <div className="relative p-4 w-full max-w-4xl">
                {/* Modal Content */}
                <div className="relative bg-white rounded-[12px] shadow-sm p-5">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between bg-[#C3C3C3] p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Add New Record
                    </h3>
                    <button onClick={() => setOpenModel(false)} className="text-4xl font-bold">
                      <RxCross2 />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-4 md:p-5 space-y-4 bg-[#B72929]">
                    <form>
                      <div className="grid gap-6 mb-6 grid-cols-12">
                        <div className="col-span-12 sm:col-span-8">
                          <label htmlFor="company_name" className="block text-xl text-white">Company Name</label>
                          <input type="text" id="company_name" className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464]" placeholder="enter name" required />
                        </div>
                        <div className="col-span-12 sm:col-span-4">
                          <label htmlFor="nature_of_internship" className="block text-xl text-white">Nature of Internship</label>
                          <select id="nature_of_internship" className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464]" defaultValue="Select Type">
                            <option value="selectType">Select Type</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="start_date" className="block text-xl text-white">Start Date</label>
                          <input type="date" id="start_date" className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464]" placeholder="_/_/__" required />
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="end_date" className="block text-xl text-white">End Date</label>
                          <input type="date" id="end_date" className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464]" placeholder="_/_/__" required />
                        </div>
                        <div className="col-span-12 sm:col-span-4">
                          <label className="block text-xl text-white" htmlFor="certificate">Upload Certificate</label>
                          <input className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464] cursor-pointer" id="certificate" type="file" />
                        </div>
                        <div className="col-span-12 md:col-span-12 flex justify-end">
                          <button type="button" className="h-full ms-2 text-2xl text-white bg-black rounded-[10px] px-10 py-2.5 flex justify-between items-center gap-2">
                            <p>Add</p>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default InternshipDetails;