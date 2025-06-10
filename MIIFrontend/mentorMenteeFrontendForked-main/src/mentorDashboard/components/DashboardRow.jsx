import { Link } from "react-router";

function DashboardRow({ title, elementsInfo = [] }) {
  return (
    <div className="flex flex-col bg-[#F1F1F1] px-40 gap-6 md:gap-10 py-10 justify-evenly rounded-lg shadow-custom w-full">
      <div className="uppercase text-center text-4xl md:text-6xl font-semibold text-[var(--primary-color)]">
        {title}
      </div>
      <div className="bg-[var(--primary-color)] h-1 w-full"></div>
      <div className="flex gap-6 md:gap-10 flex-wrap px-16 justify-center">
        {elementsInfo.map((info, i) => (
          <Link
            to={info.redirectTo}
            key={i}
            className="bg-[var(--primary-color)] text-white text-4xl md:text-4xl font-light px-12 md:px-32 whitespace-nowrap py-8 text-center rounded-lg shadow-custom flex-grow basis-3"
          >
            {info.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardRow;
