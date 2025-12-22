import React, { useEffect, useRef, useState } from "react";
import InfiniteMovingCards from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReviews } from "../hooks/useReviewsQuery";
import FullscreenSpinner from "./FullScreenSpinner";
import reviewsBanner from "/images/acquisition/service-banner.webp"; // ✅ change if you want

const Reviews = () => {
  const location = useLocation();
  const { data: reviews, isLoading, isFetching, error } = useReviews();

  // ✅ background show only when section in view
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
        className={`fixed inset-0 transition-opacity duration-300 pointer-events-none ${
          active ? "opacity-100" : "opacity-0"
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
        className={`${
          location.pathname === "/testimonial"
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
                What our Clients are Saying
              </motion.h5>

              <motion.p
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-white md:text-xl py-[40px] mx-auto md:max-w-[55rem] 2xl:max-w-[70rem]"
              >
                The words of our valued clients speak volumes. Their experiences
                reflect the trust, results and relationships that we work hard to
                earn every day.
              </motion.p>
            </div>
          </div>

          {/* ✅ Moving cards (overflow fix for iPhone) */}
          <div className="testimonial_moving_card overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <InfiniteMovingCards
              bgColor=""
              pauseOnHover={true}
              speed={"fast"}
              items={reviews}
              // ✅ mobile pe viewport based width, md+ pe 600px
              itemClass={"w-[85vw] max-w-[600px] md:min-w-[600px]"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
