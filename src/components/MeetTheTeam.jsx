import React from "react";
// import teamBanner from "/images/meet-team.png"; // Adjust your path
import { motion } from "framer-motion";
import Button from "./Button";
import { FiPhoneCall } from "react-icons/fi";
import meetTheTeam from "/images/team.png"

const MeetTheTeam = () => {
  return (
    <section
      className="md:h-screen lg:h-full xl:h-screen w-full bg-[#fff] py-20 px-4 overflow-x-hidden"
      id="meetTheTeam"
      style={{
        backgroundImage: `url("https://bracketweb.com/jetlywp/wp-content/uploads/2023/01/about-1-bg-1.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container h-full px-5 flex items-center">
        <div className="flex flex-col md:flex-row items-center  justify-between gap-8 md:gap-4 lg:gap-4 xl:gap-8">
          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2 rounded-3xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="tag-container mb-4"
            >
              <div className="tag-left-arrow"></div>
              <div className="flex items-center gap-2 px-4 py-[9px] bg-[#222] text-white text-sm font-semibold">
                <span className="w-2 h-2 bg-[#fff] rounded-full"></span>
                Get To Know Us
              </div>
            </motion.div>
            {/* Heading */}
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl font-bold text-primary_theme"
              style={{ lineHeight: "1.1" }}
            >
              Meet the Experts From{" "}
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                San Antonio to Duluth
              </span>{" "}
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-[#222] mt-5 md:text-lg leading-relaxed text-justify"
            >
              Our team is the heart of Mason Amelia — passionate professionals
              dedicated to delivering seamless experiences from takeoff to
              landing. With years of aviation insight, customer-first mindset,
              and sharp execution, we’re more than a team — we’re your partners
              in the sky.
            </motion.p>

            {/* Bullet Points */}
            <ul className="mt-6 space-y-3 text-sm md:text-base">
              <motion.li
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="flex items-start gap-2 text-primary_theme"
              >
                <span className="text-tertiary_color">✔</span>
                Decades of collective aviation and tech expertise
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 }}
                className="flex items-start gap-2 text-primary_theme"
              >
                <span className="text-tertiary_color">✔</span>
                Grounded in values, driven by innovation
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                className="flex items-start gap-2 text-primary_theme"
              >
                <span className="text-tertiary_color">✔</span>
                From San Antonio to Duluth — one united mission
              </motion.li>
            </ul>

            {/* CTA + Phone */}
            <div className="flex flex-col lg:flex-row lg:items-center mt-8 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.4 }}
              >
                <Button
                  buttonLabel="View More"
                  onClick="/team"
                  bgColor="111218"
                  arrowColor="#111218"
                  txtColor="text-[#fff]"
                  borderColor="border-gray-200"
                  fillColor="fill-gray-200"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.6 }}
                className="flex items-center gap-3"
              >
                <div className="bg-tertiary_color p-3 rounded-full">
                  <FiPhoneCall />
                </div>
                <div className="text-sm">
                  <p className="text-[#222]">Call Anytime</p>
                  <a
                    href="mailto:info@masonamelia.com"
                    className="font-semibold text-[#222]"
                  >
                    info@masonamelia.com
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="justify-center md:w-1/2 flex relative 2xl:scale-[1.1] z-[0]">
            <motion.img
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              src={meetTheTeam}
              alt="Team Banner"
              className="rounded-3xl scale-[1.2] w-full z-[20] lg:mt-[25px] xl:mt-[100px] lg:ml-[50px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
