import { Link } from "react-router";
import profileIcon from "../../assets/mentorProfile/profileIcon.svg";

function MenteeProfile() {
  const quickLinks = [
    {
      title: "Semester-wise Record",
      redirectTo: "semesterWiseRecords",
    },
    {
      title: "Internship Details",
      redirectTo: "internshipDetails",
    },
    {
      title: "Co-curricular Activities",
      redirectTo: "",
    },
    {
      title: "Mentor Details",
      redirectTo: "mentorProfile",
    },
    {
      title: "Change Password",
      redirectTo: "",
    },
  ];
  return (
    <div className="px-14 py-11 h-full w-full">
      <div className="flex flex-col gap-10 mt-2 m-5">
        <div className="bg-[var(--primary-color)] p-5 rounded-2xl size-fit">
          <div className="text-white uppercase text-4xl font-bold whitespace-nowrap">
            Mentee Profile
          </div>
        </div>
        <div className="h-auto w-full p-14 bg-[var(--primary-color)] gap-10 rounded-2xl lg:px-28 md:flex-row flex items-center flex-col md:gap-24 justify-start">
          <div>
            <img src={profileIcon} alt="icon" className="h-44 md:h-64" />
          </div>
          <div className="w-full">
            <div className="text-white text-5xl font-semibold mb-8">
              Name: xyz
            </div>
            <div className="flex flex-col gap-3 text-3xl text-white">
              <div>
                <span className="font-semibold">Scholar no.:</span> XXXXXXX
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="font-semibold">Branch:</span> CS-Core
                </div>
                <div className="font-semibold border-b-2 border-white">
                  edit
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex">
                  <span className="font-semibold">Faculty:</span>{" "}
                  <span> Engineering</span>
                </div>
                <div className="h-auto w-[1.5px] bg-white"></div>
                <div>
                  <span className="font-semibold">Faculty:</span>{" "}
                  <span> Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 py-9 rounded-xl px-12 bg-[var(--secondary-bgColor)]">
          <div className="text-4xl font-bold text-[var(--primary-color)]">
            Details
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-3xl">
              <span className="font-semibold">Email:</span>{" "}
              enrollment@medicaps.ac.in
            </div>
            <div className="text-3xl">
              <span className="font-semibold">Contact no.:</span> +91-1234567890
            </div>
            <div className="text-3xl">
              <span className="font-semibold">Present Address:</span> house/flat
              no., colony/street no., city, district, state
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 py-9 rounded-xl px-12 bg-[var(--secondary-bgColor)] mb-16">
          <div className="text-4xl font-bold text-[var(--primary-color)]">
            Quick Links
          </div>
          {quickLinks.map((link, i) => (
            <Link
              key={i}
              to={link.redirectTo}
              className="text-3xl py-4 px-5 bg-[var(--text-bgColor)] rounded-xl flex justify-between"
            >
              <span>{link.title}</span>
              <span className="scale-75 text-zinc-500">{">"}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenteeProfile;
