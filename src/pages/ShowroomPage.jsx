import React, { useEffect, useRef, useState } from "react";
import Listing from "../components/Listing";
import Banner from "../components/Banner";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { IoIosArrowDown } from "react-icons/io";
import banner from "/images/showroom/banner.png";
import BlinkingArrow from "../components/BlinkingArrow";

/* ----------------- custom slow scroll helper ----------------- */
const smoothScrollTo = (targetY, { duration = 2200 } = {}) => {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now) => {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = easeInOutCubic(p);
    window.scrollTo(0, Math.round(startY + distance * eased));
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};
/* ------------------------------------------------------------- */

const ShowroomPage = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const listingRef = useRef(null);

  // force start at top, avoid unwanted browser jumps
  useEffect(() => {
    const { documentElement } = document;
    const prevRestore = history.scrollRestoration;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const prevBehavior = documentElement.style.scrollBehavior;
    documentElement.style.scrollBehavior = "auto";

    window.scrollTo(0, 0);
    const fixTimer = setTimeout(() => window.scrollTo(0, 0), 0);

    const restoreTimer = setTimeout(() => {
      documentElement.style.scrollBehavior = prevBehavior || "";
      if ("scrollRestoration" in history)
        history.scrollRestoration = prevRestore || "auto";
    }, 300);

    return () => {
      clearTimeout(fixTimer);
      clearTimeout(restoreTimer);
      documentElement.style.scrollBehavior = prevBehavior || "";
      if ("scrollRestoration" in history)
        history.scrollRestoration = prevRestore || "auto";
    };
  }, []);

  // arrow at 3s, scroll at 5s
  useEffect(() => {
    let arrowTimer, scrollTimer;
    let cancelled = false;

    const cancelAll = () => {
      if (cancelled) return;
      cancelled = true;
      setShowArrow(false);
      clearTimeout(arrowTimer);
      clearTimeout(scrollTimer);
      window.removeEventListener("wheel", cancelAll);
      window.removeEventListener("touchstart", cancelAll);
      window.removeEventListener("keydown", cancelAll);
    };

    arrowTimer = setTimeout(() => {
      if (!cancelled) setShowArrow(true);
    }, 3000);

    scrollTimer = setTimeout(() => {
      if (cancelled) return;
      const top =
        (listingRef.current?.getBoundingClientRect().top ?? 0) +
        window.scrollY -
        12;
      setShowArrow(false);
      smoothScrollTo(top, { duration: 2200 }); // 👈 slow scroll (~2.2s)
      setAutoScrollEnabled(true); // re-enable Listing scroll logic
      cancelAll();
    }, 5000);

    window.addEventListener("wheel", cancelAll, { passive: true });
    window.addEventListener("touchstart", cancelAll, { passive: true });
    window.addEventListener("keydown", cancelAll);

    return () => {
      clearTimeout(arrowTimer);
      clearTimeout(scrollTimer);
      window.removeEventListener("wheel", cancelAll);
      window.removeEventListener("touchstart", cancelAll);
      window.removeEventListener("keydown", cancelAll);
    };
  }, []);

  return (
    <>
      <Banner url={banner} />
      {/* 👇 target for scroll */}
      <div ref={listingRef}>
        <Listing autoScrollEnabled={autoScrollEnabled} />
      </div>
      <CTA />
      <Footer />
      <ScrollToTop />

      {showArrow && (
        <BlinkingArrow />
      )}
    </>
  );
};

export default ShowroomPage;
