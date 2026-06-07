import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";

const Skynet = ({ banner, titleWhite, titleBlue, description, isDesktop }) => {
  const media = useMediaQuery("(max-width: 1023px)");

  const white = titleWhite || 'Mason Amelia Pricing Intelligence —';
  const blue = titleBlue || 'Powered by SkyNet';
  const desc = description || (media
    ? "No Guesswork. No Lag. Just Real-Time Market Intelligence That Gives You the Edge"
    : "No guesswork. No lag. Real-time market intelligence that gives our clients the sharpest edge; Fast, factual, and unbeatable.");

  return (
    <div className={isDesktop ? "h-full flex flex-col justify-center" : "h-full"}>
      {/* Background Image Right Side */}
      {!isDesktop && (
        <>
          <div className="absolute lg:hidden block w-full h-full z-[-1] top-0 left-0">
            <img src={banner} className="w-full h-full object-cover" alt="" />
          </div>

          <div className="absolute lg:hidden block w-full h-full z-[-1] top-0 left-0 bg-black/60"></div>
        </>
      )}

      <div className={isDesktop ? "flex flex-col justify-center text-start" : "px-8 container pt-[132px] pb-[32px] lg:pt-[50px] lg:h-screen flex flex-col justify-start lg:justify-center h-full "}>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
          className={`lg:text-start text-center text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-6xl lg:max-w-md lg:max-w-2xl font-bold ${media ? "text-[#1777cb] uppercase" : "text-white"}`}
          style={{ lineHeight: "1.1" }}
        >
          {media ? (
            "SKYNET"
          ) : (
            <>
              {white}{" "}
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                {blue}
              </span>
            </>
          )}
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
          className="lg:max-w-md lg:max-w-xl flex justify-start mt-4"
        >
          <ShinyText
            isTextCenter={media ? true : false}
            text={desc}
            disabled={false}
            speed={5}
            className="text-sm md:text-xl"
            color="lg:text-[#b5b5b5a4] text-white"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Skynet;
