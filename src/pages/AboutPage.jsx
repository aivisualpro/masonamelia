import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import bgPlane from "/images/banner.png";
import bgPlaneTeam from "/images/team.webp";
import ScrollToTop from "../components/ScrollToTop";
import { Timeline } from "../components/ui/timeline";
import { FaHandshake, FaUsers, FaChartLine } from "react-icons/fa";
import { FaJetFighterUp } from "react-icons/fa6";
import WhatSetsUsApart from "../components/WhatSetsApart";
import aboutBanner from "/images/about/banner.avif";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "../components/BlinkingArrow";
import CTABanner from "../components/CTABanner";
import { HiOutlineSparkles, HiOutlineRocketLaunch, HiOutlineCpuChip } from "react-icons/hi2";

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

  /** ---------- Timeline data (same as your code) ---------- */
  const data = [
    {
      title: "2005–2015",
      icon: <FaHandshake size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            Jesse Adams spends 10 years as a commercial airline pilot. His love
            for airplanes and flying grows deeper as the years progress.
          </p>
        </div>
      ),
    },
    {
      title: "2015",
      icon: <FaJetFighterUp size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            Sagacious Consultants, co-founded by Jesse Adams, is acquired by
            Accenture, setting the stage for future ventures and entrepreneurial
            growth.
          </p>
        </div>
      ),
    },
    {
      title: "2018–2023",
      icon: <FaUsers size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            Jesse Adams returns to aviation with a renewed sense of purpose,
            spending nearly five years at Aerista, the world's largest
            brokerage. He leads over 200 global aircraft transactions, gaining
            valuable experience across piston and owner-flown turbine markets.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      icon: <HiOutlineSparkles size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-4 text-lg font-normal text-white">
            Inspired by family and fueled by passion, Jesse Adams founded Mason
            Amelia, LLC, naming it after his children. What starts as a solo
            venture quickly blossoms into a team, with Mason Amelia representing
            aircraft and clients nationwide.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      icon: <HiOutlineRocketLaunch size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-4 text-lg font-normal text-white">
            Mason Amelia becomes the fastest-growing aircraft brokerage in the
            U.S. Their YouTube channel, Looking for Higher, emerges as a leading
            resource for buyers, sellers, and aviation enthusiasts, raising the
            bar for aircraft sales marketing across the industry.
          </p>
        </div>
      ),
    },
    {
      title: "2025",
      icon: <HiOutlineCpuChip size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-4 text-lg font-normal text-white">
            Mason Amelia launches SkyNet, its proprietary pricing intelligence
            tool, further establishing Mason Amelia as the aircraft brokerage of
            the future.
          </p>
        </div>
      ),
    },
  ];

  const media = useMediaQuery("(max-width: 1023px)");
  const mobileMedia = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Navbar />

      {/* HERO / FIRST SECTION */}
      <section
        ref={bannerRef}
        className="relative md:max-w-screen lg:h-screen bg-[#10121A] overflow-hidden md:mt-0 mt-[100px]"
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
        <div className="lg:hidden block absolute w-full h-full opacity-50 bg-black"></div>
        <div className="container px-5">
          <About />
        </div>

        {/* Arrow 3s baad appear hoga, 5s pe auto-scroll (agar user ne kuch na kiya) */}
        {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
      </section>

      {/* TARGET SECTION — auto-scroll lands here */}
      <main id="about-main">
        <WhatSetsUsApart />

        <section
          id="timeline"
          style={{
            backgroundImage: `url(${aboutBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: mobileMedia ? "fixed" : "fixed",
          }}
          className="py-20 relative z-[10]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]"></div>
          <Timeline data={data} />
        </section>

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
