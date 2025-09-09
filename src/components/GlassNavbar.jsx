// import React, { useState, useRef, useEffect } from "react";
// import "../glass.css";
// import { Link } from "react-router-dom";
// import Dropdown from "./Dropdown";

// const CLOSE_MS = 300; // match with CSS animation duration

// const GlassNavbar = () => {
//   const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'about' | null
//   const [isClosing, setIsClosing] = useState(false);
//   const closeTimerRef = useRef(null);

//   const startClose = () => {
//     if (!activeDropdown) return;
//     if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
//     setIsClosing(true);
//     closeTimerRef.current = setTimeout(() => {
//       setActiveDropdown(null);
//       setIsClosing(false);
//       closeTimerRef.current = null;
//     }, CLOSE_MS);
//   };

//   const cancelClose = () => {
//     if (closeTimerRef.current) {
//       clearTimeout(closeTimerRef.current);
//       closeTimerRef.current = null;
//     }
//     setIsClosing(false);
//   };

//   const openDropdown = (menu) => {
//     cancelClose();
//     setActiveDropdown(menu);
//   };

//   useEffect(() => {
//     return () => {
//       if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
//     };
//   }, []);

//   return (
//     <div className="fixed w-full z-[9999] xl:block hidden left-1/2 -translate-x-1/2">
//       {/* SVG filter definitions */}
//       <svg style={{ display: "none" }}>
//         <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
//           <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
//           <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
//           <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
//         </filter>
//       </svg>

//       {/* Wrapper (no enter/leave handlers now) */}
//       <div className="relative container flex justify-center">
//         {/* NAV BAR */}
//         <div
//           className="glass-container flex items-center justify-center glass-container--rounded px-4 py-3"
//           style={{ borderRadius: "5px" }}
//         >
//           <div className="glass-filter" style={{ filter: "url(#lg-dist)" }} />
//           <div className="glass-overlay" />
//           <div className="glass-specular" />

//           <div className="glass-content glass-content--inline justify-center">
//             <nav className="nav-menus">
//               <ul className="flex items-center justify-center gap-8 relative">
//                 <li>
//                   <Link to="/showroom" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
//                     Showroom
//                   </Link>
//                 </li>

//                 <li>
//                   <Link to="/acquisition" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
//                     Acquisition
//                   </Link>
//                 </li>

//                 <li>
//                   <Link to="/brokerage" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
//                     Brokerage
//                   </Link>
//                 </li>

//                 <li>
//                   <Link to="/skynet" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
//                     Skynet
//                   </Link>
//                 </li>

//                 {/* Hover to open "About" */}
//                 <li
//                   onMouseEnter={() => openDropdown("about")}
//                   onMouseLeave={startClose} // ⬅️ About se cursor hatega to close timer start
//                 >
//                   <Link
//                     to="/about"
//                     className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color"
//                   >
//                     About MA +
//                   </Link>
//                 </li>

//                 <li>
//                   <Link to="/contact" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>

//         {/* 🔒 HOVER-BRIDGE: fills tiny gap between About and dropdown to avoid accidental close */}
//         {activeDropdown && (
//           <div className="absolute left-0 right-0 top-full h-3" />
//         )}

//         {/* DROPDOWN */}
//         {activeDropdown && (
//           <div className="absolute top-[130%] mt-3 left-[62%] -translate-x-1/2">
//             <Dropdown
//               items={
//                 activeDropdown === "services"
//                   ? [
//                       { text: "Acquisition", link: "/acquisition" },
//                       { text: "Brokerage", link: "/brokerage" },
//                     ]
//                   : [
//                       { text: "Meet The Team", link: "/team" },
//                       { text: "Looking For Higher", link: "/higher" },
//                       { text: "Testimonials", link: "/testimonial" },
//                     ]
//               }
//               className=""
//               isClosing={isClosing}
//               onMouseEnter={cancelClose} // ⬅️ dropdown par aate hi close cancel
//               onMouseLeave={startClose}  // ⬅️ dropdown se bahar nikalte hi band
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GlassNavbar;

import React, { useState, useRef, useEffect } from "react";
import "../glass.css";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const CLOSE_MS = 300; // match with CSS animation duration

const GlassNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'about' | null
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef(null);

  const startClose = () => {
    if (!activeDropdown) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, CLOSE_MS);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsClosing(false);
  };

  const openDropdown = (menu) => {
    cancelClose();
    setActiveDropdown(menu);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full z-[9999] xl:block hidden ">
      {/* SVG filter definitions */}
      <svg style={{ display: "none" }}>
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Wrapper that contains NAV + hover-bridge + DROPDOWN */}
      <div
        className="relative container flex justify-center"
        onMouseEnter={cancelClose}
        onMouseLeave={startClose}
      >
        {/* NAV BAR */}
        <div
          className="glass-container flex items-center justify-center glass-container--rounded px-4 py-3"
          style={{ borderRadius: "5px" }}
        >
          <div className="glass-filter" style={{ filter: "url(#lg-dist)" }} />
          <div className="glass-overlay" />
          <div className="glass-specular" />

          <div className="glass-content glass-content--inline justify-center">
            <nav className="nav-menus">
              <ul className="flex items-center justify-center gap-8 relative">
                <li onMouseEnter={startClose}>
                  <Link to="/showroom" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
                    Showroom
                  </Link>
                </li>

                <li onMouseEnter={startClose}>
                  <Link to="/acquisition" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
                    Acquisition
                  </Link>
                </li>

                <li onMouseEnter={startClose}>
                  <Link to="/brokerage" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
                    Brokerage
                  </Link>
                </li>

                <li onMouseEnter={startClose}>
                  <Link to="/skynet" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
                    Skynet
                  </Link>
                </li>

                {/* Hover to open "About" */}
                <li
                  onMouseEnter={() => openDropdown("about")}
                >
                  <Link
                    to="/about"
                    className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color"
                  >
                    About MA
                  </Link>
                </li>

                <li onMouseEnter={startClose}>
                  <Link to="/contact" className="uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* 🔒 HOVER-BRIDGE: fills small gap between nav and dropdown so mouseleave won't trigger early */}
        {activeDropdown && (
          <div
            className="absolute left-0 right-0 top-full h-3" // h-3 (~12px) bridge
            // bridge sits right below nav; no handlers needed, it inherits wrapper's events
          />
        )}

        {/* DROPDOWN */}
        {activeDropdown && (
          <div className="absolute top-[130%] mt-3 left-[62%] -translate-x-1/2">
            <Dropdown
              items={
                activeDropdown === "services"
                  ? [
                      { text: "Acquisition", link: "/acquisition" },
                      { text: "Brokerage", link: "/brokerage" },
                    ]
                  : [
                      { text: "Meet The Team", link: "/team" },
                      { text: "Looking For Higher", link: "/higher" },
                      { text: "Testimonials", link: "/testimonial" },
                    ]
              }
              className="" // center under navbar; adjust if you need left offset
              isClosing={isClosing}
              // Ensures staying open while hovered
              onMouseEnter={cancelClose}
              onMouseLeave={startClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlassNavbar;
