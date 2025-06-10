import { useState } from "react";
import { useForm } from "react-hook-form";

function GeneralInfo() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="">
      <div
        className="bg-[#C3C3C3] px-8 py-5 flex justify-between items-center rounded-t-lg text-4xl font-medium cursor-pointer"
        onClick={() => setIsCollapsed((cur) => !cur)}
      >
        <div className="">Student General Information</div>
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
          <div className="all-elements text-white flex flex-col gap-4">
            <div className="element6 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">
                  Hobbies/Interests/Extra or Co-curricular activities
                </div>
                <textarea
                  name="example"
                  placeholder="enter detail"
                  type="text"
                  className="h-52 flex-grow text-black text-3xl pl-4 pt-2 md:pl-6 w-full"
                  {...register("hobbies", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element7 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">
                  Achievements (upto 12th class)
                </div>
                <textarea
                  name="example"
                  placeholder="enter detail"
                  type="text"
                  className="h-52 flex-grow text-black text-3xl pl-4 pt-2 md:pl-6 w-full"
                  {...register("achievements_upto12th", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element7 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Student Mission</div>
                <textarea
                  name="example"
                  placeholder="enter detail"
                  type="text"
                  className="h-52 flex-grow text-black text-3xl pl-4 pt-2 md:pl-6 w-full"
                  {...register("mission", {
                    required: "Your name is required",
                  })}
                />
              </div>
            </div>
            <div className="element7 flex gap-10 lg:gap-20">
              <div className="flex-grow">
                <div className="text-[2rem] mb-1">Student Vision</div>
                <textarea
                  name="example"
                  placeholder="enter detail"
                  type="text"
                  className="h-52 flex-grow text-black text-3xl pl-4 pt-2 md:pl-6 w-full"
                  {...register("vision", {
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

export default GeneralInfo;
