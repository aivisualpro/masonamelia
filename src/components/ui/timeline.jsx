"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Timeline = ({
  isHeading = false,
  data,
  topTitle = "Our Journey: From",
  highlightedTitle = "Vision to Industry",
  bottomTitle = "Leadership",
}) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full font-sans md:px-10 z-[20]" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8 lg:px-8 text-center z-[20]">
        <motion.h2
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl font-semibold text-[1.5rem] md:text-[3.5rem] lg:text-[3rem] xl:text-6xl mb-4 text-white"
          style={{ lineHeight: "1.1" }}
        >
          {topTitle}{" "}
          <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
            {highlightedTitle}
          </span>{" "}
          {bottomTitle}{" "}
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
            y: 70,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white text-base md:text-lg max-w-4xl mx-auto pt-[40px] pb-[80px]"
        >
          Discover the pivotal moments that have defined Mason Amelia’s
          evolution. From our entrepreneurial roots to becoming one of the
          fastest-growing aircraft brokerages. Each milestone represents a step
          forward in our commitment to excellence, innovation, and client trust.
        </motion.p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start md:gap-10 pb-28">
            <div
              className={`sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs  md:w-full ${
                isHeading ? "lg:max-w-xl" : "lg:max-w-sm"
              }`}
            >
              <div className="h-16 absolute left-0 w-16 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-10 w-10 flex items-center rounded-full">
                  {item.icon}
                </div>
              </div>
              <motion.h3
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white"
              >
                {item.title}
              </motion.h3>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 70,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative pl-20 pr-4 md:pl-4 w-full"
            >
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-txt_light_color">
                {item.title}
              </h3>

              {item.content}
            </motion.div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#1777cb] via-tertiary_color to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
