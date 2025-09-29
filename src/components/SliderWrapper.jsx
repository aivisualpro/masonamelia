import React, { useEffect, useRef, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useInView } from "framer-motion";
import { IoIosGlobe } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import { SiTrustpilot } from "react-icons/si";
import slideOne from "/images/showcase/one.png";
import slideTwo from "/images/showcase/two.png";
import slideThree from "/images/showcase/three.png";
import { HiUserGroup } from "react-icons/hi2";
import { GrTransaction } from "react-icons/gr";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// modules
import { EffectFade, Autoplay } from "swiper/modules";

/* ---------------------- CountUp (no extra library) ---------------------- */
const CountUp = ({ end = 0, duration = 3000, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    let raf;

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const v = Math.round(easeOutCubic(p) * end);
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};
/* ----------------------------------------------------------------------- */

const SliderWrapper = () => {
  const cards = [
    {
      icon: <GiCommercialAirplane size={32} className="text-tertiary_color" />,
      title: "", // no prefix/suffix
      count: 75,
      description: "Years of combined experience in aviation industry",
      onClick: "/contact",
    },
    {
      icon: <GrTransaction size={32} className="text-tertiary_color" />,
      title: "$", // prefix
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
      icon: <HiUserGroup size={32} className="text-tertiary_color" />,
      title: "",
      count: 8,
      description: "Dedicated professionals team serving our valued clients",
      onClick: "/contact",
    },
    {
      icon: <IoIosGlobe size={32} className="text-tertiary_color" />,
      title: "",
      count: 0,
      description: "Excuses — delivering trusted results every single time",
      onClick: "/contact",
    },
  ];

  const images = [slideOne, slideTwo, slideThree];

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

        <div className="container px-5 h-full flex items-center z=[10]">
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
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm md:text-lg max-w-5xl text-white font-light mx-auto text-center py-[40px]"
              >
                At Mason Amelia, we curate bespoke aviation experiences with
                precision, trust, and performance at the core. From consultation
                to delivery, our expert team ensures seamless transactions and
                lasting partnerships worldwide.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {cards.map((card, index) => {
                const prefix = card.title === "$" ? "$" : "";
                const suffix = card.title === "+" ? "+" : "";

                return (
                  <motion.div
                    key={index}
                    className="px-4 py-3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 30,
                      duration: 0.5,
                      delay: 0.3,
                    }}
                  >
                    <div className="bg-[#15161cac] relative border-[1px] border-[#f1f1f192] rounded-[10px] flex flex-col items-center justify-center text-center p-4 h-full w-full">
                      <div className="mb-4 absolute top-[-30px] bg-[#15161cac] border-[1px] border-[#f1f1f192] rounded-[50%] p-3">
                        {card.icon}
                      </div>

                      <h4 className="text-lg lg:text-lg xl:text-xl text-white mb-4 mt-8">
                        <CountUp end={card.count} duration={1200} prefix={prefix} suffix={suffix} />
                      </h4>

                      <p className="text-[#eee] text-base font-light mb-4 max-w-4xl">
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
