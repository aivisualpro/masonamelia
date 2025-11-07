import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoPlayCircle } from "react-icons/io5";

/** row ke andar hovered card ko fully visible karne ke liye helper */
function ensureVisible(cardEl, rowEl, hoverMv) {
  if (!cardEl || !rowEl) return;
  const margin = 24; // thoda gutter
  const rowRect = rowEl.getBoundingClientRect();
  const cardRect = cardEl.getBoundingClientRect();

  let delta = 0;
  // Agar left se bahar ja raha hai -> right shift (+)
  if (cardRect.left < rowRect.left + margin) {
    delta = rowRect.left + margin - cardRect.left;
  }
  // Agar right se bahar ja raha hai -> left shift (-)
  else if (cardRect.right > rowRect.right - margin) {
    delta = rowRect.right - margin - cardRect.right;
  }

  if (delta !== 0) {
    // useSpring motion value par .set target tak spring animation karta hai
    hoverMv.set(hoverMv.get() + delta);
  }
}

export const HeroParallax = ({ headerTitle = 'A Bespoke Approach For Brokerage', headerTagline = 'Your Goals. Our Focus.', portfolio, onImageClick }) => {
  // Global index preserve
  const makeRow = (start, end) =>
    portfolio
      .slice(start, Math.min(end, portfolio.length))
      .map((item, i) => ({ item, idx: start + i }));

  const firstRow = makeRow(0, 4);
  const secondRow = makeRow(3, 7);
  const thirdRow = makeRow(6, 10);
  const fourthRow = makeRow(9, 13);
  const fifthRow = makeRow(12, 16);
  const sixthRow = makeRow(15, 19);
  const seventhRow = makeRow(18, 22);

  useMediaQuery("(max-width: 768px) and (max-height: 800px)");
  useMediaQuery("(max-width: 768px) and (max-height: 900px)");

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 200, damping: 30, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [400, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [-900, -1500]),
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
    useTransform(scrollYProgress, [0, 0.2], [-900, 500]),
    springConfig
  );

  // --- per-row hover offsets + refs ---
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);
  const row5Ref = useRef(null);
  const row6Ref = useRef(null);
  const row7Ref = useRef(null);

  const row1Hover = useSpring(0, springConfig);
  const row2Hover = useSpring(0, springConfig);
  const row3Hover = useSpring(0, springConfig);
  const row4Hover = useSpring(0, springConfig);
  const row5Hover = useSpring(0, springConfig);
  const row6Hover = useSpring(0, springConfig);
  const row7Hover = useSpring(0, springConfig);

  // base + hover offset combine
  const row1X = useTransform([translateX, row1Hover], ([b, h]) => b + h);
  const row2X = useTransform([translateXReverse, row2Hover], ([b, h]) => b + h);
  const row3X = useTransform([translateX, row3Hover], ([b, h]) => b + h);
  const row4X = useTransform([translateXReverse, row4Hover], ([b, h]) => b + h);
  const row5X = useTransform([translateX, row5Hover], ([b, h]) => b + h);
  const row6X = useTransform([translateXReverse, row6Hover], ([b, h]) => b + h);
  const row7X = useTransform([translateX, row7Hover], ([b, h]) => b + h);

  return (
    <div
      ref={ref}
      className="z-[10] h-[145rem] md:h-[190rem] lg:h-[225rem] xl:h-[225rem] 2xl:h-[245rem] overflow-hidden bg-[#000] flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header headerTitle={headerTitle} headerTagline={headerTagline} />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {/* Row 1 */}
        <motion.div ref={row1Ref} className="flex flex-row-reverse">
          {firstRow.map(({ item, idx }) => (
            <ProductCard
              key={`first-${idx}`}
              data={item}
              translate={row1X}
              onClick={() => onImageClick(idx)}
              onHover={(el) => ensureVisible(el, row1Ref.current, row1Hover)}
              onLeave={() => row1Hover.set(0)}
            />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div ref={row2Ref} className="flex flex-row">
          {secondRow.map(({ item, idx }) => (
            <ProductCard
              key={`second-${idx}`}
              data={item}
              translate={row2X}
              onClick={() => onImageClick(idx)}
              onHover={(el) => ensureVisible(el, row2Ref.current, row2Hover)}
              onLeave={() => row2Hover.set(0)}
            />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div ref={row3Ref} className="flex flex-row-reverse">
          {thirdRow.map(({ item, idx }) => (
            <ProductCard
              key={`third-${idx}`}
              data={item}
              translate={row3X}
              onClick={() => onImageClick(idx)}
              onHover={(el) => ensureVisible(el, row3Ref.current, row3Hover)}
              onLeave={() => row3Hover.set(0)}
            />
          ))}
        </motion.div>

        {/* Row 4 */}
        <motion.div ref={row4Ref} className="flex flex-row">
          {fourthRow.map(({ item, idx }) => (
            <ProductCard
              key={`fourth-${idx}`}
              data={item}
              translate={row4X}
              onClick={() => onImageClick(idx)}
              onHover={(el) => ensureVisible(el, row4Ref.current, row4Hover)}
              onLeave={() => row4Hover.set(0)}
            />
          ))}
        </motion.div>

        {/* Row 5 */}
        <motion.div ref={row5Ref} className="flex flex-row-reverse">
          {fifthRow.map(({ item, idx }) => (
            <ProductCard
              key={`fifth-${idx}`}
              data={item}
              translate={row5X}
              onClick={() => onImageClick(idx)}
              onHover={(el) => ensureVisible(el, row5Ref.current, row5Hover)}
              onLeave={() => row5Hover.set(0)}
            />
          ))}
        </motion.div>

        {/* Row 6 */}
        <motion.div ref={row6Ref} className="flex flex-row">
          {sixthRow.map(({ item, idx }) => (
            <ProductCard
              key={`sixth-${idx}`}
              data={item}
              translate={row6X}
              onClick={() => onImageClick(idx)}
              onHover={(el) => ensureVisible(el, row6Ref.current, row6Hover)}
              onLeave={() => row6Hover.set(0)}
            />
          ))}
        </motion.div>

        {/* Row 7 */}
        <motion.div ref={row7Ref} className="flex flex-row-reverse">
          {seventhRow.map(({ item, idx }) => (
            <ProductCard
              key={`seventh-${idx}`}
              data={item}
              translate={row7X}
              onClick={() => onImageClick(idx)}
              onHover={(el) => ensureVisible(el, row7Ref.current, row7Hover)}
              onLeave={() => row7Hover.set(0)}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({ headerTitle = '', headerTagline = '' }) => {
  return (
    <div className="h-screen absolute z-[-1] mx-auto px-4 w-full left-0 flex items-center justify-center flex-col text-center">
      <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[3.2rem] xl:text-7xl font-bold text-white">
        {headerTitle}
      </h1>
      <p className="max-w-[1000px] text-2xl md:text-4xl mx-auto mt-8 text-white">
        {headerTagline}
      </p>
    </div>
  );
};

export const ProductCard = ({ data, translate, onClick, onHover, onLeave }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group relative cursor-pointer p-3"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onMouseEnter={() => onHover?.(cardRef.current)}
      onMouseLeave={() => onLeave?.()}
    >
      {/* Fixed-size wrapper so layout jump na ho */}
      <div
        ref={cardRef}
        className="group relative min-h-[225px] min-w-[400px] md:min-h-[315px] md:min-w-[560px] lg:min-h-[405px] lg:min-w-[720px] 2xl:min-h-[450px] 2xl:min-w-[800px] rounded-[5px] overflow-hidden bg-black"
      >
        <img
          src={data?.src}
          alt={data?.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:object-contain"
        />
        <div className="group-hover:opacity-100 opacity-0 transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button className="h-[100px] w-[100px] flex items-center justify-center text-white rounded-full">
            <IoPlayCircle size={72} className="hover:text-blue-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroParallax;
