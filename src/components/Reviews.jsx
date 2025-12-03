import React from "react";
import InfiniteMovingCards from "../components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReviews } from "../hooks/useReviewsQuery";
import FullscreenSpinner from "./FullScreenSpinner";

const Reviews = () => {
  const location = useLocation();

  const { data: reviews, isLoading, isFetching, error } = useReviews();

  return (
    <>
      {/* Spinner mounts into <body> via portal */}
      {location.pathname === "/testimonial" && (
        <FullscreenSpinner
          show={isLoading || isFetching}
          text="Loading team…"
        />
      )}

      {/* If API failed AND no fallback, you can show a soft message */}
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
        }  flex flex-col py-20`}
      >
        <div
          className={`container px-5 mb-14 z-[20]`}
        >
          <div className="text-center">
            <motion.h5
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[2rem] md:text-[3rem] xl:text-[3.5rem] leading-none 2xl:text-7xl text-[#fff] font-bold mx-auto"
            >
              Read What Our Clients Have to Say
            </motion.h5>
            <motion.p
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[#ddd] md:text-lg py-[40px] mx-auto"
            >
              Our scrupulous oversight and personalized service get the most out
              of your transaction. The words of our valued clients speak
              volumes. Their experiences reflect the trust, results and
              relationships that we work hard to earn every day.
            </motion.p>
          </div>
        </div>

        {/*  */}

        <div className="testimonial_moving_card md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <InfiniteMovingCards
            bgColor=""
            pauseOnHover={true}
            speed={"slow"}
            items={reviews?.slice(0, 4)}
            itemClass={"min-w-[600px]"}
          />
        </div>
        <div className="testimonial_moving_card mt-8 md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <InfiniteMovingCards
            bgColor=""
            direction="right"
            pauseOnHover={true}
            speed={"slow"}
            items={reviews?.slice(3, 7)}
            itemClass={"min-w-[600px]"}
          />
        </div>
      </section>
    </>
  );
};

export default Reviews;

//
