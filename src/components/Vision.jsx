import React from "react";
import { FaRegHandshake, FaRegPlayCircle, FaRocket } from "react-icons/fa";
import Button from "./Button";
import { motion } from "framer-motion";
import vision from "/images/higher/vision_new.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import FlowFieldBackground from "./ui/FlowFieldBackground";

const GlowingCardSection = ({ title, subtitle, body1, body2 }) => {
  const media = useMediaQuery("(max-width: 767px)");

  const vTitle = title || 'Looking for Higher on YouTube';
  const vSubtitle = subtitle || "When you partner with Mason Amelia, you're not just getting a brokerage—you’re getting a full-service, marketing-driven strategy to maximize visibility and find the right buyer.";
  const vBody1 = body1 || "At Mason Amelia, we're more than brokers; we're storytellers. While there are many brokers out there, few live truer to the aviation lifestyle than our founder, Jesse Adams, who started the YouTube channel, Looking for Higher, which now serves as Mason Amelia's video marketing platform. On the channel, you will find insights on the true experience of aircraft ownership from transitioning into a turbine to the freedom of flying family across the country.";
  const vBody2 = body2 || "Every video we create tells the unique story of each aircraft we represent, bringing its personality and capabilities to life in ways that resonate with prospective buyers. This storytelling approach is powerful and essential in today’s market, where a listing alone doesn’t cut it. If Your Broker Isn’t Crafting a Marketing Plan as Compelling as the Aircraft Itself, They’re Not Truly Selling It";

  return (
    <section className="py-24 z-[0] relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Flow Field Background */}
      <div className="absolute inset-0 z-0">
        <FlowFieldBackground 
          color="#268AE0" 
          particleCount={800} 
          trailOpacity={0.1}
          speed={0.8}
        />
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-[#000] z-[1]"></div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}>
      </div>
      <div className="container relative z-[10] px-5 text-center px-4 gap-8 flex flex-col items-center justify-center h-full">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-5xl mx-auto"
         >
          <h2 className="text-white text-[2rem] md:text-[56px] font-bold mb-4 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {vTitle}
          </h2>
          
          <p className="text-tertiary_color text-lg md:text-[20px] font-medium mb-12 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {vSubtitle}
          </p>
          <p className="text-gray-300 text-lg md:text-[20px] font-light leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {vBody1}
          </p>
          <p className="text-gray-300 text-lg md:text-[20px] font-light leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {vBody2}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GlowingCardSection;
