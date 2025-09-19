import React, { useRef, useState, useMemo } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { useBrands } from "../hooks/useBrandsQuery";

const Brands = () => {
  // 1) default to [] so it's always iterable
  const { data: brands = [], isLoading, error } = useBrands();

  // 2) only keep valid logo urls
  const logos = useMemo(
    () => brands.map(b => b?.logo).filter(Boolean),
    [brands]
  );

  // 3) duplicate list for infinite scroll
  const baseImages = useMemo(() => logos.concat(logos), [logos]);

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

  if (isLoading) return <section className="py-8 text-white">Loading…</section>;
  if (error) return <section className="py-8 text-red-400">Failed to load brands</section>;
  if (!logos.length) return null;

  return (
    <section className="w-full overflow-x-hidden bg-[#111218] py-4">
      <div
        className="w-max flex"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {baseImages.map((src, index) => {
          const scale = isHovered && hoveredIndex === index ? 1.3 : 1;
          return (
            <motion.img
              key={`${src}-${index}`}
              src={src}
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
