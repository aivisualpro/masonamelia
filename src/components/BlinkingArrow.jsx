import React from "react";

const BlinkingArrow = ({ onClick }) => {
  return (
    <button
      aria-label="Scroll down"
      onClick={onClick}
      className="
        absolute left-[46%] md:left-1/2 -translate-x-1/2 bottom-6
        inline-flex items-center justify-center
        rounded-full h-[2rem] w-[2rem] md:w-12 md:h-12
        border border-white/30 bg-black/30 backdrop-blur
        hover:bg-black/50 transition
        animate-bounce
        shadow-[0_0_20px_rgba(255,255,255,0.15)]
        z-[9999]
      "
    >
      {/* simple chevron down */}
      <span
        className="block w-3 h-3 border-b-2 border-r-2 rotate-45"
        style={{ borderColor: "white" }}
      />
    </button>
  );
};

export default BlinkingArrow;
