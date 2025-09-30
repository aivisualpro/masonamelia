import React from "react";
import GlassCard from "./GlassCard";
import GlassmorphismCircularCard from "./GlassmorphismCircularCard";
import { FaPlane, FaHandsHelping } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";

const HeroSection = () => {
  return (
    <div
      className="
            w-full h-full md:h-[90vh] lg:h-[85vh] xl:h-[89vh]
            flex justify-center
            relative p-0
          "
    >
      <div className="container z-10 px-4">
        <div className="hero_section_content_container flex flex-col xl:gap-0 justify-end md:h-[100vh] relative text-white my-auto py-4">
          <div className="md:order-1 order-2 md:mt-0 mt-4">
            <GlassCard />
          </div>
          <div className="sm:order-2 order-1 w-full flex justify-between md:mb-12 md:mt-8">
            <div
              className={`glass-container w-full`}
              style={{ borderRadius: "5px" }}
            >
              <div
                className="glass-filter"
                style={{ backdropFilter: "blur(10px)" }}
              ></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div
                id="services"
                className={`h-full glass-content w-full flex-wrap md:flex-nowrap md:py-4 py-0`}
              >
                <div className="w-1/2 md:w-[33%] relative">
                  <GlassmorphismCircularCard
                    title="Sell My Plane"
                    tagline="Aircraft Brokerage Services"
                    link="/brokerage"
                    icon={
                      <FaPlane
                        size={36}
                        color="#111218"
                        className="bg-tertiary_color p-2 rounded-[50%]"
                      />
                    }
                    customClasses="w-full"
                  />
                </div>
                <div className="w-1/2 md:w-[33%] relative">
                  <GlassmorphismCircularCard
                    title="Help Me Buy"
                    tagline="Acquisition Services"
                    link="/acquisition"
                    icon={
                      <FaUsers
                        size={36}
                        color="#111218"
                        className="bg-tertiary_color p-2 rounded-[50%]"
                      />
                    }
                    customClasses="w-full"
                  />
                </div>
                <div className="w-1/2 md:w-[33%] relative">
                  <GlassmorphismCircularCard
                    title="Valuation"
                    tagline="Real-Time Insights By SkyNet"
                    link="/skynet"
                    icon={
                      <FiTrendingUp
                        size={36}
                        color="#111218"
                        className="bg-tertiary_color p-2 rounded-[50%]"
                      />
                    }
                    customClasses="w-full"
                  />
                </div>
                <div className="w-1/2 md:w-[33%] relative">
                  <GlassmorphismCircularCard
                    title="Advisory"
                    tagline="Legal • Sales Tax • Insurance"
                    link="/acquisition"
                    icon={
                      <FaHandsHelping
                        size={36}
                        color="#111218"
                        className="bg-tertiary_color p-2 rounded-[50%]"
                      />
                    }
                    customClasses="w-full"
                  />
                </div>
              </div>
            </div>
            {/* 3 Glassmorphism Circular Cards with responsive positions and sizes */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
