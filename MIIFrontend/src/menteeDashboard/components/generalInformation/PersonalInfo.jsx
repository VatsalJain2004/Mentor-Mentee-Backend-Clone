import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const scholar_no = 5; // TODO

function PersonalInfo({ details: personalDetails }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: personalDetails.name || "",
      enrollment_no: personalDetails.enrollmentno || "",
      branch: personalDetails.branch || "",
      faculty: personalDetails.faculty || "",
      department: personalDetails.department || "",
      email: personalDetails.email || "",
      adhaar_no: personalDetails.adhaarno || "",
      dob: personalDetails.dob || "",
      blood_group: personalDetails.bloodgroup || "",
      nationality: personalDetails.nationality || "",
      phone_no: personalDetails.contactno || "",
      telephone: personalDetails.telno || "",
      present_address: personalDetails.presentaddress || "",
      permanent_address: personalDetails.permanentaddress || "",
      profile_photo: personalDetails.passportphoto || "",
    },
  });

  // Submit personalInfoForm and send data to backend
  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      profile_photo: "to be implemented",
      scholar_no,
    };
    setLoading(true);
    setError(null);

    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A"; // Replace with actual token

    try {
      const response = await axios.post(
        "http://localhost:3000/api/mentee/addPersonalMenteeDetails",
        finalData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data.data); // TODO
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to add personal details. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="bg-[#C3C3C3] px-8 py-5 flex justify-between items-center rounded-t-lg text-4xl font-medium cursor-pointer"
        onClick={() => setIsCollapsed((cur) => !cur)}
      >
        <div>Student Personal Information</div>
        {isCollapsed ? (
          <div style={{ transform: "scale(1.3)" }}>+</div>
        ) : (
          <div style={{ transform: "scaleX(2)" }}>-</div>
        )}
      </div>
      {!isCollapsed && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 md:p-20 md:pb-6 md:pt-10 bg-[var(--primary-color)] mx-4"
        >
          <div className="flex text-white gap-4 items-center border-2 border-white px-6 w-fit py-3 rounded-xl ml-auto md:mb-6">
            <div className="scale-150">+</div>
            <div className="text-3xl">Upload Profile Photo</div>
          </div>
          <div className="all-elements text-white flex flex-col gap-4">
            <div className="element1 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Name</div>
                <input
                  placeholder="Full name"
                  className="h-16 text-black text-3xl pl-4 w-full"
                  type="text"
                  {...register("name", { required: "Your name is required" })}
                />
              </div>
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Enrollment No.</div>
                <input
                  placeholder="enter detail"
                  type="text"
                  className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                  {...register("enrollment_no", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element2 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Branch</div>
                <input
                  placeholder="Full name"
                  className="h-16 text-black text-3xl pl-4 w-full"
                  type="text"
                  {...register("branch", { required: "Your name is required" })}
                />
              </div>
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Faculty</div>
                <input
                  placeholder="enter detail"
                  type="text"
                  className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                  {...register("faculty", {
                    required: "Your name is required",
                  })}
                />
              </div>
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Department</div>
                <input
                  placeholder="enter detail"
                  type="text"
                  className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                  {...register("department", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element3 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Email</div>
                <input
                  placeholder="Full name"
                  className="h-16 text-black text-3xl pl-4 w-full"
                  type="text"
                  {...register("email", { required: "Your name is required" })}
                />
              </div>
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Aadhaar No.</div>
                <input
                  placeholder="enter detail"
                  type="text"
                  className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                  {...register("adhaar_no", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element4 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">D.O.B.</div>{" "}
                {/*validation in DB invalid input syntax for type date: "s"*/}
                <input
                  placeholder="Full name"
                  className="h-16 text-black text-3xl pl-4 w-full"
                  type="text"
                  {...register("dob", { required: "Your name is required" })}
                />
              </div>
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Blood Group</div>
                <input
                  placeholder="enter detail"
                  type="text"
                  className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                  {...register("blood_group", {
                    required: "Your name is required",
                  })}
                />
              </div>
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Nationality</div>
                <input
                  placeholder="enter detail"
                  type="text"
                  className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                  {...register("nationality", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element5 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Phone No.</div>
                <input
                  placeholder="Full name"
                  className="h-16 text-black text-3xl pl-4 w-full"
                  type="text"
                  {...register("phone_no", {
                    required: "Your name is required",
                  })}
                />
              </div>
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Telephone No.</div>
                <input
                  placeholder="enter detail"
                  type="text"
                  className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                  {...register("telephone", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element6 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Present Address</div>
                <textarea
                  name="example"
                  placeholder="enter detail"
                  type="text"
                  className="h-52 flex-grow text-black text-3xl pl-4 pt-2 md:pl-6 w-full"
                  {...register("present_address", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element7 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Permanent Address</div>
                <textarea
                  name="example"
                  placeholder="enter detail"
                  type="text"
                  className="h-52 flex-grow text-black text-3xl pl-4 pt-2 md:pl-6 w-full"
                  {...register("permanent_address", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <button
              className="text-white border-2 border-white ml-auto rounded-lg py-2 px-4 text-3xl"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PersonalInfo;
