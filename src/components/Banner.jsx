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
        className="bg-img w-full md:sticky top-0 h-screen"
        style={{
          backgroundImage: media 
            ? "" 
            : `linear-gradient(to right, rgb(21, 22, 28, 1) 0%, rgb(21, 22, 28, 1) 20%, rgba(0, 0, 0, 0.05) 50%), url(${url})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {showArrow && <BlinkingArrow onClick={handleArrowClick} />}

        {/* Mobile Background Image */}
        {media && (
          <div className="absolute w-full h-full z-[-1] top-0 left-0 overflow-hidden">
            <img 
              src={banner || url} 
              className="w-full h-full object-cover object-center" 
              alt="Aircraft" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111218]/70 via-[#111218]/50 to-[#111218]/90"></div>
          </div>
        )}

        <div className="container flex flex-col justify-center h-full md:items-start items-center px-5">
          <div className="banner-content md:-mt-[10vh] text-center md:text-left">
            <BlurText
              text="Where Precision "
              highlightedText=" Meets Passion"
              highlightedClassName="text-blue-500"
              delay={150}
              animateBy="words"
              direction="top"
              className="max-w-xl text-[1.8rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
            />
            <ShinyText
              text="We curate an exclusive collection of high-performance piston and owner-flown turbine aircraft, each one selected to satisfy the most discerning aviators."
              disabled={false}
              isTextCenter={media ? true : false}
              speed={5}
              className="custom-class text-sm md:text-lg mt-4 md:max-w-lg lg:max-w-xl"
              color="text-white/90 md:text-[#b5b5b5]"
            />
            <ShinyText
              text="If your dream aircraft isn't in our showroom, consider it already in motion. Our global network ensures we find exactly what you seek."
              disabled={false}
              isTextCenter={media ? true : false}
              speed={5}
              className="custom-class text-sm md:text-lg mt-3 md:max-w-lg lg:max-w-xl"
              color="text-white/80 md:text-[#b5b5b5]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
