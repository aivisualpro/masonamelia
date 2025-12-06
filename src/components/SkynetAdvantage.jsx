import React from "react";
import { FaFileAlt, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const SkynetAdvantage = () => {
  return (
    <>
      <section
        id="skynet_advantage"
        className="py-10 xl:py-20 relative h-screen z-[0] bg-[#15161c]"
      >
        <div className="container px-5 flex items-center h-full">
          <div className="py-16 px-4 md:px-20 text-white">
            <div className="">
              <motion.h2
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[2rem] md:text-[3rem] xl:text-[3.5rem] leading-none 2xl:text-7xl font-bold text-center"
              >
                Unlock{" "}
                <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                  SkyNet’s Data Advantage
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, dealy: 0.3 }}
                className="text-center text-gray-400 py-[20px] xl:py-[40px] md:text-lg"
              >
                Hold on, John Connor!” because Mason Amelia’s proprietary
                aircraft pricing app, SkyNet, employs a proprietary means of
                collecting, analyzing, and presenting transaction data. With no
                MLS substitute, this private data is the lifeblood that empowers
                our buyers and sellers. Simply put, SkyNet ensures every
                decision is powered by data and backed by Mason Amelia’s
                experience.
              </motion.p>
            </div>

            {/* <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  duration: 0.8,
                  delay: 0.2,
                }}
                className="w-full p-8 rounded-2xl bg-[#11121889] overflow-hidden relative"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <span className="text-[#afafaf0c] text-[7rem] absolute top-[-50px] left-[-5px] font-extrabold">
                      01
                    </span>
                  </div>
                  <h4 className="text-[1.4rem] font-semibold text-white pt-8">
                    Precision Data Access
                  </h4>
                  <p className="text-base text-white/80">
                    Gain access to exclusive off-market aircraft transaction
                    data, unavailable on public platforms. Our proprietary
                    database empowers buyers and sellers with real-time,
                    confidential insights. Eliminate guesswork with data that
                    reflects true market behavior. SkyNet makes precision a
                    default, not a bonus.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  duration: 0.8,
                  delay: 0.2,
                }}
                className="w-full p-8 rounded-2xl bg-[#11121889] overflow-hidden relative"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <span className="text-[#afafaf0c] text-[7rem] absolute top-[-50px] left-[-5px] font-extrabold">
                      02
                    </span>
                  </div>
                  <h4 className="text-[1.4rem] font-semibold text-white pt-8">
                    Intelligent Market Analysis
                  </h4>
                  <p className="text-base text-white/80">
                    Our analytics engine processes vast datasets with zero MLS
                    dependency. SkyNet uses pattern recognition, historical
                    trends, and predictive logic to power decisions. You get
                    clarity in a market often filled with ambiguity. It’s not
                    just data—it’s guided intelligence.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  duration: 0.8,
                  delay: 0.2,
                }}
                className="w-full p-8 rounded-2xl bg-[#11121889] overflow-hidden relative"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <span className="text-[#afafaf0c] text-[7rem] absolute top-[-50px] left-[-5px] font-extrabold">
                      03
                    </span>
                  </div>
                  <h4 className="text-[1.4rem] font-semibold text-white pt-8">
                    Verified Valuation Confidence
                  </h4>
                  <p className="text-base text-white/80">
                    Back every valuation with Mason Amelia’s tested and trusted
                    methodology. From corporate jets to private aircraft, our
                    accuracy is unmatched. Confidence isn’t optional when
                    millions are at stake—it’s required. With SkyNet, peace of
                    mind comes built-in.
                  </p>
                </div>
              </motion.div>
            </div> */}

          </div>
        </div>
      </section>
    </>
  );
};

export default SkynetAdvantage;
