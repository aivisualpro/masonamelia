<<<<<<< HEAD
=======
// // import React, { useMemo, useState, useEffect, useRef } from "react";
// // import Slider from "react-slider";
// // import CheckBoxGroup from "./CheckBoxGroup";

// // const useDebouncedCallback = (cb, delay = 120) => {
// //   const t = useRef();
// //   return (...args) => {
// //     clearTimeout(t.current);
// //     t.current = setTimeout(() => cb(...args), delay);
// //   };
// // };

// // const pretty = (v) => {
// //   const n = Number(v);
// //   return Number.isFinite(n) && String(n) === v ? n.toLocaleString() : v;
// // };

// // const toEngineNums = (s) =>
// //   String(s)
// //     .split("/")
// //     .map((x) => parseFloat(String(x).replace(/,/g, "")))
// //     .filter((n) => Number.isFinite(n));

// // export default function FilterCheckboxList({
// //   selected,
// //   setSelected,
// //   range,
// //   setRange,
// //   minPrice,
// //   maxPrice,
// //   airframeOptions = [],
// //   engineOptions = [],
// //   aircraftOptions = [],
// // }) {
// //   const stripGroup = (prev, group) => prev.filter((x) => !group.includes(x));

// //   // Disable discrete sliders if only one option exists
// //   const airframeDisabled = (airframeOptions?.length || 0) < 2;
// //   const engineDisabled   = (engineOptions?.length || 0)   < 2;

// //   // --- PRICE: if single value, add padding so handles can move ---
// //   const priceHasRange =
// //     Number.isFinite(minPrice) &&
// //     Number.isFinite(maxPrice) &&
// //     minPrice !== maxPrice;

// //   const PAD = 0.15; // 15% padding for UI when single price
// //   const uiMinPrice = priceHasRange
// //     ? minPrice
// //     : Math.max(0, Math.floor((Number.isFinite(minPrice) ? minPrice : 0) * (1 - PAD)));
// //   const uiMaxPrice = priceHasRange
// //     ? maxPrice
// //     : Math.ceil((Number.isFinite(maxPrice) ? maxPrice || 1000 : 1000) * (1 + PAD));

// //   // ✅ Always start slider handles at the corners
// //   const initialPriceRange = useMemo(() => {
// //     return priceHasRange ? [minPrice, maxPrice] : [uiMinPrice, uiMaxPrice];
// //   }, [priceHasRange, minPrice, maxPrice, uiMinPrice, uiMaxPrice]);

// //   const [rangeDraft, setRangeDraft] = useState(initialPriceRange);

// //   // Keep UI + parent in sync when domain changes
// //   const debouncedSetRange = useDebouncedCallback(setRange, 120);
// //   useEffect(() => {
// //     setRangeDraft(initialPriceRange);
// //     if (!priceHasRange) {
// //       // push padded edges to parent so handles stay at corners
// //       setRange(initialPriceRange);
// //     }
// //   }, [initialPriceRange, priceHasRange, setRange]);

// //   // --- DISCRETE (Airframe/Engine) default to extremes (corners) ---
// //   const lastAirIdx = Math.max(0, airframeOptions.length - 1);
// //   const lastEngIdx = Math.max(0, engineOptions.length - 1);
// //   const defaultAirframe = [0, lastAirIdx];
// //   const defaultEngine   = [0, lastEngIdx];

// //   const initialAirframe = useMemo(() => {
// //     // if nothing selected -> extremes
// //     const picked = airframeOptions
// //       .map((v, i) => (selected.includes(v) ? i : null))
// //       .filter((i) => i !== null);
// //     return picked.length ? [Math.min(...picked), Math.max(...picked)] : defaultAirframe;
// //   }, [selected, airframeOptions]);

// //   const initialEngine = useMemo(() => {
// //     const picked = engineOptions
// //       .map((v, i) => (selected.includes(v) ? i : null))
// //       .filter((i) => i !== null);
// //     return picked.length ? [Math.min(...picked), Math.max(...picked)] : defaultEngine;
// //   }, [selected, engineOptions]);

