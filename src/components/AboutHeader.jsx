import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const AboutHeader = () => {
  const media = useMediaQuery("(max-width: 767px)");

  return (
    // Wrap hero in a relative section so overlay sit kare
    <section className="relative h-[100vh]">
      <div className="relative z-10 px-5 pt-20 container flex flex-col justify-center h-full md:items-start items-center">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
          className="
            md:text-start text-center text-white
            text-[1.5rem] md:text-[2.5rem] lg:text-[3rem] xl:text-6xl
            lg:max-w-lg xl:max-w-2xl mb-4
            [text-shadow:_0_3px_12px_rgba(0,0,0,0.75)]
          "
          style={{ lineHeight: "1.1" }}
        >
          Redefining Aviation{" "}With{" "}
          <span
            className="
              text-tertiary_color [text-shadow:_0_3px_12px_rgba(0,0,0,0.75)]
            "
            // thin stroke for extra edge contrast on busy bg
            style={{ WebkitTextStroke: "0.5px rgba(0,0,0,0.25)" }}
          >
            Trust and Legacy
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 0.5, delay: 0.3 }}
          className="max-w-xl flex justify-start"
        >
          {/* Slight chip behind paragraph for readability on mobile */}
          <div className={`rounded-md md:bg-transparent bg-black/50 p-2`}>
            <ShinyText
              isTextCenter={media}
              text="Mason Amelia delivers trusted aviation backed by legacy. Precision, clarity, and lasting confidence in every deal."
              disabled={false}
              speed={5}
              className="text-lg md:text-xl [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]"
              color="text-[#ddd] md:text-[#b5b5b5a4]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeader;
