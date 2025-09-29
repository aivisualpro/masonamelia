import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const AboutHeader = () => {
  const media = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <div className="px-5 container flex flex-col justify-center h-[100vh] md:items-start items-center">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
          className="md:text-start text-center text-white text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-6xl lg:max-w-lg xl:max-w-2xl mb-7"
          style={{ lineHeight: "1.1" }}
        >
          Redefining Aviation {" "} With
          <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
            {" "} Trust and Legacy
          </span>
          <br />
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
          className="max-w-xl flex justify-start"
        >
          <ShinyText
            isTextCenter={media ? true : false}
            text={
              "Mason Amelia delivers trusted aviation backed by legacy. Precision, clarity, and lasting confidence in every deal."
            }
            disabled={false}
            speed={5}
            className="text-lg md:text-xl"
          />
        </motion.div>
      </div>
    </>
  );
};

export default AboutHeader;
