import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import bgPlane from "/images/banner.png";
import bgPlaneTeam from "/images/team.webp";
import ScrollToTop from "../components/ScrollToTop";
import WhatSetsUsApart from "../components/WhatSetsApart";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "../components/BlinkingArrow";
import CTABanner from "../components/CTABanner";

import AboutAmazingTimeline from "../components/AboutAmazingTimeline";

const AboutPage = () => {
  /** ---------- Smooth auto-scroll ---------- */
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

  // 🔥 ek helper: jahan bhi user interact kare, isko call karo
  const cancelAutoScroll = () => {
    setCancelAuto(true);
    setShowArrow(false); // arrow turant hide
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 767) return;
    const onWheel = () => cancelAutoScroll();
    const onTouch = () => cancelAutoScroll();
    const onKey = () => cancelAutoScroll();
    const onScroll = () => {
      // thora sa bhi scroll ho jaye to cancel
      if ((window.scrollY || 0) > 5) cancelAutoScroll();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Arrow 3 sec baad show karo agar user ne kuch nahi kiya
    const arrowTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) setShowArrow(true);
    }, 1500);

    // 5 sec tak agar user ne scroll nahi kiya to auto-scroll
    const scrollTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) {
        const next = document.getElementById("about-main");
        const targetY = next
          ? next.getBoundingClientRect().top + window.scrollY
          : bannerRef.current?.offsetHeight || 0;

        smoothScrollTo(targetY, 2000);
        setShowArrow(false);
      }
    },3000);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(arrowTimer);
      clearTimeout(scrollTimer);
    };
  }, [cancelAuto]); // cancelAuto change pe timers cleanup & re-setup

  // 👇 optional: arrow pe click kare to bhi scroll ho jaye
  const handleArrowClick = () => {
    const next = document.getElementById("about-main");
    const targetY = next
      ? next.getBoundingClientRect().top + window.scrollY
      : bannerRef.current?.offsetHeight || 0;

    smoothScrollTo(targetY, 2500);
    cancelAutoScroll();
  };

  const media = useMediaQuery("(max-width: 1023px)");
  const mobileMedia = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Navbar />

      {/* HERO / FIRST SECTION */}
      <section
        ref={bannerRef}
        className="relative md:max-w-screen lg:h-screen bg-[#10121A] overflow-hidden mt-0"
        style={{
          backgroundImage: `url(${media ? bgPlaneTeam : bgPlane})`,
          backgroundSize: media ? "cover" : "cover",
          backgroundPosition: media ? "top 0px right 0px" : "100% 45%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: media ? "static" : "fixed",
          backgroundColor: "#10121A",
          height: mobileMedia ? "350px" : media ? "700px" : "100vh",
        }}
      >
        <div className="lg:hidden block absolute w-full h-full bg-black/60"></div>
        <div className="container px-5">
          <About />
        </div>

        {/* Arrow 3s baad appear hoga, 5s pe auto-scroll (agar user ne kuch na kiya) */}
        {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
      </section>

      {/* TARGET SECTION — auto-scroll lands here */}
      <main id="about-main">
        <WhatSetsUsApart />

        <AboutAmazingTimeline />

        <section className="bg-[#111218] relative z-[10] py-20">
          <div className="container px-5">
            <CTABanner />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AboutPage;