// //   const [airframeIdx, setAirframeIdx] = useState(initialAirframe);
// //   const [engineIdx, setEngineIdx] = useState(initialEngine);
// //   useEffect(() => setAirframeIdx(initialAirframe), [initialAirframe]);
// //   useEffect(() => setEngineIdx(initialEngine), [initialEngine]);

// //   const applyRange = (group, idxRange) => {
// //     const [start, end] = idxRange;
// //     const values = group.slice(start, end + 1);
// //     setSelected((prev) => [...stripGroup(prev, group), ...values]);
// //   };

// //   const onAirframeChange = (val) => {
// //     if (airframeDisabled) return;
// //     const next = Array.isArray(val) ? val : [val, val];
// //     setAirframeIdx(next);
// //     applyRange(airframeOptions, next);
// //   };

// //   const onEngineChange = (val) => {
// //     if (engineDisabled) return;
// //     const next = Array.isArray(val) ? val : [val, val];
// //     setEngineIdx(next);
// //     applyRange(engineOptions, next);
// //   };

// //   const toggleAircraft = (value) => {
// //     const slug = String(value).toLowerCase();
// //     setSelected((prev) =>
// //       prev.includes(slug) ? prev.filter((i) => i !== slug) : [...prev, slug]
// //     );
// //   };

// //   const clearAll = () => {
// //     setSelected((prev) =>
// //       prev.filter(
// //         (x) =>
// //           !airframeOptions.includes(x) &&
// //           !engineOptions.includes(x) &&
// //           !aircraftOptions.includes(x)
// //       )
// //     );
// //     setAirframeIdx(defaultAirframe);
// //     setEngineIdx(defaultEngine);
// //     setRangeDraft(initialPriceRange);
// //     setRange(initialPriceRange);
// //   };

// //   const airframeMinLabel = airframeOptions[airframeIdx[0]] ?? "";
// //   const airframeMaxLabel = airframeOptions[airframeIdx[1]] ?? "";

// //   const engineSlice = engineOptions.slice(engineIdx[0], engineIdx[1] + 1);
// //   const engineNumsInRange = engineSlice.flatMap(toEngineNums);
// //   const engineMinNum = engineNumsInRange.length ? Math.min(...engineNumsInRange) : null;
// //   const engineMaxNum = engineNumsInRange.length ? Math.max(...engineNumsInRange) : null;

// //   const rawMinEngine = engineOptions[engineIdx[0]] ?? "";
// //   const rawMaxEngine = engineOptions[engineIdx[1]] ?? "";
// //   const formatEngineLabel = (raw, num) =>
// //     String(raw).includes("/") ? raw : num != null ? num.toLocaleString() : pretty(raw);

// //   return (
// //     <div className="p-6 rounded-2xl border border-[#ffffff48]">
// //       <div className="flex justify-between mb-4">
// //         <h3 className="text-white font-medium">Filter Options</h3>
// //         <button
// //           onClick={clearAll}
// //           className="text-white font-medium text-xs hover:text-tertiary_color"
// //         >
// //           Clear All
// //         </button>
// //       </div>

// //       {/* Aircraft checkboxes */}
// //       <CheckBoxGroup
// //         title="Aircraft"
// //         items={aircraftOptions}
// //         selected={selected}
// //         onChange={toggleAircraft}
// //       />

// //       {/* Airframes (discrete) */}
// //       <div className="mb-8 mt-6">
// //         <h3 className="text-sm font-semibold text-white mb-3">Airframes</h3>
// //         <Slider
// //           className={`slider ${airframeDisabled ? "opacity-50 pointer-events-none" : ""}`}
// //           min={0}
// //           max={Math.max(0, airframeOptions.length - 1)}
// //           step={1}
// //           value={airframeIdx}
// //           onChange={onAirframeChange}
// //           disabled={airframeDisabled}
// //           renderTrack={(props, state) => (
// //             <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
// //           )}
// //           renderThumb={(props) => <div {...props} className="slider-thumb relative" />}
// //         />
// //         <div className="flex justify-between mt-3 text-[.6rem] xl:text-base text-gray-300">
// //           <span className="text-[.6rem] xl:text-xs font-bold">Min: {pretty(airframeMinLabel)}</span>
// //           <span className="text-[.6rem] xl:text-xs font-bold">Max: {pretty(airframeMaxLabel)}</span>
// //         </div>
// //       </div>

