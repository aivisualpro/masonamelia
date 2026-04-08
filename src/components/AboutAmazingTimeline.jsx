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
      content: "Nearly five years at the world’s largest Cirrus focused brokerage gave Jesse exposure to high volume global transactions across piston and owner-flown turbine aircraft, completing more than 200 deals.",
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
      content: "Mason Amelia became one of the fastest growing aircraft brokerages in the country, reshaping how owner-flown aircraft are marketed and sold.",
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
    <div className="w-full relative py-32 bg-[#050507] overflow-hidden perspective-[2000px]" ref={containerRef}>
      {/* --- AVIATION TECH BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* 1. SCROLLING HUD GRID (Simulates Flight Movement) */}
        <motion.div 
          className="absolute inset-0 opacity-[0.06]" 
          animate={{ 
            backgroundPosition: ["0px 0px", "0px 80px"] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ 
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 80px 80px, 80px 80px"
          }} 
        />
        
        {/* 2. VERTICAL SPEED LINES (Sense of Altitude/Speed) */}
        <SpeedLines count={15} />

        {/* 3. DYNAMIC RADAR SWEEPS */}
        <RadarSweep />

        {/* 4. COCKPIT VIGNETTE (Immersive Feel) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] opacity-80 z-10" />

        {/* Floating Coordinates & HUD Elements */}
        {!isMobile && (
          <>
            <HUDText text="N 34.0522°" top="15%" left="5%" />
            <HUDText text="W 118.2437°" top="18%" left="5%" />
            <HUDText text="ALT 35,000 FT" top="40%" right="5%" />
            <HUDText text="IAS 450 KTS" top="43%" right="5%" />
            <HUDText text="HDG 090°" bottom="15%" left="8%" />
            
            {/* New: Scanning Horizon Line */}
            <motion.div 
              className="absolute left-0 right-0 h-[1px] bg-blue-500/20"
              style={{ top: '50%' }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </>
        )}

        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container px-5 mx-auto relative z-20">
        <div className="text-center mb-32 relative">
          {/* Decorative Flight Brackets */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
          

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
               {/* Engine Wash effect */}
               <div className="absolute top-0 w-8 h-8 bg-blue-500/20 blur-xl rounded-full" />
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

const SpeedLines = ({ count }) => {
  const lines = useMemo(() => Array.from({ length: count }), [count]);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {lines.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: -100,
            height: Math.random() * 300 + 200, // random length
          }}
          animate={{
            y: ["0vh", "150vh"],
          }}
          transition={{
            duration: Math.random() * 2 + 0.5, // fast speed (0.5s - 2.5s)
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const RadarSweep = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] opacity-[0.15] pointer-events-none">
     {/* Outer Ring */}
    <div className="absolute inset-0 border border-blue-500/20 rounded-full" />
    
    {/* Inner Target Ring */}
    <div className="absolute inset-[25%] border border-blue-500/10 rounded-full border-dashed" />
    
    {/* CROSSHAIRS */}
    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-blue-500/10" />
    <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-blue-500/10" />

    {/* Spinning Sweep */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 z-0 origin-center"
    >
      <div className="absolute top-1/2 left-1/2 w-[50%] h-[2px] bg-gradient-to-r from-blue-500/0 to-blue-500/40 origin-left" />
    </motion.div>
  </div>
);

const HUDText = ({ text, top, bottom, left, right }) => (
  <div 
    className="absolute font-mono text-[10px] text-blue-500/50 tracking-widest z-0 px-2 py-1 border border-blue-500/10 bg-blue-900/5 backdrop-blur-[1px]"
    style={{ top, bottom, left, right }}
  >
    {text}
  </div>
);

const TimelineItem = ({ item, index, isMobile }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex flex-col items-start ${isMobile ? "pl-12" : isEven ? "md:flex-row md:justify-end" : "md:flex-row-reverse md:justify-end"} md:items-center w-full`}>
      
      {/* Waypoint Indicator - Rotating & Pulsing */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute left-4 md:left-1/2 w-6 h-6 md:w-8 md:h-8 border border-white/20 bg-[#050507] -translate-x-1/2 z-10 flex items-center justify-center transform rotate-45 shadow-[0_0_10px_rgba(0,0,0,0.8)]"
      >
         <div className="w-full h-full absolute top-0 left-0 border border-blue-500/30 animate-ping opacity-20" />
         <div className={`w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r ${item.color} shadow-[0_0_15px_rgba(59,130,246,0.8)]`} />
      </motion.div>

      {/* Content Flight Card */}
      <motion.div
        initial={{ 
          x: isMobile ? 30 : isEven ? 60 : -60, 
          opacity: 0, 
          // 3D tilt effect on enter
          rotateX: 15,
        }}
        whileInView={{ 
          x: 0, 
          opacity: 1, 
          rotateX: 0
        }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full md:w-[45%] p-0.5 group perspective-1000`}
      >
        <div className="relative p-7 rounded-none clip-path-polygon bg-white/[0.02] backdrop-blur-xl border-l-[1px] border-white/10 transition-all duration-500 group-hover:bg-blue-900/[0.1] shadow-2xl overflow-hidden hover:border-l-blue-400">
          
          {/* Tech lines decoration */}
          <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-white/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-blue-500/30" />
          
          {/* Active Status Light */}
          <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />

          {/* Icon & Title */}
          <div className="flex items-center gap-5 mb-5">
            <div className={`p-2.5 rounded-none bg-white/5 text-xl text-blue-400 border border-white/10 group-hover:border-blue-500/30 transition-all duration-500`}>
              {item.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-[#268ae0] transition-colors">
              {item.title}
            </h3>
          </div>

          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
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
          className={`absolute left-1/2 w-[5%] h-[1px] bg-blue-500/30 -translate-y-1/2 origin-left ${isEven ? "translate-x-0" : "-translate-x-full rotate-180"}`} 
        />
      )}
    </div>
  );
};

export default AboutAmazingTimeline;
