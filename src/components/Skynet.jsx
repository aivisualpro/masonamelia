import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const Skynet = () => {
  const media = useMediaQuery("(max-width: 767px)");

  return (
    <section className="h-[100vh]">
      {/* Background Image Right Side */}
      <div className="px-5 container flex flex-col justify-center h-full ">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
          className="text-white md:text-start text-center text-[2rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-6xl md:max-w-md lg:max-w-2xl"
          style={{ lineHeight: "1.1" }}
        >
          Mason Amelia Pricing Intelligence - {" "}
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
          className="max-w-xl flex justify-start mt-4"
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
            className="md:text-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Skynet;
