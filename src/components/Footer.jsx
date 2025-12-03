import React from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaMapMarker,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../public/logoIcon.png";
import veterenLogo from "/images/veteren.png"

const Footer = () => {
  return (
    <footer className="bg-[#15161c] py-4 relative px-4">
      <div className="container px-5">
        <div className="flex md:flex-row flex-col items-center justify-between gap-6">
          {/* Logo Section */}
          <div className="md:order-first order-second md:w-[33.3%] flex flex-col justify-center md:items-start items-center gap-4">
            <div className="social-icons flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/masonamelia/"
                target="_blank"
              >
                <FaLinkedinIn
                  size={24}
                  className="text-white hover:text-blue-400 cursor-pointer transition"
                />
              </a>
              <a
                href="https://www.facebook.com/masonamelia.aviation"
                target="_blank"
              >
                <FaFacebookF
                  size={24}
                  className="text-white hover:text-blue-400 cursor-pointer transition"
                />
              </a>
              <a
                href="https://www.instagram.com/masonamelia.aircraftsales/"
                target="_blank"
              >
                <FaInstagram
                  size={24}
                  className="text-white hover:text-pink-400 cursor-pointer transition"
                />
              </a>
              <a
                href="https://www.youtube.com/c/lookingforhigher"
                target="_blank"
              >
                <FaYoutube
                  size={24}
                  className="text-white hover:text-red-500 cursor-pointer transition"
                />
              </a>
            </div>
            <a href="mailto:info@masonamelia.com" className="text-white lg:max-w-lg text-start md:text-justify">
              info@masonamelia.com
            </a>
          </div>

          <div className="md:order-second order-first md:w-[33.3%] flex flex-col md:items-center items-start justify-center">
            <Link to={"/"}>
              <img
                src={logo}
                className=" object-contain h-16"
                alt=""
              />
            </Link>
            {/* <p className="mt-8 text-white lg:max-w-lg text-start md:text-justify">
              Mason Amelia delivers advanced aviation services with precision,
              reliability, and innovation across the U.S. Proudly veteran-owned,
              we are committed to excellence in every flight and every client
              relationship.
            </p> */}
          </div>

          <div className="md:w-[33.3%] gap-4 flex flex-col md:items-end items-center justify-center">
            {/* Principal Office */}
            <div>
              <img
                src={veterenLogo}
                alt="Veteran Owned"
                className="max-w-[150px]"
              />
            </div>
            <p className="text-white md:order-1 order-2 text-sm md:text-base text-start">
              © 2025 Mason Amelia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
