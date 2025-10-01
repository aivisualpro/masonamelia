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

  const OFFSET = 150;

  useEffect(() => {
    // Are we on Home?
    const onHome = location.pathname === "/";
    console.log(location.pathname);
    const isScrollTo = sessionStorage.getItem("scrollTo");
  
    // No explicit target requested (na state.scrollTo, na hash)
    const noExplicitTarget = !location.state?.scrollTo && !location.hash;
  
    // Current path NOT '/services' (your condition)
    const notServicesPath = !location.pathname.includes("/services");
  
    // Close to top?
    const nearTop = window.scrollY <= 50;
  
    if (onHome && nearTop && isScrollTo) {
      const id = requestAnimationFrame(() => {
        window.scrollTo({ top: 290, behavior: "smooth" });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [location.pathname, location.hash, location.state]);

  useEffect(() => {
    // support both state and hash
    const targetId =
      location.state?.scrollTo ||
      (location.hash === "#testimonial" ? "testimonial" : null);

    const targetId2 =
      location.state?.scrollTo ||
      (location.hash === "#contact" ? "contact" : null);

    const targetId3 =
      location.state?.scrollTo ||
      (location.hash === "#contact" ? "contact" : null);

    if (!targetId && !targetId2 && !targetId3) return;

    // small delay ensures DOM is painted
    const t = setTimeout(() => {
      const el = document.getElementById(targetId);
      const el2 = document.getElementById(targetId2);
      const el3 = document.getElementById(targetId3);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
      if (el3) el3.scrollIntoView({ behavior: "smooth", block: "start" });
      // clean up state/hash to avoid re-scrolling on back/forward
      navigate("/#testimonial", { replace: true, state: null });
      navigate("/#contact", { replace: true, state: null });
      navigate("/#services", { replace: true, state: null });
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
        </div>

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

        <div className="relative z-[10]">
          <Gallary />
        </div>

        {/* 👇 make sure this id matches */}

        <Contact />
      </main>
      <Footer />

      <ScrollToTop />
    </>
  );
};

export default HomePage;
