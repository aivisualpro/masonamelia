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
        <div className="hero_section_content_container flex flex-col xl:gap-0 justify-end md:h-[100vh] relative text-white my-auto">
          <div className="md:order-1 order-1">
            <GlassCard />
          </div>
          <div className="md:flex hidden sm:order-2 order-2 w-full justify-between md:mb-6 mt-6">
            <div
              className={`glass-container w-full`}
              style={{ borderRadius: "5px" }}
            >
              <div
                className="glass-filter md:block hidden"
                style={{ backdropFilter: "blur(10px)" }}
              ></div>
              <div className="glass-overlay md:block hidden"></div>
              <div className="glass-specular md:block hidden"></div>
              <div
 
                className={`h-full glass-content w-full flex-wrap md:flex-nowrap md:py-4 py-0`}
              >
                <div className="w-full md:w-[33%] relative">
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
                <div className="w-full md:w-[33%] relative">
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
                <div className="w-full md:w-[33%] relative">
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
                <div className="w-full md:w-[33%] relative">
                  <GlassmorphismCircularCard
                    title="Ancillary"
                    tagline="Legal • Sales Tax • Insurance"
                    link="/ancillary"
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
          <div className="md:hidden flex sm:order-2 order-2 w-full justify-between md:mb-12 mt-8">
            <div
              className={`w-full`}
              style={{ borderRadius: "5px" }}
            >
              <div
                className={`h-full w-full flex-wrap md:flex-nowrap md:py-4 py-0`}
              >
                <div className="w-full md:w-[33%] relative mb-8">
                  <GlassmorphismCircularCard
                    title="Sell My Plane"
                    tagline="Aircraft Brokerage Services"
                    link="/brokerage"
                    icon={
                      <FaPlane
                        size={36}
                        color="#111218"
                        className="bg-tertiary_color p-2 -mt-[50px] rounded-[50%]"
                      />
                    }
                    customClasses="w-full"
                  />
                </div>
                <div className="w-full md:w-[33%] relative mb-8">
                  <GlassmorphismCircularCard
                    title="Help Me Buy"
                    tagline="Acquisition Services"
                    link="/acquisition"
                    icon={
                      <FaUsers
                        size={36}
                        color="#111218"
                        className="bg-tertiary_color p-2 -mt-[50px] rounded-[50%]"
                      />
                    }
                    customClasses="w-full"
                  />
                </div>
                <div className="w-full md:w-[33%] relative mb-8">
                  <GlassmorphismCircularCard
                    title="Valuation"
                    tagline="Real-Time Insights By SkyNet"
                    link="/skynet"
                    icon={
                      <FiTrendingUp
                        size={36}
                        color="#111218"
                        className="bg-tertiary_color p-2 -mt-[50px] rounded-[50%]"
                      />
                    }
                    customClasses="w-full"
                  />
                </div>
                <div className="w-full md:w-[33%] relative mb-8">
                  <GlassmorphismCircularCard
                    title="Ancillary"
                    tagline="Legal • Sales Tax • Insurance"
                    link="/ancillary"
                    icon={
                      <FaHandsHelping
                        size={36}
                        color="#111218"
                        className="bg-tertiary_color p-2 -mt-[50px] rounded-[50%]"
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
