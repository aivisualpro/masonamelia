import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

export const HeroParallax = ({ portfolio, onImageClick }) => {
  // Helper to build a row preserving the ORIGINAL global index
  const makeRow = (start, end) =>
    portfolio
      .slice(start, Math.min(end, portfolio.length))
      .map((item, i) => ({ item, idx: start + i }));

  // Keep your overlapping windows, but now each card carries its global idx
  const firstRow   = makeRow(0, 4);   // 0..3
  const secondRow  = makeRow(3, 7);   // 3..6
  const thirdRow   = makeRow(6, 10);  // 6..9
  const fourthRow  = makeRow(9, 13);  // 9..12
  const fifthRow   = makeRow(12, 16); // 12..15
  const sixthRow   = makeRow(15, 19); // 15..18
  const seventhRow = makeRow(18, 22); // 18..21

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
          {firstRow.map(({ item, idx }) => (
            <ProductCard
              key={`first-${idx}`}
              data={item}
              translate={translateX}
              onClick={() => onImageClick(idx)}
            />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div className="flex flex-row">
          {secondRow.map(({ item, idx }) => (
            <ProductCard
              key={`second-${idx}`}
              data={item}
              translate={translateXReverse}
              onClick={() => onImageClick(idx)}
            />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div className="flex flex-row-reverse">
          {thirdRow.map(({ item, idx }) => (
            <ProductCard
              key={`third-${idx}`}
              data={item}
              translate={translateX}
              onClick={() => onImageClick(idx)}
            />
          ))}
        </motion.div>

        {/* Row 4 */}
        <motion.div className="flex flex-row">
          {fourthRow.map(({ item, idx }) => (
            <ProductCard
              key={`fourth-${idx}`}
              data={item}
              translate={translateXReverse}
              onClick={() => onImageClick(idx)}
            />
          ))}
        </motion.div>

        {/* Row 5 */}
        <motion.div className="flex flex-row-reverse">
          {fifthRow.map(({ item, idx }) => (
            <ProductCard
              key={`fifth-${idx}`}
              data={item}
              translate={translateX}
              onClick={() => onImageClick(idx)}
            />
          ))}
        </motion.div>

        {/* Row 6 */}
        <motion.div className="flex flex-row">
          {sixthRow.map(({ item, idx }) => (
            <ProductCard
              key={`sixth-${idx}`}
              data={item}
              translate={translateXReverse}
              onClick={() => onImageClick(idx)}
            />
          ))}
        </motion.div>

        {/* Row 7 */}
        <motion.div className="flex flex-row-reverse">
          {seventhRow.map(({ item, idx }) => (
            <ProductCard
              key={`seventh-${idx}`}
              data={item}
              translate={translateX}
              onClick={() => onImageClick(idx)}
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
      <img
        src={data?.src}
        alt={data?.title}
        loading="lazy"
        className="min-h-[225px] min-w-[400px] md:min-h-[315px] md:min-w-[560px] lg:min-h-[405px] lg:min-w-[720px] 2xl:min-h-[450px] 2xl:min-w-[800px] h-full rounded-[5px] duration-300"
      />
    </motion.div>
  );
};

export default HeroParallax;
