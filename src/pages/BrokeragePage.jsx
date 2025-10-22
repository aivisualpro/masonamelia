import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ServiceBanner from "../components/ServiceBanner";
import banner from "/images/brokerage/banner.jpg";
import CTABanner from "../components/CTABanner";
import BrokerageRappleResearch from "../components/BrokerageRappleResearch";
import ServiceHighlights from "../components/ServiceHighlights";
import { Timeline } from "../components/ui/timeline";
import { FaHandshake, FaUsers, FaChartLine } from "react-icons/fa";
import { FaJetFighterUp } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import brokerageBanner from "/images/brokerage/timeline-banner.avif";
import BlinkingArrow from "../components/BlinkingArrow"; // <-- added
import Contact from "../components/Contact";
// import Navbar from "../components/Navbar";

const BrokeragePage = () => {
  /** ---------- Smooth auto-scroll (same pattern as Acquisition) ---------- */
  const bannerRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);
  const [cancelAuto, setCancelAuto] = useState(false);

  // const AUTO_KEY = "brokerage_auto_scrolled_v1";
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

    const arrowTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto /* && !already */) setShowArrow(true);
    }, 3000);

    const scrollTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto /* && !already */) {
        const next = document.getElementById("brokerage");
        const targetY = next
          ? next.getBoundingClientRect().top + window.scrollY
          : (bannerRef.current?.offsetHeight || 0);

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

  /** ---------- Page content (unchanged) ---------- */
  const data = [
    {
      id: 1,
      title: "Strategic Marketing & Advertising",
      description:
        "We handle everything from photography to copywriting, launching your listing across key channels to reach serious buyers efficiently and attractively.",
    },
    {
      id: 2,
      title: "Accurate Market-Based Valuation",
      description:
        "Utilizing proprietary data and aviation market intelligence, we determine a competitive listing price that reflects real-time demand and enhances buyer interest.",
    },
    {
      id: 3,
      title: "Broker & Buyer Network Reach",
      description:
        "Your aircraft is promoted through our trusted broker network and buyer database, ensuring maximum exposure and fast-tracked negotiations with qualified prospects.",
    },
  ];

  const brokerageData = [
    {
      id: 1,
      title: "Aircraft Listing & Market Readiness",
      description:
        "We prepare your aircraft for market with professional photography, specs validation, and compelling listings designed to capture attention and drive qualified inquiries.",
    },
    {
      id: 2,
      title: "Global Exposure & Network Reach",
      description:
        "Your aircraft is promoted across exclusive buyer networks, MLS platforms, broker partnerships, and targeted campaigns — maximizing visibility and interest worldwide.",
    },
    {
      id: 3,
      title: "Pricing Strategy Backed by Insight",
      description:
        "Our proprietary valuation models and aviation market intelligence ensure your aircraft is competitively priced — striking the right balance between speed and profit.",
    },
    {
      id: 4,
      title: "Negotiation & Deal Structuring",
      description:
        "We manage all buyer communications, evaluate offers, negotiate deal terms, and structure agreements that align with your goals — minimizing friction and delays.",
    },
    {
      id: 5,
      title: "Seamless Closing & Escrow Oversight",
      description:
        "From due diligence to document handling and escrow coordination, our experts handle every detail — ensuring a smooth, secure, and timely closing process.",
    },
  ];

  const timeline = [
    {
      title: "Strategic Launch",
      icon: <FaHandshake size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            The Adams brothers co-found Sagacious Consultants, later acquired by
            Accenture. This milestone lays the foundation for the values that
            would shape Mason Amelia’s future: strategy, service, and growth.
          </p>
        </div>
      ),
    },
    {
      title: "Smart Market Positioning",
      icon: <FaJetFighterUp size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            Jesse Adams leads over 200 aircraft transactions as a top producer
            at Aerista. These years sharpen his brokerage acumen, equipping him
            to deliver speed, accuracy, and strategic deals in competitive
            markets.
          </p>
        </div>
      ),
    },
    {
      title: "Aggressive Outreach",
      icon: <FaUsers size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-8 text-lg font-normal text-white">
            Mason Amelia, LLC is born — a new kind of brokerage focused on
            high-touch service, data-driven positioning, and deal execution
            excellence. Built on family values, it quickly gains national
            traction.
          </p>
        </div>
      ),
    },
    {
      title: "Intelligent Negotiation",
      icon: <FaChartLine size={48} color="#1777cb" />,
      content: (
        <div>
          <p className="mb-4 text-lg font-normal text-white">
            Mason Amelia emerges as one of the fastest-growing boutique
            brokerages in the U.S. With a client-first mindset and unmatched
            marketing, the team elevates brokerage standards from coast to
            coast.
          </p>
          <div className="mb-8 list-disc text-white">
            <div className="flex items-center mb-4">
              <IoCheckmarkDoneSharp />
              <span className=" text-white ms-2">
                Five licensed brokers handling listings nationwide
              </span>
            </div>
            <div className="flex items-center mb-4">
              <IoCheckmarkDoneSharp />
              <span className=" text-white ms-2">
                Aircraft sold across all categories and regions
              </span>
            </div>
            <div className="flex items-center mb-4">
              <IoCheckmarkDoneSharp />
              <span className=" text-white ms-2">
                Recognized for transparency, precision, and premium service
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* HERO / FIRST SECTION with arrow & auto-scroll */}
      <div ref={bannerRef} className="relative h-screen lg:h-auto overflow-hidden">
        <ServiceBanner banner={banner} />
        {showArrow && <BlinkingArrow />}
      </div>

      {/* TARGET SECTION */}
      <main id="brokerage" className="relative">
        <BrokerageRappleResearch
          data={data}
          highlightedTitle={"Pre Brokerage"}
          title={"Strategy Tailored for Success"}
          description={
            "Before your aircraft hits the market, our expert team designs a smart, strategic approach to attract premium buyers and maximize value."
          }
        />

        <ServiceHighlights
          topTitle={"Strategic"}
          highlightedTitle={"Aircraft Brokerage"}
          bottomTitle={"for Confident Closures"}
          description="Every listing tells a story. Discover how Mason Amelia’s trusted brokerage model delivers maximum value, optimal timing, and seamless execution—from initial listing to final handshake."
          data={brokerageData}
        />

        {/* <section
          id="timeline"
          style={{
            backgroundImage: `url(${brokerageBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
          className="py-20 relative z-[10]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]"></div>
          <Timeline data={timeline} isHeading={true} />
        </section> */}

        <section className="bg-[#111218] relative z-[10] py-10">
          <div className="container px-5">
            <CTABanner />
          </div>
        </section>

        {/* <Contact /> */}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default BrokeragePage;
