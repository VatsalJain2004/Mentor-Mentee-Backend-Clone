import { IoClose } from "react-icons/io5";
import propTypes from "prop-types";
import Input from "./RecordInput";

const AddNewRecord = ({ title, isOpen, onClose, details = {} }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 font-[arial] font-semibold text-xl">
            <div className="relative p-4 w-full max-w-4xl bg-white rounded-[10px] shadow-sm mx-5 md:mx-0">

                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b bg-[#c3c3c3] rounded-s-[2px] rounded-t-[2px]">
                    <h3 className="capitalize text-xl font-semibold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-black text-md w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <IoClose size={20} />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 md:p-5 space-y-4 bg-[#b72929] rounded-e-[2px] rounded-b-[2px]">
                    <form className="w-full mx-auto grid grid-cols-12 gap-x-2 sm:gap-x-4">

                        <div className="mb-5 col-span-12">
                            <Input 
                                title="Course Registered" 
                                id="course_code" 
                                defaultValue={details.course_code || ""} 
                            />
                        </div>

                        <div className="mb-5 col-span-6 sm:col-span-4">
                            <Input 
                                title="Mid Sem I Marks" 
                                id="mid_sem_i_marks" 
                                defaultValue={details.mid_sem_i_marks || ""} 
                            />
                        </div>

                        <div className="mb-5 col-span-6 sm:col-span-4">
                            <Input 
                                title="Mid Sem II Marks" 
                                id="mid_sem_ii_marks" 
                                defaultValue={details.mid_sem_ii_marks || ""} 
                            />
                        </div>

                        <div className="mb-5 col-span-12 sm:col-span-4">
                            <Input 
                                title="End Term Marks/Grade" 
                                id="end_term_marks" 
                                defaultValue={details.end_term_marks || ""} 
                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6 mb-5 sm:mb-0">
                            <p className="block text-md font-medium text-white">Attendance %</p>

                            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-2 sm:gap-x-0 sm:gap-y-1">
                                {["theory", "practical"].map((label, index) => (
                                    <div key={index} className="w-full grid grid-cols-12 bg-white py-2.5">
                                        <label htmlFor={`${label}_attendance`} className="text-md font-bold text-black col-span-5 sm:col-span-3 border-r border-black h-full px-2.5 flex place-content-center place-items-center capitalize">{label}</label>
                                        <input 
                                            type="text" 
                                            id={`${label}_attendance`} 
                                            className="text-gray-900 text-md block w-full col-span-7 sm:col-span-9 px-2.5 outline-none" 
                                            placeholder="Enter details" 
                                            defaultValue={details[`${label}_attendance`] || ""} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-5 col-span-12 sm:col-span-6">
                            <p className="block text-md font-medium text-white">Presentation</p>

                            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-1">
                                {["I", "II"].map((label, index) => (
                                    <div key={index} className="col-span-1 w-full grid grid-cols-12 bg-white py-2.5">
                                        <label htmlFor={`quiz_${label}`} className="text-md font-bold text-black col-span-2 border-r border-black h-full px-2.5 flex place-content-center place-items-center uppercase">{label}</label>
                                        <input 
                                            type="text" 
                                            id={`quiz_${label}`} 
                                            className="text-gray-900 text-md block w-full col-span-9 px-2.5 outline-none" 
                                            placeholder="Enter details" 
                                            defaultValue={details[`quiz_${label}`] || ""} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-5 col-span-12">
                            <label htmlFor="remark" className="block text-md font-medium text-white capitalize">Remark</label>
                            <textarea 
                                id="remark" 
                                rows="4" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-md block w-full p-2.5 outline-none" 
                                placeholder="Enter details" 
                                defaultValue={details.remark || ""} 
                            ></textarea>
                        </div>

                        <div className="col-span-12 flex justify-end">
                            <button className="text-white bg-black font-bold rounded-[5px] text-lg px-10 py-2.5 col-span-2" type="button">
                                {title == "Update Details" ? "Update" : "Add"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

AddNewRecord.propTypes = {
    title: propTypes.string,
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    details: propTypes.object
};

export default AddNewRecord;
