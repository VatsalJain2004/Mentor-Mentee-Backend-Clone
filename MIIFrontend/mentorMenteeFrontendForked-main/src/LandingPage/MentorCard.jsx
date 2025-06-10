"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaLinkedin, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const mentors = [
    {
        name: "NAME",
        position: "POSITION",
        email: "mailto:example@gmail.com",
        linkedin: "https://www.linkedin.com/in/example",
        github: "https://github.com/example"
    },
    {
        name: "NAME",
        position: "POSITION",
        email: "mailto:example@gmail.com",
        linkedin: "https://www.linkedin.com/in/example",
        github: "https://github.com/example"
    },
    {
        name: "NAME",
        position: "POSITION",
        email: "mailto:example@gmail.com",
        linkedin: "https://www.linkedin.com/in/example",
        github: "https://github.com/example"
    }
];

const Card = () => {
    const swiperRef = useRef(null);

    return (
       <>
       <div className="pt-8 px-1">
        <div className="bg-[#F1F1F1] p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center min-h-[450px] border-y border-black shadow-[inset_0_5px_4px_0_rgb(0_0_0_/_0.17)]">
            <h2 className="text-5xl font-bold text-black mb-12">FACULTY MENTORS</h2>

            <div className="block md:hidden relative w-full max-w-xs absolute -left-10">
                <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10">
                    <button
                        className="bg-white border border-black w-14 h-14 flex items-center justify-center rounded-full hover:scale-105 transition"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <FaChevronLeft size={20} className="text-black text-xl" />
                    </button>
                </div>
                <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 z-10">
                    <button
                        className="bg-white border border-black w-14 h-14 flex items-center justify-center rounded-full hover:scale-105 transition"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <FaChevronRight size={20} className="text-black text-xl" />
                    </button>
                </div>

                <Swiper
                    spaceBetween={80}
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation]}
                    className="w-[140%]"
                >
                    {mentors.map((mentor, index) => (
                        <SwiperSlide key={index}>
                            <CardItem mentor={mentor} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="hidden md:flex gap-8 justify-center items-center w-full">
                {mentors.map((mentor, index) => (
                    <CardItem key={index} mentor={mentor} />
                ))}
            </div>
        </div>
        </div>
        </> 
    );
};

const CardItem = ({ mentor }) => (
    <div className="mt-6 w-[250px] h-[340px] bg-white border border-black shadow-lg rounded-xl overflow-hidden flex flex-col group transition-all duration-300">
        <div className="h-[255px] bg-gray-400"></div>
        <div className="flex-1 text-center py-2 bg-white group-hover:bg-red-800 transition-colors duration-300">
            <p className="font-bold text-black text-3xl group-hover:text-white">{mentor.name}</p>
            <p className="text-md mb-3 group-hover:text-white">{mentor.position}</p>
        </div>
        <div className="flex justify-center gap-4 pb-3 bg-white group-hover:bg-red-800 transition-colors duration-300">
            <a href={mentor.email} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-black group-hover:border-white rounded-xl group-hover:text-white">
                <MdEmail size={18} className="text-xl" />
            </a>
            <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-black group-hover:border-white rounded-xl group-hover:text-white">
                <FaLinkedin size={18} className="text-xl" />
            </a>
            <a href={mentor.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-black group-hover:border-white rounded-xl group-hover:text-white">
                <FaGithub size={18} className="text-xl" />
            </a>
        </div>
    </div>
);

export default Card;
