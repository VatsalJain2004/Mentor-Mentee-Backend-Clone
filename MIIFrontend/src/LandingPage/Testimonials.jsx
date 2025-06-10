import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    text: "Canatics marketing ask deep contribution contribution. Cross-pollination fit beforehand just baseline sop synchronise go. Seems pain clean meaningful monday knowledge teeth have pretend. Ipsum.",
    name: "Resky Fernanda",
    role: "Product Designer at Tokopedia",
  },
  {
    text: "Timepoint data cought feed important opportunity got cloud wheel. Agile back-end this eod call shift one. Strategy sandwich field productive way you're for product points. Tentative busy emails view files are.",
    name: "John Doe",
    role: "Project Manager at Leopedia",
  },
  {
    text: "Building criticality moments keywords synergize.Day field criticality launch metal stand. Me backwards they alarming moving your social.Commitment hiring cause caught air shower territories algorithm ourselves.",
    name: "Hena Fang",
    role: "HR Manager at Upstacking",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section className="bg-white py-12">
      {/* Add this at the very top of the section */}
      <div className="text-center mb-8">
          <h2 className="text-7xl font-bold text-gray-900 relative inline-block">
              Testimonials
              <div className="w-full h-2 bg-red-700 mt-1"></div>
          </h2>
      </div>

      {/* Your existing left and right content starts here */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-16 mt-24 flex flex-col md:flex-row items-center">
          {/* All your existing content here — unchanged */}
      </div>

      <div className="container mx-auto max-w-8xl px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center">
        {/* Left Section - Text Block */}
        <div className="md:w-1/2 text-left space-y-6 mb-8 md:mb-0">
          <FaQuoteLeft className="text-5xl text-red-700" />
          <h2 className="text-7xl font-bold text-gray-700 leading-tight">
            What our<br />students have<br />to say
          </h2>
          <p className="text-gray-600 text-xl">
            More than 3000 students have been helped by,<br />Mentor-Mentee Program.
          </p>
        </div>

        {/* Right Section - Carousel */}
        <div className="md:w-1/2 relative">
          <div className="bg-red-800 text-white rounded-3xl shadow-lg h-[300px] w-xl flex flex-col justify-center items-center text-center p-6 relative">
            {/* Fixed "What they say" - Top Left */}
            <p className="absolute top-5 left-8 text-black font-semibold text-2xl">What they say</p>

            {/* Dots Indicator - Top Right */}
            <div className="absolute top-5 right-5 flex space-x-1">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-gray-300" : "bg-gray-500"}`}
                />
              ))}
            </div>

            {/* Testimonial Content - Centered */}
            <div className="w-full max-w-[90%] md:max-w-[80%] mx-auto">
              <p className="text-3xl leading-relaxed text-white mb-4">
                {testimonials[currentIndex].text}
              </p>
            </div>

            {/* Fixed Author Info - Bottom Left 30% */}
            <div className="absolute bottom-4 left-6 w-[30%] text-left">
              <p className="font-bold text-2xl">{testimonials[currentIndex].name}</p>
              <p className="text-x;">{testimonials[currentIndex].role}</p>
            </div>

            {/* Navigation - Bottom Right */}
            <div className="absolute bottom-4 right-6 flex space-x-2">
              <button
                onClick={goToPrevious}
                className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white hover:bg-white hover:text-red-700 transition"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={goToNext}
                className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white hover:bg-white hover:text-red-700 transition"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;