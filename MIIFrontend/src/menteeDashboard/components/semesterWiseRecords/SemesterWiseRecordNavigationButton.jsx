import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const SemesterWiseRecordNavigationButton = ({ currentSem }) => {
  const semester = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  return (
    <>
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
    </>
  );
};

SemesterWiseRecordNavigationButton.propTypes = {
  currentSem: propTypes.number,
};
export default SemesterWiseRecordNavigationButton;
