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
import { useContact } from "../hooks/useContactQuery";

const TeamPage = () => {
  const media = useMediaQuery("(max-width: 767px)");  // Detect if it's a mobile view
  const isDesktop = useMediaQuery("(min-width: 1024px)");  // Detect if it's desktop view
  const teamSectionRef = useRef(null);  // Reference to the team section
  const [showArrow, setShowArrow] = useState(false);
  const [cancelAuto, setCancelAuto] = useState(false);

  // Dynamic hero content from DB
  const { data: contactData } = useContact();
  const heroTitle = contactData?.team_hero_title || 'Meet the Team';
  const heroDescFull = contactData?.team_hero_description || 'Meet the aviation experts and passionate professionals behind Mason Amelia. Our mission is to elevate your flight experience through transparency, expertise, and personalized service.';
  const heroDescShort = contactData?.team_hero_description
    ? contactData.team_hero_description.split('.').slice(0, 1).join('.') + '.'
    : 'Meet the aviation experts and passionate professionals behind Mason Amelia.';

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
      <Navbar />
      <div className="relative z-[10] bg-[#0c0d12]">
        {/* Dynamic Hero Section */}
        {isDesktop ? (
          <section className="relative w-full min-h-screen flex flex-row overflow-hidden z-[10]">
            {/* Left Column (40% width) */}
            <div className="w-[40%] min-h-screen bg-[#111218] flex flex-col justify-center items-start px-10 xl:px-16 pt-[50px] relative z-[9]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-white text-[2.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Inter Tight', sans-serif", lineHeight: "1.1" }}>
                  <span className="text-[#268AE0]">
                    {heroTitle}
                  </span>
                </h1>

                <div className="max-w-3xl mt-4">
                  <ShinyText
                    text={heroDescFull}
                    disabled={false}
                    speed={3}
                    className="text-lg md:text-xl font-light leading-relaxed"
                    color="text-white/70"
                    isTextCenter={false}
                  />
                </div>
              </motion.div>
            </div>

            {/* Blending overlay between columns */}
            <div className="absolute left-[40%] w-[10%] h-full bg-gradient-to-r from-[#111218] to-transparent z-[10] pointer-events-none" />

            {/* Right Column (60% width) */}
            <div
              className="w-[60%] min-h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${contactData?.team_hero_bg_image || bgPlane})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          </section>
        ) : (
          <section className="relative w-full h-auto md:min-h-[70vh] flex flex-col items-center md:justify-center justify-start overflow-hidden">
            {/* Background with subtle parallax/zoom effect */}
            <div
              className="absolute top-0 left-0 w-full h-full z-0"
              style={{
                backgroundImage: `url(${contactData?.team_hero_bg_image || bgPlane})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Dark Overlay matching Contact Page */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#111218] opacity-60 md:opacity-95 z-[1]"></div>

            {/* Bottom Fade to blend securely into the page body */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0c0d12] to-transparent z-[2]"></div>

            <div className="container relative z-[10] px-5 text-center pt-[132px] pb-[32px] md:mt-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-white text-[2.5rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl font-bold tracking-tight mb-6 md:mt-20" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  <span className="text-[#268AE0]">
                    {heroTitle}
                  </span>
                </h1>

                <div className="max-w-3xl mx-auto mt-4 px-4 md:px-0">
                  <ShinyText
                    text={
                      media
                        ? heroDescShort
                        : heroDescFull
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
        )}

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
