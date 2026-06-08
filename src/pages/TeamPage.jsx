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
        <section className="relative w-full h-auto md:min-h-[70vh] flex flex-col items-center md:justify-center justify-start overflow-hidden">
          {/* Background with subtle parallax/zoom effect */}
          <div
            className="absolute top-0 left-0 w-full h-full z-0"
            style={{
              backgroundImage: `url(${bgPlane})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Dark Overlay matching Contact Page */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#111218] opacity-60 md:opacity-95 z-[1]"></div>

          {/* Bottom Fade to blend securely into the page body */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0c0d12] to-transparent z-[2]"></div>

          <Navbar />

          <div className="container relative z-[10] px-5 text-center pt-[132px] pb-[32px] md:mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-white text-[2.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl font-bold tracking-tight mb-6 md:mt-20" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                <span className="text-[#268AE0]">
                  Meet the Team
                </span>
              </h1>

              <div className="max-w-3xl mx-auto mt-4 px-4 md:px-0">
                <ShinyText
                  text={
                    media
                      ? "Meet the aviation experts and passionate professionals behind Mason Amelia."
                      : "Meet the aviation experts and passionate professionals behind Mason Amelia. Our mission is to elevate your flight experience through transparency, expertise, and personalized service."
                  }
                  disabled={false}
                  speed={3}
                  className="text-lg md:text-xl font-light leading-relaxed"
                  color="text-white/70"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-[10] -mt-20">
          <Team teamRef={teamSectionRef} hideSocials={true} />
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
