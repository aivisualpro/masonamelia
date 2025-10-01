// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { cn } from "../../lib/utils"; // assumes `clsx` + `tailwind-merge` utility

// const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }) => {
//   const containerRef = useRef(null);
//   const scrollerRef = useRef(null);
//   const [start, setStart] = useState(false);

//   useEffect(() => {
//     addAnimation();
//   }, []);

//   const addAnimation = () => {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);

//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         if (scrollerRef.current) {
//           scrollerRef.current.appendChild(duplicatedItem);
//         }
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   };

//   const getDirection = () => {
//     if (containerRef.current) {
//       containerRef.current.style.setProperty(
//         "--animation-direction",
//         direction === "left" ? "forwards" : "reverse"
//       );
//     }
//   };

//   const getSpeed = () => {
//     if (containerRef.current) {
//       const duration =
//         speed === "fast" ? "20s" : speed === "normal" ? "40s" : "100s";
//       containerRef.current.style.setProperty("--animation-duration", duration);
//     }
//   };

//   // 

//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "scroller relative z-20 overflow-hidden",
//         className
//       )}
//     >
//       <ul
//         ref={scrollerRef}
//         className={cn(
//           "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
//           start && "animate-scroll",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//         {items?.map((item, idx) => (
//           <div className="glass-container flex items-center justify-center glass-container--rounded md:px-4 md:py-3">
//             <div className="glass-filter"></div>
//             <div className="glass-overlay"></div>
//             <div className="glass-specular"></div>

//             <div className="glass-content glass-content--inline justify-center" style={{
//               padding: "1rem 0"
//             }} >
//               <li
//                 key={idx}
//                 className="relative w-[350px] max-w-full shrink-0 rounded-2xl px-4 md:px-8 py-0 md:py-6 md:w-[450px]"
//               >
//                 <blockquote>
//                   <div
//                     aria-hidden="true"
//                     className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
//                   ></div>
//                   <span className="relative z-20 text-[13px] md:text-[16px] leading-[1.6] font-normal text-[#ddd] dark:text-gray-100">
//                     {item.review?.slice(0, 250) + "..."}
//                   </span>
//                   <div className="relative z-20 mt-6 flex flex-row items-center justify-center">
//                     <span className="flex flex-col gap-1">
//                       <span className="text-[1.1rem] leading-[1.6] font-normal text-[#ddd] dark:text-gray-400">
//                         {item.name}
//                       </span>
//                       <span className="text-[1.1rem] leading-[1.6] font-normal text-[#ddd] dark:text-gray-400">
//                         {item.location}
//                       </span>
//                     </span>
//                   </div>
//                 </blockquote>
//               </li>
//             </div>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default InfiniteMovingCards;


"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

/** hovered card ko viewport (container) ke andar fully visible banaye */
function ensureVisible(cardEl, viewportEl, hoverMv) {
  if (!cardEl || !viewportEl) return;
  const margin = 24; // thoda gutter
  const viewRect = viewportEl.getBoundingClientRect();
  const cardRect = cardEl.getBoundingClientRect();

  let delta = 0;
  // left side se bahar → right shift (+)
  if (cardRect.left < viewRect.left + margin) {
    delta = viewRect.left + margin - cardRect.left;
  }
  // right side se bahar → left shift (-)
  else if (cardRect.right > viewRect.right - margin) {
    delta = viewRect.right - margin - cardRect.right;
  }

  if (delta !== 0) {
    hoverMv.set(hoverMv.get() + delta);
  }
}

const InfiniteMovingCards = ({
  items = [],
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);  // <- viewport
  const rowRef = useRef(null);        // <- UL we animate with marquee
  const [start, setStart] = useState(false);

  // hover nudge (same feel as your video tiles)
  const hoverX = useSpring(0, { stiffness: 200, damping: 30, bounce: 0 });

  // har card ka ref store
  const cardRefs = useRef([]);

  useEffect(() => {
    // sirf CSS vars set; DOM cloning remove kar diya
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

  // events like video tiles
  const handleEnter = (idx) => {
    const el = cardRefs.current[idx];
    ensureVisible(el, containerRef.current, hoverX); // <- compare to viewport
  };
  const handleLeave = () => hoverX.set(0);

  // marquee loop: items ko 2x render kar do taa ke handlers sab par hon
  const loopItems = items.concat(items);

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 overflow-hidden", className)}
    >
      {/* hoverX poori row ko nudge karta hai */}
      <motion.div style={{ x: hoverX }}>
        <ul
          ref={rowRef}
          className={cn(
            "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {loopItems.map((item, idx) => (
            <div
              key={`card-${idx}`}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="glass-container flex items-center justify-center glass-container--rounded md:px-4 md:py-3"
              onMouseEnter={() => handleEnter(idx)}
              onMouseLeave={handleLeave}
            >
              <div className="glass-filter" />
              <div className="glass-overlay" />
              <div className="glass-specular" />

              <div
                className="glass-content glass-content--inline justify-center overflow-hidden"
                style={{ padding: "1rem 0" }}
              >
                <li className="relative w-[350px] max-w-full shrink-0 rounded-2xl px-4 md:px-8 py-0 md:py-6 md:w-[450px]">
                  <blockquote>
                    <div
                      aria-hidden="true"
                      className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                    />
                    <span className="relative z-20 text-[13px] md:text-[16px] leading-[1.6] font-normal text-[#ddd] dark:text-gray-100">
                      {(item.review ?? "").slice(0, 250) + "..."}
                    </span>
                    <div className="relative z-20 mt-6 flex flex-row items-center justify-center">
                      <span className="flex flex-col gap-1">
                        <span className="text-[1.1rem] leading-[1.6] font-normal text-[#ddd] dark:text-gray-400">
                          {item.name}
                        </span>
                        <span className="text-[1.1rem] leading-[1.6] font-normal text-[#ddd] dark:text-gray-400">
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
  );
};

export default InfiniteMovingCards;
