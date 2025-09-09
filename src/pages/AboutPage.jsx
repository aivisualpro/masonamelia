import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import bgPlane from "/images/about-banner.png";
import ScrollToTop from "../components/ScrollToTop";
import { Timeline } from "../components/ui/timeline";
import { FaHandshake, FaUsers, FaChartLine } from "react-icons/fa";
import { FaJetFighterUp } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import WhatSetsUsApart from "../components/WhatSetsApart";
import aboutBanner from "/images/about/banner.avif";
import WhyChoosUs from "../components/WhyChoosUs";
import useMediaQuery from "@mui/material/useMediaQuery";

const AboutPage = () => {

  const data = [
    {
      title: "2015",
      icon: <FaHandshake size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            Sagacious Consultants, co-founded by the Adams brothers, is acquired
            by Accenture, setting the stage for future ventures and
            entrepreneurial growth.
          </p>
        </div>
      ),
    },
    {
      title: "2018–2023",
      icon: <FaJetFighterUp size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            Jesse Adams returns to aviation with a renewed sense of purpose,
            spending nearly five years at Aerista — the world's largest
            brokerage. He leads 200+ global aircraft transactions, gaining
            invaluable experience across piston and owner-flown turbine markets.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      icon: <FaUsers size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            Inspired by family and fueled by passion, Jesse Adams founds{" "}
            <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
              Mason Amelia, LLC
            </span>
            , naming it after his children. What starts as a solo venture
            quickly blossoms into a team, with Mason Amelia representing
            aircraft and clients nationwide.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      icon: <FaChartLine size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-4 text-lg font-normal text-white">
            Mason Amelia becomes the fastest-growing aircraft brokerage in the
            US. Their YouTube channel,{" "}
            <b className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
              Looking for Higher
            </b>
            , emerges as a leading resource for buyers, sellers, and aviation
            enthusiasts — raising the bar for aircraft sales marketing across
            the industry.
          </p>
          <div className="mb-8 list-disc text-white">
            <div className="flex items-center mb-4">
              <IoCheckmarkDoneSharp />
              <span className=" text-white ms-2">
                Nationwide team of five sales professionals
              </span>
            </div>
            <div className="flex items-center mb-4">
              <IoCheckmarkDoneSharp />
              <span className=" text-white ms-2">
                Coast-to-coast representation of aircraft and clients
              </span>
            </div>
            <div className="flex items-center mb-4">
              <IoCheckmarkDoneSharp />
              <span className=" text-white ms-2">
                Trusted for transparency, client focus, and industry innovation
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const media = useMediaQuery("(max-width: 767px)");

  return (
    <>
    <Navbar />
      <section
        className="md:sticky top-0 relative w-screen h-screen bg-[#10121A]"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(21, 22, 28, ${media ? ".95" : "1"}) ${media? "100%" : "30%"}, rgba(0, 0, 0,0.3)), url(${bgPlane})`,
          backgroundSize: "cover", 
          backgroundPosition: "30% 85%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundColor: "#10121A",
        }}
      >
        {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-[0]"></div> */}

        <div className="container px-5">
          <About />
        </div>
      </section>

      <main>
        <WhatSetsUsApart />

        <section
          id="timeline"
          style={{
            backgroundImage: `url(${aboutBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
          className="py-20 relative z-[10]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]"></div>
          <Timeline data={data} />
        </section>
        <section className="py-20 relative bg-[#111218]">
          <div className="container px-5">
            <WhyChoosUs />
          </div>
        </section>
      </main>
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default AboutPage;
