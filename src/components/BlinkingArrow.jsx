import React from "react";

const BlinkingArrow = () => {
  return (
    <button
      aria-label="Scroll down"
      onClick={() => {
        const next = document.getElementById("acquisition");
        const targetY = next
          ? next.getBoundingClientRect().top + window.scrollY
          : bannerRef.current?.offsetHeight || 0;
        smoothScrollTo(targetY, 2500);
        sessionStorage.setItem(AUTO_KEY, "1");
        setShowArrow(false);
      }}
      className="
              absolute left-1/2 -translate-x-1/2 bottom-6
              inline-flex items-center justify-center
              rounded-full w-12 h-12
              border border-white/30 bg-black/30 backdrop-blur
              hover:bg-black/50 transition
              animate-bounce
              shadow-[0_0_20px_rgba(255,255,255,0.15)]
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