// //       {/* Engine (discrete) */}
// //       <div className="mb-8">
// //         <h3 className="text-sm font-semibold text-white mb-3">Engine</h3>
// //         <Slider
// //           className={`slider ${engineDisabled ? "opacity-50 pointer-events-none" : ""}`}
// //           min={0}
// //           max={Math.max(0, engineOptions.length - 1)}
// //           step={1}
// //           value={engineIdx}
// //           onChange={onEngineChange}
// //           disabled={engineDisabled}
// //           renderTrack={(props, state) => (
// //             <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
// //           )}
// //           renderThumb={(props) => <div {...props} className="slider-thumb relative" />}
// //         />
// //         <div className="flex justify-between mt-3 text-[.6rem] xl:text-base text-gray-300">
// //           <span className="text-[.6rem] xl:text-xs font-bold">
// //             Min: {formatEngineLabel(rawMinEngine, engineMinNum)}
// //           </span>
// //           <span className="text-[.6rem] xl:text-xs font-bold">
// //             Max: {formatEngineLabel(rawMaxEngine, engineMaxNum)}
// //           </span>
// //         </div>
// //       </div>

// //       {/* Price Range (corners by default) */}
// //       <div className="pt-2">
// //         <h3 className="text-sm font-semibold text-white mb-4">Price Range</h3>
// //         <Slider
// //           className="slider"
// //           value={rangeDraft}
// //           onChange={(v) => {
// //             setRangeDraft(v);
// //             debouncedSetRange(v);
// //           }}
// //           min={uiMinPrice}
// //           max={uiMaxPrice}
// //           step={1000}
// //           renderTrack={(props, state) => (
// //             <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
// //           )}
// //           renderThumb={(props) => <div {...props} className="slider-thumb" />}
// //         />
// //         <div className="flex justify-between mt-3 text-gray-300">
// //           <span className="text-[.6rem] xl:text-xs font-bold">
// //             Min: {Number(rangeDraft?.[0] ?? uiMinPrice).toLocaleString()}
// //           </span>
// //           <span className="text-[.6rem] xl:text-xs font-bold">
// //             Max: {Number(rangeDraft?.[1] ?? uiMaxPrice).toLocaleString()}
// //           </span>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }


// // FilterCheckboxList.jsx
// import React, { useMemo, useState, useEffect, useRef } from "react";
// import Slider from "react-slider";
// import CheckBoxGroup from "./CheckBoxGroup";

// const useDebouncedCallback = (cb, delay = 120) => {
//   const t = useRef();
//   return (...args) => {
//     clearTimeout(t.current);
//     t.current = setTimeout(() => cb(...args), delay);
//   };
// };

// const pretty = (v) => {
//   const n = Number(v);
//   return Number.isFinite(n) && String(n) === v ? n.toLocaleString() : v;
// };

// const toEngineNums = (s) =>
//   String(s)
//     .split("/")
//     .map((x) => parseFloat(String(x).replace(/,/g, "")))
//     .filter((n) => Number.isFinite(n));

// export default function FilterCheckboxList({
//   selected,
//   setSelected,
//   range,
//   setRange,
//   minPrice,
//   maxPrice,
//   airframeOptions = [],
//   engineOptions = [],
//   aircraftOptions = [],
//   // NEW props for independent sliders
//   airframeRange,
//   setAirframeRange,
//   engineRange,
//   setEngineRange,
// }) {
//   const stripGroup = (prev, group) => prev.filter((x) => !group.includes(x));

//   // Disable discrete sliders if only one option exists
//   const airframeDisabled = (airframeOptions?.length || 0) < 2;
//   const engineDisabled = (engineOptions?.length || 0) < 2;

//   // --- PRICE: if single value, add padding so handles can move ---
//   const priceHasRange =
//     Number.isFinite(minPrice) &&
//     Number.isFinite(maxPrice) &&
//     minPrice !== maxPrice;

