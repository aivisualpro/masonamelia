import React from "react";
import InfiniteMovingCards from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReviews } from "../hooks/useReviewsQuery";
import FullscreenSpinner from "./FullscreenSpinner";

const Reviews = () => {
  const location = useLocation();
  const { data: reviews, isLoading, isFetching, error } = useReviews();

  return (
    <>
      {location.pathname === "/testimonial" && (
        <FullscreenSpinner show={isLoading || isFetching} text="Loading team…" />
      )}

      {error && (
        <div className="py-10 text-center text-red-400">
          Failed to load team.
        </div>
      )}

      <section
        id="testimonials"
        className={`${
          location.pathname === "/testimonial"
            ? "h-full justify-center 2xl:justify-around"
            : "h-full justify-around"
        } flex flex-col py-20 overflow-x-hidden`}   // ✅ IMPORTANT
      >
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

        {/* ✅ overflow hidden wrapper to stop side-pan */}
        <div className="testimonial_moving_card overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <InfiniteMovingCards
            bgColor=""
            pauseOnHover={true}
            speed={"fast"}
            items={reviews}
            // ✅ Mobile width = viewport based, Desktop = 600px
            itemClass={"w-[85vw] max-w-[600px] md:min-w-[600px]"}
          />
        </div>
      </section>
    </>
  );
};

export default Reviews;
