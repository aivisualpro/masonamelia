import React from "react";
import { motion } from "framer-motion";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const Higher = ({ banner, bannerTwo }) => {
  const media = useMediaQuery("(max-width: 767px)");

  return (
    <div className="flex items-center md:h-screen h-[280px]">
      {/* Overlay card */}

      <div className="absolute md:hidden block w-full  z-[-1] top-0 left-0">
        <img src={banner} className="w-full h-full object-contain" alt="" />
      </div>

      <div className="absolute md:hidden block w-full h-[280px] z-[-1] top-0 left-0 bg-black/60"></div>

      <div className="pt-[32px] pb-[32px] md:pb-0 md:pt-[50px] px-2 text-white text-start h-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white md:text-start text-center text-[1.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-6xl md:max-w-md lg:max-w-2xl"
          style={{ lineHeight: "1.1" }}
        >
          We’re more than brokers -{" "}
          <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
            We’re storytellers
          </span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            duration: 0.5,
            delay: 0.4,
          }}
          className="max-w-lg lg:max-w-xl flex justify-start md:mt-4"
        >
          <ShinyText
            isTextCenter={media ? true : false}
            text={
              "If your broker isn’t crafting a marketing plan as compelling as the plane itself, they’re not truly selling it."
            }
            disabled={false}
            speed={5}
            className="text-sm md:text-lg mt-4"
            color="md:text-[#b5b5b5a4] text-white"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Higher;
