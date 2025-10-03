import React from "react";
import { FaRegHandshake, FaRegPlayCircle, FaRocket } from "react-icons/fa";
import Button from "./Button";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaRegHandshake className="text-2xl text-white" />,
    title: "Elevating Aircraft Brokerage Standards",
    description:
      "At Mason Amelia, we aim to redefine how aircraft are marketed and sold. With storytelling at the core, we connect emotion to ownership—one deal at a time.",
    color: "from-[#1777cb] to-[#1777cb]",
  },
  {
    icon: <FaRegPlayCircle className="text-2xl text-white" />,
    title: "Where Aviation Meets Storytelling",
    description:
      "We envision a future where buyers connect with aircraft beyond specs. Every plane tells a story, and we help that story find its next chapter.",
    color: "from-[#1777cb] to-[#1777cb]",
  },
  {
    icon: <FaRocket className="text-2xl text-white" />,
    title: "Marketing that Moves Jets",
    description:
      "From cinematic visuals to insightful data, we use creative content and tech to move jets with precision—delivering unmatched results for our clients.",
    color: "from-[#1777cb] to-[#1777cb]",
  },
];

const GlowingCardSection = () => {
  return (
    <section
      className="py-20 z-[0] relative h-screen"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/02/39/52/06/360_F_239520607_abB3AakIrZozIAPgdVAMiMArLwi0uJTL.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-[-1]"></div>
      <div className="container mx-auto px-4 gap-8 flex flex-col items-center justify-center h-full">
        <div className="w-full px-4 flex flex-col md:flex-row justify-between items-center z-[4]">
          <div className="flex flex-col items-center jsutify-center mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl xl:text-6xl font-bold text-white text-center max-w-4xl"
              style={{ lineHeight: "1.1" }}
            >
              Aviation Marketing with {" "}
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                Heart & Precision
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-white py-[40px] md:text-lg font-light text-center max-w-5xl"
            >
              We blend the emotional power of storytelling with the accuracy of
              data-driven strategy. Every aircraft we market is positioned not
              just as a product, but as a personal journey. This human-first,
              precision-led approach delivers trust—and results.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 30, duration: 0.5 }}
              className={`glass-container w-full `}
            >
              <div className="glass-filter"></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div className="glass-content h-full">
                <div
                  key={index}
                  className="p-6 rounded-xl relative w-full text-center"
                >
                  {/* Glowing Icon */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-4 rounded-full bg-gradient-to-br ${service.color} shadow-xl`}
                    >
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {service.description}
                  </p>
                  <Button buttonLabel="Read More" onClick="/about" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlowingCardSection;
