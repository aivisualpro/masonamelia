import React, { useRef } from "react";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import Button from "./Button";
// import LocomotiveScroll from "locomotive-scroll";

const Showcase = ({ contact }) => {
  const videoUrl = contact?.home_hero_video_url || "/assets/file.mp4";
  const mobileTitle = contact?.home_hero_mobile_title || "Turbulence-Free Transactions";

  return (
    <header className="hero_section_header w-screen md:h-screen z-[10] bg-[#111218] sm:bg-transparent">
      <div
        className="sticky top-0 sm:absolute left-0 w-full h-full md:h-screen z-[0] sm:z-[-1] pt-[80px] sm:pt-0"
        style={{
          filter: "drop-shadow(20px 10px 15px rgba(255, 255, 255, 0.2))",
        }}
      >
        <div className="z-[2] relative md:static hero_section_header_overlay w-screen h-auto md:h-[75%] lg:h-screen">
          <div
            className={`hero_section_header_overlay_dark overlay absolute top-0 left-0 w-full h-full z-10 md:block hidden`}
            style={{
              background:
                "linear-gradient(to top, #111218fd 30%, #11121868 80%)",
            }}
          ></div>
          <div className="overlay md:hidden block opacity-50 bg-black absolute top-0 left-0 w-full h-full z-0"></div>
          <video
            className="w-full h-auto min-h-[50vh] md:h-[80vh] object-cover relative"
            loop
            muted
            autoPlay
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          {/* Mobile Overlay Text & Button */}
          <div className="absolute top-0 left-0 w-full h-full z-[60] md:hidden flex flex-col justify-end items-center pb-[3rem] pointer-events-none transform-gpu will-change-transform">
            <div className="w-full text-center px-4 pointer-events-auto shadow-[0_0_1px_rgba(0,0,0,0)] transform-gpu">
              <h2 className="text-white text-[1.4rem] font-extrabold capitalize leading-[1.2]">
                {mobileTitle}
              </h2>
              <div className="flex justify-center mt-4">
                <Button
                  buttonLabel="Visit Showroom"
                  onClick="/showroom"
                  bgColor="fff"
                  arrowColor="#111218"
                  txtColor="text-[#111218]"
                  borderColor="border-gray-600"
                  fillColor="fill-gray-600"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <Navbar />

      <HeroSection contact={contact} />
    </header>
  );
};

export default Showcase;
