// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// /** ---------- config ---------- */
// const API_BASE = import.meta.env.VITE_BASE_URL; // e.g. http://localhost:5000
// const SEARCH_URL = `${API_BASE}/api/aircrafts/lists/search`;

// /** Typewriter placeholder hook + blinking cursor (unchanged) */
// function useTypewriterPlaceholder(
//   words,
//   {
//     typeSpeed = 90,
//     deleteSpeed = 60,
//     holdBeforeDelete = 1200,
//     holdBeforeType = 500,
//     cursorBlinkMs = 500,
//   } = {}
// ) {
//   const [text, setText] = useState("");
//   const [phase, setPhase] = useState("typing");
//   const [cursorOn, setCursorOn] = useState(true);
//   const indexRef = useRef(0);
//   const timeoutRef = useRef(null);

//   const currentWord = useMemo(
//     () => words[indexRef.current % words.length],
//     [words]
//   );

//   useEffect(() => {
//     const id = setInterval(() => setCursorOn((v) => !v), cursorBlinkMs);
//     return () => clearInterval(id);
//   }, [cursorBlinkMs]);

//   useEffect(() => {
//     const clear = () => timeoutRef.current && clearTimeout(timeoutRef.current);

//     if (phase === "typing") {
//       if (text.length < currentWord.length) {
//         timeoutRef.current = setTimeout(
//           () => setText(currentWord.slice(0, text.length + 1)),
//           typeSpeed
//         );
//       } else {
//         timeoutRef.current = setTimeout(
//           () => setPhase("holding"),
//           holdBeforeDelete
//         );
//       }
//     } else if (phase === "holding") {
//       timeoutRef.current = setTimeout(() => setPhase("deleting"), 0);
//     } else if (phase === "deleting") {
//       if (text.length > 0) {
//         timeoutRef.current = setTimeout(
//           () => setText(currentWord.slice(0, text.length - 1)),
//           deleteSpeed
//         );
//       } else {
//         indexRef.current = (indexRef.current + 1) % words.length;
//         timeoutRef.current = setTimeout(
//           () => setPhase("typing"),
//           holdBeforeType
//         );
//       }
//     }

//     return clear;
//   }, [
//     text,
//     phase,
//     currentWord,
//     typeSpeed,
//     deleteSpeed,
//     holdBeforeDelete,
//     holdBeforeType,
//   ]);

//   return { text, cursorOn };
// }

// /** ---------- helpers ---------- */
// const fmtPrice = (n) =>
//   typeof n === "number"
//     ? n.toLocaleString(undefined, {
//         style: "currency",
//         currency: "USD",
//         maximumFractionDigits: 0,
//       })
//     : null;

// const ResultItem = ({ item, onMouseDown }) => {
//   const img = item.featuredImage || item.images?.[0];
//   const cat = item.category?.name || item.category?.slug || "";
//   return (
//     <div
//       className="w-full text-left flex gap-3 p-3 hover:bg-white/5 focus:bg-white/10 transition rounded-md"
//       role="button"
//       tabIndex={0}
//       onMouseDown={onMouseDown} // ⬅ here
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") onMouseDown?.();
//       }}
//     >
//       <div className="w-12 h-12 rounded-md bg-white/5 overflow-hidden shrink-0">
//         {img ? (
//           <img
//             src={img}
//             alt={item.title}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-xs text-white/60">
//             IMG
//           </div>
//         )}
//       </div>
//       <div className="min-w-0">
//         <div className="text-white/90 font-medium truncate">{item.title}</div>
//         <div className="text-xs text-white/60 truncate">
//           {cat ? `${cat} • ` : ""}
//           {item.year ?? "—"}
//           {item.price ? ` • ${fmtPrice(item.price)}` : ""}
//         </div>
//       </div>
//     </div>
//   );
// };

