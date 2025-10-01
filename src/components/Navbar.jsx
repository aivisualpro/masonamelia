import React, { useState, useEffect, useRef } from "react";
import SearchBox from "./SearchBox";
import { MdMenu } from "react-icons/md";
import GlassNavbar from "./GlassNavbar";
import { Link, useLocation } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";
import logo from "../../public/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true); // controls slide in/out

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const location = useLocation();

  useEffect(() => {
    lastScrollY.current = window.scrollY || 0;

    const handleScroll = () => {
      const currentY = window.scrollY || 0;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastScrollY.current;

          // Add “scrolled” styling after slight offset
          setScrolled(currentY > 300);

          // At very top: always show
          if (currentY <= 0) {
            setShowNav(true);
          } else {
            // If scrolling down enough and not near top → hide
            if (delta > 3 && currentY > 380) {
              setShowNav(false);
            }
            // If scrolling up even slightly → show
            if (delta < -3) {
              setShowNav(true);
            }
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgShouldBeBlack =
    scrolled ||
    location.pathname === "/blogs" ||
    location.pathname.startsWith("/blog-detail/");

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 w-full z-[9999]",
        "transition-all duration-500 ease-in-out will-change-transform",
        "border-b border-white/10",
        showNav ? "translate-y-0" : "-translate-y-full",
        bgShouldBeBlack
          ? "bg-black/70 backdrop-blur-md shadow-lg"
          : "bg-transparent backdrop-blur-0 shadow-none",
      ].join(" ")}
    >
      <div className="py-4 md:py-1 mx-auto text-white flex items-center justify-between">
        <div className="ms-4 logo z-[9999] group relative">
          <Link to={"/"}>
            <img
              src={
                logo
              }
              className="logo max-w-[250px] h-[50px] md:h-[65px] z-[10]"
              alt="logo"
            />
          </Link>
        </div>

        <GlassNavbar />

        <div className="flex items-center justify-end call-to-action z-[9999] pe-4">
          <div className="hidden md:block">
            <SearchBox />
          </div>
          <div
            className="flex items-center xl:hidden cursor-pointer select-none"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-white me-2 ps-4">MENU</span>
            <MdMenu size={28} color="#fff" />
          </div>
          {isOpen && <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
