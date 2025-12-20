import React from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import brokerageBanner from "/images/brokerage/service-banner.webp";

const BrokerageRappleResearch = ({
  data,
  highlightedTitle,
  isConsultation = false,
  title,
  description,
}) => {
  // Check if screen is mobile (less than 768px)
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Helper function to switch between 'animate' and 'whileInView'
  const getAnimationProps = (delay = 0) => ({
    initial: { opacity: 0, y: 70 },
    // Agar mobile hai toh load par animate ho, warna scroll par (whileInView)
    [isMobile ? "animate" : "whileInView"]: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay: delay },
  });

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${brokerageBanner})`,
          backgroundSize: "cover", // 'contain' ki jagah 'cover' background ko poora fill karega
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="relative 2xl:py-0 py-20 z-[10] md:h-screen"
      >
        <div className="overlay bg-tertiary_color opacity-90 absolute top-0 left-0 w-full h-full z-[-1]" />
        
        <div className="container px-5 flex justify-center items-center h-full mx-auto">
          <div className="px-4 flex flex-col justify-center z-[4] text-center w-full">
            
            {/* Title - Hamesha load par animate hota hai */}
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[1.8rem] md:text-[3rem] xl:text-7xl font-bold text-white max-w-7xl mx-auto"
            >
              <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h2>

            {/* Consultation Subtitle */}
            {isConsultation && (
              <motion.h2
                {...getAnimationProps(0.2)}
                className="text-xl xl:text-2xl py-[40px] font-bold text-white max-w-7xl mx-auto"
              >
                Consultation:
              </motion.h2>
            )}

            {/* Description Paragraph */}
            <motion.p
              {...getAnimationProps(0.4)}
              className="text-[#fff] md:text-xl max-w-[55rem] 2xl:max-w-[60rem] font-light mx-auto"
            >
              {description}
            </motion.p>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default BrokerageRappleResearch;




{/* <div className="md:ms-[15%] md:w-[40%] flex flex-col gap-4">
  {data.map((item, index) => (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="w-full p-8 rounded-2xl bg-[#11121837] overflow-hidden relative"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex items-center justify-center">
          <span className="text-[#130e0e4a] text-[7rem] absolute top-[-50px] left-[-5px] font-extrabold">
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
</div> */}