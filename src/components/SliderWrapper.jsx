import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { IoIosGlobe } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import { SiTrustpilot } from "react-icons/si";
import { HiUserGroup } from "react-icons/hi2";
import { GrTransaction } from "react-icons/gr";

// bg images
import slideOne from "/images/showcase/one.png";
import slideTwo from "/images/showcase/two.png";
import slideThree from "/images/showcase/three.png";

// Swiper styles (keep minimal)
import "swiper/css";
import "swiper/css/effect-fade";

// modules
import { EffectFade, Autoplay } from "swiper/modules";

/* ---------------- CountUp (perf-optimized, no extra lib) ---------------- */
const getDurationForValue = (val) => {
  // your mapping:
  // 450 -> 4s, 200 -> 3s, 75 -> 2s, 8 -> 1s, 0 -> 2s (but special logic)
  if (val >= 450) return 5000;
  if (val >= 200) return 4000;
  if (val >= 75) return 3000;
  if (val >= 8) return 2000;
  if (val === 0) return 5000;

  // fallback for other values: clamp between 0.8s and 4s by magnitude
  const ms = Math.min(
    4000,
    Math.max(800, Math.log10(Math.max(1, val + 1)) * 1200)
  );
  return Math.round(ms);
};

const CountUp = React.memo(
  function CountUp({ end = 0, prefix = "", suffix = "", index = 0 }) {
    const spanRef = useRef(null);
    const inView = useInView(spanRef, {
      once: true,
      margin: "0px 0px -30% 0px",
    });
    const [value, setValue] = useState(end === 0 ? 20 : 0); // start 10 if zero case
    const prefersReducedMotion = useReducedMotion();
    const duration = getDurationForValue(end);

    useEffect(() => {
      if (!inView) return;

      if (prefersReducedMotion) {
        setValue(end === 0 ? 0 : end);
        return;
      }

      const startVal = end === 0 ? 20 : 0;
      const targetVal = end === 0 ? 0 : end;
      const t0 = performance.now();
      let raf;
      let timer;

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      let lastInt = startVal;

      const tick = (now, offset = 0) => {
        const p = Math.min((now - t0 - offset) / duration, 1);
        if (p < 0) {
          raf = requestAnimationFrame((n) => tick(n, offset));
          return;
        }

        const eased = easeOutCubic(p);
        let next;
        if (end === 0) {
          next = Math.round(20 - 20 * eased);
        } else {
          next = Math.round(targetVal * eased);
        }

        if (next !== lastInt) {
          lastInt = next;
          setValue(next);
        }

        if (p < 1) {
          raf = requestAnimationFrame((n) => tick(n, offset));
        }
      };

      setValue(startVal);

      if (end === 0) {
        // 👇 1.5s delay before decrement begins
        timer = setTimeout(() => {
          raf = requestAnimationFrame((now) => tick(now, 1500));
        }, 2000);
      } else {
        raf = requestAnimationFrame((now) => tick(now, 0));
      }

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }, [inView, end, duration, prefersReducedMotion]);

    return (
      <span
        ref={spanRef}
        className={`${index === 4 ? "text-red-600" : "text-white"} text-3xl lg:text-[2.5rem] 2xl:text-[2.7rem]`}
        aria-label={`${prefix}${value}${suffix}`}
      >
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </span>
    );
  },
  (prev, next) =>
    prev.end === next.end &&
    prev.prefix === next.prefix &&
    prev.suffix === next.suffix
);
/* ----------------------------------------------------------------------- */

const SliderWrapper = () => {
  // memoize static data to avoid re-creating arrays each render
  const cards = useMemo(
    () => [
      {
        icon: <GrTransaction size={32} className="text-tertiary_color" />,
        title: "$", // prefix
        suffix: "M",
        count: 450,
        description: "Million worth of completed aircraft transactions",
        onClick: "/contact",
      },
      {
        icon: <SiTrustpilot size={32} className="text-tertiary_color" />,
        title: "+", // suffix
        count: 200,
        description: "Aircraft closings successfully managed worldwide",
        onClick: "/contact",
      },
      {
        icon: (
          <GiCommercialAirplane size={32} className="text-tertiary_color" />
        ),
        title: "",
        count: 75,
        description: "Years of combined experience in aviation industry",
        onClick: "/contact",
      },
      {
        icon: <HiUserGroup size={32} className="text-tertiary_color" />,
        title: "",
        count: 8,
        description: "Dedicated professionals team serving our valued clients",
        onClick: "/contact",
      },
      {
        icon: <IoIosGlobe size={32} className="text-tertiary_color" />,
        title: "",
        count: 0, // special: will count 10 → 0 in 2s
        description: "Excuses — delivering trusted results every single time",
        onClick: "/contact",
      },
    ],
    []
  );

  const images = useMemo(() => [slideOne, slideTwo, slideThree], []);

  return (
    <>
      <section className="md:h-screen lg:h-full xl:h-screen relative z-[0] w-screen py-20 overflow-x-hidden">
        <div className="absolute w-screen top-0 left-0 h-full">
          <div className="absolute w-screen h-full bg-black opacity-80 md:opacity-50 z-[10]"></div>

          <Swiper
            spaceBetween={30}
            effect={"fade"}
            modules={[EffectFade, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper z-[-10]"
          >
            {images.map((item, index) => (
              <SwiperSlide
                key={index}
                className="w-screen"
                style={{
                  backgroundImage: `url(${item})`,
                  backgroundSize: "cover",
                  backgroundPosition: "bottom",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </Swiper>
        </div>

        {/* fix: z-[10] (was z=[10]) */}
        <div className="container px-5 h-full flex items-center z-[10]">
          {/* optional: keep this filter if you really need it; it has minor GPU cost */}
          <svg style={{ display: "none" }}>
            <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.008 0.008"
                numOctaves="2"
                seed="92"
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurred"
                scale="70"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>

          <div className="relative inset-0 flex flex-col items-center gap-8 justify-between h-full text-white z-[20]">
            <div className="flex flex-col justify-center items-center">
              <motion.h1
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-6xl font-bold text-white text-center"
              >
                Mason Amelia{" "}
                <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                  By the Numbers.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-sm md:text-lg max-w-5xl text-white font-light mx-auto text-center py-[40px]"
              >
                The data doesn’t lie. Mason Amelia is your expert wingman with a
                proven track record and reputation. We know what we’re doing and
                we deliver results consistently.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {cards.map((card, index) => {
                const prefix = card.title === "$" ? "$" : "";
                const suffix =
                  card.title === "+" ? "+" : card.suffix === "M" ? "M" : "";

                return (
                  <motion.div
                    key={index}
                    className="px-4 py-3"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  >
                    <div className="bg-[#15161cac] relative border border-[#f1f1f192] rounded-[10px] flex flex-col items-center justify-center text-center lg:p-2 2xl:p-4 h-full w-full will-change-transform">
                      <div className="mb-4 absolute -top-8 bg-[#15161cac] border border-[#f1f1f192] rounded-full p-3">
                        {card.icon}
                      </div>

                      <h4 className="text-lg lg:text-lg xl:text-xl text-white mb-4 mt-8">
                        <CountUp
                          index={index}
                          end={card.count}
                          prefix={prefix}
                          suffix={suffix}
                        />
                      </h4>

                      <p className="text-[#eee] text-base lg:text-[.7rem] 2xl:text-[.8rem] font-light mb-4">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SliderWrapper;
