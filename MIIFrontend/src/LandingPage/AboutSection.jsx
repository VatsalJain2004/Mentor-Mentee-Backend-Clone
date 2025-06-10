"use client";
import { useState, useEffect } from "react";
import React from "react";

export default function MentorMenteeProgram() {
  const [menteeCount, setMenteeCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);

  useEffect(() => {
    const menteeTarget = 12000;
    const mentorTarget = 500;
    const duration = 1000;
    const steps = 60;
    const menteeIncrement = menteeTarget / steps;
    const mentorIncrement = mentorTarget / steps;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setMenteeCount(
          Math.min(Math.round(menteeIncrement * currentStep), menteeTarget)
        );
        setMentorCount(
          Math.min(Math.round(mentorIncrement * currentStep), mentorTarget)
        );
      } else {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[80%] mx-auto p-4 relative flex flex-col items-center">
      {/* Hero Image Section */}
      <div className="w-full relative flex justify-center">
        <img
          src="/student.png"
          alt="Students and mentors collaborating"
          className="object-cover w-full max-h-[500px] rounded-lg"
        />
      </div>

      {/* About Section */}
      <div className="w-full bg-red-200 hover:bg-red-800 hover:text-white transition-colors duration-300 rounded-xl p-6 shadow-lg mt-6">
        <h2 className="text-4xl text-center font-bold">About Mentor-Mentee Program</h2>
        <p className="mb-4 text-3xl text-semibold mt-10 p-2">
          At Medi-Caps University, students are seeds nurtured by mentors' care.
        </p>
        <p className="mb-4 text-3xl text-semibold p-2">
          Extending this philosophy, the Mentor-Mentee portal is a digital space
          designed to strengthen the bond between mentors and mentees, ensuring every
          student receives the guidance they need to thrive.
        </p>
        <p className="text-3xl text-semibold  mb-8 p-2">
          This portal serves as a centralized hub for managing academic and
          co-curricular activities, fostering relationships, and streamlining processes.
        </p>
      </div>

      {/* Mentor & Mentee Section */}
      <div className="flex flex-col md:flex-row gap-6 mt-6 w-full">
        {/* Mentee Section */}
        <div className="w-full md:w-1/2 bg-red-200 hover:bg-red-800 hover:text-white transition-colors duration-300 rounded-xl p-6 shadow-lg">
          <h2 className="text-4xl font-bold text-center">Mentee</h2>
          <p className="text-left text-3xl text-semibold mt-10 mb-8 p-2">
            A mentee is a sponge, eager to absorb knowledge and wisdom from their mentor.
            Driven by curiosity and ambition, they actively seek guidance to refine their
            skills, unlock potential, and transform aspirations into achievements under
            the mentor's steady guidance.
          </p>
        </div>

        {/* Mentor Section */}
        <div className="w-full md:w-1/2 bg-red-200 hover:bg-red-800 hover:text-white transition-colors duration-300 rounded-xl p-6 shadow-lg">
          <h2 className="text-4xl font-bold text-center">Mentor</h2>
          <p className="text-left text-3xl mt-10 mb-8 p-2 text-semibold">
            A mentor is a lighthouse, guiding students through the turbulent waters of
            academia and career-building. With their experience and wisdom, they
            illuminate paths, offer support, and empower mentees to navigate challenges,
            bridging the gap between learning and practical application.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row justify-center items-center w-full mt-12 pt-6">
        {/* Mentee Count */}
        <div className="w-1/2 text-center p-4">
          <h2 className="text-6xl font-bold">{menteeCount.toLocaleString()}+</h2>
          <p className="text-lg">Mentee</p>
        </div>

        {/* Vertical Line */}
        <div className="hidden md:block w-px bg-gray-700 h-32"></div>

        {/* Mentor Count */}
        <div className="w-1/2 text-center p-4">
          <h2 className="text-6xl font-bold">{mentorCount.toLocaleString()}+</h2>
          <p className="text-lg">Mentor</p>
        </div>
      </div>
    </div>
  );
}