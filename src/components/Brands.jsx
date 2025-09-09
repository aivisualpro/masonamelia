import React, { useRef, useState, useMemo } from "react";
import { motion, useAnimationFrame } from "framer-motion";

import brandOne from "/images/brands/one.png"
import brandTwo from "/images/brands/two.avif"
import brandThree from "/images/brands/three.png"
import brandFour from "/images/brands/four.png"
import brandFive from "/images/brands/five.avif"
import brandSix from "/images/brands/six.svg"

const Brands = () => {
  const brands = [brandOne, brandTwo, brandThree, brandFour, brandFive, brandSix];
  const baseImages = useMemo(() => [...brands, ...brands], [brands]);

  const xRef = useRef(0);
  const containerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  useAnimationFrame((t, delta) => {
    if (containerRef.current && !isHovered) {
      xRef.current -= 0.05 * delta;
      containerRef.current.style.transform = `translateX(${xRef.current}px)`;
      const containerWidth = containerRef.current.scrollWidth / 2;
      if (Math.abs(xRef.current) >= containerWidth) xRef.current = 0;
    }
  });

  return (
    <section className="w-full overflow-x-hidden bg-[#111218] py-4">
      <div
        className="w-max flex"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {baseImages.map((img, index) => {
          const scale = isHovered && hoveredIndex === index ? 1.3 : 1;
          return (
            <motion.img
              key={index}
              src={img}
              alt={`brand-${index}`}
              draggable={false}
              className="brand_img w-40 h-24 object-contain mx-12"
              onMouseEnter={() => setHoveredIndex(index)}
              animate={{ scale }}
              transition={{ duration: 0.4 }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Brands;
