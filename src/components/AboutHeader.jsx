import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const AboutHeader = () => {
  const media = useMediaQuery("(max-width: 1023px)");

  return (
    // Wrap hero in a relative section so overlay sit kare
    <section className="relative h-[100vh]">
      <div className={`relative z-10 px-5 pb-4 container flex flex-col justify-end lg:justify-center h-full lg:items-start items-center`}>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
          className="
            lg:text-start text-center text-white
            text-[1.5rem] md:text-[3.5rem] lg:text-[3rem] xl:text-6xl
            lg:max-w-sm xl:max-w-lg mb-4
            [text-shadow:_0_3px_12px_rgba(0,0,0,0.75)]
          "
          style={{ lineHeight: "1.1" }}
        >
          Redefining Aviation With{" "}
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
          className="lg:max-w-sm xl:max-w-lg"
        >
          {/* Slight chip behind paragraph for readability on mobile */}
          <div className={`rounded-md md:bg-transparent lg:pt-0 lg:pb-0 md:pt-2 md:pb-6`}>
            <ShinyText
              // isTextCenter={}
              text="We help distinguished clientele get where they want to go, but faster. Think TBM speed"
              disabled={false}
              speed={5}
              className="text-center lg:text-start md:text-lg [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]"
              color="text-[#ddd] md:text-[#b5b5b5a4]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeader;
