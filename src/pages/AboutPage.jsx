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
import { Timeline } from "../components/ui/timeline";
import { FaHandshake, FaUsers, FaPlaneDeparture, FaSuitcase, FaChartLine } from "react-icons/fa";
import { FaJetFighterUp } from "react-icons/fa6";
import aboutBanner from "/images/about/timeline bg.jpeg";
import { HiOutlineCpuChip, HiOutlineRocketLaunch, HiOutlineSparkles } from "react-icons/hi2";
import { useContact } from "../hooks/useContactQuery";

const AboutPage = () => {
  const { data: contact } = useContact();

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

  // ── Icon pool for timeline entries ──
  const defaultIcons = [
    <FaPlaneDeparture size={48} color="#1777cb" />,
    <FaJetFighterUp size={48} color="#1777cb" />,
    <FaHandshake size={48} color="#1777cb" />,
    <HiOutlineSparkles size={48} color="#1777cb" />,
    <FaUsers size={48} color="#1777cb" />,
    <FaSuitcase size={48} color="#1777cb" />,
    <HiOutlineRocketLaunch size={48} color="#1777cb" />,
    <HiOutlineCpuChip size={48} color="#1777cb" />,
    <FaChartLine size={48} color="#1777cb" />,
  ];

  // ── Default timeline items (same as before) ──
  const defaultTimeline = [
    { year: '2004', heading: 'Aviation Begins', description: 'After honorable enlisted military service, Jesse began flight training and quickly progressed through CFI, CFII, and MEI ratings.' },
    { year: '2007–2012', heading: 'Airlines and Entrepreneurship', description: 'Jesse flew regional jets for Republic Airways while simultaneously pursuing entrepreneurial ventures, building discipline as a pro pilot, alongside business acumen.' },
    { year: '2012–2015', heading: 'Business Foundation', description: 'Jesse joined his brothers at Sagacious Consultants, helping scale the firm to a successful acquisition by Accenture – but never stopped flying.' },
    { year: '2018', heading: 'Founded', description: "Initially a spin-off of the Adams brothers' entrepreneurial success, Mason Amelia was created as a professional services firm and business consultancy. As the company began recruiting for aviation sales organizations, a clear opportunity emerged..." },
    { year: '2019–2023', heading: 'Brokerage Mastery', description: "Nearly five years at the world's largest Cirrus focused brokerage gave Jesse exposure to high volume global transactions across piston and owner-flown turbine aircraft, completing more than 200 deals." },
    { year: '2023', heading: 'Strategic Refocus', description: 'Jesse founded Mason Amelia as a modern aircraft brokerage, combining data, elevated marketing, and grit. Within six months, the first team members were hired and remain core to the firm today.' },
    { year: '2024', heading: 'Rapid Growth', description: 'Mason Amelia became one of the fastest growing aircraft brokerages in the country, reshaping how owner-flown aircraft are marketed and sold.' },
    { year: '2025', heading: 'SkyNet Launch', description: "The launch of SkyNet formalized Mason Amelia's data driven valuation approach, bringing greater clarity and precision to the market." },
    { year: '2026', heading: 'Looking Forward', description: 'Executing at scale. Growing with intent.' },
  ];

  // ── Build timeline data from CMS or defaults ──
  const timelineSource = contact?.about_timeline_items?.length
    ? contact.about_timeline_items
    : defaultTimeline;

  const data = timelineSource.map((item, idx) => ({
    title: `${item.year} | ${item.heading}`,
    icon: defaultIcons[idx % defaultIcons.length],
    content: (
      <div>
        <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">{item.heading}</h3>
        <p className="mb-4 text-lg font-normal text-white">
          {item.description}
        </p>
      </div>
    ),
  }));

  const media = useMediaQuery("(max-width: 1023px)");
  const mobileMedia = useMediaQuery("(max-width: 767px)");

  // ── CMS hero bg ──
  const heroBgDesktop = contact?.about_hero_bg_image || bgPlane;
  const heroBgMobile = bgPlaneTeam;

  return (
    <>
      <Navbar />

      {/* HERO / FIRST SECTION */}
      <section
        ref={bannerRef}
        className="relative md:max-w-screen lg:h-screen bg-[#10121A] overflow-hidden mt-0"
        style={{
          backgroundImage: `url(${media ? heroBgMobile : heroBgDesktop})`,
          backgroundSize: media ? "cover" : "cover",
          backgroundPosition: media ? "top 0px right 0px" : "100% 45%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: media ? "static" : "fixed",
          backgroundColor: "#10121A",
          height: mobileMedia ? "350px" : media ? "700px" : "100vh",
        }}
      >
        <div className="lg:hidden block absolute w-full h-full bg-black/60"></div>
        {/* Desktop gradient overlay behind text for readability */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="container px-5 h-full flex flex-col justify-center relative z-10">
          <About
            titleWhite={contact?.about_hero_title_white}
            titleBlue={contact?.about_hero_title_blue}
            description={contact?.about_hero_description}
          />
        </div>

        {/* Arrow 3s baad appear hoga, 5s pe auto-scroll (agar user ne kuch na kiya) */}
        {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
      </section>

      {/* TARGET SECTION — auto-scroll lands here */}
      <main id="about-main">
        <WhatSetsUsApart
          titleWhite={contact?.about_wsa_title_white}
          titleBlue={contact?.about_wsa_title_blue}
          subtitle={contact?.about_wsa_subtitle}
          cards={contact?.about_wsa_cards}
        />

        <section
          id="timeline"
          style={{
            backgroundImage: media ? "" : `url(${contact?.about_timeline_bg_image || aboutBanner})`,
            backgroundSize: media ? "" : "120%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: media ? "scroll" : "fixed",
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
