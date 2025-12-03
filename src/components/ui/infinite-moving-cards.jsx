"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

/** hovered card ko viewport (container) ke andar fully visible banaye */
function ensureVisible(cardEl, viewportEl, hoverMv) {
  if (!cardEl || !viewportEl) return;
  const margin = 24; // thoda gutter
  const viewRect = viewportEl.getBoundingClientRect();
  const cardRect = cardEl.getBoundingClientRect();

  let delta = 0;
  if (cardRect.left < viewRect.left + margin) {
    delta = viewRect.left + margin - cardRect.left;
  } else if (cardRect.right > viewRect.right - margin) {
    delta = viewRect.right - margin - cardRect.right;
  }

  if (delta !== 0) {
    hoverMv.set(hoverMv.get() + delta);
  }
}

/** FULLSCREEN MODAL rendered in <body> */
const TestimonialModal = ({ item, onClose }) => {
  if (!item) return null;
  if (typeof document === "undefined") return null;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // return () => {
    //   document.body.style.overflow = prev;
    // };
  }, []);

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="testimonial-modal relative mx-4 max-h-[600px] overflow-y-scroll max-w-2xl w-full rounded-2xl bg-tertiary_color text-white p-6 md:p-8 shadow-2xl border border-white/10"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
            >
              <FiX />
            </button>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <FiBookOpen className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item?.name}</h3>
                <p className="text-sm text-blue-100/80">{item?.location}</p>
              </div>
            </div>

            <p className="text-sm md:text-base leading-relaxed text-blue-50/90 whitespace-pre-line">
              {item?.review}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const InfiniteMovingCards = ({
  items = [],
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null); // viewport for marquee
  const rowRef = useRef(null);
  const [start, setStart] = useState(false);

  // hover offset (Framer spring)
  const hoverX = useSpring(0, { stiffness: 200, damping: 30, bounce: 0 });
  const cardRefs = useRef([]);

  const [activeItem, setActiveItem] = useState(null);

  // poori row ke liye hover state
  const [isRowHovered, setIsRowHovered] = useState(false);
  // ek hover session mein sirf pehle card ko adjust karna
  const [lockedIndex, setLockedIndex] = useState(null);
  // row se bahar nikalne ke baad x reset karte waqt bhi animation pause rehni chahiye
  const [isResettingX, setIsResettingX] = useState(false);

  useEffect(() => {
    setDirectionVar();
    setSpeedVar();
    setStart(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDirectionVar = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const setSpeedVar = () => {
    if (!containerRef.current) return;
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "100s";
    containerRef.current.style.setProperty("--animation-duration", duration);
  };

  // container level hover → marquee pause
  const handleContainerEnter = () => {
    setIsRowHovered(true);
    setLockedIndex(null); // naya hover session
  };

  const handleContainerLeave = () => {
    // yahan hum pehle hoverX ko 0 pe wapas laa rahe hain
    // iss dauran marquee STILL paused rahegi
    setIsResettingX(true);
    hoverX.set(0);

    // thoda sa wait (spring ko settle hone do), phir marquee resume
    const timeout = setTimeout(() => {
      setIsResettingX(false);
      setIsRowHovered(false);
      setLockedIndex(null);
    }, 220); // spring transition ~0.2s upar set hai

    // cleanup
    return () => clearTimeout(timeout);
  };

  // card per enter → sirf ek hi baar ensureVisible chale
  const handleCardEnter = (idx) => {
    if (lockedIndex !== null && lockedIndex !== idx) return;
    const el = cardRefs.current[idx];
    ensureVisible(el, containerRef.current, hoverX);
    setLockedIndex(idx);
  };

  const openModal = (item) => setActiveItem(item);
  const closeModal = () => {
    document.body.style.overflow = "scroll";
    setActiveItem(null);
  };

  const loopItems = items.concat(items);

  const shouldPauseAnimation =
    pauseOnHover && (isRowHovered || isResettingX);

  return (
    <>
      <div
        ref={containerRef}
        className={cn("scroller relative z-20 overflow-hidden", className)}
        onMouseEnter={handleContainerEnter}
        onMouseLeave={handleContainerLeave}
      >
        {/* hoverX sirf viewport offset ke liye use ho raha */}
        <motion.div style={{ x: hoverX }}>
          <ul
            ref={rowRef}
            className={cn(
              "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
              start && "animate-scroll",
              shouldPauseAnimation && "[animation-play-state:paused]"
            )}
          >
            {loopItems.map((item, idx) => (
              <div
                key={`card-${idx}`}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="relative group flex items-center justify-center glass-container--rounded md:px-2"
                onMouseEnter={() => handleCardEnter(idx)}
              >
                {/* READ ICON – slide down on hover */}
                <button
                  type="button"
                  onClick={() => openModal(item)}
                  className="absolute top-6 z-[999] hover:bg-tertiary_color hover:text-white right-6 flex items-center justify-center rounded-full bg-white/90 text-sky-600 shadow-md p-2 opacity-0 -translate-y-3
                             transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <FiBookOpen className="text-[18px]" />
                </button>

                <div>
                  <li className="relative w-[325px] max-w-full pt-8 rounded-[50px] px-4 md:px-8 py-0 md:py-6 md:w-[450px] h-[300px] bg-black/30">
                    <blockquote className="pt-2">
                      <div
                        aria-hidden="true"
                        className="user-select-none pointer-events-none flex flex-col justify-center "
                      />
                      <span className="relative z-20 text-[13px] md:text-[16px] leading-[1.6] font-normal text-[#ddd] dark:text-gray-100">
                        {(item.review ?? "").slice(0, 250)}
                        {item.review && item.review.length > 250 && "…"}
                      </span>
                      <div className="relative z-20 mt-6">
                        <span className="flex flex-col">
                          <span className="text-sm md:text-[1.1rem] leading-[1.6] font-normal text-[#ddd] dark:text-gray-400">
                            {item.name}
                          </span>
                          <span className="text-sm md:text-[1.1rem] leading-[1.6] font-normal text-[#ddd] dark:text-gray-400">
                            {item.location}
                          </span>
                        </span>
                      </div>
                    </blockquote>
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* FULLSCREEN MODAL INSIDE BODY */}
      <TestimonialModal item={activeItem} onClose={closeModal} />
    </>
  );
};

export default InfiniteMovingCards;
