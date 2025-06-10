"use client"

import { ArrowRight, User } from "lucide-react"
import { useState } from "react"

export default function MentorProfile() {
  const [mentorData] = useState({
    name: "xyz",
    designation: "Assistant Professor, Computer Science Department",
    email: "xyz@university.com",
    phone: "+91-1234567890",
    mentorId: "MNT12345",
    department: "Computer Science",
    expertiseAreas: ["Artificial Intelligence", "Machine Learning"],
    experience: "+10 years in Academic and Industry",
    cabinNo: "V 114",
    officeHours: "Mon-Fri 10:00 AM - 12:00 PM",
    preferredCommunication: "Email, In-Person",
    assignedMentees: 30,
  })

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white">
      {/* Mentor Profile Header */}
      <div className="bg-red-700 text-white px-4 md:px-6 py-3 rounded-md mb-4 md:mb-6">
        <h1 className="text-lg md:text-xl font-bold">MENTOR PROFILE</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-red-700 text-white rounded-md p-4 md:p-6 mb-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <div className="bg-white rounded-full p-4 md:p-6 flex-shrink-0">
            <User className="h-12 w-12 md:h-16 md:w-16 text-red-700" />
          </div>
          <div className="space-y-1 md:space-y-2 text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold">Name: {mentorData.name}</h2>
            <p className="text-xs md:text-sm">Designation: {mentorData.designation}</p>
            <p className="text-xs md:text-sm">
              Contact: {mentorData.email} | {mentorData.phone}
            </p>
            <p className="text-xs md:text-sm">Mentor ID: {mentorData.mentorId}</p>
          </div>
        </div>
      </div>

      {/* Details and Bio Section */}
      <div className="bg-gray-100 rounded-md p-6 mb-6 shadow-md">
        <h2 className="text-xl font-bold text-red-700 mb-4">Details and Bio</h2>
        <div className="space-y-3">
          <p className="text-black text-base">
            <span className="font-bold">Department:</span> {mentorData.department}
          </p>
          <p className="text-black text-base">
            <span className="font-bold">Expertise Areas:</span>{" "}
            {mentorData.expertiseAreas && mentorData.expertiseAreas.join(", ")}
          </p>
          <p className="text-black text-base">
            <span className="font-bold">Experience:</span> {mentorData.experience}
          </p>
        </div>
      </div>

      {/* Mentorship Information Section */}
      <div className="bg-gray-100 rounded-md p-6 mb-6 shadow-md">
        <h2 className="text-xl font-bold text-red-700 mb-4">Mentorship Information</h2>
        <div className="space-y-3">
          <p className="text-black text-base">
            <span className="font-bold">Cabin no:</span> {mentorData.cabinNo}
          </p>
          <p className="text-black text-base">
            <span className="font-bold">Office Hours:</span> {mentorData.officeHours}
          </p>
          <p className="text-black text-base">
            <span className="font-bold">Preferred Communication:</span> {mentorData.preferredCommunication}
          </p>
        </div>
      </div>

      {/* View Mentee List Section */}
      <div className="bg-gray-100 rounded-md p-6 shadow-md">
        <h2 className="text-xl font-bold text-red-700 mb-4">View mentee list</h2>
        <div
          className="flex items-center justify-between w-full bg-gray-200 rounded-md p-4 hover:bg-gray-300 transition-colors cursor-pointer"
          onClick={() => {
            if (mentorData.assignedMentees) {
                alert(`You have ${mentorData.assignedMentees} assigned mentees.`)
            } else {
              alert("No mentees assigned yet.")
            }
          }}
        >
          <span className="font-medium text-black text-base">Assigned mentee: {mentorData.assignedMentees}</span>
          <ArrowRight className="h-5 w-5 text-black" />
        </div>
      </div>
    </div>
  )
}