// /** ---------- component ---------- */
// const SearchBox = () => {
//   const navigate = useNavigate();
//   const { text, cursorOn } = useTypewriterPlaceholder(
//     ["TBM 910", "N910ER", "Pilatus PC-12"],
//     {
//       typeSpeed: 125,
//       deleteSpeed: 125,
//       holdBeforeDelete: 1000,
//       holdBeforeType: 400,
//       cursorBlinkMs: 500,
//     }
//   );

//   const cursorChar = "|";
//   const placeholder = text ? `${text}${cursorOn ? cursorChar : " "}` : "Search";

//   const [query, setQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");
//   const [highlight, setHighlight] = useState(-1);

//   const wrapRef = useRef(null);
//   const abortRef = useRef(null);
//   const debounceRef = useRef(null);

//   const MIN_CHARS = 1;
//   const LIMIT = 4;
//   const DEBOUNCE_MS = 350;

//   // click-outside to close
//   useEffect(() => {
//     const onDocClick = (e) => {
//       if (!wrapRef.current) return;
//       if (!wrapRef.current.contains(e.target)) {
//         setOpen(false);
//         setHighlight(-1);
//       }
//     };
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, []);

//   // debounced search
//   useEffect(() => {
//     setError("");
//     setResults([]);

//     if (debounceRef.current) clearTimeout(debounceRef.current);
//     if (abortRef.current) abortRef.current.abort();

//     const q = query.trim();
//     if (q.length < MIN_CHARS) {
//       setLoading(false);
//       return;
//     }

//     debounceRef.current = setTimeout(async () => {
//       try {
//         setLoading(true);
//         setOpen(true);
//         const controller = new AbortController();
//         abortRef.current = controller;

//         const url = `${SEARCH_URL}?q=${encodeURIComponent(
//           q
//         )}`;
//         const res = await fetch(url, { signal: controller.signal });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();

//         setResults(data?.data || []);
//       } catch (e) {
//         if (e.name !== "AbortError") setError("Failed to search");
//       } finally {
//         setLoading(false);
//       }
//     }, DEBOUNCE_MS);

//     return () => {
//       if (debounceRef.current) clearTimeout(debounceRef.current);
//     };
//   }, [query]);

//   const handleSubmit = () => {
//     const q = query.trim();
//     if (!q) return;
//     navigate(`/search?q=${encodeURIComponent(q)}`);
//     setOpen(false);
//   };

//   const handleKeyDown = (e) => {
//     if (!open) return;
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlight((h) => Math.min((h ?? -1) + 1, results.length - 1));
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlight((h) => Math.max((h ?? results.length) - 1, -1));
//     } else if (e.key === "Enter") {
//       if (highlight >= 0 && results[highlight]) {
//         const item = results[highlight];
//         navigate(`/showroom/${item._id}`);
//         setOpen(false);
//       } else {
//         handleSubmit();
//       }
//     } else if (e.key === "Escape") {
//       setOpen(false);
//       setHighlight(-1);
//     }
//   };

//   const Dropdown = (
//     <div
//       className="absolute left-0 right-0 z-[9999] rounded-xl bg-[#0a0f1a]/90 backdrop-blur-md shadow-xl"
//       style={{ top: "calc(100% + 8px)", pointerEvents: "auto" }} // ⬅ sits below box, accepts clicks
//     >
//       {loading && <div className="p-4 text-sm text-white/70">Searching…</div>}
//       {!loading && error && (
//         <div className="p-4 text-sm text-red-300">{error}</div>
//       )}
//       {!loading &&
//         !error &&
//         results.length === 0 &&
//         query.trim().length >= 2 && (
//           <div className="p-4 text-sm text-white/60">No matches</div>
//         )}

