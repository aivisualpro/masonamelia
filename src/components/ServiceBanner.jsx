import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import ShinyText from "./ui/ShinyText";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServiceBanner = ({ banner }) => {
  const location = useLocation();

  const media = useMediaQuery("(max-width: 767px)");

  // 

  return (
    <>
      <Navbar />
      <section
        className="w-screen h-screen md:sticky top-0 relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(21, 22, 28, ${media ? ".6" : "1"}) ${media ? "100%" : `${location.pathname === "/brokerage" ? "35%" : "32%"}`}, rgba(21, 22, 28,0.3)), url(${location.pathname === "/brokerage"
              ? banner
              : banner
            })`,
          backgroundSize: "cover",
          backgroundPosition: `${location.pathname === "/brokerage" ? `${media ? "70% 150px" : "70% 50%"}` : `${media ? "bottom -150px right 0px" : "bottom right"}`}`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: `${media ? "" : "fixed"}`,
        }}
      >
        <div className={`${media ? 'block' : 'hidden'} overlay absolute w-full h-[150px]  left-0 top-0 ${location.pathname === "/brokerage" ? "bg-[#0181d8]" : "bg-[#0671ba]"}`}>
          <div className="overlay absolute w-full h-[150px]  left-0 top-0 bg-[#15161c]/60"></div>
        </div>
        <div className="px-5 container pt-[50px] flex flex-col justify-center h-[100vh] md:items-start items-center">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
            className="md:text-start text-center text-white text-[2rem] md:text-[3rem] xl:text-7xl max-w-lg xl:max-w-2xl mb-7"
            style={{ lineHeight: "1.1" }}
          >
            {location.pathname === "/brokerage"
              ? "A Strategic, Hands-On Approach"
              : "The right aircraft "} {" "}

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
              className="md:text-lg"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceBanner;
