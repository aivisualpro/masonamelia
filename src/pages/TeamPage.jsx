import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Team from "../components/Team";
import bgPlane from "/images/acquisition/service-banner.webp";
import CTABanner from "../components/CTABanner";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "../components/BlinkingArrow";
import ScrollToTop from "../components/ScrollToTop";
import ShinyText from "../components/ui/ShinyText";

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
      <div className="relative z-[10] bg-[#0c0d12]">
        {/* Dynamic Hero Section */}
        <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
          {/* Background with subtle parallax/zoom effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full z-0"
            style={{
              backgroundImage: `url(${bgPlane})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              filter: "brightness(0.5) contrast(1.1)",
            }}
          />
          
          {/* Multi-layered Premium Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/20 to-[#0c0d12] z-[1]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-[1]"></div>
          <div className="absolute inset-0 bg-tertiary_color/5 mix-blend-color z-[1]"></div>
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}>
          </div>

          <Navbar />

          <div className="container relative z-[10] px-5 text-center mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tight mb-6 mt-20" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                <span className="text-[#268AE0]">
                  Meet the Team
                </span>
              </h1>
              
              <div className="max-w-3xl mx-auto">
                <ShinyText
                  text="Meet the aviation experts and passionate professionals behind Mason Amelia. Our mission is to elevate your flight experience through transparency, expertise, and personalized service."
                  disabled={false}
                  speed={3}
                  className="text-lg md:text-xl font-light leading-relaxed"
                  color="text-white/70"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="relative z-[10] -mt-20">
          <Team teamRef={teamSectionRef} />
        </section>

        <div className="bg-[#0c0d12]">
          <div className="container px-5 py-32">
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