//       {!loading && !error && results.length > 0 && (
//         <ul className="search-results max-h-[60vh] overflow-auto p-2" role="listbox">
//           {results.map((item, i) => (
//             <li
//               key={item._id}
//               className={`rounded-md ${highlight === i ? "bg-white/10" : ""}`}
//               onMouseEnter={() => setHighlight(i)}
//               onMouseLeave={() => setHighlight(-1)}
//             >
//               {/* Use onMouseDown so navigation happens before input blur/close */}
//               <ResultItem
//                 item={item}
//                 onMouseDown={() => {
//                   navigate(`/showroom/${item._id}`);
//                   setOpen(false);
//                 }}
//               />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   return (
//     <div className="">
//       {/* SVG filter definition (unchanged) */}
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

//       {/* Desktop */}
//       <div className="container py-4 md:flex hidden justify-center">
//         <div
//           ref={wrapRef}
//           className="search-box-effect relative w-full max-w-2xl"
//         >
//           <div
//             className="glass-container glass-container--rounded py-1 z-[10]"
//             style={{ borderRadius: "5px" }}
//           >
//             <div className="glass-filter"></div>
//             <div className="glass-overlay"></div>
//             <div className="glass-specular"></div>

//             <div className="glass-content glass-content--inline justify-center">
//               <div className="flex items-center w-full">
//                 <input
//                   type="text"
//                   placeholder={placeholder || "Search"}
//                   className="flex-grow bg-transparent outline-none text-white placeholder-white/70 px-3 py-3"
//                   autoComplete="off"
//                   aria-label="Search jets"
//                   value={query}
//                   onChange={(e) => {
//                     setQuery(e.target.value);
//                     setOpen(true);
//                   }}
//                   onFocus={() => setOpen(true)}
//                   onKeyDown={handleKeyDown}
//                 />
//                 <button
//                   type="button" // ensure it never submits if inside a <form> someday
//                   className="w-10 h-10 mr-2 flex items-center justify-center rounded-full bg-tertiary_color hover:bg-tertiary_color/80 transition"
//                   onClick={handleSubmit}
//                   aria-label="Search"
//                 >
//                   <FaSearch className="text-white" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {open && Dropdown}
//         </div>
//       </div>

//       {/* Mobile */}
//       <div className="md:hidden px-4">
//         <div className="relative" ref={wrapRef}>
//           <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
//             <FaSearch className="text-white/70" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="flex-grow bg-transparent outline-none text-white placeholder-white/70"
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setOpen(true);
//               }}
//               onFocus={() => setOpen(true)}
//               onKeyDown={handleKeyDown}
//             />
//           </div>

//           {open && (
//             <div className="absolute left-0 right-0 mt-2 z-[1000] rounded-xl border border-white/10 bg-[#0a0f1a]/95 backdrop-blur-md shadow-xl">
//               {loading && (
//                 <div className="p-3 text-sm text-white/70">Searching…</div>
//               )}
//               {!loading && error && (
//                 <div className="p-3 text-sm text-red-300">{error}</div>
//               )}
//               {!loading &&
//                 !error &&
//                 results.length === 0 &&
//                 query.trim().length >= 2 && (
//                   <div className="p-3 text-sm text-white/60">No matches</div>
//                 )}
//               {!loading && !error && results.length > 0 && (
//                 <ul className="max-h-[60vh] overflow-auto p-2">
//                   {results.map((item) => (
//                     <li key={item._id} className="rounded-md">
//                       <ResultItem
//                         item={item}
//                         onClick={() => {
//                           navigate(`/showroom/${item._id}`);
//                           setOpen(false);
//                         }}
//                       />
//                     </li>
//                   ))}
//                   <li className="pt-1">
//                     <button
//                       onClick={handleSubmit}
//                       className="w-full px-3 py-3 text-center text-sm font-medium rounded-md bg-white/10 hover:bg-white/15 text-white/90"
//                     >
//                       View more results
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBox;


