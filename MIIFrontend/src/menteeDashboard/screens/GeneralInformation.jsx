import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PersonalInfo from "../components/generalInformation/PersonalInfo";
import ParentInfo from "../components/generalInformation/ParentInfo";
import GeneralInfo from "../components/generalInformation/GeneralInfo";
import axios from "axios";

const Information = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3Mzk1MjQxMjgsImV4cCI6MTczOTUyNzcyOH0.BohWsNkqjZKCvMOQPyNHY-ulKe7AuGrPDAfO8On_b-A";
        const scholar_no = 3; // Replace with dynamic value if needed

        const response = await axios.get(
          "http://localhost:3000/api/mentee/getPersonalMenteeDetails",
          {
            params: { scholar_no },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data);
        setDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching mentee personal data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-full w-full px-14 lg:px-80 py-11">
      <div className="uppercase text-5xl font-semibold mb-8">
        General Information
      </div>
      {error && <div>Error: {error.message}</div>}
      {loading ? (
        <div>...Loading Details</div>
      ) : (
        <div className="bg-[#F3F3F3] py-12 px-12 md:px-16 flex flex-col gap-12">
          <PersonalInfo details={details} />
          {/* <GeneralInfo /> */}
          <ParentInfo details={details} />
        </div>
      )}
    </div>
  );
};

export default Information;
