import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgPlane from "/images/team/banner.avif"; // Replace with your path
import TeamDetail from "../components/TeamDetail";
import ScrollToTop from "../components/ScrollToTop";
import Contact from "../components/Contact";
import CTABanner from "../components/CTABanner";

const MemberDetailPage = () => {
  // useGsapScroll();

  return (
    <>
      <Navbar />
      <section
        className="relative w-full bg-cover bg-center flex justify-center z-[10] h-full"
        style={{ backgroundImage: `url(${bgPlane})` }}
      >
        <div className="absolute top-0 left-0 w-full bg-black h-full opacity-90 z-[-1]"></div>
        <div className="container px-5 2xl:px-0 pt-[6vh]">
          <TeamDetail />
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

export default MemberDetailPage;
