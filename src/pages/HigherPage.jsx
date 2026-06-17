import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Higher from "../components/Higher";
import bgPlane from "/images/higher/banner.webp";
import bgPlaneTwo from "/images/higher/bannerTwo.webp";
import Gallary from "../components/Gallary";
import ScrollToTop from "../components/ScrollToTop";
import Vision from "../components/Vision";
import CTABanner from "../components/CTABanner";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "../components/BlinkingArrow";
import Contact from "../components/Contact";
import { useContact } from "../hooks/useContactQuery";

const HigherPage = () => {
  const media = useMediaQuery("(max-width: 767px)");
  const { data: contact } = useContact();

  /** ---------- Smooth auto-scroll (same as other pages) ---------- */
  const bannerRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);
  const [cancelAuto, setCancelAuto] = useState(false);

  function smoothScrollTo(to, duration = 2500) {
    const start = window.scrollY || window.pageYOffset;
    const change = to - start;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
      window.scrollTo(0, start + change * ease);
      if (t < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  const isNearTop = () => (window.scrollY || 0) <= 5;

  const cancelAutoScroll = () => {
    setCancelAuto(true);
    setShowArrow(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 767) return;
    const onWheel = () => cancelAutoScroll();
    const onTouch = () => cancelAutoScroll();
    const onKey = () => cancelAutoScroll();
    const onScroll = () => {
      if ((window.scrollY || 0) > 5) cancelAutoScroll();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    const arrowTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) setShowArrow(true);
    }, 1500);

    const scrollTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) {
        const next = document.getElementById("higher-main");
        const targetY = next
          ? next.getBoundingClientRect().top + window.scrollY
          : bannerRef.current?.offsetHeight || 0;

        smoothScrollTo(targetY, 2000);
        setShowArrow(false);
      }
    }, 3000);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(arrowTimer);
      clearTimeout(scrollTimer);
    };
  }, [cancelAuto]);

  const handleArrowClick = () => {
    const next = document.getElementById("higher-main");
    const targetY = next
      ? next.getBoundingClientRect().top + window.scrollY
      : bannerRef.current?.offsetHeight || 0;

    smoothScrollTo(targetY, 2500);
    cancelAutoScroll();
  };

  // CMS hero background
  const heroBg = contact?.higher_hero_bg_image || bgPlaneTwo;

  return (
    <>
      <Navbar />
      {/* HERO / FIRST SECTION */}
      <section
        ref={bannerRef}
        className="mt-0 md:sticky top-0 w-full bg-cover h-full relative md:h-screen bg-center z-[0] overflow-hidden"
        style={{
          backgroundImage: media ? "" : `linear-gradient(to right, rgb(21, 22, 28, ${
            media ? ".5" : "1"
          }) ${media ? "100%" : "30%"}, rgba(0, 0, 0, 0.05)), url(${heroBg})`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-1]"></div>
        <div className="container">
          <Higher
            banner={bgPlane}
            bannerTwo={heroBg}
            titleWhite={contact?.higher_hero_title_white}
            titleBlue={contact?.higher_hero_title_blue}
            description={contact?.higher_hero_description}
          />
        </div>

        {/* Arrow appears ~3s if user hasn't interacted */}
        {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
      </section>

      {/* TARGET SECTION — auto-scroll lands here */}
      <main id="higher-main" className="relative">
        <Vision
          title={contact?.higher_vision_title}
          subtitle={contact?.higher_vision_subtitle}
          body1={contact?.higher_vision_body1}
          body2={contact?.higher_vision_body2}
        />
        <Gallary />
        <section className="relative bg-[#111218] py-20">
          <div className="container px-5">
            <CTABanner />
          </div>
        </section>

        {/* <Contact /> */}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default HigherPage;
