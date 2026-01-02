// export default React.memo(Card);

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const categoryGradients = {
  acquired: ["from-[#ff0000]", "to-[#fc6262]"],
  "coming-soon": ["from-[#3b82f6]", "to-[#7eb0fc]"],
  "for-sale": ["from-[#3b82f6]", "to-[#7eb0fc]"],
  "off-market": ["from-[#3b82f6]", "to-[#7eb0fc]"],
  "sale-pending": ["from-[#3b82f6]", "to-[#7eb0fc]"],
  sold: ["from-[#ff0000]", "to-[#fc6262]"],
  wanted: ["from-[#3b82f6]", "to-[#7eb0fc]"],
};

const Card = ({ detail, currentTab }) => {
  let status = (detail?.status || "").toLowerCase();

  // If status is missing but we have a specific tab active, fallback to that tab's slug
  if (!status && currentTab && currentTab !== "all") {
    status = currentTab;
  }

  const gradient = categoryGradients[status] || [
    "from-[#ff8a41]",
    "to-[#fca168]",
  ];

  // sanitize overview (HTML string from server)
  const overviewHTML = useMemo(() => {
    const html = detail?.overview || "";
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  }, [detail?.overview]);

  const ribbonText = (status || "for-sale")
    .split("-")
    .map((w) => String(w).toUpperCase())
    .join(" ");

  const imgSrc = detail?.featuredImage || "";

  return (
    <Link to={`/showroom/${detail?._id}`} className="group block h-full">
      <motion.div
        className="relative h-full flex flex-col bg-[#1A1C24] rounded-2xl border border-white/5 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-white/10 hover:-translate-y-1"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Ribbon */}
        <div
          className={`absolute top-5 -right-12 w-40 text-center rotate-45 bg-gradient-to-r ${gradient[0]} ${gradient[1]} text-white text-[0.7rem] font-bold py-1.5 shadow-lg z-10 tracking-wider`}
        >
          {ribbonText}
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden w-full aspect-video bg-[#1A1C24] flex items-center justify-center">
          <img
            src={imgSrc}
            alt={detail?.title || "aircraft"}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {/* Subtle Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C24] to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-grow p-5 gap-3 items-center text-center">
          {/* Title */}
          <div className="w-full">
            <div className="h-[44px] flex items-center justify-center w-full mb-1">
              <h5 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-tertiary_color transition-colors duration-300">
                {detail?.title}
              </h5>
            </div>
            
            {/* Price */}
            <div>
              <span className="text-tertiary_color font-semibold text-lg tracking-wide">
                {typeof detail?.price === "number" ? (
                  detail.price === 0 ? (
                    <span className="text-sm uppercase tracking-wider text-white/60">Call For Price</span>
                  ) : (
                    `$${detail.price.toLocaleString()}`
                  )
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/5 my-1"></div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 mt-auto w-full">
             {/* Year */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#1E2026] to-[#13141A] border border-white/5 shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
               <span className="text-[0.65rem] uppercase tracking-widest text-white/40 mb-1">Year</span>
               <span className="text-white font-bold text-base tracking-wide">
                  {detail?.year ?? "-"}
               </span>
            </div>

            {/* Airframe */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#1E2026] to-[#13141A] border border-white/5 shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
              <span className="text-[0.65rem] uppercase tracking-widest text-white/40 mb-1">Airframe</span>
              <span className="text-white font-bold text-base tracking-wide">
                {detail?.airframe ?? "-"}
              </span>
            </div>

            {/* Engine */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#1E2026] to-[#13141A] border border-white/5 shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
              <span className="text-[0.65rem] uppercase tracking-widest text-white/40 mb-1">Engine</span>
               <div className="flex items-center gap-1">
                <span className="text-white font-bold text-base tracking-wide">
                  {detail?.engine ?? "-"}
                </span>
                {detail?.engineTwo && (
                  <>
                    <span className="text-white/40 text-xs">/</span>
                    <span className="text-white font-bold text-base tracking-wide">
                      {detail?.engineTwo}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default React.memo(Card);
