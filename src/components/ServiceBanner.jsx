import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import BlurText from "./ui/BlurText";
import ShinyText from "./ui/ShinyText";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServiceBanner = ({ banner, bannerTwo, titleWhite: propTitleWhite, titleBlue: propTitleBlue, heroDescription: propDesc, bgImage }) => {
  const location = useLocation();
  const media = useMediaQuery("(max-width: 767px)");

  // Resolve title/description — use dynamic props if provided, otherwise hardcoded defaults
  const defaultTitleWhite = location.pathname === "/brokerage"
    ? "A Strategic Hands-On Approach "
    : location.pathname === "/insurance"
      ? "Aircraft "
      : "The Right Aircraft ";

  const defaultTitleBlue = location.pathname === "/brokerage"
    ? "to Selling Your Aircraft"
    : location.pathname === "/insurance"
      ? "Insurance"
      : "Changes Everything";

  const defaultDesc = media
    ? (location.pathname === "/brokerage"
      ? "A Strategic Hands-On Approach to Selling Your Aircraft"
      : location.pathname === "/insurance"
        ? "Aircraft Insurance"
        : "The Right Aircraft Changes Everything")
    : (location.pathname === "/brokerage"
      ? "Your aircraft deserves to stand out. We highlight its strengths and handle every phase with intent, precision, and the relentless pursuit of perfection."
      : location.pathname === "/insurance"
        ? "Our trusted partners at Titan Insurance specialize exclusively in high-end owner-flown piston and turbine aircraft, backed by decades of aviation insurance expertise. Get a tailored quote today."
        : "We take a consultative approach, learning your mission, analyzing the market, and guiding your acquisition from your first call to first flight.");

  const tw = propTitleWhite || defaultTitleWhite;
  const tb = propTitleBlue || defaultTitleBlue;
  const desc = propDesc || defaultDesc;
  const mobileFallbackTitle = location.pathname === "/brokerage" ? "BROKERAGE" : location.pathname === "/insurance" ? "INSURANCE" : "ACQUISITION";
  const heroImage = bgImage || banner;

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Navbar />
      {isDesktop ? (
        <section className="w-full min-h-screen flex flex-row relative sticky top-0 overflow-hidden z-[10]">
          {/* Left Column (40% width) */}
          <div className="w-[40%] min-h-screen bg-[#111218] flex flex-col justify-center items-start px-10 xl:px-16 pt-[50px] relative z-[9]">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
              className="text-start text-white text-[1.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-[4rem] max-w-lg xl:max-w-2xl pb-4"
              style={{ lineHeight: "1.1" }}
            >
              {tw}{" "}
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                {tb}
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
                isTextCenter={false}
                text={desc}
                disabled={false}
                speed={5}
                className="text-sm md:text-xl py-4"
                color="md:text-[#b5b5b5a4] text-white/80"
              />
            </motion.div>

            {/* Titan Insurance banner + CTA — insurance page only */}
            {location.pathname === "/insurance" && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  duration: 0.5,
                  delay: 0.6,
                }}
                className="flex flex-col items-start gap-5 mt-6"
              >
                <img
                  src="/images/insurance/titan_aerospace_insurance.avif"
                  alt="Titan Aerospace Insurance"
                  className="max-w-[280px] md:max-w-xs rounded-lg"
                />
                <a
                  href="mailto:insurance@masonamelia.com"
                  className="text-[#111218] flex gap-2 items-center shadow-xl text-lg bg-[#fff] backdrop-blur-md font-medium isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-tertiary_color hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-8 py-3 overflow-hidden border-2 border-[#111218] transition-all duration-700 hover:border-tertiary_color rounded-full group"
                >
                  Get Quote
                </a>
              </motion.div>
            )}
          </div>

          {/* Blending overlay between columns */}
          <div className="absolute left-[40%] w-[10%] h-full bg-gradient-to-r from-[#111218] to-transparent z-[10] pointer-events-none" />

          {/* Right Column (60% width) */}
          <div
            className="w-[60%] min-h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundPosition: `${location.pathname === "/brokerage" ? "70% 50%" : "60% 50%"}`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </section>
      ) : (
        <section
          className="w-full h-[50svh] md:h-screen md:sticky top-0 relative"
          style={{
            backgroundImage: media ? "" : `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: `${location.pathname === "/brokerage"
              ? `${media ? "70% 150px" : "70% 50%"}`
              : `${media ? "bottom -150px right 0px" : "60% 50%"}`
              }`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: `${media ? "" : "fixed"}`,
          }}
        >
          {/* Hero gradient overlay */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none z-[1]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(21, 22, 28) 35%, rgba(21, 22, 28, 0.6) 75%, rgba(21, 22, 28, 0.55))",
            }}
          />

          <div className="absolute md:hidden block w-full h-full z-[-1] top-0 left-0 bg-[#111218]">
            <img src={bannerTwo} className="w-full h-full object-cover" alt="" />
          </div>

          <div className="absolute md:hidden block w-full h-full z-[-1] top-0 left-0 bg-black/40"></div>

          <div className="px-5 relative z-[9] container flex flex-col justify-center h-full min-h-[300px] pt-[132px] pb-[32px] md:pt-[50px] md:pb-0 md:justify-center md:h-screen md:items-start items-center">
            {media ? (
                <BlurText
                  text={mobileFallbackTitle}
                  highlightedText=""
                delay={150}
                animateBy="words"
                direction="top"
                className="max-w-xl text-[2.5rem] leading-none font-bold uppercase text-[#1777cb] text-center md:capitalize"
              />
            ) : (
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
                className="md:text-start text-center text-white text-[1.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-[4rem] max-w-lg xl:max-w-2xl pb-4"
                style={{ lineHeight: "1.1" }}
              >
                {tw}{" "}
                <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                  {tb}
                </span>
              </motion.h1>
            )}
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
                text={desc}
                disabled={false}
                speed={5}
                className="text-sm md:text-xl py-4"
                color="md:text-[#b5b5b5a4] text-white/80"
              />
            </motion.div>

            {/* Titan Insurance banner + CTA — insurance page only */}
            {location.pathname === "/insurance" && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  duration: 0.5,
                  delay: 0.6,
                }}
                className="hidden md:flex flex-col items-start gap-5 mt-6"
              >
                <img
                  src="/images/insurance/titan_aerospace_insurance.avif"
                  alt="Titan Aerospace Insurance"
                  className="max-w-[280px] md:max-w-xs rounded-lg"
                />
                <a
                  href="mailto:insurance@masonamelia.com"
                  className="text-[#111218] flex gap-2 items-center shadow-xl text-lg bg-[#fff] backdrop-blur-md font-medium isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-tertiary_color hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-8 py-3 overflow-hidden border-2 border-[#111218] transition-all duration-700 hover:border-tertiary_color rounded-full group"
                >
                  Get Quote
                </a>
              </motion.div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceBanner;
