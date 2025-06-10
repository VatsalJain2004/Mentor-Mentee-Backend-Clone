import propTypes from "prop-types";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SemesterWiseRecord = ({ currentSem = 1 }) => {
  const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  return (
    <>

      <div className="w-full">
        <div className="w-full px-5 sm:px-10 py-3 font-[arial] font-semibold">
          <h1 className="my-7 uppercase text-5xl">
            Semester wise Record
          </h1>
          <div className="mx-auto max-w-full p-4 px-10 bg-[#f3f3f3] shadow-[#b9b9b9] shadow-inner mb-5">
            <h1 className="text-4xl my-5">Select Semester</h1>
            {semester.slice(0, currentSem).map((value, index) => (
              <Link
                to={`semesterDetails/${index + 1}`}
                className="focus:outline-none text-black bg-[#c3c3c3] rounded-[5px] px-6 py-4 w-full flex justify-between my-12"
                key={index}
              >
                <span className="inline text-3xl">Semester {value}</span>
                <FaAngleRight color="black" size={25} className="self-end" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

SemesterWiseRecord.propTypes = {
  currentSem: propTypes.any
}
export default SemesterWiseRecord;
