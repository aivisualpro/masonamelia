import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import BlurText from "./ui/BlurText";
import ShinyText from "./ui/ShinyText";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServiceBanner = ({ banner, bannerTwo, contact }) => {
  const location = useLocation();

  const media = useMediaQuery("(max-width: 767px)");

  const isAcquisition = location.pathname === "/acquisition";
  const isBrokerage = location.pathname === "/brokerage";
  const isInsurance = location.pathname === "/insurance";

  // CMS-driven hero text for acquisition
  const heroTitleWhite = isAcquisition
    ? (contact?.acquisition_hero_title_white || "The Right Aircraft ")
    : isBrokerage ? "A Strategic Hands-On Approach" : "Aircraft ";
  const heroTitleBlue = isAcquisition
    ? (contact?.acquisition_hero_title_blue || "Changes Everything")
    : isBrokerage ? "to Selling Your Aircraft" : "Insurance";
  const heroDesc = isAcquisition
    ? (contact?.acquisition_hero_description || "We take a consultative approach, learning your mission, analyzing the market, and guiding your acquisition from your first call to first flight.")
    : isBrokerage
      ? "Your aircraft deserves to stand out. We highlight its strengths and handle every phase with intent, precision, and the relentless pursuit of perfection."
      : "Our trusted partners at Titan Insurance specialize exclusively in high-end owner-flown piston and turbine aircraft, backed by decades of aviation insurance expertise. Get a tailored quote today.";
  const mobileTitle = isAcquisition ? "ACQUISITION" : isBrokerage ? "BROKERAGE" : "INSURANCE";
  const mobileDesc = isAcquisition
    ? (contact?.acquisition_hero_title_white || "The Right Aircraft ") + (contact?.acquisition_hero_title_blue || "Changes Everything")
    : isBrokerage ? "A Strategic Hands-On Approach to Selling Your Aircraft" : "Aircraft Insurance";
  const bgImage = (isAcquisition && contact?.acquisition_hero_bg_image) || banner;

  return (
    <>
      <Navbar />
      <section
        className="w-full h-full md:h-screen md:sticky top-0 relative"
        style={{
          backgroundImage: media
            ? ""
            : `linear-gradient(to right, rgb(21, 22, 28, ${media ? ".6" : "1"
            }) ${media
              ? "100%"
              : `${isBrokerage ? "35%" : "32%"}`
            }, rgba(21, 22, 28,0.3)), url(${bgImage
            })`,
          backgroundSize: "cover",
          backgroundPosition: `${isBrokerage
            ? `${media ? "70% 150px" : "70% 50%"}`
            : `${media ? "bottom -150px right 0px" : "bottom right"}`
            }`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: `${media ? "" : "fixed"}`,
        }}
      >
        <div className="absolute md:hidden block w-full h-full z-[-1] top-0 left-0">
          <img src={bannerTwo} className="w-full h-full object-cover object-[center_85%]" alt="" />
        </div>

        <div className="absolute md:hidden block w-full h-full z-[-1] top-0 left-0 bg-black/75"></div>

        <div className="px-5 z-[9] container flex flex-col justify-center h-full min-h-[300px] pt-[132px] pb-[32px] md:pt-[50px] md:pb-0 md:justify-center md:h-screen md:items-start items-center">
          {media ? (
              <BlurText
                text={mobileTitle}
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
              {heroTitleWhite}{" "}
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                {heroTitleBlue}
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
              text={
                media
                  ? mobileDesc
                  : heroDesc
              }
              disabled={false}
              speed={5}
              className="text-sm md:text-xl py-4"
              color="md:text-[#b5b5b5a4] text-white/80"
            />
          </motion.div>

          {/* Titan Insurance banner + CTA — insurance page only */}
          {isInsurance && (
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
    </>
  );
};

export default ServiceBanner;