import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/** ---------- config ---------- */
const API_BASE = import.meta.env.VITE_BASE_URL; // e.g. http://localhost:5000
const SEARCH_URL = `${API_BASE}/api/aircrafts/lists/search`;

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
  const [phase, setPhase] = useState("typing");
  const [cursorOn, setCursorOn] = useState(true);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  const currentWord = useMemo(
    () => words[indexRef.current % words.length],
    [words]
  );

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), cursorBlinkMs);
    return () => clearInterval(id);
  }, [cursorBlinkMs]);

  useEffect(() => {
    const clear = () => timeoutRef.current && clearTimeout(timeoutRef.current);

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeoutRef.current = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          typeSpeed
        );
      } else {
        timeoutRef.current = setTimeout(() => setPhase("holding"), holdBeforeDelete);
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

/** ---------- helpers ---------- */
const fmtPrice = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })
    : null;

const ResultItem = ({ item, onMouseDown }) => {
  const img = item.featuredImage || item.images?.[0];
  const cat = item.category?.name || item.category?.slug || "";
  return (
    <div
      className="w-full text-left flex gap-3 p-3 hover:bg-white/5 focus:bg-white/10 transition rounded-md"
      role="button"
      tabIndex={0}
      onMouseDown={onMouseDown}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onMouseDown?.();
      }}
    >
      <div className="w-12 h-12 rounded-md bg-white/5 overflow-hidden shrink-0">
        {img ? (
          <img src={img} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-white/60">
            IMG
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="text-white/90 font-medium truncate">{item.title}</div>
        <div className="text-xs text-white/60 truncate">
          {cat ? `${cat} • ` : ""}
          {item.year ?? "—"}
          {item.price ? ` • ${fmtPrice(item.price)}` : ""}
        </div>
      </div>
    </div>
  );
};

