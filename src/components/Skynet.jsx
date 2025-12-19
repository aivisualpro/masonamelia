import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const Skynet = ({ banner }) => {
  const media = useMediaQuery("(max-width: 767px)");

  return (
    <div className="lg:h-[400px] md:h-[100vh]">
      {/* Background Image Right Side */}
      <div className="px-8 container pt-[122px] pb-[32px] md:pt-[50px] md:h-screen flex flex-col justify-center h-full ">
        <div className="absolute md:hidden block w-full h-[400px] z-[-1] top-0 left-0">
          <img src={banner} className="w-full h-full" alt="" />
        </div>

        <div className="absolute md:hidden block w-full h-[400px] z-[-1] top-0 left-0 bg-black/60"></div>

        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
          className="text-white md:text-start text-center text-[1.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-6xl md:max-w-md lg:max-w-2xl"
          style={{ lineHeight: "1.1" }}
        >
          Mason Amelia Pricing Intelligence -{" "}
          <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
            Powered by SkyNet
          </span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            duration: 0.5,
            delay: 0.3,
          }}
          className="md:max-w-md lg:max-w-xl flex justify-start mt-4"
        >
          <ShinyText
            isTextCenter={media ? true : false}
            text={
              location.pathname === "/brokerage"
                ? "Mason Amelia makes aircraft deals seamless and strategic. We handle the process—so you can focus on results."
                : "No guesswork. No lag. Real-time market intelligence that gives our clients the sharpest edge; Fast, factual, and unbeatable."
            }
            disabled={false}
            speed={5}
            className="text-sm md:text-lg"
            color="md:text-[#b5b5b5a4] text-white"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Skynet;
