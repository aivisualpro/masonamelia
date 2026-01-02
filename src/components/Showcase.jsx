import React, { useRef } from "react";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import Button from "./Button";
// import LocomotiveScroll from "locomotive-scroll";

const Showcase = () => {
  return (
    <header className="hero_section_header w-full md:h-screen z-[10] bg-[#111218] sm:bg-transparent overflow-hidden">
      <div
        className="sticky top-0 sm:absolute left-0 w-full h-full md:h-screen z-[0] sm:z-[-1] pt-[80px] sm:pt-0"
        style={{
          filter: "drop-shadow(20px 10px 15px rgba(255, 255, 255, 0.2))",
        }}
      >
        <div className="z-[2] relative md:static hero_section_header_overlay w-full h-auto md:h-[75%] lg:h-screen">
          <div
            className={`hero_section_header_overlay_dark overlay absolute top-0 left-0 w-full h-full z-10 md:block hidden`}
            style={{
              background:
                "linear-gradient(to top, #111218fd 30%, #11121868 80%)",
            }}
          ></div>
          <div className="overlay md:hidden block opacity-50 bg-black absolute top-0 left-0 w-full h-full z-0"></div>
          <video
            className="w-full h-full md:h-[80vh] object-cover relative min-h-[50vh]"
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
            className={`z-[3] md:hidden block p-4 absolute bottom-10 w-full text-center text-white text-[1.4rem] font-extrabold capitalize leading-[1.2]`}
          >
            Turbulence-Free Transactions
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              viewport={{ amount: 0.2, once: true }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex justify-center mt-4"
            >
              <Button
                buttonLabel="Visit Showroom"
                onClick="/showroom"
                bgColor="fff"
                arrowColor="#111218"
                txtColor="text-[#111218]"
                borderColor="border-gray-600"
                fillColor="fill-gray-600"
              />
            </motion.div>
          </motion.h2>

        </div>
      </div>

      <Navbar />

      <HeroSection />
    </header>
  );
};

export default Showcase;
