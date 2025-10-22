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
import Contact from "../components/Contact";

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
          highlightedTitle={"Pre Acquisition"}
          title={"Insight Curated For Precision"}
          description={
            "Before any deal takes flight, our team conducts thorough groundwork to ensure your acquisition strategy is sharp, informed, and advantageously positioned — from outreach to opportunity identification."
          }
          boxVariant="dark"
        />

        {/* 👇 this section is the scroll target */}
        <ServiceHighlights id="service_highlight" data={acquisitionData} />

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
