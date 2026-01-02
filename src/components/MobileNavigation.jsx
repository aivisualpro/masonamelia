import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark } from "react-icons/fa6";

const MobileNavigation = ({ isOpen, setIsOpen }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleAccordion = (panel) => {
    setExpanded((prev) => (prev === panel ? null : panel));
  };

  const location = useLocation();

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  const closeButtonVariants = {
    hidden: { opacity: 0, rotate: -90, scale: 0.5 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { delay: 0.3, type: "spring", stiffness: 200 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[9999998]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
          />

          {/* Glass Menu Panel */}
          <motion.div
            className="fixed top-0 left-0 w-full h-screen z-[9999999] overflow-y-auto"
            style={{
              background: "linear-gradient(135deg, rgba(17, 18, 24, 0.85) 0%, rgba(30, 58, 95, 0.9) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="nav-menus flex-col flex gap-6 p-8 pt-6">
              {/* Close Button */}
              <motion.div
                className="flex items-center justify-end"
                variants={closeButtonVariants}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
                >
                  <FaXmark size={22} color="#fff" />
                </button>
              </motion.div>

              {/* Menu Items */}
              <motion.div variants={itemVariants}>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={`${location.pathname === "/" ? "text-tertiary_color" : "text-white"} uppercase text-lg font-medium hover:text-tertiary_color transition duration-200 block py-2`}
                >
                  Home
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/showroom"
                  onClick={() => setIsOpen(false)}
                  className={`${location.pathname === "/showroom" || location.pathname.includes("showroom") ? "text-tertiary_color" : "text-white"} uppercase text-lg font-medium hover:text-tertiary_color transition duration-200 block py-2`}
                >
                  Showroom
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/acquisition"
                  onClick={() => setIsOpen(false)}
                  className={`${location.pathname === "/acquisition" ? "text-tertiary_color" : "text-white"} uppercase text-lg font-medium hover:text-tertiary_color transition duration-200 block py-2`}
                >
                  Acquisition
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/brokerage"
                  onClick={() => setIsOpen(false)}
                  className={`${location.pathname === "/brokerage" ? "text-tertiary_color" : "text-white"} uppercase text-lg font-medium hover:text-tertiary_color transition duration-200 block py-2`}
                >
                  Brokerage
                </Link>
              </motion.div>

              {/* About Accordion */}
              <motion.div variants={itemVariants} className="text-white">
                <div
                  className={`${location.pathname === "/about" || location.pathname === "/team" || location.pathname === "/higher" ? "text-tertiary_color" : "text-white"} uppercase text-lg font-medium cursor-pointer flex items-center py-2`}
                  onClick={() => toggleAccordion("about")}
                >
                  <Link to="/about" onClick={() => setIsOpen(false)}>ABOUT MA</Link>
                  <motion.span
                    className="ms-4 text-xl"
                    animate={{ rotate: expanded === "about" ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </div>
                <motion.div
                  className="flex flex-col gap-3 mt-2 overflow-hidden"
                  initial={false}
                  animate={{
                    height: expanded === "about" ? "auto" : 0,
                    opacity: expanded === "about" ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Link
                    to="/team"
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 text-base ps-4 hover:text-tertiary_color relative flex items-center gap-2"
                  >
                    <span className="w-2 h-[1px] bg-white/60"></span> Meet The Team
                  </Link>
                  <Link
                    to="/higher"
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 text-base ps-4 hover:text-tertiary_color relative flex items-center gap-2"
                  >
                    <span className="w-2 h-[1px] bg-white/60"></span> Looking For Higher
                  </Link>
                  <Link
                    to="/#testimonial"
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 text-base ps-4 hover:text-tertiary_color relative flex items-center gap-2"
                  >
                    <span className="w-2 h-[1px] bg-white/60"></span> Testimonials
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/skynet"
                  onClick={() => setIsOpen(false)}
                  className={`${location.pathname === "/skynet" ? "text-tertiary_color" : "text-white"} uppercase text-lg font-medium hover:text-tertiary_color transition duration-200 block py-2`}
                >
                  Skynet
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="uppercase text-lg font-medium text-white hover:text-tertiary_color transition duration-200 block py-2"
                >
                  Contact
                </Link>
              </motion.div>

              {/* Decorative element */}
              <motion.div
                className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                variants={itemVariants}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;

