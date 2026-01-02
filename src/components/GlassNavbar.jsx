import React, { useState, useRef, useEffect } from "react";
import "../glass.css";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useNavigate, useLocation } from "react-router-dom";

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

  const navigate = useNavigate();
  const location = useLocation();

  const goToContact = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // pass intent to HomePage
      navigate("/", { state: { scrollTo: "contact" } });
    }
  };

  return (
    <div className="w-full z-[9999] xl:block hidden ">
      {/* SVG filter definitions */}
      <svg style={{ display: "none" }}>
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="G"
          />
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
          className="glass-container flex items-center justify-center glass-container--rounded px-3 py-2"
          style={{ borderRadius: "5px" }}
        >
          <div className="glass-filter" style={{ filter: "url(#lg-dist)" }} />
          <div className="glass-overlay" />
          <div className="glass-specular" />

          <div className="glass-content glass-content--inline justify-center">
            <nav className="nav-menus">
              <ul className="flex items-center justify-center gap-8 relative">
                <li onMouseEnter={startClose}>
                  <Link
                    to="/showroom"
                    className={`${
                      location.pathname === "/showroom" || location.pathname.includes("showroom") ? "text-tertiary_color" : ""
                    } uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color`}
                  >
                    Showroom
                  </Link>
                </li>

                <li onMouseEnter={() => openDropdown("services")}>
                  <Link
                    className={`${
                      location.pathname === "/acquisition" || location.pathname === "/brokerage"
                        ? "text-tertiary_color"
                        : ""
                    } uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color`}
                  >
                    Services
                  </Link>
                </li>

                <li onMouseEnter={startClose}>
                  <Link
                    to="/skynet"
                    className={`${
                      location.pathname === "/skynet" ? "text-tertiary_color" : ""
                    } uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color`}
                  >
                    Skynet
                  </Link>
                </li>

                {/* Hover to open "About" */}
                <li onMouseEnter={() => openDropdown("about")}>
                  <Link
                    to="/about"
                    className={`${
                      location.pathname === "/team" || location.pathname === "/higher" || location.pathname === "/about"
                        ? "text-tertiary_color" 
                        : ""
                    }  uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color`}
                  >
                    About MA
                  </Link>
                </li>

                <li onMouseEnter={startClose}>
                  <a
                    href="/#contact"
                    onClick={goToContact}
                    className={`${
                      location.pathname === "/#contact" ? "text-tertiary_color" : ""
                    } uppercase text-[.7rem] xl:text-[.8rem] 2xl:text-[.9rem] font-semibold transition hover:text-tertiary_color`}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* 🔒 HOVER-BRIDGE */}
        {activeDropdown && (
          <div className="absolute left-0 right-0 top-full h-3" />
        )}

        {/* DROPDOWN */}
        {activeDropdown && (
          <div
            className={`absolute ${
              activeDropdown === "about"
                ? "xl:left-[65%] 2xl:left-[60%] -translate-x-1/2 top-[135%]"
                : "left-[47%] -translate-x-1/2 top-[135%]"
            } mt-3 `}
          >
            <Dropdown
              items={
                activeDropdown === "services"
                  ? [
                      { text: "Acquisition", link: "/acquisition" },
                      { text: "Brokerage", link: "/brokerage" },
                      // ✅ navigate to Acquisition and scroll to #service_highlight
                      { text: "Ancillary", link: "/acquisition#service_highlight" },
                    ]
                  : [
                      { text: "Meet The Team", link: "/team" },
                      { text: "Looking For Higher", link: "/higher" },
                      { text: "Testimonials", link: "/#testimonial" },
                    ]
              }
              className=""
              isClosing={isClosing}
              location={location}
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
