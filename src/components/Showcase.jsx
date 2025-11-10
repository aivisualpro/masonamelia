import React, { useRef } from "react";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
// import LocomotiveScroll from "locomotive-scroll";

const Showcase = () => {
  return (
    <header className="hero_section_header w-screen md:h-screen z-[10]">
      <div
        className="sm:absolute top-0 left-0 w-full h-full md:h-screen z-[-1]"
        style={{
          filter: "drop-shadow(20px 10px 15px rgba(255, 255, 255, 0.2))",
        }}
      >
        <div className="z-[2] relative md:static hero_section_header_overlay w-screen h-[80vh] sm:h-[50vh] md:h-[75%] lg:h-screen overflow-hidden">
          <div
            className={`hero_section_header_overlay_dark overlay absolute top-0 left-0 w-full h-full z-10 md:block hidden`}
            style={{
              background:
                "linear-gradient(to top, #111218fd 30%, #11121868 80%)",
            }}
          ></div>
          <div className="overlay md:hidden block opacity-50 bg-black absolute top-0 left-0 w-full h-full z-0"></div>
          <video
            className="w-full h-full object-cover"
            loop
            muted
            autoPlay
            playsInline
          >
            <source src="/assets/file.mp4" type="video/mp4" />
          </video>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            viewport={{ amount: 0.2, once: true }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.5,
              delay: 0.6,
            }}
            className={`z-[3] p-4 absolute top-[85%] w-full text-center text-white text-[1.4rem] font-extrabold capitalize leading-[1.2]`}
          >
            Turbulence-Free Transactions
          </motion.h2>
        </div>
      </div>

      <Navbar />

      <HeroSection />
    </header>
  );
};

export default Showcase;
