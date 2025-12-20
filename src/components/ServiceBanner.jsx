import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import ShinyText from "./ui/ShinyText";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServiceBanner = ({ banner, bannerTwo }) => {
  const location = useLocation();

  const media = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Navbar />
      <section
        className="w-screen h-full md:h-screen md:sticky top-0 relative"
        style={{
          backgroundImage: media
            ? ""
            : `linear-gradient(to right, rgb(21, 22, 28, ${
                media ? ".6" : "1"
              }) ${
                media
                  ? "100%"
                  : `${location.pathname === "/brokerage" ? "35%" : "32%"}`
              }, rgba(21, 22, 28,0.3)), url(${
                location.pathname === "/brokerage" ? banner : banner
              })`,
          backgroundSize: "cover",
          backgroundPosition: `${
            location.pathname === "/brokerage"
              ? `${media ? "70% 150px" : "70% 50%"}`
              : `${media ? "bottom -150px right 0px" : "bottom right"}`
          }`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: `${media ? "" : "fixed"}`,
        }}
      >
        <div className="absolute md:hidden block w-full h-full z-[-1] top-0 left-0">
          <img src={bannerTwo} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="absolute md:hidden block w-full h-full z-[-1] top-0 left-0 bg-black/60"></div>

        <div className="px-5 z-[9] container flex flex-col pt-[132px] pb-[32px] md:pt-[50px] md:pb-0 md:justify-center md:h-screen md:items-start items-center">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
            className="md:text-start text-center text-white text-[1.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-[4rem] max-w-lg xl:max-w-2xl pb-4"
            style={{ lineHeight: "1.1" }}
          >
            {location.pathname === "/brokerage"
              ? "A Strategic, Hands-On Approach"
              : "The right aircraft "}{" "}
            <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
              {location.pathname === "/brokerage"
                ? "to Selling Your Aircraft"
                : "changes everything"}
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
            className="max-w-lg xl:max-w-xl flex justify-start"
          >
            <ShinyText
              isTextCenter={media ? true : false}
              text={
                location.pathname === "/brokerage"
                  ? "Your aircraft deserves to stand out. We highlight its strengths and handle every phase with intent, precision, and the relentless pursuit of perfection."
                  : "We take a consultative approach, learning your mission, analyzing the market, and guiding your acquisition from your first call to first flight."
              }
              disabled={false}
              speed={5}
              className="text-sm md:text-lg"
              color="md:text-[#b5b5b5a4] text-white"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceBanner;
