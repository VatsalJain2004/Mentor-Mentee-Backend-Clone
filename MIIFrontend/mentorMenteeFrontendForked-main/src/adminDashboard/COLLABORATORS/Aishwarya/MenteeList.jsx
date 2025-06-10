"use client"

import { useEffect, useState } from "react"
import { User } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"

const MenteeList = () => {
  const [mentees, setMentees] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Replace with your actual API URL
  const API_URL = "http://localhost:3000/api/admin/menteesFromMentorList"
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NDY5NDU4NCwiZXhwIjoxNzQ0Njk4MTg0fQ.Hw7ultwssDYOaG0B-tzv7fJS2GybGFBDraFNDELDEUc"

  useEffect(() => {
    const fetchMentees = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // Flatten mentees if needed
        const data = response.data.mentees || []
        setMentees(data)
      } catch (err) {
        setError("Failed to fetch mentees.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMentees()
  }, [])

  const filteredMentees = mentees.filter((mentee) =>
    [mentee.name, mentee.scholar_no, mentee.mentorName].join(" ").toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-white py-12 px-6 flex flex-col items-center">
      <h2 className="text-5xl font-bold text-red-800 mb-10">Mentee(s) List</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full max-w-3xl">
        <input
          type="text"
          placeholder="🔍  Search by mentee or mentor..."
          className="p-4 w-full border-2 border-red-800 rounded-md text-lg focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-red-800 text-white px-6 py-3 rounded-md text-lg hover:bg-red-700 transition">
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-xl text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-xl text-red-600">{error}</p>
      ) : filteredMentees.length === 0 ? (
        <p className="text-lg text-gray-500">No mentees found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {filteredMentees.map((mentee) => (
            <div
              key={mentee.scholar_no}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 transition hover:shadow-xl hover:translate-y-[-2px]"
            >
              {/* Mentee Section */}
              <div className="bg-gradient-to-r from-red-800 to-red-700 p-6 flex items-center gap-5">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <User className="text-red-800 w-10 h-10" />
                </div>
                <div className="text-white">
                  <div className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Mentee</div>
                  <h3 className="text-2xl font-bold">{mentee.name}</h3>
                  <p className="text-base opacity-90">Scholar No: {mentee.scholar_no}</p>
                  {mentee.branch && <p className="text-sm opacity-90">Branch: {mentee.branch}</p>}
                </div>
              </div>

              {/* Divider */}
              <div className="h-1 bg-gradient-to-r from-red-200 via-red-100 to-white"></div>

              {/* Mentor Section */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">Mentor</div>
                  <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800"
                    >
                      <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                      <path d="M16 2H9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7Z"></path>
                      <path d="M12 13V7"></path>
                      <path d="M10 9h4"></path>
                    </svg>
                  </div>
                </div>

                {mentee.mentorName ? (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{mentee.mentorName}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-base text-gray-600">{mentee.mentorDepartment}</p>
                      <Link to="#" className="text-sm text-red-800 font-medium hover:underline flex items-center gap-1">
                        View Profile
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 px-3 bg-gray-100 rounded-md text-center">
                    <p className="text-gray-500 text-sm italic">No mentor assigned</p>
                    <button className="mt-1 text-xs text-red-800 font-medium hover:underline">Assign Mentor</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MenteeList
