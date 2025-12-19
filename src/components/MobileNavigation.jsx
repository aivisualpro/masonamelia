import React, { useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaXmark } from "react-icons/fa6";

const MobileNavigation = ({ isOpen, setIsOpen }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleAccordion = (panel) => {
    setExpanded((prev) => (prev === panel ? null : panel));
  };

  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-screen bg-primary_theme z-[9999999]
        transition-all duration-500 ease-in-out
        ${isOpen ? "translate-y-0 overflow-y-auto" : "-translate-y-full"}
      `}
    >
      <div className="nav-menus flex-col flex gap-8 p-8">
        <div className="flex items-center justify-end">
          <FaXmark onClick={() => setIsOpen(false)} size={22} color="#fff" />
        </div>

        <Link
          to="/"
          className="uppercase text-lg hover:text-tertiary_color transition duration-50 mt-8"
        >
          Home
        </Link>
        <Link
          to="/showroom"
          className="uppercase text-lg hover:text-tertiary_color transition duration-50"
        >
          Showroom
        </Link>
        <Link
          to="/acquisition"
          className="uppercase text-lg hover:text-tertiary_color transition duration-50"
        >
          Acquisition
        </Link>
        <Link
          to="/brokerage"
          className="uppercase text-lg hover:text-tertiary_color transition duration-50"
        >
          Brokerage
        </Link>

        {/* <div className="text-white">
          <div
            className="uppercase text-xl cursor-pointer flex items-center"
            onClick={() => toggleAccordion("services")}
          >
            <span>Services</span>
            <span className="ms-4 transition-transform duration-300">
              {expanded === "services" ? "-" : "+"}
            </span>
          </div>
          <div
            className={`flex flex-col gap-2 mt-2 transition-all duration-300 overflow-hidden ${
              expanded === "services" ? "max-h-40" : "max-h-0"
            }`}
          >
            <Link
              to="/acquisition"
              className="text-white text-base ps-4 hover:text-tertiary_color relative"
            >
              <span className="w-2 h-[1px] bg-white absolute top-1/2 left-0"></span> Acquisition
            </Link>
            <Link
              to="/brokerage"
              className="text-white text-base ps-4 hover:text-tertiary_color relative"
            >
              <span className="w-2 h-[1px] bg-white absolute top-1/2 left-0"></span> Brokerage
            </Link>
          </div>
        </div> */}

        <div className="text-white">
          <div
            className="uppercase text-lg cursor-pointer flex items-center"
            onClick={() => toggleAccordion("about")}
          >
            <Link to="/about">ABOUT MA</Link>
            <span className="ms-4 transition-transform duration-300">
              {expanded === "about" ? "-" : "+"}
            </span>
          </div>
          <div
            className={`flex flex-col gap-2 mt-2 transition-all duration-300 overflow-hidden ${
              expanded === "about" ? "max-h-40" : "max-h-0"
            }`}
          >
            <Link
              to="/team"
              className="text-white text-base ps-4 hover:text-tertiary_color relative"
            >
              <span className="w-2 h-[1px] bg-white absolute top-1/2 left-0"></span> Meet The Team
            </Link>
            <Link
              to="/higher"
              className="text-white text-base ps-4 hover:text-tertiary_color relative"
            >
              <span className="w-2 h-[1px] bg-white absolute top-1/2 left-0"></span> Looking For Higher
            </Link>
            <Link
              to="/#testimonial"
              className="text-white text-base ps-4 hover:text-tertiary_color relative"
            >
              <span className="w-2 h-[1px] bg-white absolute top-1/2 left-0"></span> Testimonials
            </Link>
          </div>
        </div>
        
        <Link
          to="/skynet"
          className="uppercase text-lg hover:text-tertiary_color transition duration-50"
        >
          Skynet
        </Link>


        <Link
          to="/#contact"
          className="uppercase text-lg hover:text-tertiary_color transition duration-50"
        >
          Contact
        </Link>
        {/* <Link
          to="/blogs"
          className="uppercase text-lg hover:text-tertiary_color transition duration-50"
        >
          Blogs
        </Link> */}
      </div>
    </div>
  );
};

export default MobileNavigation;
