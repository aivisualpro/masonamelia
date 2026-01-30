import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaHandshake, FaUsers, FaChartLine, FaRegStar } from "react-icons/fa";
import { FaJetFighterUp } from "react-icons/fa6";
import { HiOutlineCpuChip, HiOutlineRocketLaunch, HiOutlineSparkles } from "react-icons/hi2";
import useMediaQuery from "@mui/material/useMediaQuery";

const AboutAmazingTimeline = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const timelineData = [
    {
      year: "2004",
      title: "Aviation Begins",
      icon: <FaRegStar />,
      content: "After honorable enlisted military service, Jesse began flight training and quickly progressed through CFI, CFII, and MEI ratings.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      year: "2007–2012",
      title: "Airlines & Entrepreneurship",
      icon: <FaJetFighterUp />,
      content: "Jesse flew regional jets for Republic Airways while simultaneously pursuing entrepreneurial ventures, building discipline as a pro pilot alongside business acumen.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      year: "2012–2015",
      title: "Business Foundation",
      icon: <FaUsers />,
      content: "Jesse joined his brothers at Sagacious Consultants, helping scale the firm to a successful acquisition by Accenture – but never stopped flying.",
      color: "from-purple-500 to-pink-600",
    },
    {
      year: "2018",
      title: "The Vision Forms",
      icon: <HiOutlineSparkles />,
      content: "Initially a spin-off of the Adams brothers’ success, Mason Amelia was created as a professional services firm. A clear opportunity in aviation sales soon emerged.",
      color: "from-pink-500 to-rose-600",
    },
    {
      year: "2019–2023",
      title: "Brokerage Mastery",
      icon: <HiOutlineRocketLaunch />,
      content: "Nearly five years at the world’s largest Cirrus brokerage gave Jesse exposure to high-volume global transactions, completing more than 200 deals.",
      color: "from-rose-500 to-orange-600",
    },
    {
      year: "2023",
      title: "Strategic Refocus",
      icon: <FaHandshake />,
      content: "Jesse founded Mason Amelia as a modern aircraft brokerage, combining data, elevated marketing, and grit. The core team was formed within six months.",
      color: "from-orange-500 to-amber-600",
    },
    {
      year: "2024",
      title: "Rapid Growth",
      icon: <FaChartLine />,
      content: "Mason Amelia became one of the fastest growing aircraft brokerages in the country, reshaping how owner-flown aircraft are marketed and sold.",
      color: "from-amber-500 to-yellow-600",
    },
    {
      year: "2025",
      title: "SkyNet Launch",
      icon: <HiOutlineCpuChip />,
      content: "The launch of SkyNet formalized a data-driven valuation approach, bringing unprecedented clarity and precision to the aircraft market.",
      color: "from-yellow-500 to-teal-600",
    },
    {
      year: "2026",
      title: "Looking Forward",
      icon: <HiOutlineRocketLaunch />,
      content: "Executing at scale. Growing with intent. Redefining the future of aircraft brokerage across the globe.",
      color: "from-teal-500 to-emerald-600",
    },
  ];

  return (
    <div className="w-full bg-[#0a0a0c] py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-5 mx-auto relative">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Our Story: From Vision to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-tertiary_color bg-clip-text text-transparent">
              Industry Leadership
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto"
          >
            Pivotal moments that shaped Mason Amelia’s evolution into the country's fastest-growing aircraft brokerage.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 -translate-x-1/2" />
          
          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 -translate-x-1/2 origin-top"
            style={{ 
              scaleY,
              filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
            }}
          />

          <div className="space-y-24 md:space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index} 
                isMobile={isMobile} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index, isMobile }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex flex-col items-start ${isMobile ? "pl-12" : isEven ? "md:flex-row md:justify-end" : "md:flex-row-reverse md:justify-end"} md:items-center w-full`}>
      
      {/* Circle/Icon on Line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#1777cb] bg-[#0a0a0c] -translate-x-1/2 z-10 flex items-center justify-center text-white"
      >
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} shadow-[0_0_15px_rgba(23,119,203,0.8)]`} />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ x: isMobile ? 50 : isEven ? 100 : -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full md:w-[45%] p-1`}
      >
        <div className="relative group p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-2xl">
          {/* Year Badge */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 bg-gradient-to-r ${item.color} text-white`}>
            {item.year}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-slate-800 text-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300`}>
              {item.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              {item.title}
            </h3>
          </div>

          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            {item.content}
          </p>

          {/* Decorative Corner Glow */}
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
        </div>
      </motion.div>

      {/* Connector (Desktop Only) */}
      {!isMobile && (
        <div className={`absolute left-1/2 w-[5%] h-[2px] bg-slate-800 -translate-y-1/2 ${isEven ? "translate-x-0" : "-translate-x-full"}`} />
      )}
    </div>
  );
};

export default AboutAmazingTimeline;
