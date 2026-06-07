import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Skynet from "../components/Skynet";
import SkynetAdvantage from "../components/SkynetAdvantage";
import ScrollToTop from "../components/ScrollToTop";
import SkynetTimeline from "../components/SkynetTimeline";
import CTABanner from "../components/CTABanner";
import banner from "/images/skynet/banner.webp";
import useMediaQuery from "@mui/material/useMediaQuery";
import BlinkingArrow from "../components/BlinkingArrow";
import Contact from "../components/Contact";
import { useContact } from "../hooks/useContactQuery";

const SkynetPage = () => {
  const media = useMediaQuery("(max-width: 767px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { data: contactData } = useContact();

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

  // 🔥 helper: kisi bhi interaction pe auto-scroll cancel + arrow hide
  const cancelAutoScroll = () => {
    setCancelAuto(true);
    setShowArrow(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 767) return;
    const onWheel = () => cancelAutoScroll();
    const onTouch = () => cancelAutoScroll();
    const onKey = () => cancelAutoScroll();
    const onScroll = () => {
      // thoda sa bhi scroll > 5px → cancel
      if ((window.scrollY || 0) > 5) cancelAutoScroll();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    // const already = sessionStorage.getItem(AUTO_KEY) === "1";

    const arrowTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto /* && !already */) setShowArrow(true);
    }, 1500);

    const scrollTimer = setTimeout(() => {
      if (isNearTop() && !cancelAuto /* && !already */) {
        const next = document.getElementById("skynet-main");
        const targetY = next
          ? next.getBoundingClientRect().top + window.scrollY
          : bannerRef.current?.offsetHeight || 0;

        smoothScrollTo(targetY, 2000);
        // sessionStorage.setItem(AUTO_KEY, "1");
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
  }, [cancelAuto]);

  // 👇 arrow pe click → scroll + auto cancel
  const handleArrowClick = () => {
    const next = document.getElementById("skynet-main");
    const targetY = next
      ? next.getBoundingClientRect().top + window.scrollY
      : bannerRef.current?.offsetHeight || 0;

    smoothScrollTo(targetY, 2000);
    cancelAutoScroll();
  };

  return (
    <>
      <Navbar />
      {/* HERO / FIRST SECTION (sticky) */}
      {isDesktop ? (
        <section
          ref={bannerRef}
          className="mt-0 w-full lg:h-screen flex flex-row relative sticky top-0 overflow-hidden z-[10]"
        >
          {/* Left Column (40% width) */}
          <div className="w-[40%] lg:h-screen bg-[#111218] flex flex-col justify-center items-start px-10 xl:px-16 pt-[50px] relative z-[9]">
            <Skynet
              banner={banner}
              titleWhite={contactData?.skynet_hero_title_white}
              titleBlue={contactData?.skynet_hero_title_blue}
              description={contactData?.skynet_hero_description}
              isDesktop={true}
            />
          </div>

          {/* Blending overlay between columns */}
          <div className="absolute left-[40%] w-[10%] h-full bg-gradient-to-r from-[#111218] to-transparent z-[10] pointer-events-none" />

          {/* Right Column (60% width) */}
          <div
            className="w-[60%] lg:h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url(${contactData?.skynet_hero_bg_image || banner})`,
              backgroundSize: "cover",
              backgroundPosition: "60% 50%",
              backgroundRepeat: "no-repeat",
            }}
          />
          {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
        </section>
      ) : (
        <section
          ref={bannerRef}
          className="mt-0 w-full bg-cover bg-center z-[0] relative overflow-hidden"
          style={{
            backgroundImage: media ? "" : `url(${contactData?.skynet_hero_bg_image || banner})`,
            backgroundSize: "cover",
            backgroundPosition: "60% 50%",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            height: media ? "50svh" : "100vh",
          }}
        >
          {/* Hero gradient overlay — sized to element, identical across all pages */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none z-[1]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(21, 22, 28) 35%, rgba(21, 22, 28, 0.6) 75%, rgba(21, 22, 28, 0.55))",
            }}
          />

          <div className="relative z-[2] h-full">
            <Skynet
              banner={banner}
              titleWhite={contactData?.skynet_hero_title_white}
              titleBlue={contactData?.skynet_hero_title_blue}
              description={contactData?.skynet_hero_description}
            />
          </div>

          {/* Arrow appears ~3s if user hasn't interacted */}
          {showArrow && <BlinkingArrow onClick={handleArrowClick} />}
        </section>
      )}

      {/* TARGET SECTION — auto-scroll lands here */}
      <main id="skynet-main" className="z-[0]">
        <SkynetAdvantage
          titleWhite={contactData?.skynet_advantage_title_white}
          titleBlue={contactData?.skynet_advantage_title_blue}
          description={contactData?.skynet_advantage_description}
        />
        <SkynetTimeline
          titleWhite={contactData?.skynet_timeline_title_white}
          titleBlue={contactData?.skynet_timeline_title_blue}
          items={contactData?.skynet_timeline_items}
        />

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
