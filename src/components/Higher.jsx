import React from "react";
import { motion } from "framer-motion";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const Higher = ({
  banner,
  bannerTwo,
  titleWhite,
  titleBlue,
  description,
  isDesktop,
}) => {
  const media = useMediaQuery("(max-width: 1023px)");

  const white = titleWhite || "We're More Than Brokers —";
  const blue = titleBlue || "We're Storytellers";
  const desc = description || "If Your Broker Isn't Crafting a Marketing Plan as Compelling as the Aircraft Itself, They're Not Truly Selling It";

  return (
    <div className={isDesktop ? "flex items-center h-full" : "flex items-center lg:h-screen h-full"}>
      {/* Overlay card */}
      {!isDesktop && (
        <>
          <div className="absolute lg:hidden block w-full z-[-1] top-0 left-0">
            <img src={banner} className="w-full h-full object-cover" alt="" />
          </div>

          <div className="absolute lg:hidden block w-full h-full z-[-1] top-0 left-0 bg-black/60"></div>
        </>
      )}

      <div className={isDesktop ? "flex flex-col justify-center" : "pt-[132px] pb-[32px] lg:pb-0 lg:pt-[50px] px-2 text-white text-start h-full flex flex-col lg:justify-center justify-start"}>
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white lg:text-start text-center text-[1.5rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-6xl lg:max-w-md lg:max-w-2xl"
          style={{ lineHeight: "1.1" }}
        >
          {white}{" "} <br className="lg:hidden block" />
          <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
            {blue}
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
          className="max-w-lg lg:max-w-xl flex justify-start lg:mt-4"
        >
          <ShinyText
            isTextCenter={media ? true : false}
            text={desc}
            disabled={false}
            speed={5}
            className="text-sm md:text-xl mt-4"
            color="lg:text-[#b5b5b5a4] text-white"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Higher;
