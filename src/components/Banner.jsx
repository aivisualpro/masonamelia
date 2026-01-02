import React from "react";
import Navbar from "./Navbar";
import BlurText from "./ui/BlurText";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "./BlinkingArrow";

const Banner = ({ url, banner, handleArrowClick, showArrow }) => {
  const media = useMediaQuery("(max-width: 767px)");
  return (
    <>
      <Navbar />
      <div
        className="h-full relative bg-img w-full md:sticky top-0 md:h-screen"
        style={{
          backgroundImage: media ? "" : `linear-gradient(to right,rgb(21, 22, 28, ${
            media ? ".8" : "1"
          }) ${media ? "100%" : "40%"}, rgba(0, 0, 0, 0.01)), url(${url})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
        }}
      >
        {showArrow && <BlinkingArrow onClick={handleArrowClick} />}

        {/* Mobile Hero Background */}
        <div className="absolute md:hidden block w-full h-full min-h-[480px] z-[-1] top-0 left-0 overflow-hidden">
          <img 
            src={banner} 
            className="w-full h-full object-cover object-center" 
            alt="Aircraft" 
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111218]/70 via-[#111218]/50 to-[#111218]/90"></div>
        </div>

        <div className="container flex flex-col justify-center h-full pt-[100px] pb-[40px] md:pt-[132px] md:pb-[32px] md:items-start items-center px-5 min-h-[480px] md:min-h-0">
          <div className="banner-content text-center md:text-left">
            <BlurText
              text="Where Precision "
              highlightedText=" Meets Passion"
              highlightedClassName="text-blue-500"
              delay={150}
              animateBy="words"
              direction="top"
              className="max-w-xl text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl leading-tight font-bold text-white"
            />
            <div className="mt-4 md:mt-6 space-y-3">
              <ShinyText
                text="We curate an exclusive collection of high-performance piston and owner-flown turbine aircraft, each one selected to satisfy the most discerning aviators."
                disabled={false}
                isTextCenter={media ? true : false}
                speed={5}
                className="custom-class text-sm md:text-lg md:max-w-md lg:max-w-lg xl:max-w-xl"
                color="text-white/90 md:text-[#b5b5b5a4]"
              />
              <ShinyText
                text="If your dream aircraft isn't in our showroom, consider it already in motion. Our global network ensures we find exactly what you seek."
                disabled={false}
                isTextCenter={media ? true : false}
                speed={5}
                className="custom-class text-sm md:text-lg md:max-w-md lg:max-w-lg xl:max-w-xl"
                color="text-white/80 md:text-[#b5b5b5a4]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
