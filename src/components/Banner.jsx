import React from "react";
import Navbar from "./Navbar";
import BlurText from "./ui/BlurText";
import ShinyText from "./ui/ShinyText";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "./BlinkingArrow";

const Banner = ({ url, banner, handleArrowClick, showArrow }) => {
  const media = useMediaQuery("(max-width: 767px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Navbar />
      {isDesktop ? (
        <div className="w-full min-h-screen flex flex-row relative sticky top-0 overflow-hidden z-[10]">
          {/* Left Column (40% width) */}
          <div className="w-[40%] min-h-screen bg-[#111218] flex flex-col justify-center items-start px-10 xl:px-16 pt-[50px] relative z-[9]">
            <div className="banner-content">
              <BlurText
                text="Where Precision "
                highlightedText=" Meets Passion"
                highlightedClassName="text-blue-500"
                delay={150}
                animateBy="words"
                direction="top"
                className="max-w-xl text-[2.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl leading-none font-bold uppercase md:capitalize text-white"
              />
              <ShinyText
                text="We curate an exclusive collection of high-performance piston and owner-flown turbine aircraft, each one selected to satisfy the most discerning aviators."
                disabled={false}
                isTextCenter={false}
                speed={5}
                className="custom-class text-sm md:text-xl py-4 md:max-w-md lg:max-w-lg xl:max-w-xl"
                color="md:text-[#b5b5b5a4] text-white/80"
              />
            </div>
          </div>

          {/* Blending overlay between columns */}
          <div className="absolute left-[40%] w-[10%] h-full bg-gradient-to-r from-[#111218] to-transparent z-[10] pointer-events-none" />

          {/* Right Column (60% width) */}
          <div
            className="w-[60%] min-h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${url})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "60% 50%",
            }}
          />
          {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
        </div>
      ) : (
        <div
          className="h-[50svh] relative bg-img w-full md:sticky top-0 md:h-screen"
          style={{
            backgroundImage: media ? "" : `url(${url})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "60% 50%",
          }}
        >
          {/* Hero gradient overlay — sized to element, identical across all pages */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none z-[1]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(21, 22, 28) 35%, rgba(21, 22, 28, 0.6) 75%, rgba(21, 22, 28, 0.55))",
            }}
          />
          {showArrow && !media && <BlinkingArrow onClick={handleArrowClick} />}
          {/* <div className="overlay bg-black opacity-60 absolute top-0 left-0 w-full h-full z-[-1]"></div> */}

          <div className="absolute md:hidden block w-full h-full z-[-1] top-0 left-0 bg-[#111218]">
            <img src={banner} className="w-full h-full object-cover" alt="Banner" />
          </div>

          <div className="absolute md:hidden block w-full h-full z-[-1] top-0 left-0 bg-black/40"></div>

          <div className="container relative z-[2] flex flex-col justify-center h-full pt-[132px] pb-[32px] md:items-start items-center px-5">
            <div className="banner-content">
              {/* <h1 className="text-white text-6xl font-bold">Discover the Future of Flight</h1> */}
              <BlurText
                text={media ? "SHOWROOM" : "Where Precision "}
                highlightedText={media ? "" : " Meets Passion"}
                highlightedClassName="text-blue-500" // ya sky-500, etc.
                delay={150}
                animateBy="words"
                direction="top"
                className={`max-w-xl text-[2.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl leading-none font-bold uppercase md:capitalize ${media ? "text-[#1777cb]" : "text-white"}`}
              />
              <ShinyText
                text={
                  media
                    ? "Exclusive Collection of High-Performance Piston and Owner-Flown Turbine Aircraft"
                    : "We curate an exclusive collection of high-performance piston and owner-flown turbine aircraft, each one selected to satisfy the most discerning aviators."
                }
                disabled={false}
                isTextCenter={media ? true : false}
                speed={5}
                className="custom-class text-sm md:text-xl py-4 md:max-w-md lg:max-w-lg xl:max-w-xl"
                color="md:text-[#b5b5b5a4] text-white/80"
              />{" "}
              <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;