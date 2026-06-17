import React, { useEffect, useRef, useState, useCallback } from "react";
import InfiniteMovingCards from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReviews } from "../hooks/useReviewsQuery";
import FullscreenSpinner from "./FullScreenSpinner";
import reviewsBanner from "/images/acquisition/service-banner.webp"; // ✅ change if you want

const Reviews = ({ contact }) => {
  const location = useLocation();
  const { data: reviews, isLoading, isFetching, error } = useReviews();

  // ✅ background show only when section in view
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  // ─── Navigation dots state ───
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef(null);

  const handleActiveIndexChange = useCallback((idx) => {
    setActiveIndex(idx);
  }, []);

  const handleDotClick = useCallback((idx) => {
    setActiveIndex(idx);
    cardsRef.current?.goToIndex(idx);
  }, []);

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

  const totalDots = reviews?.length || 0;

  return (
    <>
      {/* Spinner mounts into <body> via portal */}
      {location.pathname === "/testimonial" && (
        <FullscreenSpinner show={isLoading || isFetching} text="Loading team…" />
      )}

      {error && (
        <div className="py-10 text-center text-red-400">
          Failed to load team.
        </div>
      )}

      {/* ✅ Fixed background layer (Safari safe) */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 transition-opacity duration-300 pointer-events-none ${active ? "opacity-100" : "opacity-0"
          }`}
        style={{
          backgroundImage: `url(${reviewsBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
      />

      <section
        ref={sectionRef}
        id="testimonials"
        className={`${location.pathname === "/testimonial"
            ? "justify-center 2xl:justify-around"
            : "justify-around"
          } relative z-10 flex flex-col py-20 overflow-hidden`}
      >
        {/* ✅ Overlay above bg */}
        <div className="absolute inset-0 bg-tertiary_color/90 z-0" />

        {/* ✅ Content */}
        <div className="relative z-10">
          <div className="container px-5 mb-14 z-[20]">
            <div className="text-center">
              <motion.h5
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[2rem] md:text-[3rem] xl:text-[3.5rem] leading-none 2xl:text-7xl text-white font-bold mx-auto"
              >
                {contact?.home_testimonials_title || "What our Clients are Saying"}
              </motion.h5>

              <motion.p
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-white md:text-xl py-[40px] mx-auto md:max-w-[55rem] 2xl:max-w-[70rem]"
              >
                {contact?.home_testimonials_description || "The words of our valued clients speak volumes. Their experiences reflect the trust, results and relationships that we work hard to earn every day."}
              </motion.p>
            </div>
          </div>

          {/* ✅ Moving cards (overflow fix for iPhone) */}
          <div className="testimonial_moving_card overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <InfiniteMovingCards
              ref={cardsRef}
              bgColor=""
              pauseOnHover={true}
              speed={"fast"}
              items={reviews}
              // ✅ mobile pe viewport based width, md+ pe 600px
              itemClass={"w-[85vw] max-w-[600px] md:min-w-[600px]"}
              onActiveIndexChange={handleActiveIndexChange}
            />
          </div>

          {/* ✅ Navigation Dots */}
          {totalDots > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center gap-2 mt-10"
            >
              {Array.from({ length: totalDots }).map((_, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className="relative group p-1 focus:outline-none"
                  >
                    {/* Glow ring on active */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: isActive
                          ? "0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.15)"
                          : "0 0 0px rgba(255,255,255,0)",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Dot */}
                    <motion.div
                      className="rounded-full cursor-pointer transition-colors duration-300"
                      animate={{
                        width: isActive ? 28 : 10,
                        height: 10,
                        backgroundColor: isActive
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(255, 255, 255, 0.3)",
                      }}
                      whileHover={{
                        backgroundColor: isActive
                          ? "rgba(255, 255, 255, 1)"
                          : "rgba(255, 255, 255, 0.6)",
                        scale: 1.15,
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        mass: 0.8,
                      }}
                    />
                  </button>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Reviews;
