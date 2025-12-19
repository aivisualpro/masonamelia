import React from "react";
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

  const scrollContainer = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    /* 1. Relative wrapper to contain the sticky/absolute arrows */
    <div className="relative w-full flex items-center group">
      
      {/* Left Arrow - Fixed to the left edge */}
      <button
        onClick={() => scrollContainer("left")}
        className="absolute left-1 z-20 flex xl:hidden items-center justify-center w-6 h-6 text-white rounded-full shadow-lg transition-all"
        aria-label="Scroll Left"
      >
        <AiOutlineLeft size={16} />
      </button>

      {/* 2. Main Scroll Container */}
      <div
        ref={containerRef}
        style={styles.navContainer}
        className="tabs-scroll flex flex-nowrap items-center w-full overflow-x-auto scroll-smooth no-scrollbar px-10 xl:p-3"
      >
        {/* Filter Toggle */}
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
            /* 3. Added flex-shrink-0 to ensure tab doesn't squash */
            className="relative flex-shrink-0 justify-center mx-auto px-4 py-2 cursor-pointer select-none transition-colors duration-200"
            style={{ color: activeTab === "all" ? "white" : "#aaa" }}
          >
            {activeTab === "all" && (
              <motion.div
                layoutId="highlight"
                style={styles.highlight}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xs xl:text-base font-medium">All</span>
          </div>
        )}

        {/* Categories */}
        {categories.map((tab) => (
          <div
            key={tab.slug}
            onClick={() => setActiveTab(tab.slug)}
            /* 3. Added flex-shrink-0 here as well */
            className="relative flex-shrink-0 mx-auto px-4 py-2 cursor-pointer select-none transition-colors duration-200"
            style={{ color: activeTab === tab.slug ? "white" : "#aaa" }}
          >
            {activeTab === tab.slug && (
              <motion.div
                layoutId="highlight"
                style={styles.highlight}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xs xl:text-base font-medium">
              {tab?.name}
            </span>
          </div>
        ))}
      </div>

      {/* Right Arrow - Fixed to the right edge */}
      <button
        onClick={() => scrollContainer("right")}
        className="absolute right-1 z-20 flex xl:hidden items-center justify-center w-6 h-6 text-white rounded-full shadow-lg transition-all"
        aria-label="Scroll Right"
      >
        <AiOutlineRight size={16} />
      </button>
    </div>
  );
}

const styles = {
  navContainer: {
    margin: "0 auto",
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