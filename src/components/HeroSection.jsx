import React from "react";
import GlassCard from "./GlassCard";
import GlassmorphismCircularCard from "./GlassmorphismCircularCard";
import { FaPlane, FaHandsHelping } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";

const HeroSection = () => {
  const cards = [
    {
      title: "Sell My Plane",
      tagline: "Aircraft Brokerage Services",
      link: "/brokerage",
      icon: (
        <FaPlane
          size={36}
          color="#111218"
          className="bg-tertiary_color p-2 rounded-[50%]"
        />
      ),
    },
    {
      title: "Help Me Buy",
      tagline: "Acquisition Services",
      link: "/acquisition",
      icon: (
        <FaUsers
          size={36}
          color="#111218"
          className="bg-tertiary_color p-2 rounded-[50%]"
        />
      ),
    },
    {
      title: "Valuation",
      tagline: "Real-Time Insights By SkyNet",
      link: "/skynet",
      icon: (
        <FiTrendingUp
          size={36}
          color="#111218"
          className="bg-tertiary_color p-2 rounded-[50%]"
        />
      ),
    },
    {
      title: "Ancillary",
      tagline: "Legal • Sales Tax • Insurance",
      link: "/ancillary",
      icon: (
        <FaHandsHelping
          size={36}
          color="#111218"
          className="bg-tertiary_color p-2 rounded-[50%]"
        />
      ),
    },
  ];

  return (
    <div
      className="
    w-full h-full md:h-[90vh] lg:h-[85vh] xl:h-[89vh]
    flex justify-center
    relative p-0 bg-[#111218]/50 md:bg-transparent
    md:backdrop-blur-none backdrop-blur-[4px]
  "
    >
      <div className="container z-10 px-6 md:py-0 py-10">
        <div className="hero_section_content_container flex flex-col xl:gap-0 justify-end md:h-[100vh] relative text-white my-auto">
          <div className="order-1">
            <GlassCard />
          </div>

          <div className="order-2 w-full justify-between md:mb-6 mt-8 md:mt-6">
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
                className={`h-full glass-content w-full flex flex-col md:flex-row flex-wrap md:flex-nowrap md:py-4 py-0`}
              >
                {cards.map((card, index) => (
                  <div key={index} className="w-full md:w-[25%] relative px-2 mb-4 md:mb-0">
                    <GlassmorphismCircularCard
                      title={card.title}
                      tagline={card.tagline}
                      link={card.link}
                      icon={
                         React.cloneElement(card.icon, {
                             className: `bg-tertiary_color p-2 rounded-[50%]`
                         })
                      }
                      customClasses="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
