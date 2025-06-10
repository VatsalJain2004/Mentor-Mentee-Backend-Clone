import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function ParentInfo({ details: parentDetails }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      father_name: parentDetails.father_name || "",
      father_occupation: parentDetails.father_occupation || "",
      father_contactno: parentDetails.father_contactno || "",
      father_email: parentDetails.father_email || "",
      mother_name: parentDetails.mother_name || "",
      mother_occupation: parentDetails.mother_occupation || "",
      mother_contactno: parentDetails.mother_contactno || "",
      mother_email: parentDetails.mother_email || "",
      yearly_income: parentDetails.yearly_income || "",
      sibling_details: parentDetails.sibling_details || "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    const finalData = {
      ...data,
      scholar_no: 6,
    };
    setLoading(true);
    setError(null);

    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A"; // Replace with actual token

    try {
      const response = await axios.post(
        "http://localhost:3000/api/mentee/addMenteeGuardiansDetails",
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
      setError("Failed to add parents details. Please try again.");
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
        <div>Parents/Guardians/Siblings</div>
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
          <div className="all-elements text-white flex flex-col gap-8">
            <div className="element1 flex gap-1 flex-col">
              <div className="flex gap-10 lg:gap-20">
                <div className="flex-grow">
                  <div className="text-[2rem] mb-1">Father's Name</div>
                  <input
                    placeholder="Full name"
                    className="h-16 text-black text-3xl pl-4 w-full"
                    type="text"
                    {...register("father_name", {
                      required: "Your name is required",
                    })}
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-[2rem] mb-1">Email</div>
                  <input
                    placeholder="enter detail"
                    type="text"
                    className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                    {...register("father_email", {
                      required: "Your name is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex gap-10 lg:gap-20">
                <div className="flex-grow">
                  <div className="text-[2rem] mb-1">Occupation</div>
                  <input
                    placeholder="Full name"
                    className="h-16 text-black text-3xl pl-4 w-full"
                    type="text"
                    {...register("father_occupation", {
                      required: "Your name is required",
                    })}
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-[2rem] mb-1">Phone No.</div>
                  <input
                    placeholder="enter detail"
                    type="text"
                    className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                    {...register("father_contactno", {
                      required: "Your name is required",
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="element2 flex gap-1 flex-col">
              <div className="flex gap-10 lg:gap-20">
                <div className="flex-grow">
                  <div className="text-[2rem] mb-1">Mothers's Name</div>
                  <input
                    placeholder="Full name"
                    className="h-16 text-black text-3xl pl-4 w-full"
                    type="text"
                    {...register("mother_name", {
                      required: "Your name is required",
                    })}
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-[2rem] mb-1">Email</div>
                  <input
                    placeholder="enter detail"
                    type="text"
                    className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                    {...register("mother_email", {
                      required: "Your name is required",
                    })}
                  />
                </div>
              </div>
              <div className="flex gap-10 lg:gap-20">
                <div className="flex-grow">
                  <div className="text-[2rem] mb-1">Occupation</div>
                  <input
                    placeholder="Full name"
                    className="h-16 text-black text-3xl pl-4 w-full"
                    type="text"
                    {...register("mother_occupation", {
                      required: "Your name is required",
                    })}
                  />
                </div>
                <div className="flex-grow">
                  <div className="text-[2rem] mb-1">Phone No.</div>
                  <input
                    placeholder="enter detail"
                    type="text"
                    className="h-16 flex-grow text-black text-3xl pl-4 md:pl-6 w-full"
                    {...register("mother_contactno", {
                      required: "Your name is required",
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="element6 flex w-[50%] gap-10 lg:gap-20">
              <div className="flex-grow pr-5 lg:pr-10">
                <div className="text-[2rem] mb-1">Yearly Income</div>
                <input
                  placeholder="enter detail"
                  type="text"
                  className="flex-grow h-16 text-black text-3xl pl-4 md:pl-6 w-full"
                  {...register("yearly_income", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element7 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Siblings Details</div>
                <textarea
                  name="example"
                  placeholder="enter detail"
                  type="text"
                  className="h-52 flex-grow text-black text-3xl pl-4 pt-2 md:pl-6 w-full"
                  {...register("sibling_details", {
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

export default ParentInfo;
