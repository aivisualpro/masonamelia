import React from "react";
import plane from "/images/aeroplane.jpg";
import { motion } from "framer-motion";

const ServiceHighlights = ({
  topTitle = "Streamlined",
  highlightedTitle = "Aircraft Acquisition",
  bottomTitle = "for Confident Ownership",
  description = "Every acquisition tells a story. Discover how Mason Amelia’s proven strategies deliver precise, profitable outcomes—from first contact to final delivery.",
  data,
}) => {
  return (
    <>
      <section className="py-20 bg-[#fff] relative z-[10] parallax-bg">
        <div className="container px-5">
          {/* Section Title */}
          <div className="w-full md:mb-0 px-4 flex flex-col md:flex-row justify-between items-center z-[4]">
            <div className="flex flex-col items-center jsutify-center mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[1.6rem] md:text-[2.5rem] lg:text-[3rem] xl:text-6xl font-bold text-[#222] text-center max-w-4xl"
                style={{ lineHeight: "1.1" }}
              >
                {topTitle}{" "}
                <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                  {highlightedTitle}
                </span>{" "}
                {bottomTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[#222] text-sm md:text-lg xl:text-xl font-light ms-4 py-[40px] text-center max-w-5xl"
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="md:flex items-center gap-10">
            {/* 3D Plane Image */}
            <div className="md:w-[50%] mx-auto md:sticky top-0 self-start">
              <motion.img
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  duration: 0.5,
                  delay: 0.2,
                }}
                src={plane}
                alt="3D Reflected Airplane"
                className="w-full object-contain"
              />
              <img
                src={plane}
                alt="Reflection"
                className="
               w-full object-contain
               transform scale-y-[-1]
               opacity-50
               mt-[-20px]
               relative z-0
               pointer-events-none
               select-none
               mask-gradient
            "
              />
            </div>

            {/* Challenge, Solution, Result */}
            <div className="md:w-[50%] space-y-6 text-left text-sm sm:text-base text-gray-800">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="after:bg-[#ffffff1b] after:content-[''] after:translate-y-[20px] after:mb-10 after:block after:w-full after:h-[1px] after:rounded"
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-[1.2rem] md:text-[1.6rem] text-[#222] mb-3"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-[#333] text-sm md:text-lg"
                  >
                    {item.description}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceHighlights;