//   const PAD = 0.15; // 15% padding for UI when single price
//   const uiMinPrice = priceHasRange
//     ? minPrice
//     : Math.max(
//         0,
//         Math.floor((Number.isFinite(minPrice) ? minPrice : 0) * (1 - PAD))
//       );
//   const uiMaxPrice = priceHasRange
//     ? maxPrice
//     : Math.ceil(
//         (Number.isFinite(maxPrice) ? maxPrice || 1000 : 1000) * (1 + PAD)
//       );

//   // ✅ Always start slider handles at the corners
//   const initialPriceRange = useMemo(() => {
//     return priceHasRange ? [minPrice, maxPrice] : [uiMinPrice, uiMaxPrice];
//   }, [priceHasRange, minPrice, maxPrice, uiMinPrice, uiMaxPrice]);

//   const [rangeDraft, setRangeDraft] = useState(initialPriceRange);

//   // Keep UI + parent in sync when domain changes
//   const debouncedSetRange = useDebouncedCallback(setRange, 120);
//   useEffect(() => {
//     setRangeDraft(initialPriceRange);
//     if (!priceHasRange) {
//       // push padded edges to parent so handles stay at corners
//       setRange(initialPriceRange);
//     }
//   }, [initialPriceRange, priceHasRange, setRange]);

//   // --- DISCRETE (Airframe/Engine) default to extremes (corners) ---
//   const lastAirIdx = Math.max(0, airframeOptions.length - 1);
//   const lastEngIdx = Math.max(0, engineOptions.length - 1);
//   const defaultAirframe = [0, lastAirIdx];
//   const defaultEngine = [0, lastEngIdx];

//   const initialAirframe = useMemo(() => {
//     if (airframeRange && airframeOptions.length) {
//       const s = airframeOptions.indexOf(airframeRange[0]);
//       const e = airframeOptions.indexOf(airframeRange[1]);
//       return [
//         s === -1 ? 0 : Math.max(0, s),
//         e === -1 ? lastAirIdx : Math.max(0, e),
//       ];
//     }
//     return defaultAirframe;
//   }, [airframeRange, airframeOptions, lastAirIdx]);

//   const initialEngine = useMemo(() => {
//     if (engineRange && engineOptions.length) {
//       const s = engineOptions.indexOf(engineRange[0]);
//       const e = engineOptions.indexOf(engineRange[1]);
//       return [
//         s === -1 ? 0 : Math.max(0, s),
//         e === -1 ? lastEngIdx : Math.max(0, e),
//       ];
//     }
//     return defaultEngine;
//   }, [engineRange, engineOptions, lastEngIdx]);

//   const [airframeIdx, setAirframeIdx] = useState(initialAirframe);
//   const [engineIdx, setEngineIdx] = useState(initialEngine);
//   useEffect(() => setAirframeIdx(initialAirframe), [initialAirframe]);
//   useEffect(() => setEngineIdx(initialEngine), [initialEngine]);

//   const onAirframeChange = (val) => {
//     if (airframeDisabled) return;
//     const next = Array.isArray(val) ? val : [val, val];
//     setAirframeIdx(next);
//     const vals = airframeOptions.slice(next[0], next[1] + 1);
//     if (vals.length) setAirframeRange([vals[0], vals[vals.length - 1]]);
//     else setAirframeRange(null);
//   };

//   const onEngineChange = (val) => {
//     if (engineDisabled) return;
//     const next = Array.isArray(val) ? val : [val, val];
//     setEngineIdx(next);
//     const vals = engineOptions.slice(next[0], next[1] + 1);
//     if (vals.length) setEngineRange([vals[0], vals[vals.length - 1]]);
//     else setEngineRange(null);
//   };

//   const toggleAircraft = (value) => {
//     const slug = String(value).toLowerCase();
//     setSelected((prev) =>
//       prev.includes(slug) ? prev.filter((i) => i !== slug) : [...prev, slug]
//     );
//   };

