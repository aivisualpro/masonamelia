import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import banner from "/images/acquisition/service-banner.webp";

const ServiceRappleResearch = ({ highlightedTitle, title, description }) => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 } // 25% section visible -> background ON
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* ✅ Fixed background layer (works on Safari too) */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          transform: "translateZ(0)", // Safari paint fix
        }}
      />

      {/* ✅ Your section */}
      <section
        ref={sectionRef}
        className="relative py-20 md:min-h-screen min-h-auto z-10"
      >
        {/* ✅ Overlay above bg */}
        <div className="absolute inset-0 bg-tertiary_color/90 z-0" />

        {/* ✅ Content */}
        <div className="relative z-10 container px-5 flex flex-col justify-center h-full md:h-screen">
          <div className="w-full px-4 flex flex-col justify-between items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[1.8rem] md:text-[3rem] xl:text-7xl font-bold text-white max-w-7xl mx-auto"
              style={{ lineHeight: "1.1" }}
            >
              {highlightedTitle}
            </motion.h2>

            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl xl:text-2xl py-[40px] font-bold text-white max-w-7xl mx-auto"
              style={{ lineHeight: "1.1" }}
            >
              {title}
            </motion.h2>

            <div className="md:hidden">
              <motion.p
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white text-lg font-light mx-auto"
              >
                {description}
              </motion.p>
            </div>

            <div className="hidden md:block">
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white md:text-xl max-w-[55rem] 2xl:max-w-[60rem] font-light mx-auto"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceRappleResearch;
