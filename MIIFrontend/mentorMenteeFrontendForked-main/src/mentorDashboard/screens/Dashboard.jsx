import DashboardRow from "../components/DashboardRow";

function Dashboard() {
  const categories = [
    {
      title: "Mentee Section",
      elementsInfo: [
        {
          name: "Mentee Records",
          redirectTo: "/mentor/menteerecord", 
        },
        {
          name: "Schedule Meeting",
          redirectTo: "/mentor/schedulemeeting",
        },
        {
          name: "Minutes of Meeting",
          redirectTo: "", // Add the correct route if available
        }
      ],
    },
    {
      title: "Chat Section",
      elementsInfo: [
        {
          name: "Admin",
          redirectTo: "/mentor/mentorToAdminChatbox", // Updated path
        },
        {
          name: "Mentor Coordinator",
          redirectTo: "/mentor/mentorToMentorCoordinatorChatbox", // Updated path
        }
      ],
    },
  ];

  return (
    <div className="bg-white flex-grow overflow-auto">
      <div className="my-10 mx-20 md:my-16 md:mx-80 flex flex-col gap-12">
        {categories.map((category, index) => (
          <DashboardRow
            key={index}
            title={category.title}
            elementsInfo={category.elementsInfo}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
