import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaHandshake, FaUsers, FaChartLine, FaRegStar, FaPlane } from "react-icons/fa";
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

  // Plane position along the line
  const planeTranslateY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timelineData = [
    {
      title: "2004 | Aviation Begins",
      icon: <FaRegStar />,
      content: "After honorable enlisted military service, Jesse began flight training and quickly progressed through CFI, CFII, and MEI ratings.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "2007–2012 | Airlines and Entrepreneurship",
      icon: <FaJetFighterUp />,
      content: "Jesse flew regional jets for Republic Airways while simultaneously pursuing entrepreneurial ventures, building discipline as a pro pilot, alongside business acumen.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "2012–2015 | Business Foundation",
      icon: <FaUsers />,
      content: "Jesse joined his brothers at Sagacious Consultants, helping scale the firm to a successful acquisition by Accenture – but never stopped flying.",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "2018 | Founded",
      icon: <HiOutlineSparkles />,
      content: "Initially a spin-off of the Adams brothers’ entrepreneurial success, Mason Amelia was created as a professional services firm and business consultancy. As the company began recruiting for aviation sales organizations, a clear opportunity emerged...",
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "2019–2023 | Brokerage Mastery",
      icon: <HiOutlineRocketLaunch />,
      content: "Nearly five years at the world’s largest Cirrus focused brokerage gave Jesse exposure to high volume global transactions across piston and owner flown turbine aircraft, completing more than 200 deals.",
      color: "from-rose-500 to-orange-600",
    },
    {
      title: "2023 | Strategic Refocus",
      icon: <FaHandshake />,
      content: "Jesse founded Mason Amelia as a modern aircraft brokerage, combining data, elevated marketing, and grit. Within six months, the first team members were hired and remain core to the firm today.",
      color: "from-orange-500 to-amber-600",
    },
    {
      title: "2024 | Rapid Growth",
      icon: <FaChartLine />,
      content: "Mason Amelia became one of the fastest growing aircraft brokerages in the country, reshaping how owner flown aircraft are marketed and sold.",
      color: "from-amber-500 to-yellow-600",
    },
    {
      title: "2025 | SkyNet Launch",
      icon: <HiOutlineCpuChip />,
      content: "The launch of SkyNet formalized Mason Amelia’s data driven valuation approach, bringing greater clarity and precision to the market.",
      color: "from-yellow-500 to-teal-600",
    },
    {
      title: "2026 | Looking Forward",
      icon: <HiOutlineRocketLaunch />,
      content: "Executing at scale. Growing with intent. Redefining the future of aircraft brokerage across the globe.",
      color: "from-teal-500 to-emerald-600",
    },
  ];

  return (
    <div className="w-full relative py-32 bg-[#050507] overflow-hidden" ref={containerRef}>
      {/* --- AVIATION TECH BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animated HUD Grid */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 80px 80px, 80px 80px"
          }} 
        />
        
        {/* Radar Sweeps */}
        <RadarSweep />

        {/* Floating Coordinates & HUD Elements */}
        {!isMobile && (
          <>
            <HUDText text="N 34.0522°" top="15%" left="5%" />
            <HUDText text="W 118.2437°" top="18%" left="5%" />
            <HUDText text="ALT 35,000 FT" top="40%" right="5%" />
            <HUDText text="IAS 450 KTS" top="43%" right="5%" />
            <HUDText text="HDG 090°" bottom="15%" left="8%" />
          </>
        )}

        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container px-5 mx-auto relative z-10">
        <div className="text-center mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-[3rem] xl:text-6xl font-bold text-white mb-8 tracking-tight"
          >
            Our Story: From Vision to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-tertiary_color bg-clip-text text-transparent">
              Industry Leadership
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white text-base md:text-lg max-w-4xl mx-auto pt-[40px] font-light leading-relaxed"
          >
            Pivotal moments that shaped Mason Amelia’s evolution, from entrepreneurial roots to becoming the country's fastest-growing aircraft brokerage.
          </motion.p>
        </div>

        <div className="relative">
          {/* Main Flight Path Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* Animated Flight Progress Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-[3px] bg-gradient-to-b from-blue-500 via-indigo-500 to-tertiary_color -translate-x-1/2 origin-top"
            style={{ 
              scaleY,
              filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))"
            }}
          />

          {/* THE PLANE ICON following the scroll */}
          <motion.div
            className="absolute left-4 md:left-1/2 z-50 -translate-x-1/2"
            style={{ 
              top: planeTranslateY,
              rotate: 180 
            }}
          >
            <div className="relative flex flex-col items-center">
               <FaPlane className="text-2xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
               <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent opacity-50 absolute bottom-full" />
            </div>
          </motion.div>

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

/* --- AVIATION SUB-COMPONENTS --- */

const RadarSweep = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/10 rounded-full z-0 pointer-events-none"
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2 bg-gradient-to-t from-transparent to-blue-500/30 origin-bottom" />
  </motion.div>
);

const HUDText = ({ text, top, bottom, left, right }) => (
  <div 
    className="absolute font-mono text-[10px] text-blue-500/40 tracking-tighter z-0"
    style={{ top, bottom, left, right }}
  >
    {text}
  </div>
);

const TimelineItem = ({ item, index, isMobile }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex flex-col items-start ${isMobile ? "pl-12" : isEven ? "md:flex-row md:justify-end" : "md:flex-row-reverse md:justify-end"} md:items-center w-full`}>
      
      {/* Waypoint Indicator */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute left-4 md:left-1/2 w-6 h-6 md:w-10 md:h-10 border border-white/20 bg-[#050507] -translate-x-1/2 z-10 flex items-center justify-center transform rotate-45"
      >
        <div className={`w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r ${item.color} transform rotate-[-45deg] shadow-[0_0_15px_rgba(59,130,246,0.6)]`} />
      </motion.div>

      {/* Content Flight Card */}
      <motion.div
        initial={{ 
          x: isMobile ? 30 : isEven ? 60 : -60, 
          opacity: 0,
          rotateY: isEven ? -5 : 5
        }}
        whileInView={{ 
          x: 0, 
          opacity: 1, 
          rotateY: 0
        }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full md:w-[45%] p-0.5 group`}
      >
        <div className="relative p-6 rounded-lg bg-white/[0.01] backdrop-blur-3xl border border-white/10 transition-all duration-500 group-hover:border-blue-500/40 group-hover:bg-blue-500/[0.03] shadow-2xl overflow-hidden">
          
          {/* HUD Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-colors group-hover:border-blue-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 transition-colors group-hover:border-blue-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 transition-colors group-hover:border-blue-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-colors group-hover:border-blue-400" />

          {/* Icon & Title */}
          <div className="flex items-center gap-6 mb-6">
            <div className={`p-3 rounded-md bg-white/5 text-2xl text-blue-400 border border-white/5 group-hover:border-blue-500/30 transition-all duration-500 shadow-inner`}>
              {item.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-blue-300 transition-colors">
              {item.title}
            </h3>
          </div>

          <p className="text-white text-base font-light font-sans leading-relaxed">
            {item.content}
          </p>
        </div>
      </motion.div>

      {/* Vector Line (Desktop Only) */}
      {!isMobile && (
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`absolute left-1/2 w-[5%] h-[1px] bg-blue-500/20 -translate-y-1/2 origin-left ${isEven ? "translate-x-0" : "-translate-x-full rotate-180"}`} 
        />
      )}
    </div>
  );
};

export default AboutAmazingTimeline;
