import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import bgPlane from "/images/team.jpg";
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
  const { data: contactData } = useContact();
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

  // ── Timeline icons (cycle through these for CMS items) ──
  const timelineIcons = [
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

  // Build timeline from CMS or hardcoded defaults
  const cmsTimeline = contactData?.about_timeline_items;
  const data = cmsTimeline?.length
    ? cmsTimeline.map((item, idx) => ({
        title: `${item.year} | ${item.heading}`,
        icon: timelineIcons[idx % timelineIcons.length],
        content: (
          <div>
            <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">{item.heading}</h3>
            <p className="mb-4 text-lg font-normal text-white">{item.description}</p>
          </div>
        ),
      }))
    : [
        {
          title: "2004 | Aviation Begins",
          icon: <FaPlaneDeparture size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">Aviation Begins</h3>
              <p className="mb-4 text-lg font-normal text-white">After honorable enlisted military service, Jesse began flight training and quickly progressed through CFI, CFII, and MEI ratings.</p>
            </div>
          ),
        },
        {
          title: "2007–2012 | Airlines and Entrepreneurship",
          icon: <FaJetFighterUp size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">Airlines and Entrepreneurship</h3>
              <p className="mb-4 text-lg font-normal text-white">Jesse flew regional jets for Republic Airways while simultaneously pursuing entrepreneurial ventures, building discipline as a pro pilot, alongside business acumen.</p>
            </div>
          ),
        },
        {
          title: "2012–2015 | Business Foundation",
          icon: <FaHandshake size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">Business Foundation</h3>
              <p className="mb-4 text-lg font-normal text-white">Jesse joined his brothers at Sagacious Consultants, helping scale the firm to a successful acquisition by Accenture – but never stopped flying.</p>
            </div>
          ),
        },
        {
          title: "2018 | Founded",
          icon: <HiOutlineSparkles size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">Founded</h3>
              <p className="mb-4 text-lg font-normal text-white">Initially a spin-off of the Adams brothers' entrepreneurial success, Mason Amelia was created as a professional services firm and business consultancy. As the company began recruiting for aviation sales organizations, a clear opportunity emerged...</p>
            </div>
          ),
        },
        {
          title: "2019–2023 | Brokerage Mastery",
          icon: <FaUsers size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">Brokerage Mastery</h3>
              <p className="mb-4 text-lg font-normal text-white">Nearly five years at the world's largest Cirrus focused brokerage gave Jesse exposure to high volume global transactions across piston and owner-flown turbine aircraft, completing more than 200 deals.</p>
            </div>
          ),
        },
        {
          title: "2023 | Strategic Refocus",
          icon: <FaSuitcase size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">Strategic Refocus</h3>
              <p className="mb-4 text-lg font-normal text-white">Jesse founded Mason Amelia as a modern aircraft brokerage, combining data, elevated marketing, and grit. Within six months, the first team members were hired and remain core to the firm today.</p>
            </div>
          ),
        },
        {
          title: "2024 | Rapid Growth",
          icon: <HiOutlineRocketLaunch size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">Rapid Growth</h3>
              <p className="mb-4 text-lg font-normal text-white">Mason Amelia became one of the fastest growing aircraft brokerages in the country, reshaping how owner-flown aircraft are marketed and sold.</p>
            </div>
          ),
        },
        {
          title: "2025 | SkyNet Launch",
          icon: <HiOutlineCpuChip size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">SkyNet Launch</h3>
              <p className="mb-4 text-lg font-normal text-white">The launch of SkyNet formalized Mason Amelia's data driven valuation approach, bringing greater clarity and precision to the market.</p>
            </div>
          ),
        },
        {
          title: "2026 | Looking Forward",
          icon: <FaChartLine size={48} color="#1777cb" />,
          content: (
            <div>
              <h3 className="hidden md:block text-xl md:text-3xl font-bold text-white mb-2">Looking Forward</h3>
              <p className="mb-4 text-lg font-normal text-white">Executing at scale. Growing with intent.</p>
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
        className="relative w-full lg:min-h-screen lg:flex lg:flex-row overflow-hidden mt-0 z-[10]"
        style={{
          // For mobile / tablet, background image remains on the section wrapper
          backgroundImage: media ? `url(${contactData?.about_hero_bg_image || bgPlaneTeam})` : "",
          backgroundSize: "cover",
          backgroundColor: "#111218",
          backgroundPosition: media ? "center" : "60% 50%",
          backgroundRepeat: "no-repeat",
           backgroundAttachment: media ? "scroll" : "fixed",
           height: media ? "50svh" : "100vh",
         }}
      >
        {/* For mobile / tablet gradient overlay */}
        {media && (
          <>
            <div
              className="hidden lg:block absolute inset-0 pointer-events-none z-[1]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(21, 22, 28) 35%, rgba(21, 22, 28, 0.6) 75%, rgba(21, 22, 28, 0.55))",
              }}
            />
            <div className="lg:hidden block absolute w-full h-full bg-black/40"></div>
          </>
        )}

        {/* Desktop Layout split: */}
        {!media ? (
          <>
            {/* Left Column: 40% width, dark bg */}
            <div className="w-[40%] min-h-screen bg-[#111218] flex flex-col justify-center items-start z-[2] px-10 xl:px-20 relative">
              <About
                titleWhite={contactData?.about_hero_title_white}
                titleBlue={contactData?.about_hero_title_blue}
                description={contactData?.about_hero_description}
                isDesktop={true}
              />
            </div>
            {/* Blending overlay between columns */}
            <div className="absolute left-[40%] w-[10%] h-full bg-gradient-to-r from-[#111218] to-transparent z-[10] pointer-events-none" />
            {/* Right Column: 60% width, background picture */}
            <div 
              className="w-[60%] min-h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url(${contactData?.about_hero_bg_image || bgPlane})`,
                backgroundPosition: "60% 50%",
                backgroundRepeat: "no-repeat",
              }}
            />
          </>
        ) : (
          /* Mobile / tablet version */
          <div className="container relative z-[2] px-5 h-full flex flex-col justify-center">
            <About
              titleWhite={contactData?.about_hero_title_white}
              titleBlue={contactData?.about_hero_title_blue}
              description={contactData?.about_hero_description}
            />
          </div>
        )}

        {/* Arrow 3s baad appear hoga, 5s pe auto-scroll (agar user ne kuch na kiya) */}
        {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
      </section>

      {/* TARGET SECTION — auto-scroll lands here */}
      <main id="about-main">
        <WhatSetsUsApart
          titleWhite={contactData?.about_wsa_title_white}
          titleBlue={contactData?.about_wsa_title_blue}
          subtitle={contactData?.about_wsa_subtitle}
          cards={contactData?.about_wsa_cards}
        />

        <section
          id="timeline"
          style={{
            backgroundImage: media ? "" : `url(${contactData?.about_timeline_bg_image || aboutBanner})`,
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
