import React from "react";
// import teamBanner from "/images/meet-team.png"; // Adjust your path
import { motion } from "framer-motion";
import Button from "./Button";
import { FiPhoneCall } from "react-icons/fi";
import meetTheTeam from "/images/team.jpg";

const MeetTheTeam = () => {
  return (
    <section
      className="h-full w-full bg-[#fff] py-20 px-4 overflow-x-hidden"
      id="meetTheTeam"
      style={{
        backgroundImage: `url("https://bracketweb.com/jetlywp/wp-content/uploads/2023/01/about-1-bg-1.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container h-full px-5 flex items-center">
        <div className="flex flex-col lg:flex-row items-center  justify-between gap-8 md:gap-4 lg:gap-4 xl:gap-8">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 rounded-3xl text-white">
            {/* Heading */}
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              viewport={{ amount: 0.2, once: true }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-[2rem] md:text-[3rem] xl:text-[3.5rem] 2xl:text-7xl font-bold text-primary_theme"
              style={{ lineHeight: "1.1" }}
            >
              From San Antonio to Duluth…{" "}
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                Meet The Team
              </span>{" "}
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              viewport={{ amount: 0.2, once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-[#222] mt-5 md:text-lg leading-relaxed text-justify"
            >
              We are purveyors of high-end piston and owner-flown turbine aircraft. Our nationwide team brings decades of experience across
              every corner of aviation. From initial consultation to final aircraft delivery, we handle every transaction with efficiency and
              an unwavering focus on your satisfaction’s bottom line. Putting clients first and building lasting relationships is the
              foundation of our success and yours.
            </motion.p>

            {/* Bullet Points */}
            {/* <ul className="mt-6 space-y-3 text-sm md:text-base">
              <motion.li
                initial={{ opacity: 0, y: 50 }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="flex items-start gap-2 text-primary_theme"
              >
                <span className="text-tertiary_color">✔</span>
                Decades of collective aviation and tech expertise
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 50 }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 }}
                className="flex items-start gap-2 text-primary_theme"
              >
                <span className="text-tertiary_color">✔</span>
                Grounded in values, driven by innovation
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 50 }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                className="flex items-start gap-2 text-primary_theme"
              >
                <span className="text-tertiary_color">✔</span>
                From San Antonio to Duluth — one united mission
              </motion.li>
            </ul> */}

            {/* CTA + Phone */}
            <div className="flex flex-col lg:flex-row lg:items-center mt-8 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                viewport={{ amount: 0.2, once: true }}
                whileInView={{ opacity: 1, y: 0 }}
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

              {/* <motion.div
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
              </motion.div> */}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="justify-center lg:w-1/2 flex relative z-[0]">
            <motion.img
              initial={{ opacity: 0, x: 70 }}
              viewport={{ amount: 0.2, once: true }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              src={meetTheTeam}
              alt="Team Banner"
              className="rounded-3xl w-full z-[20]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
