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
        {/* <div className="overlay bg-black opacity-60 absolute top-0 left-0 w-full h-full z-[-1]"></div> */}

        <div className="absolute md:hidden block w-full h-[450px] z-[-1] top-0 left-0">
          <img src={banner} className="w-full h-full" alt="" />
        </div>

        <div className="absolute md:hidden block w-full h-[450px] z-[-1] top-0 left-0 bg-black/60"></div>

        <div className="container flex flex-col justify-center h-full pt-[132px] pb-[32px] md:items-start items-center px-5">
          <div className="banner-content">
            {/* <h1 className="text-white text-6xl font-bold">Discover the Future of Flight</h1> */}
            <BlurText
              text="Where Precision "
              highlightedText=" Meets Passion"
              highlightedClassName="text-blue-500" // ya sky-500, etc.
              delay={150}
              animateBy="words"
              direction="top"
              className="max-w-xl text-[1.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl leading-none font-bold text-white"
            />
            <ShinyText
              text="We curate an exclusive collection of high-performance piston and owner-flown turbine aircraft, each one selected to satisfy the most discerning aviators."
              disabled={false}
              isTextCenter={media ? true : false}
              speed={5}
              className="custom-class text-sm md:text-lg py-4 md:max-w-md lg:max-w-lg xl:max-w-xl"
              color="md:text-[#b5b5b5a4] text-white"
            />{" "}
            <br />
            <ShinyText
              text="If your dream aircraft isn’t in our showroom, consider it already in motion. Our global network ensures we find exactly what you seek."
              disabled={false}
              isTextCenter={media ? true : false}
              speed={5}
              className="custom-class text-sm md:text-lg md:max-w-md lg:max-w-lg xl:max-w-xl"
              color="md:text-[#b5b5b5a4] text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
