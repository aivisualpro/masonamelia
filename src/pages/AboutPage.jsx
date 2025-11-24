import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import bgPlane from "/images/banner.png";
import bgPlaneTeam from "/images/team.jpg";
import ScrollToTop from "../components/ScrollToTop";
import { Timeline } from "../components/ui/timeline";
import { FaHandshake, FaUsers, FaChartLine } from "react-icons/fa";
import { FaJetFighterUp } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import WhatSetsUsApart from "../components/WhatSetsApart";
import aboutBanner from "/images/about/banner.avif";
import WhyChoosUs from "../components/WhyChoosUs";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "../components/BlinkingArrow"; // ← added
import Contact from "../components/Contact";
import CTABanner from "../components/CTABanner";

const AboutPage = () => {
  /** ---------- Smooth auto-scroll (same as other pages) ---------- */
  const bannerRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);
  const [cancelAuto, setCancelAuto] = useState(false);

  // const AUTO_KEY = "about_auto_scrolled_v1";
  // useEffect(() => { sessionStorage.removeItem(AUTO_KEY); }, []);

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

  useEffect(() => {
    const onWheel = () => setCancelAuto(true);
    const onTouch = () => setCancelAuto(true);
    const onKey = () => setCancelAuto(true);
    const onScroll = () => {
      if ((window.scrollY || 0) > 80) setCancelAuto(true);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    // const already = sessionStorage.getItem(AUTO_KEY) === "1";

    // Show arrow after ~3s if still near top
    const arrowTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto /* && !already */) setShowArrow(true);
    }, 3000);

    // Auto-scroll after ~5s if not cancelled
    const scrollTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto /* && !already */) {
        const next = document.getElementById("about-main");
        const targetY = next
          ? next.getBoundingClientRect().top + window.scrollY
          : bannerRef.current?.offsetHeight || 0;

        smoothScrollTo(targetY, 2500);
        // sessionStorage.setItem(AUTO_KEY, "1");
        setShowArrow(false);
      }
    }, 5000);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(arrowTimer);
      clearTimeout(scrollTimer);
    };
  }, [cancelAuto]);

  /** ---------- Page content (your existing data) ---------- */
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
      icon: <FaChartLine size={48} color="#1777cb" />,
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
      icon: <FaChartLine size={48} color="#1777cb" />,
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
      icon: <FaChartLine size={48} color="#1777cb" />,
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

  const media = useMediaQuery("(max-width: 767px)");
  const height = useMediaQuery("(max-height: 750px)");

  return (
    <>
      <Navbar />
      {/* HERO / FIRST SECTION with arrow + auto-scroll */}
      <section
        ref={bannerRef}
        className="md:sticky top-0  relative max-w-screen h-screen bg-[#10121A] overflow-hidden"
        style={{
          backgroundImage: `url(${media ? bgPlaneTeam : bgPlane})`,
          backgroundSize: `${media ? "contain" : "cover"}`,
          backgroundPosition: `${media ? "top 0px right 0px" : "100% 45%"}`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundColor: "#10121A",
        }}
      >
        {/* <div className="absolute top-0 left-0 w-full h-full bg-[#10121A] opacity-70 z-[-1]"></div> */}
        <div className={`container px-5 ${height ? "pt-[50px]" : ""}`}>
          <About />
        </div>

        {/* Arrow appears ~3s if user hasn't interacted */}
        {showArrow && <BlinkingArrow />}
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
            backgroundAttachment: "fixed",
          }}
          className="py-20 relative z-[10]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]"></div>
          <Timeline data={data} />
        </section>

        {/* <section className="py-20 relative bg-[#111218]">
          <div className="container px-5">
            <WhyChoosUs />
          </div>
        </section> */}

        <section className="bg-[#111218] relative z-[10] py-10">
          <div className="container px-5">
            <CTABanner />
          </div>
        </section>
      </main>

      {/* <Contact /> */}

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AboutPage;
