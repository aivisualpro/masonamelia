import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ServiceBanner from "../components/ServiceBanner";
import BlinkingArrow from "../components/BlinkingArrow";
import banner from "/images/insurance/insurance image.jpg";
import bannerTwo from "/images/insurance/insurance image.jpg"; // Using same for mobile

const InsurancePage = () => {
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

  // helper: cancel auto scroll + arrow hide on user interaction
  const cancelAutoScroll = useCallback(() => {
    setCancelAuto(true);
    setShowArrow(false);
  }, []);

  // If we arrive with intent or hash, scroll the section smoothly
  useEffect(() => {
    const want =
      (location.state && location.state.scrollTo) ||
      (location.hash === "#insurance-content" ? "insurance-content" : null);
    if (!want) return;

    // prevent the timed auto-scroll from kicking in
    cancelAutoScroll();

    // wait a tick so the section is in the DOM/layout
    requestAnimationFrame(() => {
      const el = document.getElementById(want);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(y, 1200); // faster for direct intent
      }
    });
  }, [location.state, location.hash, cancelAutoScroll]);

  // Are we at (or near) the very top?
  const isNearTop = () => (window.scrollY || 0) <= 5;

  useEffect(() => {
    // Skip auto-scroll on mobile
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

    // 1.5s → show arrow if still near top and not cancelled
    const arrowTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) setShowArrow(true);
    }, 1500);

    // 3s → auto scroll smoothly if not cancelled
    const scrollTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) {
        const next = document.getElementById("insurance-content");
        const targetY = next
          ? next.getBoundingClientRect().top + window.scrollY
          : bannerRef.current?.offsetHeight || 0;

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
  }, [cancelAuto, cancelAutoScroll]);

  // arrow click → immediate scroll
  const handleArrowClick = () => {
    const next = document.getElementById("insurance-content");
    const targetY = next
      ? next.getBoundingClientRect().top + window.scrollY
      : bannerRef.current?.offsetHeight || 0;

    smoothScrollTo(targetY, 2500);
    cancelAutoScroll();
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO / FIRST SECTION */}
      <div ref={bannerRef} className="relative z-[9] lg:h-auto overflow-hidden">
        <ServiceBanner banner={banner} bannerTwo={bannerTwo} />

        {/* Flashing/Bouncing Down Arrow after ~1.5s */}
        {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
      </div>

      <main id="insurance-content" className="relative z-[0] bg-[#111218] py-16">
        <div className="container mx-auto px-5 text-center flex flex-col items-center">
          <img 
            src="/images/insurance/titan_aerospace_insurance.avif" 
            alt="Titan Aerospace Insurance" 
            className="w-full max-w-md mx-auto rounded-lg mb-8"
          />
          <a
            href="mailto:insurance@masonamelia.com"
            className="text-[#111218] flex gap-2 items-center shadow-xl text-lg bg-[#fff] backdrop-blur-md font-medium isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-tertiary_color hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-8 py-3 overflow-hidden border-2 border-[#111218] transition-all duration-700 hover:border-tertiary_color rounded-full group"
          >
            Get Quote
          </a>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default InsurancePage;
