import React from "react";
import InfiniteMovingCards from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReviews } from "../hooks/useReviewsQuery";
import FullscreenSpinner from "./FullScreenSpinner";

const Reviews = () => {
  const location = useLocation();

  const { data: reviews, isLoading, isFetching, error } = useReviews();
  console.log(reviews);

  return (
    <>
      {/* Spinner mounts into <body> via portal */}
      {location.pathname === "/testimonial" && <FullscreenSpinner show={isLoading || isFetching} text="Loading team…" />}

      {/* If API failed AND no fallback, you can show a soft message */}
      {error && (
        <div className="py-10 text-center text-red-400">
          Failed to load team.
        </div>
      )}

      <section
        id="testimonials"
        className={`${
          location.pathname === "/testimonial" ? "md:h-[100vh] lg:h-full xl:h-[100vh] justify-center 2xl:justify-around" : "xl:h-[100vh] justify-around"
        }  flex flex-col`}
      >
        <div
          className={`${
            location.pathname === "/testimonial"
              ? "container px-5 mb-14 z-[20]"
              : ""
          }`}
        >
          <div className="text-center">
            <motion.h5
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-6xl text-[#fff] font-bold max-w-3xl mx-auto"
            >
              Fast Foraward Feedbacks
            </motion.h5>
            <motion.p
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[#ddd] md:text-lg py-[40px] mx-auto max-w-4xl"
            >
              Real voices. Real experiences. Hear how our clients turned
              aviation dreams into reality with Mason Amelia. From first-time
              buyers to seasoned pilots — their journeys speak for themselves.
            </motion.p>
          </div>
        </div>

        {/*  */}

        <div className="testimonial_moving_card mt-8 md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <InfiniteMovingCards
            bgColor=""
            pauseOnHover={true}
            speed={"slow"}
            items={reviews}
            itemClass={"min-w-[600px]"}
          />
        </div>
      </section>
    </>
  );
};

export default Reviews;

// 