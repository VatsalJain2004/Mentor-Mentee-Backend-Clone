"use client";
import { useState, useEffect } from "react";
import { Upload, User } from "lucide-react";
import Papa from "papaparse";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [data, setData] = useState({
    mentorStats: { assigned: 0, total: 0 },
    menteeStats: { assigned: 0, total: 0 },
  });

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData({
        mentorStats: { assigned: 15, total: 30 },
        menteeStats: { assigned: 45, total: 60 },
      });
      setLoading(false);
    }, 1500);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const parsedData = result.data;
        if (!parsedData || parsedData.length === 0) {
          alert("Please select a valid CSV file.");
          return;
        }

        try {
          setUploading(true);
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInJvbGUiOiJtZW50b3JDb29yZGluYXRvciIsImlhdCI6MTc0NDA5MzMwMywiZXhwIjoxNzQ0MDk2OTAzfQ.1rglcjW_dxdKkVylrDKnYREmsle0nZ_8dyueOcZdMa4'; // Replace with your actual bearer token

          const response = await axios.post(
            "http://localhost:3000/api/mentorCoordinator/upload/mentors",
            { data: parsedData },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Response from backend:", response.data);
          alert("Mentor list uploaded successfully!");
        } catch (error) {
          console.error("Upload error:", error);
          alert("Failed to upload mentor list.");
        } finally {
          setUploading(false);
        }
      },
    });
  };

  return (
    <div className="min-h-[50vh] bg-white p-6 lg:p-10">
      <div className="max-w-[95%] min-h-[50vh]  mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Section */}
          <div className="bg-gray-200 rounded-xl shadow-lg p-7 min-h-[270px] flex flex-col items-center">
            <div className="w-40 h-40 bg-gradient-to-r from-red-700 to-red-900 rounded-xl flex items-center justify-center mb-6 shadow-lg mt-10">
              <User className="w-20 h-20 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-red-800 text-center">
              FULL NAME
            </h1>
            <p className="text-2xl text-red-700 mb-5 font-medium">
              Mentor ID: XC651A
            </p>
            <button className="w-100 mt-4 bg-red-800 text-white text-2xl font-semibold px-8 py-4 rounded-xl shadow-md tracking-wide hover:bg-red-700 hover:scale-105 transition-all duration-300">
              Manage
            </button>
          </div>

          {/* Main Content Section */}
          <div className="lg:col-span-3 space-y-8">
            {/* Mentor List */}
            <div className="bg-gray-200 rounded-xl shadow-lg p-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-4xl font-bold text-red-800">MENTOR LIST</h2>
                <div className="flex items-center gap-4">
                  <button
                    className="bg-white p-3 rounded-xl flex items-center gap-2 text-gray-600 hover:text-red-800 transition-colors text-xl"
                    onClick={() => document.getElementById("mentorCsv").click()}
                  >
                    <Upload className="w-6 h-6" />
                    <span>{uploading ? "Uploading..." : "Upload CSV"}</span>
                  </button>
                </div>
                <input
                  id="mentorCsv"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              <div className="bg-gray-50 shadow-md rounded-xl p-8 text-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-mdbold">
                    Assigned mentors:
                  </span>
                  <span className="font-semibold">
                    {loading
                      ? "Loading..."
                      : `${data.mentorStats.assigned} / ${data.mentorStats.total}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Mentee List */}
            <div className="bg-gray-200 rounded-xl shadow-lg p-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-4xl font-bold text-red-800">MENTEE LIST</h2>
                <button
                  className="bg-white p-3 rounded-xl flex items-center gap-2 text-gray-600 hover:text-red-800 transition-colors text-xl"
                  onClick={() => document.getElementById("menteeCsv").click()}
                >
                  <Upload className="w-6 h-6" />
                  <span>Upload CSV</span>
                </button>
                <input id="menteeCsv" type="file" accept=".csv" className="hidden" />
              </div>
              <div className="bg-gray-50 shadow-md rounded-xl p-8 text-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-mdbold">
                    Assigned mentees:
                  </span>
                  <span className="font-semibold">
                    {loading
                      ? "Loading..."
                      : `${data.menteeStats.assigned} / ${data.menteeStats.total}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Section */}
          <div className="mt-4 bg-gray-200 p-6 rounded-xl shadow-lg lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              className="bg-red-800 text-white p-6 rounded-xl text-3xl font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={() => navigate("/mentorcoordinator/meetingstatus")}
            >
              Meeting Status of Mentors
            </button>
            <button
              className="bg-red-800 text-white p-6 rounded-xl text-3xl font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={() => navigate("/mentorcoordinator/mommentorlist")}
            >
              Minutes of Meetings
            </button>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-4">
            <div className="mt-8 bg-gray-200 p-6 rounded-xl shadow-lg border border-gray-300 flex flex-col md:flex-row items-center">
              <h3 className="text-5xl font-bold text-red-800 mb-6 w-full md:w-1/3 pl-6 text-center md:text-left leading-none tracking-tight">
                CHAT & QUERY SECTION
              </h3>
              <div className="bg-white p-9 rounded-xl shadow-md border border-gray-300 flex flex-col md:flex-row gap-4 md:gap-9 justify-center mt-4 md:mt-0">
                <Link to="/adminchatbox">
                  <button className="bg-red-800 text-white px-32 p-5 rounded-xl text-3xl font-bold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg w-full">
                    Admin
                  </button>
                </Link>
                <Link to="/mentorcoordinator/mentorchatbox">
                  <button className="bg-red-800 text-white px-32 p-5 rounded-xl text-3xl font-bold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg w-full">
                    Mentors
                  </button>
                </Link>
                <Link to="/mentorcoordinator/menteechatbox">
                  <button className="bg-red-800 text-white px-32 p-5 rounded-xl text-3xl font-bold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg w-full">
                    Mentees
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
