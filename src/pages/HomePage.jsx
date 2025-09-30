import React, { useEffect } from "react";
import Showcase from "../components/Showcase";
import Brands from "../components/Brands";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SliderWrapper from "../components/SliderWrapper";
import MeetTheTeam from "../components/MeetTheTeam";
import Gallary from "../components/Gallary";
import ScrollToTop from "../components/ScrollToTop";
import Intro from "../components/Intro";
import LatestJets from "../components/LatestJets";
import Navbar from "../components/Navbar";
import bgPlane from "/images/brokerage/banner.avif";
import Reviews from "../components/Reviews";
import testimonialBg from "/images/contact.avif";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  // useGsapScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // support both state and hash
    const targetId =
      location.state?.scrollTo ||
      (location.hash === "#testimonial" ? "testimonial" : null);

    if (!targetId) return;

    // small delay ensures DOM is painted
    const t = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      // clean up state/hash to avoid re-scrolling on back/forward
      navigate("/#testimonial", { replace: true, state: null });
    }, 0);

    return () => clearTimeout(t);
  }, [location.state, location.hash, navigate]);

  return (
    <>
      {/* <div className="container">
        <Navbar />
      </div> */}

      <Showcase />
      <main id="main">
        <div className="relative z-[10]">
          <Brands />
          <MeetTheTeam />
          <SliderWrapper />

          {/* 👇 make sure this id matches */}
          <div
            id="testimonial"
            className="z-[2] relative scroll-mt-24" // helps if you have a fixed nav; adjust 24 as needed
            style={{
              backgroundImage: `url(${testimonialBg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#071725] opacity-80 -z-[1]" />
            <Reviews />
          </div>

          <Gallary />
        </div>
        <Contact />
      </main>
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default HomePage;
