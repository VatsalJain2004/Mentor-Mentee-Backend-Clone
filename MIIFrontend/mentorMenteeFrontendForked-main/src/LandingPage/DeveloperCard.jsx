"use client"
import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { FaEnvelope, FaLinkedin, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa6"

const teamMembers = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  name: "NAME",
  position: "POSITION",
  image: "/placeholder.svg?height=250&width=300",
  email: "mailto:example@example.com",
  linkedin: "https://linkedin.com/in/example",
  github: "https://github.com/example",
}))

const Cards = () => {
  const swiperRef = useRef(null)

  return (
    <div className="flex flex-col items-center w-full bg-[#F1F1F1] min-h-[500px] py-12 px-4 mt-8 border-t border-b border-black shadow-[inset_0_5px_4px_0_rgb(0_0_0_/_0.17)]">
      <h1 className="text-5xl font-bold text-center mb-8">MEET THE DEVELOPER TEAM</h1>
      <p className="text-2xl text-center text-gray-800 mb-10">The students behind the module</p>

      <div className="relative w-full max-w-[80%] mt-8">
        {/* Navigation Buttons */}
        <button
          className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white border border-black w-14 h-14 flex items-center justify-center rounded-full hover:scale-105 transition z-20"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaChevronLeft size={20} className="text-black text-xl" />
        </button>

        <button
          className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white border border-black w-14 h-14 flex items-center justify-center rounded-full hover:scale-105 transition z-20"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaChevronRight size={20} className="text-black text-xl" />
        </button>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          className="w-[70%]"
        >
          {teamMembers.map((member) => (
            <SwiperSlide key={member.id}>
              <motion.div
                className="overflow-hidden rounded-xl border border-black shadow-md bg-white relative group transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-80 w-full bg-gray-400"></div>
                <div className="text-center p-4 py-2 bg-white rounded-b-xl transition group-hover:bg-red-800 border-t border-black">
                  <h3 className="font-bold text-3xl group-hover:text-white">{member.name}</h3>
                  <p className="text-lg mb-3 group-hover:text-white">{member.position}</p>
                  <div className="flex justify-center gap-4">
                    <a href={member.email} className="w-10 h-10 flex items-center justify-center border border-black group-hover:border-white rounded-xl group-hover:text-white">
                      <FaEnvelope size={18} />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-black group-hover:border-white rounded-xl group-hover:text-white">
                      <FaLinkedin size={18} />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-black group-hover:border-white rounded-xl group-hover:text-white">
                      <FaGithub size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Cards