//   const clearAll = () => {
//     // brands sab clear
//     setSelected((prev) =>
//       prev.filter((x) => !aircraftOptions.includes(x))
//     );
//     // discrete aur price reset
//     setAirframeIdx(defaultAirframe);
//     setEngineIdx(defaultEngine);
//     setAirframeRange(null);
//     setEngineRange(null);
//     setRangeDraft(initialPriceRange);
//     setRange(initialPriceRange);
//   };

//   const airframeMinLabel = airframeOptions[airframeIdx[0]] ?? "";
//   const airframeMaxLabel = airframeOptions[airframeIdx[1]] ?? "";

//   const engineSlice = engineOptions.slice(engineIdx[0], engineIdx[1] + 1);
//   const engineNumsInRange = engineSlice.flatMap(toEngineNums);
//   const engineMinNum = engineNumsInRange.length
//     ? Math.min(...engineNumsInRange)
//     : null;
//   const engineMaxNum = engineNumsInRange.length
//     ? Math.max(...engineNumsInRange)
//     : null;

//   const rawMinEngine = engineOptions[engineIdx[0]] ?? "";
//   const rawMaxEngine = engineOptions[engineIdx[1]] ?? "";
//   const formatEngineLabel = (raw, num) =>
//     String(raw).includes("/")
//       ? raw
//       : num != null
//       ? num.toLocaleString()
//       : pretty(raw);

//   return (
//     <div className="p-6 rounded-2xl border border-[#ffffff48]">
//       <div className="flex justify-between mb-4">
//         <h3 className="text-white font-medium">Filter Options</h3>
//         <button
//           onClick={clearAll}
//           className="text-white font-medium text-xs hover:text-tertiary_color"
//         >
//           Clear All
//         </button>
//       </div>

//       {/* Aircraft checkboxes */}
//       <CheckBoxGroup
//         title="Aircraft"
//         items={aircraftOptions}
//         selected={selected}
//         onChange={toggleAircraft}
//       />

//       {/* Airframes (discrete) */}
//       <div className="mb-8 mt-6">
//         <h3 className="text-sm font-semibold text-white mb-3">Airframes</h3>
//         <Slider
//           className={`slider ${airframeDisabled ? "opacity-50 pointer-events-none" : ""}`}
//           min={0}
//           max={Math.max(0, airframeOptions.length - 1)}
//           step={1}
//           value={airframeIdx}
//           onChange={onAirframeChange}
//           disabled={airframeDisabled}
//           renderTrack={(props, state) => (
//             <div
//               {...props}
//               className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`}
//             />
//           )}
//           renderThumb={(props) => <div {...props} className="slider-thumb relative" />}
//         />
//         <div className="flex justify-between mt-3 text-[.6rem] xl:text-base text-gray-300">
//           <span className="text-[.6rem] xl:text-xs font-bold">
//             Min: {pretty(String(airframeMinLabel))}
//           </span>
//           <span className="text-[.6rem] xl:text-xs font-bold">
//             Max: {pretty(String(airframeMaxLabel))}
//           </span>
//         </div>
//       </div>

//       {/* Engine (discrete) */}
//       <div className="mb-8">
//         <h3 className="text-sm font-semibold text-white mb-3">Engine</h3>
//         <Slider
//           className={`slider ${engineDisabled ? "opacity-50 pointer-events-none" : ""}`}
//           min={0}
//           max={Math.max(0, engineOptions.length - 1)}
//           step={1}
//           value={engineIdx}
//           onChange={onEngineChange}
//           disabled={engineDisabled}
//           renderTrack={(props, state) => (
//             <div
//               {...props}
//               className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`}
//             />
//           )}
//           renderThumb={(props) => <div {...props} className="slider-thumb relative" />}
//         />
//         <div className="flex justify-between mt-3 text-[.6rem] xl:text-base text-gray-300">
//           <span className="text-[.6rem] xl:text-xs font-bold">
//             Min: {formatEngineLabel(rawMinEngine, engineMinNum)}
//           </span>
//           <span className="text-[.6rem] xl:text-xs font-bold">
//             Max: {formatEngineLabel(rawMaxEngine, engineMaxNum)}
//           </span>
//         </div>
//       </div>

