import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Team from "../components/Team";
import bgPlane from "/images/acquisition/service-banner.webp";
import CTABanner from "../components/CTABanner";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "../components/BlinkingArrow";
import ScrollToTop from "../components/ScrollToTop";

const TeamPage = () => {
  const media = useMediaQuery("(max-width: 767px)");  // Detect if it's a mobile view
  const teamSectionRef = useRef(null);  // Reference to the team section
  const [showArrow, setShowArrow] = useState(false);
  const [cancelAuto, setCancelAuto] = useState(false);

  // Smooth scroll function
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

  // Cancel auto-scroll and hide arrow on any interaction
  const cancelAutoScroll = () => {
    setCancelAuto(true);
    setShowArrow(false);
  };

  useEffect(() => {
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
        const targetY = teamSectionRef.current
          ? teamSectionRef.current.getBoundingClientRect().top + window.scrollY
          : 0;

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

  // Arrow click handler to scroll
  const handleArrowClick = () => {
    const targetY = teamSectionRef.current
      ? teamSectionRef.current.getBoundingClientRect().top + window.scrollY
      : 0;

    smoothScrollTo(targetY, 2000);
    cancelAutoScroll();
  };

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
          <Team teamRef={teamSectionRef} /> {/* Pass the ref to Team component */}
        </section>
        <div className="bg-[#111218]">
          <div className="container px-5 py-20">
            <CTABanner isButton={false} />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
      {/* Show the blinking arrow if on mobile */}
      {media && showArrow && (
        <BlinkingArrow onClick={handleArrowClick} />
      )}
    </>
  );
};

export default TeamPage;
