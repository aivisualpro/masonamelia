// import React from "react";
// import { FaSearch } from "react-icons/fa";

// const SearchBox = () => {
//   return (
//     <div className="
//     ">
//       {/* SVG filter definition */}
//       <svg style={{ display: "none" }}>
//         <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
//           <feTurbulence
//             type="fractalNoise"
//             baseFrequency="0.008 0.008"
//             numOctaves="2"
//             seed="92"
//             result="noise"
//           />
//           <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
//           <feDisplacementMap
//             in="SourceGraphic"
//             in2="blurred"
//             scale="70"
//             xChannelSelector="R"
//             yChannelSelector="G"
//           />
//         </filter>
//       </svg>

//       <div className="container py-4 md:flex hidden justify-center">
//         <div className="glass-container glass-container--rounded py-1" style={{ borderRadius: "5px" }}>
//           <div className="glass-filter"></div>
//           <div className="glass-overlay"></div>
//           <div className="glass-specular"></div>

//           <div className="glass-content glass-content--inline justify-center">
//             <div className="flex items-center w-full">
//               {/* Input */}
//               <input
//                 type="text"
//                 placeholder="Search Jets"
//                 className="flex-grow bg-transparent outline-none text-white placeholder-white/70"
//               />

//               {/* Button */}
//               <button className="w-10 h-10 flex items-center justify-center rounded-full bg-tertiary_color hover:bg-tertiary_color/80 transition">
//                 <FaSearch className="text-white" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBox;



import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

/** Typewriter placeholder hook + blinking cursor */
function useTypewriterPlaceholder(
  words,
  {
    typeSpeed = 90,
    deleteSpeed = 60,
    holdBeforeDelete = 1200,
    holdBeforeType = 500,
    cursorBlinkMs = 500,
  } = {}
) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting
  const [cursorOn, setCursorOn] = useState(true);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  const currentWord = useMemo(
    () => words[indexRef.current % words.length],
    [words]
  );

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), cursorBlinkMs);
    return () => clearInterval(id);
  }, [cursorBlinkMs]);

  // Type / delete machine
  useEffect(() => {
    const clear = () => timeoutRef.current && clearTimeout(timeoutRef.current);

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeoutRef.current = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          typeSpeed
        );
      } else {
        timeoutRef.current = setTimeout(
          () => setPhase("holding"),
          holdBeforeDelete
        );
      }
    } else if (phase === "holding") {
      timeoutRef.current = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(
          () => setText(currentWord.slice(0, text.length - 1)),
          deleteSpeed
        );
      } else {
        indexRef.current = (indexRef.current + 1) % words.length;
        timeoutRef.current = setTimeout(() => setPhase("typing"), holdBeforeType);
      }
    }

    return clear;
  }, [
    text,
    phase,
    currentWord,
    typeSpeed,
    deleteSpeed,
    holdBeforeDelete,
    holdBeforeType,
  ]);

  return { text, cursorOn };
}

const SearchBox = () => {
  // Apne 3 words yahan set karein:
  const { text, cursorOn } = useTypewriterPlaceholder(
    ["TBM 910", "N910ER", "Pilatus PC-12"],
    {
      typeSpeed: 125,
      deleteSpeed: 125,
      holdBeforeDelete: 1000,
      holdBeforeType: 400,
      cursorBlinkMs: 500,
    }
  );

  // Cursor character (change if you want: '|', '▍', '▋', '▏')
  const cursorChar = "|";
  const placeholder =
    (text ? `${text}${cursorOn ? cursorChar : " "}` : "Search");

  return (
    <div className="">
      {/* SVG filter definition */}
      <svg style={{ display: "none" }}>
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="container py-4 md:flex hidden justify-center">
        <div
          className="glass-container glass-container--rounded py-1"
          style={{ borderRadius: "5px" }}
        >
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>

          <div className="glass-content glass-content--inline justify-center">
            <div className="flex items-center w-full">
              {/* Input */}
              <input
                type="text"
                placeholder={placeholder || "Search"}
                className="flex-grow bg-transparent outline-none text-white placeholder-white/70"
                autoComplete="off"
                aria-label="Search jets"
              />

              {/* Button */}
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-tertiary_color hover:bg-tertiary_color/80 transition">
                <FaSearch className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

