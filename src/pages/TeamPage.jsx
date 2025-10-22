import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Team from "../components/Team";
import bgPlane from "/images/acquisition/service-banner.webp"; // Replace with your path
import Contact from "../components/Contact";
import ScrollToTop from "../components/ScrollToTop";
import CTABanner from "../components/CTABanner";

const TeamPage = () => {
  return (
    <>
      <div className="relative z-[10]">
        <section
          className="relative w-full z-[10]"
          style={{
            backgroundImage: `url(${bgPlane})`,
            backgroundPosition: "center",
            backgroundSize: "contain !important",
          }}
        >
          <div className="overlay bg-tertiary_color opacity-90 absolute top-0 left-0 w-full h-full z-[-1]" />
          <Navbar />

          <Team />
        </section>
        <div className="bg-[#111218]">
          <div className="container px-5 py-10">
            <CTABanner isButton={false} />
          </div>
        </div>
      </div>
      {/* <Contact /> */}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default TeamPage;
