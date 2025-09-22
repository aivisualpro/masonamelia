import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

export const HeroParallax = ({ portfolio, onImageClick }) => {
  // 3 rows
  const firstRow = portfolio.slice(0, 4);
  const secondRow = portfolio.slice(3, 7);
  const thirdRow = portfolio.slice(6, 10);
  const fourthRow = portfolio.slice(9, 13);
  const fifthRow = portfolio.slice(12, 16);
  const sixthRow = portfolio.slice(15, 19);
  const seventhRow = portfolio.slice(18, 22);

  // (optional) media queries preserved
  useMediaQuery("(max-width: 768px) and (max-height: 800px)");
  useMediaQuery("(max-width: 768px) and (max-height: 900px)");

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 200, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-30, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [-400, -1000]),
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
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="z-[10] h-[145rem] md:h-[190rem] lg:h-[225rem] xl:h-[245rem] overflow-hidden bg-[#000] flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {/* Row 1 */}
        <motion.div className="flex flex-row-reverse z-[999]">
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

        {/* Row 4 */}
        <motion.div className="flex flex-row">
          {fourthRow.map((port, index) => (
            <ProductCard
              data={port}
              translate={translateXReverse}
              key={`fourth-${index}`}
              onClick={() => onImageClick(index + 12)}
            />
          ))}
        </motion.div>

        {/* Row 5 */}
        <motion.div className="flex flex-row-reverse">
          {fifthRow.map((port, index) => (
            <ProductCard
              data={port}
              translate={translateX}
              key={`fifth-${index}`}
              onClick={() => onImageClick(index + 16)}
            />
          ))}
        </motion.div>

        {/* Row 6 */}
        <motion.div className="flex flex-row">
          {sixthRow.map((port, index) => (
            <ProductCard
              data={port}
              translate={translateXReverse}
              key={`sixth-${index}`}
              onClick={() => onImageClick(index + 16)}
            />
          ))}
        </motion.div>

        {/* Row 7 */}
        <motion.div className="flex flex-row-reverse">
          {seventhRow.map((port, index) => (
            <ProductCard
              data={port}
              translate={translateX}
              key={`seventh-${index}`}
              onClick={() => onImageClick(index + 18)}
            />
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="h-screen absolute z-[-1] mx-auto px-4 w-full left-0 flex items-center justify-center flex-col text-center">
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
      className="group/product relative cursor-pointer p-3"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail image */}
      <img
        src={data.src}
        alt={data.title}
        loading="lazy"
        className={`min-h-[225px] min-w-[400px] md:min-h-[315px] md:min-w-[560px] lg:min-h-[405px] lg:min-w-[720px] 2xl:min-h-[450px] 2xl:min-w-[800px] h-full rounded-[5px] duration-300`}
      />
    </motion.div>
  );
};

export default HeroParallax;
