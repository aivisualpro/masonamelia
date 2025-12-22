import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import brokerageBanner from "/images/brokerage/service-banner.webp";

const BrokerageRappleResearch = ({
  data,
  highlightedTitle,
  isConsultation = false,
  title,
  description,
}) => {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const getAnimationProps = (delay = 0) => ({
    initial: { opacity: 0, y: 70 },
    [isMobile ? "animate" : "whileInView"]: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay },
  });

  return (
    <>
      {/* ✅ Fixed background layer (Safari safe) */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full transition-opacity duration-300 pointer-events-none ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${brokerageBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "translateZ(0)",
          willChange: "opacity",
          zIndex: 0,
        }}
      />

      {/* ✅ Section */}
      <section
        ref={sectionRef}
        className="relative z-0 2xl:py-0 py-20 md:min-h-screen min-h-[100svh] overflow-hidden"
      >
        {/* ✅ Overlay ABOVE background (no negative z) */}
        <div className="absolute inset-0 bg-tertiary_color/90 z-0" />

        {/* ✅ Content */}
        <div className="relative z-10 container px-5 flex justify-center items-center min-h-[100svh] md:min-h-screen mx-auto">
          <div className="px-4 flex flex-col justify-center text-center w-full">
            {/* Title - always animate on load */}
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[1.8rem] md:text-[3rem] xl:text-7xl font-bold text-white max-w-7xl mx-auto"
            >
              <span className="text-white">{title}</span>
            </motion.h2>

            {/* Consultation Subtitle */}
            {isConsultation && (
              <motion.h2
                {...getAnimationProps(0.2)}
                className="text-xl xl:text-2xl py-[40px] font-bold text-white max-w-7xl mx-auto"
              >
                Consultation:
              </motion.h2>
            )}

            {/* Description */}
            <motion.p
              {...getAnimationProps(0.4)}
              className="text-white md:text-xl max-w-[55rem] 2xl:max-w-[60rem] font-light mx-auto"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrokerageRappleResearch;
