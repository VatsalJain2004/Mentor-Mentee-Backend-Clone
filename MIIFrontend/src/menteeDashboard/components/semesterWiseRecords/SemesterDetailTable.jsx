import SemesterDetailTableHeader from "./SemesterDetailTableHeader";
import SemesterDetailTableRow from "./SemesterDetailTableRow";
import SemesterDetailTableBody from "./SemesterDetailTableRow";
const SemesterDetailTable = ({ resultData = { courses: [] } }) => {
  const { courses } = resultData;
  return (
    <>
      <div className="relative overflow-x-auto bg-white p-3 pt-0 my-3 border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          {<SemesterDetailTableHeader />}

          <tbody>
            {courses.map((detail, index) => (
              <SemesterDetailTableRow key={index} detail={detail} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SemesterDetailTable;