/** ---------- component ---------- */
const SearchBox = () => {
  const navigate = useNavigate();
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

  const cursorChar = "|";
  const placeholder = text ? `${text}${cursorOn ? cursorChar : " "}` : "Search";

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [highlight, setHighlight] = useState(-1);

  const wrapRef = useRef(null);
  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  const MIN_CHARS = 2;
  const LIMIT = 4; // (you can implement server-side or ignore)
  const DEBOUNCE_MS = 350;

  // click-outside to close
  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // debounced search
  useEffect(() => {
    setError("");
    setResults([]);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    const q = query.trim();
    if (q.length < MIN_CHARS) {
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setOpen(true);
        const controller = new AbortController();
        abortRef.current = controller;

        const url = `${SEARCH_URL}?q=${encodeURIComponent(q)}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        setResults(data?.data || []);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to search");
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const goShowroom = (q) => {
    navigate("/showroom", { state: { fromSearch: true, query: q ?? "" } });
    setOpen(false);
  };

  const handleSubmit = () => {
    const q = query.trim();
    // If no query OR no results ⇒ show all aircraft
    if (!q || results.length === 0) {
      goShowroom(q);
      return;
    }
    // Otherwise go to search results page
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min((h ?? -1) + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max((h ?? results.length) - 1, -1));
    } else if (e.key === "Enter") {
      if (highlight >= 0 && results[highlight]) {
        const item = results[highlight];
        navigate(`/showroom/${item._id}`);
        setOpen(false);
      } else {
        handleSubmit(); // routes to showroom when no results
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  };

  const Dropdown = (
    <div
      className="absolute left-0 right-0 z-[9999] rounded-xl bg-[#0a0f1a]/90 backdrop-blur-md shadow-xl"
      style={{ top: "calc(100% + 8px)", pointerEvents: "auto" }}
    >
      {loading && <div className="p-4 text-sm text-white/70">Searching…</div>}

      {!loading && error && (
        <div className="p-4 text-sm text-red-300">{error}</div>
      )}

      {!loading && !error && results.length === 0 && query.trim().length >= 2 && (
        <div className="p-4 text-sm text-white/70 space-y-3">
          <div>No jet found</div>
          <button
            onMouseDown={() => goShowroom(query)}
            className="w-full px-3 py-3 text-center font-medium rounded-md bg-white/10 hover:bg-white/15 text-white/90"
          >
            Browse all aircraft
          </button>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <ul className="search-results max-h-[60vh] overflow-auto p-2" role="listbox">
          {results.map((item, i) => (
            <li
              key={item._id}
              className={`rounded-md ${highlight === i ? "bg-white/10" : ""}`}
              onMouseEnter={() => setHighlight(i)}
              onMouseLeave={() => setHighlight(-1)}
            >
              <ResultItem
                item={item}
                onMouseDown={() => {
                  navigate(`/showroom/${item._id}`);
                  setOpen(false);
                }}
              />
            </li>
          ))}

          {/* View all / fallback CTA */}
          <li className="pt-1">
            <button
              onMouseDown={() => {
                if (results.length > 0 && query.trim()) {
                  navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                } else {
                  goShowroom(query);
                }
                setOpen(false);
              }}
              className="w-full px-3 py-3 text-center text-sm font-medium rounded-md bg-white/10 hover:bg-white/15 text-white/90"
            >
              View all matches
            </button>
          </li>
        </ul>
      )}
    </div>
  );

  return (
    <div className="">
      {/* SVG filter definition (unchanged) */}
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

      {/* Desktop */}
      <div className="container py-4 md:flex hidden justify-center">
        <div ref={wrapRef} className="search-box-effect relative w-full max-w-2xl">
          <div className="glass-container glass-container--rounded py-1 z-[10]" style={{ borderRadius: "5px" }}>
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>

            <div className="glass-content glass-content--inline justify-center">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  placeholder={placeholder || "Search"}
                  className="flex-grow bg-transparent outline-none text-white placeholder-white/70 px-3 py-3"
                  autoComplete="off"
                  aria-label="Search jets"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  className="w-10 h-10 mr-2 flex items-center justify-center rounded-full bg-tertiary_color hover:bg-tertiary_color/80 transition"
                  onClick={handleSubmit}
                  aria-label="Search"
                >
                  <FaSearch className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {open && Dropdown}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4">
        <div className="relative" ref={wrapRef}>
          <div className="flex items-center gap-2 bg白/5 border border-white/10 rounded-xl px-3 py-2">
            <FaSearch className="text-white/70" />
            <input
              type="text"
              placeholder="Search"
              className="flex-grow bg-transparent outline-none text-white placeholder-white/70"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {open && (
            <div className="absolute left-0 right-0 mt-2 z-[1000] rounded-xl border border-white/10 bg-[#0a0f1a]/95 backdrop-blur-md shadow-xl">
              {loading && <div className="p-3 text-sm text-white/70">Searching…</div>}

              {!loading && error && <div className="p-3 text-sm text-red-300">{error}</div>}

              {!loading && !error && results.length === 0 && query.trim().length >= 2 && (
                <div className="p-3 text-sm text-white/70 space-y-2">
                  <div>No matches</div>
                  <button
                    onClick={() => goShowroom(query)}
                    className="w-full px-3 py-3 text-center font-medium rounded-md bg-white/10 hover:bg-white/15 text-white/90"
                  >
                    Browse all aircraft
                  </button>
                </div>
              )}

              {!loading && !error && results.length > 0 && (
                <ul className="max-h-[60vh] overflow-auto p-2">
                  {results.map((item) => (
                    <li key={item._id} className="rounded-md">
                      <ResultItem
                        item={item}
                        onMouseDown={() => {
                          navigate(`/showroom/${item._id}`);
                          setOpen(false);
                        }}
                      />
                    </li>
                  ))}
                  <li className="pt-1">
                    <button
                      onClick={() => {
                        if (results.length > 0 && query.trim()) {
                          navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                        } else {
                          goShowroom(query);
                        }
                        setOpen(false);
                      }}
                      className="w-full px-3 py-3 text-center text-sm font-medium rounded-md bg-white/10 hover:bg-white/15 text-white/90"
                    >
                      View all matches
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