//       {/* Price Range (corners by default) */}
//       <div className="pt-2">
//         <h3 className="text-sm font-semibold text-white mb-4">Price Range</h3>
//         <Slider
//           className="slider"
//           value={rangeDraft}
//           onChange={(v) => {
//             setRangeDraft(v);
//             debouncedSetRange(v);
//           }}
//           min={uiMinPrice}
//           max={uiMaxPrice}
//           step={1000}
//           renderTrack={(props, state) => (
//             <div
//               {...props}
//               className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`}
//             />
//           )}
//           renderThumb={(props) => <div {...props} className="slider-thumb" />}
//         />
//         <div className="flex justify-between mt-3 text-gray-300">
//           <span className="text-[.6rem] xl:text-xs font-bold">
//             Min: {Number(rangeDraft?.[0] ?? uiMinPrice).toLocaleString()}
//           </span>
//           <span className="text-[.6rem] xl:text-xs font-bold">
//             Max: {Number(rangeDraft?.[1] ?? uiMaxPrice).toLocaleString()}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }


>>>>>>> 07117bd (Showroom Pagination Fliters Problems and jets featured image issue resolve)
import React, { useMemo, useState, useEffect, useRef } from "react";
import Slider from "react-slider";
import CheckBoxGroup from "./CheckBoxGroup";

const useDebouncedCallback = (cb, delay = 120) => {
  const t = useRef();
  return (...args) => {
    clearTimeout(t.current);
    t.current = setTimeout(() => cb(...args), delay);
  };
};

<<<<<<< HEAD
// format helper: numeric string -> 1,234 | keep mixed strings
=======
>>>>>>> 07117bd (Showroom Pagination Fliters Problems and jets featured image issue resolve)
const pretty = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && String(n) === v ? n.toLocaleString() : v;
};

<<<<<<< HEAD
// --- NEW: always take text before '/' ---
const beforeSlash = (v) => String(v ?? "").split("/")[0];
=======
const toEngineNums = (s) =>
  String(s)
    .split("/")
    .map((x) => parseFloat(String(x).replace(/,/g, "")))
    .filter((n) => Number.isFinite(n));
>>>>>>> 07117bd (Showroom Pagination Fliters Problems and jets featured image issue resolve)

