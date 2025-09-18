import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import banner from "/images/acquisition/service-banner.webp"

const ServiceRappleResearch = ({
  data,
  highlightedTitle,
  title,
  description,
}) => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "contain !important",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
        className="relative xl:h-screen py-20 z-[10]"
      >
        <div className="overlay bg-[#111218df] opacity-[.97] absolute top-0 left-0 w-full h-full z-[-1]" />
        <div className="container px-5 flex flex-col justify-center h-full">
          <div className="w-full px-4 flex flex-col justify-between items-center text-center z-[4]">
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[1.6rem] md:text-[2.5rem] lg:text-[3rem] xl:text-6xl font-bold text-white max-w-4xl mx-auto"
              style={{ lineHeight: "1.1" }}
            >
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                {highlightedTitle}
              </span>{" "}
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#fff] py-[40px] text-sm md:text-lg xl:text-xl font-light max-w-5xl mx-auto"
            >
              {description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 30, duration: 0.8, delay: index * 0.2 }}
                className="w-full p-8 rounded-2xl bg-[#11121889] overflow-hidden relative"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <span className="text-[#afafaf0c] text-[7rem] absolute top-[-50px] left-[-5px] font-extrabold">
                      0{item.id}
                    </span>
                  </div>
                  <h4 className="text-[1.4rem] font-semibold text-white pt-8">
                    {item.title}
                  </h4>
                  <p className="text-base text-white/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceRappleResearch;
