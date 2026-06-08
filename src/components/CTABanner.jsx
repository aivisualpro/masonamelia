import React from "react";
import Button from "./Button";
import fallbackBanner from "/images/cta-banner.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContact } from "../hooks/useContactQuery";

const CTABanner = ({ isButton = true, lines }) => {
  const media = useMediaQuery("(max-width: 768px)");
  const { data: contact } = useContact();

  // Dynamic background image — falls back to local asset
  const bgImage = contact?.cta_bg_image || fallbackBanner;

  // If `lines` prop is provided, render the new 3-line CTA layout
  const hasCustomLines = lines && lines.length > 0;

  // Legacy fallback (global CTA text)
  const ctaTitle = contact?.cta_title || "Get Started Today";
  const ctaTextWhite = contact?.cta_text_white || "Ready to connect and acquire the";
  const ctaTextBlue = contact?.cta_text_blue || "aircraft of your dreams?";

  return (
    <>
      <div
        className={`text-white bg-[#111218] md:h-full ${isButton ? "" : "pb-10"} text-center rounded-[30px] ${
          media ? "bg-[#171921] px-4" : ""
        }`}
        style={{
          backgroundImage: !media ? `url(${bgImage})` : ``,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {hasCustomLines ? (
          <>
            {/* 3-line CTA layout */}
            <div className="pt-10 pb-4 space-y-3">
              {lines.map((line, i) => (
                <h2
                  key={i}
                  className="text-[1.6rem] md:text-4xl sm:text-5xl font-bold leading-snug italic"
                >
                  {line.white}{" "}
                  <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                    {line.blue}
                  </span>
                </h2>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Legacy global CTA layout */}
            <h2 className="text-sm uppercase mb-4 text-gray-400 pt-10">
              {ctaTitle}
            </h2>
            <h1 className="text-[1.6rem] md:text-4xl sm:text-6xl font-bold leading-snug max-w-5xl mx-auto">
              {ctaTextWhite}
              <br />
              <span className="bg-gradient-to-r from-[#1777cb] to-tertiary_color bg-clip-text text-transparent">
                {ctaTextBlue}
              </span>
            </h1>
          </>
        )}

        {/* CTA Button */}
        {isButton && (
          <div className="mt-8 pb-10 flex justify-center">
            <Button buttonLabel="Contact Us" onClick="/#contact" isContact={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default CTABanner;
