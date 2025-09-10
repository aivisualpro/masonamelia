import React from "react";
import { motion } from "framer-motion";
import ShinyText from "./ui/ShinyText";

export default function GlassCard() {
  return (
    <>
      <div className="w-full text-white">
        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 0.5,
            delay: 0.6,
          }}
          className={`md:text-start text-center text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl font-extrabold capitalize leading-[1.2]`}
        >
          Turbulence-Free Transactions
        </motion.h2>
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          // className="text-sm md:text-base lg:text-lg py-3 ps-1 text-white/70 opacity-100"
        >
          <ShinyText
            text="Industry-leading marketing, data, and grit to help you buy or sell."
            disabled={false}
            speed={5}
            className="custom-class text-lg md:text-xl mt-4"
          />
        </motion.div>

        {/* Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className=""
        >
          <Button buttonLabel="Visit Showroom" onClick="/showroom" />
        </motion.div> */}
      </div>
    </>
  );
}
