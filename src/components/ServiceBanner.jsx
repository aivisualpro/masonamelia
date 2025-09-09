import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import ShinyText from "./ui/ShinyText";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServiceBanner = ({ banner }) => {
  const location = useLocation();

  const media = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Navbar />
      <section
        className="w-screen h-screen md:sticky top-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(21, 22, 28, ${media ? ".8" : "1"}) ${media? "100%" : `${location.pathname === "/brokerage" ? "35%" : "32%"}`}, rgba(21, 22, 28,0.3)), url(${
            location.pathname === "/brokerage"
              ? banner
              : banner
          })`,
          backgroundSize: "cover",
          backgroundPosition: `${location.pathname === "/brokerage" ? "70% 50%" : "bottom right"}`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="px-5 container flex flex-col justify-center h-[100vh] md:items-start items-center">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
            className="md:text-start text-center text-white text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-6xl lg:max-w-lg xl:max-w-2xl mb-7"
            style={{ lineHeight: "1.1" }}
          >
            <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
              {location.pathname === "/brokerage"
                ? "Navigating Brokerage"
                : "Simplifying Aviation"}
            </span>{" "}
            <br />
            {location.pathname === "/brokerage"
              ? "One Deal at a Time"
              : "One Deal at a Time"}
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
                location.pathname === "/brokerage"
                  ? "Mason Amelia makes aircraft deals seamless and strategic. We handle the process—so you can focus on results."
                  : "Mason Amelia streamlines aircraft deals with clarity and confidence. Buy or sell, we make it seamless."
              }
              disabled={false}
              speed={5}
              className="text-lg md:text-xl"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceBanner;
