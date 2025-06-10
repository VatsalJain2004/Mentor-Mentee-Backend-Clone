import { useState, useEffect } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InternshipDetails = () => {
  // State for internship data
  const [internshipData, setInternshipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openSections, setOpenSections] = useState(false);
  const toggleAccordion = () => {
    setOpenSections((prev) => !prev);
  };

  const [openModel, setOpenModel] = useState(false);

  // New state for form data
  const [formData, setFormData] = useState({
    company_name: "",
    nature_of_internship: "selectType",
    start_date: "",
    end_date: "",
    certificate: null,
  });

  // Fetch internship details when component mounts
  useEffect(() => {
    async function fetchInternshipDetails() {
      try {
        // Replace with your actual token and scholar number
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A";
        const scholar_no = 3; // Replace with dynamic value if needed

        const response = await axios.get(
          "http://localhost:3000/api/mentee/getInternshipDetails",
          {
            params: { scholar_no },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Process the fetched data
        if (response.data.data && response.data.data.internshipdetails) {
          // Map the data structure from the backend to match your frontend format
          const formattedData = response.data.data.internshipdetails.map(
            (item, index) => ({
              srNo: `${index + 1}.`,
              companyName: item.company_name,
              natureOfInternship: item.nature_of_internship,
              startDate: formatDate(item.start_date),
              endDate: formatDate(item.end_date),
              certificate: item.certificate || null, // Certificate URL if available
            })
          );

          setInternshipData(formattedData);

          // Open the sections if data is available
          if (formattedData.length > 0) {
            setOpenSections(true);
          }
        }
      } catch (error) {
        // Only set error if it's not a "not found" error
        if (
          error.response &&
          error.response.data &&
          error.response.data.message !== "Internship record not found"
        ) {
          setError(error);
          console.error("Error fetching internship data:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchInternshipDetails();
  }, []);

  // Helper function to format dates from ISO to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/");
    } catch (e) {
      return dateString; // Return as is if parsing fails
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "certificate" && files) {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // Submit function to add internship details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // You would need to get the scholar_no from your auth context or session
      const scholar_no = 3; // Replace with actual scholar number
      const authToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A"; // Replace with actual token
      // Prepare the data according to your database schema
      const internshipDetails = [
        {
          company_name: formData.company_name,
          nature_of_internship: formData.nature_of_internship,
          start_date: formData.start_date,
          end_date: formData.end_date,
          // Handle certificate file if needed
          // In a real application, you would upload the file to storage and store the URL
        },
      ];

      // Make the POST request to your API
      const response = await fetch(
        "http://localhost:3000/api/mentee/addInternshipDetails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            scholar_no,
            internshipdetails: internshipDetails,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add internship details");
      }

      // Update the UI with new data
      // In a real app, you might want to fetch the updated data from the backend
      const newSrNo = internshipData.length + 1;
      const newInternship = {
        srNo: `${newSrNo}.`,
        companyName: formData.company_name,
        natureOfInternship: formData.nature_of_internship,
        startDate: formData.start_date,
        endDate: formData.end_date,
        certificate: formData.certificate
          ? URL.createObjectURL(formData.certificate)
          : null,
      };

      setInternshipData([...internshipData, newInternship]);

      // Clear form and close modal
      setFormData({
        company_name: "",
        nature_of_internship: "selectType",
        start_date: "",
        end_date: "",
        certificate: null,
      });
      setOpenModel(false);

      // Ensure the accordion is open to show the new record
      setOpenSections(true);

      // Show success message
      alert("Internship details added successfully!");
    } catch (error) {
      console.error("Error adding internship:", error);
      alert("Failed to add internship details. Please try again.");
    }
  };

  return (
    <>
      {/* Main Container  */}
      <div className="w-full mx-20 my-10">
        {/* Header text */}
        <h1 className="uppercase text-4xl font-bold">Internship Details</h1>
        {/* Inner Container  */}
        <div className="bg-[#F3F3F3] mt-10 border shadow-[inset_0px_3px_2px_rgba(0,0,0,0.25)] py-10 px-5 pr-10">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-2xl">Loading internship details...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">
              <p className="text-2xl">
                Error loading internship details. Please try again later.
              </p>
            </div>
          ) : (
            <>
              <div id="accordion-open" className="ms-5">
                {/* Accordion Button */}
                <h2 className="mt-10">
                  <button
                    type="button"
                    onClick={() => toggleAccordion()}
                    className={` ${
                      !openSections ? "rounded-xl" : "rounded-t-xl"
                    } flex items-center justify-between w-full p-5 font-bold text-black bg-[#C3C3C3] border gap-3`}
                  >
                    <p className="text-2xl">Record</p>
                    {openSections ? (
                      <FaMinus size={20} />
                    ) : (
                      <FaPlus size={20} />
                    )}
                  </button>
                </h2>
                {/* Accordion Body  */}
                {openSections && (
                  <div className="mx-3 bg-[#B72929] rounded-b-xl">
                    {internshipData.length > 0 ? (
                      internshipData.map((internship, index) => (
                        <div
                          key={index}
                          className="w-full border-b-2 border-white p-5"
                        >
                          <div className="gap-6 mb-6 flex flex-wrap">
                            <div className="w-20">
                              <label className="block text-xl text-white">
                                Sr. No.
                              </label>
                              <input
                                type="text"
                                className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 text-center"
                                value={internship.srNo}
                                readOnly
                              />
                            </div>
                            <div className="grow">
                              <label className="block text-xl text-white">
                                Company Name
                              </label>
                              <input
                                type="text"
                                className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5"
                                value={internship.companyName}
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-white">
                                Nature of Internship
                              </label>
                              <input
                                type="text"
                                className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5"
                                value={internship.natureOfInternship}
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-white">
                                Start Date
                              </label>
                              <input
                                type="text"
                                className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5"
                                value={internship.startDate}
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-xl text-white">
                                End Date
                              </label>
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
                      ))
                    ) : (
                      <div className="text-center py-10 text-white">
                        <p className="text-2xl">
                          No internship records found. Add your first
                          internship!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Toggle Button */}
              <div className="flex justify-end my-5">
                <button
                  onClick={() => setOpenModel(true)}
                  type="button"
                  className="h-full ms-2 text-4xl text-white bg-[#B72929] border border-[#A01212] rounded-[10px] px-10 py-2.5 flex justify-between items-center gap-2"
                  disabled={loading}
                >
                  <FaPlus />
                  <p>Add Another</p>
                </button>
              </div>
            </>
          )}

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
                    <button
                      onClick={() => setOpenModel(false)}
                      className="text-4xl font-bold"
                    >
                      <RxCross2 />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-4 md:p-5 space-y-4 bg-[#B72929]">
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-6 mb-6 grid-cols-12">
                        <div className="col-span-12 sm:col-span-8">
                          <label
                            htmlFor="company_name"
                            className="block text-xl text-white"
                          >
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company_name"
                            className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464]"
                            placeholder="enter name"
                            required
                            value={formData.company_name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-span-12 sm:col-span-4">
                          <label
                            htmlFor="nature_of_internship"
                            className="block text-xl text-white"
                          >
                            Nature of Internship
                          </label>
                          <select
                            id="nature_of_internship"
                            className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464]"
                            value={formData.nature_of_internship}
                            onChange={handleInputChange}
                          >
                            <option value="selectType">Select Type</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="start_date"
                            className="block text-xl text-white"
                          >
                            Start Date
                          </label>
                          <input
                            type="date"
                            id="start_date"
                            className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464]"
                            placeholder="_/_/__"
                            required
                            value={formData.start_date}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="end_date"
                            className="block text-xl text-white"
                          >
                            End Date
                          </label>
                          <input
                            type="date"
                            id="end_date"
                            className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464]"
                            placeholder="_/_/__"
                            required
                            value={formData.end_date}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-span-12 sm:col-span-4">
                          <label
                            className="block text-xl text-white"
                            htmlFor="certificate"
                          >
                            Upload Certificate
                          </label>
                          <input
                            className="bg-gray-50 border text-gray-900 text-2xl rounded-lg block w-full p-2.5 placeholder-[#646464] cursor-pointer"
                            id="certificate"
                            type="file"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-12 flex justify-end">
                          <button
                            type="submit"
                            className="h-full ms-2 text-2xl text-white bg-black rounded-[10px] px-10 py-2.5 flex justify-between items-center gap-2"
                            disabled={loading}
                          >
                            {loading ? "Adding..." : "Add"}
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
  );
};

export default InternshipDetails;
