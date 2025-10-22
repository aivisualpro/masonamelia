import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";
import bgPlane from "/images/brokerage/banner.avif"; // Replace with your path
import ScrollToTop from "../components/ScrollToTop";
import CTABanner from "../components/CTABanner";

const TestimonialPage = () => {
  return (
    <>
      <section
        className="relative h-full md:h-screen lg:h-full xl:h-screen w-full bg-cover bg-center md:mt-0 mt-[10vh] z-[10]"
        style={{ backgroundImage: `url(${bgPlane})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1] "></div>
        <Navbar />
        <div className="z-[3] pb-[100px] pt-[80px] md:pb-0 md:pt-[50px] lg:pb-[70px] lg:pt-[150px] xl:pb-0 xl:pt-[50px]">
          <Reviews />
        </div>
      </section>

      <section className="bg-[#111218] relative z-[10] py-10">
        <div className="container px-5">
          <CTABanner />
        </div>
      </section>

      {/* <Contact /> */}
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default TestimonialPage;
