import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { GoFilter } from "react-icons/go";

export default function Tabs({
  categories,
  activeTab,
  setActiveTab,
  isAllTab = true,
  // NEW:
  showFilterToggle = false,
  isFilterOpen = true,
  onToggleFilter = () => {},
}) {
  const location = useLocation();

  return (
    <>
      <div
        style={styles.navContainer}
        className={`gap-[12px] md:gap-[24px] tabs-scroll w-full ${
          location.pathname !== "/showroom" ? "flex flex-row flex-wrap" : "flex flex-row flex-wrap"
        }`}
      >
        {/* FILTER pill at the very start */}
        {showFilterToggle && (
          <div
            onClick={onToggleFilter}
            style={{
              ...styles.tab,
              color: "white",
              position: "relative",
              paddingLeft: 14,
              paddingRight: 14,
            }}
            className="relative hidden xl:flex items-center gap-2"
          >
            <motion.div
              layoutId="filterHighlight"
              className="absolute inset-0 rounded-[50px] border"
              style={{ borderColor: isFilterOpen ? "#49a8fc" : "#2d2f39" }}
            />
            <GoFilter className="relative z-10" />
            <span className="relative z-10">{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
          </div>
        )}

        {isAllTab && (
          <div
            onClick={() => setActiveTab("all")}
            style={{ ...styles.tab, color: activeTab === "all" ? "white" : "#aaa" }}
            className="w-[40%] mx-2 md:w-auto text-center text-xs xl:text-base"
          >
            {activeTab === "all" && (
              <motion.div
                layoutId="highlight"
                style={styles.highlight}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>All</span>
          </div>
        )}

        {categories.map((tab) => (
          <div
            key={tab.slug}
            onClick={() => setActiveTab(tab.slug)}
            style={{ ...styles.tab, color: activeTab === tab.slug ? "white" : "#aaa" }}
            className={`md:w-auto text-center text-xs xl:text-base ${
              location.pathname !== "/showroom" ? "w-[40%] mx-2" : "w-[40%] mx-2"
            }`}
          >
            {activeTab === tab.slug && (
              <motion.div
                layoutId="highlight"
                style={styles.highlight}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-full"
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{tab?.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  navContainer: {
    display: "flex",
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    borderRadius: "50px",
    background: "#171921",
  },
  tab: {
    position: "relative",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "50px",
    userSelect: "none",
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: "50px",
    background: "#000",
    border: "1px solid #49a8fc",
    zIndex: 0,
  },
};

