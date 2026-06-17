import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Listing from "../components/Listing";
import Banner from "../components/Banner";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
// import { IoIosArrowDown } from "react-icons/io"; // not needed now
import banner from "/images/showroom/banner.webp";
import bannerTwo from "/images/showroom/bannerTwo.webp";

import Contact from "../components/Contact";
import CTABanner from "../components/CTABanner";
import { useContact } from "../hooks/useContactQuery";

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
  const location = useLocation();
  const { data: contact } = useContact();
  // Check if we're coming back from a detail page
  const isReturning = location.state?.fromDetail === true;

  // Restore filter state from sessionStorage if returning from detail
  const restoredFilters = useMemo(() => {
    if (!isReturning) return null;
    try {
      const saved = sessionStorage.getItem('showroom_filters');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  }, [isReturning]);

  const [showArrow, setShowArrow] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [cancelAuto, setCancelAuto] = useState(isReturning); // skip auto-scroll if returning
  const listingRef = useRef(null);
  const media = useMediaQuery("(max-width: 767px)");

  const isNearTop = () => (window.scrollY || 0) <= 5;

  // helper: koi bhi interaction → auto scroll cancel + arrow hide
  const cancelAutoScroll = () => {
    setCancelAuto(true);
    setShowArrow(false);
  };

  // scroll to Listing section (timer + arrow click dono ke liye)
  const scrollToListing = () => {
    const top =
      (listingRef.current?.getBoundingClientRect().top ?? 0) +
      window.scrollY -
      12;
    smoothScrollTo(top, { duration: 2000 });
    setAutoScrollEnabled(true);
    cancelAutoScroll();
  };

  // scroll restoration OR force start at top
  useEffect(() => {
    const { documentElement } = document;
    const prevRestore = history.scrollRestoration;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const prevBehavior = documentElement.style.scrollBehavior;
    documentElement.style.scrollBehavior = "auto";

    if (isReturning) {
      // Restore scroll position from sessionStorage
      try {
        const savedScroll = sessionStorage.getItem('showroom_scroll_y');
        const scrollY = savedScroll ? Number(savedScroll) : 0;
        // Small delay to let the DOM render with restored filter state
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      } catch {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
      const fixTimer = setTimeout(() => window.scrollTo(0, 0), 0);
      return () => {
        clearTimeout(fixTimer);
        documentElement.style.scrollBehavior = prevBehavior || "";
        if ("scrollRestoration" in history)
          history.scrollRestoration = prevRestore || "auto";
      };
    }

    const restoreTimer = setTimeout(() => {
      documentElement.style.scrollBehavior = prevBehavior || "";
      if ("scrollRestoration" in history)
        history.scrollRestoration = prevRestore || "auto";
    }, 300);

    return () => {
      clearTimeout(restoreTimer);
      documentElement.style.scrollBehavior = prevBehavior || "";
      if ("scrollRestoration" in history)
        history.scrollRestoration = prevRestore || "auto";
    };
  }, []);

  // Save scroll position on every scroll (for restoration later)
  useEffect(() => {
    const handleScroll = () => {
      try { sessionStorage.setItem('showroom_scroll_y', String(window.scrollY)); } catch {}
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // arrow at 3s, auto-scroll at 5s (unless cancelled / returning / mobile)
  useEffect(() => {
    if (isReturning || media) return; // skip auto-scroll when returning from detail or on mobile

    let arrowTimer, scrollTimer;

    const onWheel = () => cancelAutoScroll();
    const onTouch = () => cancelAutoScroll();
    const onKey = () => cancelAutoScroll();
    const onScroll = () => {
      // thoda sa bhi scroll ho jaye to cancel
      if ((window.scrollY || 0) > 5) cancelAutoScroll();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    // 3s baad arrow show (agar top pe ho & cancel nahi hua)
    arrowTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) setShowArrow(true);
    }, 1500);

    // 5s baad smooth scroll (agar ab tak cancel nahi hua)
    scrollTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto) {
        scrollToListing();
      }
    }, 3000);

    return () => {
      clearTimeout(arrowTimer);
      clearTimeout(scrollTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [cancelAuto, isReturning]); // cancelAuto change → timers re-check

  // arrow click → same behavior as timed auto-scroll
  const handleArrowClick = () => {
    scrollToListing();
  };

  return (
    <>
      <Banner url={banner} banner={bannerTwo} handleArrowClick={handleArrowClick} showArrow={showArrow} contact={contact} />
      {/* 👇 target for scroll */}
      <div ref={listingRef}>
        <Listing autoScrollEnabled={autoScrollEnabled} initialFilters={restoredFilters} />
      </div>
      {/* <CTA /> */}

      <section className="bg-[#111218] relative z-[10] pb-20">
        <div className="container px-5">
          <CTABanner />
        </div>
      </section>

      {/* <Contact /> */}
      <Footer />
      <ScrollToTop />

     
    </>
  );
};

export default ShowroomPage;