export default function FilterCheckboxList({
  selected,
  setSelected,
  range,
  setRange,
  minPrice,
  maxPrice,
  airframeOptions = [],
  engineOptions = [],
  aircraftOptions = [],
  airframeRange,
  setAirframeRange,
  engineRange,
  setEngineRange,
}) {
  // Disable discrete sliders if only one option exists
  const airframeDisabled = (airframeOptions?.length || 0) < 2;
  const engineDisabled = (engineOptions?.length || 0) < 2;

  // --- PRICE domain + UI padding ---
  const priceHasRange =
    Number.isFinite(minPrice) &&
    Number.isFinite(maxPrice) &&
    minPrice !== maxPrice;

  const PAD = 0.15;
  const uiMinPrice = priceHasRange
    ? minPrice
    : Math.max(0, Math.floor((Number.isFinite(minPrice) ? minPrice : 0) * (1 - PAD)));
  const uiMaxPrice = priceHasRange
    ? maxPrice
    : Math.ceil((Number.isFinite(maxPrice) ? maxPrice || 1000 : 1000) * (1 + PAD));

  const initialPriceRange = useMemo(
    () => (priceHasRange ? [minPrice, maxPrice] : [uiMinPrice, uiMaxPrice]),
    [priceHasRange, minPrice, maxPrice, uiMinPrice, uiMaxPrice]
  );

  const [rangeDraft, setRangeDraft] = useState(initialPriceRange);

  const debouncedSetRange = useDebouncedCallback(setRange, 120);

  // ✅ IMPORTANT: reset only when domain changes; don't depend on setRange identity
  useEffect(() => {
    setRangeDraft(initialPriceRange);
    if (!priceHasRange) {
      setRange(initialPriceRange); // push padded edges once
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPriceRange, priceHasRange]);

  // --- DISCRETE sliders (airframe/engine) ---
  const lastAirIdx = Math.max(0, airframeOptions.length - 1);
  const lastEngIdx = Math.max(0, engineOptions.length - 1);
  const defaultAirframe = [0, lastAirIdx];
  const defaultEngine = [0, lastEngIdx];

  const initialAirframe = useMemo(() => {
    if (airframeRange && airframeOptions.length) {
      const s = airframeOptions.indexOf(airframeRange[0]);
      const e = airframeOptions.indexOf(airframeRange[1]);
      return [s === -1 ? 0 : Math.max(0, s), e === -1 ? lastAirIdx : Math.max(0, e)];
    }
    return defaultAirframe;
  }, [airframeRange, airframeOptions, lastAirIdx]);

  const initialEngine = useMemo(() => {
    if (engineRange && engineOptions.length) {
      const s = engineOptions.indexOf(engineRange[0]);
      const e = engineOptions.indexOf(engineRange[1]);
      return [s === -1 ? 0 : Math.max(0, s), e === -1 ? lastEngIdx : Math.max(0, e)];
    }
    return defaultEngine;
  }, [engineRange, engineOptions, lastEngIdx]);

  const [airframeIdx, setAirframeIdx] = useState(initialAirframe);
  const [engineIdx, setEngineIdx] = useState(initialEngine);
  useEffect(() => setAirframeIdx(initialAirframe), [initialAirframe]);
  useEffect(() => setEngineIdx(initialEngine), [initialEngine]);

<<<<<<< HEAD
  // ---- Price range ----
  const safeRange = useMemo(
    () =>
      Array.isArray(range) && range.length === 2
        ? range
        : [minPrice, maxPrice],
    [range, minPrice, maxPrice]
  );

  const [rangeDraft, setRangeDraft] = useState(safeRange);
  useEffect(() => setRangeDraft(safeRange), [safeRange]);
  const debouncedSetRange = useDebouncedCallback(setRange, 120);

  const applyRange = (group, idxRange) => {
    const [start, end] = idxRange;
    const values = group.slice(start, end + 1);
    setSelected((prev) => [...stripGroup(prev, group), ...values]);
  };

=======
>>>>>>> 07117bd (Showroom Pagination Fliters Problems and jets featured image issue resolve)
  const onAirframeChange = (val) => {
    if (airframeDisabled) return;
    const next = Array.isArray(val) ? val : [val, val];
    setAirframeIdx(next);
    const vals = airframeOptions.slice(next[0], next[1] + 1);
    setAirframeRange(vals.length ? [vals[0], vals[vals.length - 1]] : null);
  };

  const onEngineChange = (val) => {
    if (engineDisabled) return;
    const next = Array.isArray(val) ? val : [val, val];
    setEngineIdx(next);
    const vals = engineOptions.slice(next[0], next[1] + 1);
    setEngineRange(vals.length ? [vals[0], vals[vals.length - 1]] : null);
  };

  const toggleAircraft = (value) => {
    const slug = String(value).toLowerCase();
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((i) => i !== slug) : [...prev, slug]
    );
  };

  const clearAll = () => {
    setSelected((prev) => prev.filter((x) => !aircraftOptions.includes(x)));
    setAirframeIdx(defaultAirframe);
    setEngineIdx(defaultEngine);
    setAirframeRange(null);
    setEngineRange(null);
    setRangeDraft(initialPriceRange);
    setRange(initialPriceRange);
  };

  const airframeMinLabel = airframeOptions[airframeIdx[0]] ?? "";
  const airframeMaxLabel = airframeOptions[airframeIdx[1]] ?? "";

<<<<<<< HEAD
  // Engine labels: ALWAYS show value before '/'
  const rawMinEngine = ENGINE_OPTIONS[engineIdx[0]];
  const rawMaxEngine = ENGINE_OPTIONS[engineIdx[1]];
  const formatEngineLabel = (raw) => pretty(beforeSlash(raw));
=======
  const engineSlice = engineOptions.slice(engineIdx[0], engineIdx[1] + 1);
  const engineNumsInRange = engineSlice.flatMap(toEngineNums);
  const engineMinNum = engineNumsInRange.length ? Math.min(...engineNumsInRange) : null;
  const engineMaxNum = engineNumsInRange.length ? Math.max(...engineNumsInRange) : null;

  const rawMinEngine = engineOptions[engineIdx[0]] ?? "";
  const rawMaxEngine = engineOptions[engineIdx[1]] ?? "";
  const formatEngineLabel = (raw, num) =>
    String(raw).includes("/") ? raw : num != null ? num.toLocaleString() : pretty(raw);
>>>>>>> 07117bd (Showroom Pagination Fliters Problems and jets featured image issue resolve)

  return (
    <div className="p-6 rounded-2xl border border-[#ffffff48]">
      <div className="flex justify-between mb-4">
        <h3 className="text-white font-medium">Filter Options</h3>
        <button
          onClick={clearAll}
          className="text-white font-medium text-xs hover:text-tertiary_color"
        >
          Clear All
        </button>
      </div>

      {/* Aircraft checkboxes */}
      <CheckBoxGroup
        title="Aircraft"
        items={aircraftOptions}
        selected={selected}
        onChange={toggleAircraft}
      />

      {/* Airframes (discrete) */}
      <div className="mb-8 mt-6">
        <h3 className="text-sm font-semibold text-white mb-3">Airframes</h3>
        <Slider
          className={`slider ${airframeDisabled ? "opacity-50 pointer-events-none" : ""}`}
          min={0}
          max={Math.max(0, airframeOptions.length - 1)}
          step={1}
          value={airframeIdx}
          onChange={onAirframeChange}
          disabled={airframeDisabled}
          renderTrack={(props, state) => (
            <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
          )}
          renderThumb={(props) => <div {...props} className="slider-thumb relative" />}
        />
        <div className="flex justify-between mt-3 text-[.6rem] xl:text-base text-gray-300">
          <span className="text-[.6rem] xl:text-xs font-bold">
            Min: {pretty(String(airframeMinLabel))}
          </span>
          <span className="text-[.6rem] xl:text-xs font-bold">
            Max: {pretty(String(airframeMaxLabel))}
          </span>
        </div>
      </div>

<<<<<<< HEAD
      {/* Engine — discrete range with BEFORE-SLASH labels */}
=======
      {/* Engine (discrete) */}
>>>>>>> 07117bd (Showroom Pagination Fliters Problems and jets featured image issue resolve)
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white mb-3">Engine</h3>
        <Slider
          className={`slider ${engineDisabled ? "opacity-50 pointer-events-none" : ""}`}
          min={0}
          max={Math.max(0, engineOptions.length - 1)}
          step={1}
          value={engineIdx}
          onChange={onEngineChange}
          disabled={engineDisabled}
          renderTrack={(props, state) => (
            <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
          )}
          renderThumb={(props) => <div {...props} className="slider-thumb relative" />}
        />
        <div className="flex justify-between mt-3 text-[.6rem] xl:text-base text-gray-300">
          <span className="text-[.6rem] xl:text-xs font-bold">
            Min: {formatEngineLabel(rawMinEngine)}
          </span>
          <span className="text-[.6rem] xl:text-xs font-bold">
            Max: {formatEngineLabel(rawMaxEngine)}
          </span>
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-2">
        <h3 className="text-sm font-semibold text-white mb-4">Price Range</h3>
        <Slider
          className="slider"
          value={rangeDraft}
          onChange={(v) => {
            setRangeDraft(v);
            debouncedSetRange(v);
          }}
          min={uiMinPrice}
          max={uiMaxPrice}
          step={1000}
          renderTrack={(props, state) => (
            <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
          )}
          renderThumb={(props) => <div {...props} className="slider-thumb" />}
        />
        <div className="flex justify-between mt-3 text-gray-300">
          <span className="text-[.6rem] xl:text-xs font-bold">
            Min: {Number(rangeDraft?.[0] ?? uiMinPrice).toLocaleString()}
          </span>
          <span className="text-[.6rem] xl:text-xs font-bold">
            Max: {Number(rangeDraft?.[1] ?? uiMaxPrice).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
