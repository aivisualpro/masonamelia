import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";
import bgPlane from "/images/brokerage/banner.avif"; // Replace with your path
import ScrollToTop from "../components/ScrollToTop";
const TestimonialPage = () => {
  return (
    <>
      <section
        className="relative xl:h-screen w-full bg-cover bg-center md:mt-0 mt-[10vh] z-[10]"
        style={{ backgroundImage: `url(${bgPlane})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1] "></div>
        <Navbar />
        <div className="z-[3]">
          <Reviews />
        </div>
      </section>
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default TestimonialPage;
