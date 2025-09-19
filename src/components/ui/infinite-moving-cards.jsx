"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "../../lib/utils"; // assumes `clsx` + `tailwind-merge` utility

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "100s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  // 

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items?.map((item, idx) => (
          <div className="glass-container flex items-center justify-center glass-container--rounded md:px-4 md:py-3">
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>

            <div className="glass-content glass-content--inline justify-center" style={{
              padding: "1rem 0"
            }} >
              <li
                key={idx}
                className="relative w-[350px] max-w-full shrink-0 rounded-2xl px-4 md:px-8 py-0 md:py-6 md:w-[450px]"
              >
                <blockquote>
                  <div
                    aria-hidden="true"
                    className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                  ></div>
                  <span className="relative z-20 text-[13px] md:text-[16px] leading-[1.6] font-normal text-[#ddd] dark:text-gray-100">
                    {item.review?.slice(0, 250) + "..."}
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
    </div>
  );
};

export default InfiniteMovingCards;
