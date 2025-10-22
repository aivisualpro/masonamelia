import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Skynet from "../components/Skynet";
import SkynetAdvantage from "../components/SkynetAdvantage";
import ScrollToTop from "../components/ScrollToTop";
import SkynetTimeline from "../components/SkynetTimeline";
import CTABanner from "../components/CTABanner";
import banner from "/images/skynet/banner.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "../components/BlinkingArrow"; // ← added
import Contact from "../components/Contact";
// import CTABanner from "../components/CTABanner";

const SkynetPage = () => {
  const media = useMediaQuery("(max-width: 767px)");

  /** ---------- Smooth auto-scroll (same pattern as Acquisition/Brokerage) ---------- */
  const bannerRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);
  const [cancelAuto, setCancelAuto] = useState(false);

  // const AUTO_KEY = "skynet_auto_scrolled_v1";
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
        const next = document.getElementById("skynet-main");
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

  return (
    <>
      <Navbar />
      {/* HERO / FIRST SECTION (sticky) */}
      <section
        ref={bannerRef}
        className="md:sticky top-0 h-screen w-full bg-cover bg-center z-[0] relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(21, 22, 28, ${
            media ? ".8" : "1"
          }) ${media ? "100%" : "30%"}, rgba(21, 22, 28,0.3)), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "60% 50%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* You already render Navbar above; keeping this one commented avoids duplicate */}
        {/* <Navbar /> */}
        <Skynet />

        {/* Arrow appears ~3s if user hasn't interacted */}
        {showArrow && <BlinkingArrow />}
      </section>

      {/* TARGET SECTION — auto-scroll lands here */}
      <main id="skynet-main" className="relative z-[0]">
        <SkynetAdvantage />
        <SkynetTimeline />

        <section className="relative z-[0] py-20 bg-[#111218]">
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

export default SkynetPage;
