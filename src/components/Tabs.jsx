import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GoFilter } from "react-icons/go";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Tabs({
  categories,
  activeTab,
  setActiveTab,
  isAllTab = true,
  showFilterToggle = false,
  isFilterOpen = true,
  onToggleFilter = () => {},
}) {
  const containerRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position and update arrow states
  const updateScrollState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      updateScrollState();
      container.addEventListener("scroll", updateScrollState);
      window.addEventListener("resize", updateScrollState);
      return () => {
        container.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }
  }, [categories]);

  const scrollContainer = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    /* Outer wrapper with arrows outside */
    <div className="relative w-full flex items-center gap-2">
      
      {/* Left Arrow - Glass style, outside container */}
      <button
        onClick={() => scrollContainer("left")}
        disabled={!canScrollLeft}
        className={`flex-shrink-0 z-20 flex xl:hidden items-center justify-center w-8 h-8 rounded-full shadow-lg transition-all active:scale-90 ${
          canScrollLeft 
            ? "text-white bg-white/10 backdrop-blur-md hover:bg-white/20" 
            : "text-white/30 bg-white/5 cursor-not-allowed"
        }`}
        aria-label="Scroll Left"
      >
        <AiOutlineLeft size={16} />
      </button>

      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        style={styles.navContainer}
        className="tabs-scroll flex flex-1 flex-nowrap items-center overflow-x-auto scroll-smooth no-scrollbar px-2 md:px-3 py-1"
      >
        {/* Filter Toggle - Desktop only */}
        {showFilterToggle && (
          <div
            onClick={onToggleFilter}
            className="relative hidden xl:flex items-center gap-2 flex-shrink-0 px-4 py-2 cursor-pointer"
            style={{ color: "white" }}
          >
            <motion.div
              layoutId="filterHighlight"
              className="absolute inset-0 rounded-[50px] border"
              style={{ borderColor: isFilterOpen ? "#49a8fc" : "#2d2f39" }}
            />
            <GoFilter className="relative z-10" />
            <span className="relative z-10 text-sm xl:text-base">
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </span>
          </div>
        )}

        {/* All Tab */}
        {isAllTab && (
          <div
            onClick={() => setActiveTab("all")}
            className="relative flex-shrink-0 justify-center px-3 md:px-4 py-2 cursor-pointer select-none transition-colors duration-200"
            style={{ color: activeTab === "all" ? "white" : "#aaa" }}
          >
            {activeTab === "all" && (
              <motion.div
                layoutId="highlight"
                style={styles.highlight}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xs md:text-sm xl:text-base font-medium whitespace-nowrap">All</span>
          </div>
        )}

        {/* Categories */}
        {categories.map((tab) => (
          <div
            key={tab.slug}
            onClick={() => setActiveTab(tab.slug)}
            className="relative flex-shrink-0 px-3 md:px-4 py-2 cursor-pointer select-none transition-colors duration-200"
            style={{ color: activeTab === tab.slug ? "white" : "#aaa" }}
          >
            {activeTab === tab.slug && (
              <motion.div
                layoutId="highlight"
                style={styles.highlight}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xs md:text-sm xl:text-base font-medium whitespace-nowrap">
              {tab?.name}
            </span>
          </div>
        ))}
      </div>

      {/* Right Arrow - Glass style, outside container */}
      <button
        onClick={() => scrollContainer("right")}
        disabled={!canScrollRight}
        className={`flex-shrink-0 z-20 flex xl:hidden items-center justify-center w-8 h-8 rounded-full shadow-lg transition-all active:scale-90 ${
          canScrollRight 
            ? "text-white bg-white/10 backdrop-blur-md hover:bg-white/20" 
            : "text-white/30 bg-white/5 cursor-not-allowed"
        }`}
        aria-label="Scroll Right"
      >
        <AiOutlineRight size={16} />
      </button>
    </div>
  );
}

const styles = {
  navContainer: {
    borderRadius: "50px",
    background: "#171921",
    // Hide scrollbar but keep functionality
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "50px",
    background: "#000",
    border: "1px solid #49a8fc",
    zIndex: 0,
  },
};