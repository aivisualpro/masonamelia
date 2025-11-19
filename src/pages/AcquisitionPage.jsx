import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ServiceBanner from "../components/ServiceBanner";
import banner from "/images/acquisition/banner.png";
import CTABanner from "../components/CTABanner";
import ServiceRappleResearch from "../components/ServiceRappleResearch";
import ServiceHighlights from "../components/ServiceHighlights";
import BlinkingArrow from "../components/BlinkingArrow";
import TaxiCardsDarkSection from "../components/TaxiAndSystemCheck";
import { FaHandHoldingUsd, FaBalanceScale, FaShieldAlt, FaChalkboardTeacher, FaClipboardCheck } from "react-icons/fa";
import ClearForTakeoff from "../components/ClearForTakeoff";
import Relationship from "../components/Relationship";

const AcquisitionPage = () => {
  const bannerRef = useRef(null);
  const location = useLocation();

  // State for arrow visibility and canceling auto-scroll if user interacts
  const [showArrow, setShowArrow] = useState(false);
  const [cancelAuto, setCancelAuto] = useState(false);

  // Slow, controllable smooth scroll (default 2.5s)
  function smoothScrollTo(to, duration = 2500) {
    const start = window.scrollY || window.pageYOffset;
    const change = to - start;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - t, 3);
      window.scrollTo(0, start + change * ease);
      if (t < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // If we arrive with intent or hash, scroll the section smoothly
  useEffect(() => {
    const want =
      (location.state && location.state.scrollTo) ||
      (location.hash === "#service_highlight" ? "service_highlight" : null);
    if (!want) return;

    // prevent the timed auto-scroll from kicking in
    setCancelAuto(true);

    // wait a tick so the section is in the DOM/layout
    requestAnimationFrame(() => {
      const el = document.getElementById(want);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(y, 1200); // faster for direct intent
        setShowArrow(false);
      }
    });
  }, [location.state, location.hash]);

  // Are we at (or near) the very top?
  const isNearTop = () => (window.scrollY || 0) <= 5;

  useEffect(() => {
    // Any user intent cancels auto scroll
    const onWheel = () => setCancelAuto(true);
    const onTouch = () => setCancelAuto(true);
    const onKey = () => setCancelAuto(true);
    const onScroll = () => {
      if ((window.scrollY || 0) > 80) setCancelAuto(true);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // 3s → show arrow if still near top and not previously autoscrolled
    const arrowTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) setShowArrow(true);
    }, 3000);

    // 5s → auto scroll smoothly if not cancelled
    const scrollTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) {
        const next = document.getElementById("acquisition");
        const targetY = next
          ? next.getBoundingClientRect().top + window.scrollY
          : bannerRef.current?.offsetHeight || 0;

        smoothScrollTo(targetY, 2500);
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

  // Content
  const data = [
    {
      id: 1,
      title: "Materials & Outreach Preparation",
      description:
        "From buyer intent letters to targeted outreach, we craft compelling packages that open doors. This includes electronic newsletters, private inquiries, and public channel monitoring.",
    },
    {
      id: 2,
      title: "Buyer Intent Letters",
      description:
        "We craft personalized buyer letters that communicate credibility and serious intent — opening doors to off-market conversations and early negotiations with aircraft owners.",
    },
    {
      id: 3,
      title: "Opportunity Monitoring",
      description:
        "We continuously scan global listings, private boards, and industry networks to uncover real-time buying opportunities that match your desired aircraft class and criteria.",
    },
  ];

  const acquisitionData = [
    {
      id: 1,
      title: "Tailored Aircraft Identification",
      description:
        "We begin by identifying aircraft that align precisely with your mission profile, operational goals, and financial expectations—narrowing down by make, model, and availability.",
    },
    {
      id: 2,
      title: "Strategic Marketing & Advertising",
      description:
        "We handle everything from photography to copywriting, launching your listing across key channels to reach serious buyers efficiently and attractively.",
    },
    {
      id: 3,
      title: "Data-Driven Aircraft Evaluation",
      description:
        "Utilizing proprietary data and aviation market intelligence, we determine a competitive listing price that reflects real-time demand and enhances buyer interest.",
    },
    {
      id: 4,
      title: "End-to-End Transaction Management",
      description:
        "We handle LOIs, negotiate terms, finalize contracts, and oversee all due diligence processes—ensuring speed, accuracy, and full transparency at every step.",
    },
    {
      id: 5,
      title: "Full-Service Integration Support",
      description:
        "From legal and escrow coordination to insurance, financing, and pilot training—we bring the right partners to the table and manage all moving parts to close successfully.",
    },
  ];

  const cards = [
    {
      title: "Financing",
      icon: <FaHandHoldingUsd className="h-8 w-8" />,
      gradient: "from-sky-400 to-blue-500",
      points: [
        "Connect with trusted aviation lenders to secure competitive terms."
      ],
      img: "/images/financing-aircraft.jpg",
    },
    {
      title: "Tax & Legal",
      icon: <FaBalanceScale className="h-8 w-8" />,
      gradient: "from-indigo-400 to-violet-500",
      points: [
        "Collaborate with top aviation advisors to protect and optimize your position."
      ],
      img: "/images/tax-legal-aircraft.jpg",
    },
    {
      title: "Insurance",
      icon: <FaShieldAlt className="h-8 w-8" />,
      gradient: "from-cyan-400 to-teal-500",
      points: [
        "Aviation-specific protection for what matters most."
      ],
      img: "/images/insurance-aircraft.jpg",
    },
    {
      title: "Training & Operations",
      icon: <FaChalkboardTeacher className="h-8 w-8" />,
      gradient: "from-amber-400 to-orange-500",
      points: [
        "Assess needs and link you with proven providers."
      ],
      img: "/images/training-aircraft.jpg",
    },
    {
      title: "Project Oversight",
      icon: <FaClipboardCheck className="h-8 w-8" />,
      gradient: "from-fuchsia-400 to-pink-500",
      points: [
        "Ensure every detail stays aligned and on schedule across all parties."
      ],
      img: "/images/oversight-aircraft.jpg",
    },
  ];


  return (
    <>
      {/* HERO / FIRST SECTION */}
      <div ref={bannerRef} className="relative h-screen lg:h-auto overflow-hidden">
        <ServiceBanner banner={banner} />

        {/* Flashing/Bouncing Down Arrow after ~3s */}
        {showArrow && <BlinkingArrow />}
      </div>

      {/* SECOND SECTION (TARGET) */}
      <main id="acquisition" className="relative z-[0]">
        <ServiceRappleResearch
          data={data}
          highlightedTitle={"Preflight Planning :"}
          title={"Strategy, not speculation. Your mission defines the search."}
          description={
            "Every successful acquisition begins with clarity. We define your mission profile from the start,  how you’ll fly, where you’ll go, and what ownership represents for you. Then we align the right aircraft to your mission, your lifestyle, and your financial strategy."
          }
          boxVariant="dark"
        />

        {/* 👇 this section is the scroll target */}
        {/* <ServiceHighlights id="service_highlight" data={acquisitionData} /> */}

        <TaxiCardsDarkSection tagline={<><span>Taxi &amp; Systems Check</span></>} title={"Expert guidance and trusted partners to clear the path before takeoff"} description={"Before we roll, we ensure every system is a go. Mason Amelia is aligned with top-tier aviation professionals. We ensure the right expertise is engaged early. This includes financing, tax, legal, insurance, training, maintenance, and operational advisors. This cohesive approach gives you clarity and confidence from the very first turn."} cards={cards} />

        <ClearForTakeoff
          eyebrow="FRAME 4"
          title="Cleared for Takeoff"
          subtitle="Aircraft Identification & Acquisition"
          intro="With a clear mission and strong foundation in place, we advance to the acquisition phase. Mason Amelia actively searches both public and off-market opportunities to locate the ideal aircraft. No stone unturned, no shortcuts taken."
          bullets={[
            "Develop and deploy strategic outreach campaigns to identify off-market aircraft and untapped opportunities.",
            "Present qualified aircraft and deliver precise price and value analyses powered by SkyNet.",
            "From LOIs to closing, we negotiate terms and manage due diligence every step of the way.",
          ]}
          outro="We don’t just find airplanes — we deliver outcomes. Every step is handled with precision and purpose so you can take off with confidence."
          image="/images/aircraft-identification.jpg"   // ← replace with your image
          imageAlt="Aircraft Identification & Acquisition"
          imageOn="right"                              // or "left" to flip layout
        />

        <Relationship />

        <section className="bg-[#111218] relative z-[0] py-10">
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

export default AcquisitionPage;
