import {
  FaUserAlt,
  FaBriefcase,
  FaPlayCircle,
  FaGlobeAmericas,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";
import SpotlightCard from "./ui/SpotlightEffect";
import Button from "./Button";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaUserAlt className="text-4xl mb-5 text-tertiary_color" />,
    title: "Integrity",
    desc: (
      <>
        When you name a company after your children, you hold yourself to a
        higher standard. Mason Amelia was built on the belief that every
        transaction should be a win for both Buyer and Seller. Our greatest
        sense of accomplishment comes from the repeat clients, referrals, and
        reputation that follow doing business the right way.
      </>
    ),
  },
  {
    icon: <FaBriefcase className="text-4xl mb-5 text-tertiary_color" />,
    title: "Relationships",
    desc: (
      <>
        We value relationships over transactions. Loyalty runs deep here—to our
        clients, our partners, and our friends. Matching the right buyer with
        the right seller is how we take care of our circle.
      </>
    ),
  },
  {
    icon: <FaPlayCircle className="text-4xl mb-5 text-tertiary_color" />,
    title: "Expertise",
    desc: (
      <>
        Confidence isn’t a claim, it’s a credential. With experience spanning
        flight instruction, airline, and corporate aviation, we’ve flown the
        mission from every seat. That’s what makes our methodology an industry
        benchmark.
      </>
    ),
  },
];

export default function WhatSetsUsApart() {
  return (
    <section className="h-full w-full flex justify-center items-center py-20 relative bg-[#111218]">
      <div className="container px-5">
        <div className="rounded-2xl w-full">
          <div className="w-full px-4 flex flex-col justify-center text-center items-center">
            {/* Left Side: Headline */}

            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="tag-container mb-4"
            >
              <div className="tag-left-arrow"></div>
              <div className="flex items-center gap-2 px-4 py-[9px] bg-[#222] text-white text-sm font-semibold">
                <span className="w-2 h-2 bg-[#fff] rounded-full"></span>
                Expert Guidance
              </div>
            </motion.div> */}
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[1.5rem] md:text-[3.5rem] lg:text-[3rem] xl:text-6xl font-bold text-white md:max-w-3xl"
              style={{ lineHeight: "1.2" }}
            >
              Who is{" "}
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                Mason Amelia?
              </span>
            </motion.h2>

            {/* Right Side: Paragraph + Button */}

            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-base md:text-lg text-neutral-300 py-4 py-[24px] md:py-[40px] max-w-4xl"
            >
              An aircraft brokerage named after our founder Jesse Adams’
              children, focused on high-performance piston and owner-flown
              turbine aircraft, built on:
            </motion.p>
            {/* <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button buttonLabel="Contact Us" onClick="/contact" />
            </motion.div> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {features.map((card, idx) => (
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className={`glass-container w-full`}
              >
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>

                <div className="p-4 h-full">
                  <div
                    key={idx}
                    className="rounded-xl p-2 flex flex-col items-center w-full relative"
                  >
                    {card.icon}
                    <h3 className="text-xl 2xl:text-2xl font-bold text-white mb-2 text-center">
                      {card.title}
                    </h3>
                    <p className="text-white text-center lg:text-sm 2xl:text-base font-light">
                      {card.desc}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
