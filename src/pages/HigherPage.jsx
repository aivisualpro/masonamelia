import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Higher from "../components/Higher";
import bgPlane from "/images/higher/banner.jpg"; // Replace with your path
import Gallary from "../components/Gallary";
import ScrollToTop from "../components/ScrollToTop";
import Vision from "../components/Vision";
import CTABanner from "../components/CTABanner";
import useMediaQuery from "@mui/material/useMediaQuery";

const HigherPage = () => {
  const media = useMediaQuery("(max-width: 767px)");
  return (
    <>
      <Navbar />
      <section
        className="md:sticky top-0 relative w-full bg-cover h-screen bg-center z-[0]"
        style={{
          backgroundImage: `linear-gradient(to right,rgb(21, 22, 28, ${
            media ? ".9" : "1"
          }) ${media ? "100%" : "20%"}, rgba(0, 0, 0, 0.05)), url(${bgPlane})`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-1]"></div>
        <div className="container">
          <Higher />
        </div>
      </section>
      <div className="relative">
        <Gallary />
        <Vision />
        <section className="relative bg-[#111218] py-10">
          <div className="container px-5">
            <CTABanner />
          </div>
        </section>
      </div>
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default HigherPage;
