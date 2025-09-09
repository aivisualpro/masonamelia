import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

export const HeroParallax = ({ portfolio, onImageClick }) => {
  // 3 rows
  const firstRow = portfolio.slice(0, 5);
  const secondRow = portfolio.slice(5, 10);
  const thirdRow = portfolio.slice(3, 8);

  // (optional) media queries preserved
  useMediaQuery("(max-width: 768px) and (max-height: 800px)");
  useMediaQuery("(max-width: 768px) and (max-height: 900px)");

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 200, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [-70, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[100rem] md:h-[115rem] 2xl:h-[140rem] overflow-hidden bg-[#111218] flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {/* Row 1 */}
        <motion.div className="flex flex-row-reverse">
          {firstRow.map((port, index) => (
            <ProductCard
              data={port}
              translate={translateX}
              key={`first-${index}`}
              onClick={() => onImageClick(index)}
            />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="flex flex-row">
          {secondRow.map((port, index) => (
            <ProductCard
              data={port}
              translate={translateXReverse}
              key={`second-${index}`}
              onClick={() => onImageClick(index + 4)}
            />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div className="flex flex-row-reverse">
          {thirdRow.map((port, index) => (
            <ProductCard
              data={port}
              translate={translateX}
              key={`third-${index}`}
              onClick={() => onImageClick(index + 8)}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="z-[999] h-screen absolute mx-auto px-4 w-full left-0 flex items-center justify-center flex-col text-center">
      <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[3.2rem] xl:text-7xl font-bold text-white">
        A Bespoke Approach to Brokerage
      </h1>
      <p className="max-w-[1000px] text-2xl md:text-4xl mx-auto mt-8 text-white">
        Crafting the perfect deal for every flight.
      </p>
    </div>
  );
};

// === ProductCard: hover par 5 sec preview ===
export const ProductCard = ({ data, translate, onClick }) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product relative cursor-pointer  p-3"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail image */}
      <img
        src={data.src}
        alt={data.title}
        loading="lazy"
        className={`min-h-[125px] min-w-[250px] md:min-h-[180px] md:min-w-[320px] 2xl:min-h-[225px] 2xl:min-w-[425px] h-full rounded-[5px] transition-opacity duration-300`}
      />
      
    </motion.div>
  );
};

export default HeroParallax;
