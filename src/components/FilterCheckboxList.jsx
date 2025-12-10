// FilterCheckboxList.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slider";
import CheckBoxGroup from "./CheckBoxGroup";

const useDebouncedCallback = (cb, delay = 150) => {
  const t = useRef();
  return (...args) => {
    clearTimeout(t.current);
    t.current = setTimeout(() => cb(...args), delay);
  };
};

export default function FilterCheckboxList({
  searchJets,
  setSearchJets,

  selected,
  setSelected,

  /* PRICE (continuous) */
  range,
  setRange,
  minPrice,
  maxPrice,

  /* AIRFRAME/ENGINE — continuous */
  airframeRange,
  setAirframeRange,
  minAirframe,
  maxAirframe,

  engineRange,
  setEngineRange,
  minEngine,
  maxEngine,

  /* Categories list for checkboxes */
  aircraftOptions = [],
  onClearAll
}) {
  const debouncedSetRange = useDebouncedCallback(setRange, 150);

  /* ---------- PRICE (continuous) ---------- */
  const fullPriceRange = useMemo(() => {
    const lo = Number.isFinite(minPrice) ? Number(minPrice) : 0;
    const hi = Number.isFinite(maxPrice) ? Number(maxPrice) : 0;
    return [lo, hi];
  }, [minPrice, maxPrice]);

  const [rangeDraft, setRangeDraft] = useState(range ?? fullPriceRange);
  useEffect(() => {
    setRangeDraft(range ?? fullPriceRange);
  }, [range?.[0], range?.[1], fullPriceRange[0], fullPriceRange[1]]);

  const toggleAircraft = (value) => {
    const slug = String(value).toLowerCase().trim();
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((i) => i !== slug) : [...prev, slug]
    );
  };

  const clearAll = () => {
    setCurrentPage(1);
    setPriceRange(undefined);
    setAirframeRange(undefined);
    setEngineRange(undefined);
    setPriceTouched(false);
    setAirframeTouched(false);
    setEngineTouched(false);
  };

  /* helpers to render labels safely (0 should show as 0, not “–”) */
  const fmt = (n) => Number(n ?? 0).toLocaleString();

  // ▼ Mobile-only dropdown state for Aircraft group
  const [aircraftOpen, setAircraftOpen] = useState(false);

  return (
    <div className="p-6 rounded-2xl border border-[#ffffff48]">

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search..."
        value={searchJets}
        onChange={(e) => setSearchJets(e.target.value)}
        className="focus:outline-none text-white bg-transparent border-2 w-full px-4 py-2 rounded-[25px] border-[#ddd]/20"
      />

      <div className="flex justify-between py-6">
        <h3 className="text-white font-medium">Filter Options</h3>
        <button
          onClick={onClearAll}
          className="text-white font-medium text-xs hover:text-tertiary_color"
        >
          Clear All
        </button>
      </div>

      {/* --- Aircraft (mobile: dropdown, desktop: static) --- */}

      {/* Mobile dropdown (≤ md) */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setAircraftOpen((v) => !v)}
          className="w-full flex items-center justify-between rounded-xl text-white"
        >
          <span className="font-semibold">Aircraft</span>
          <svg
            className={`h-5 w-5 transition-transform ${aircraftOpen ? "rotate-180" : ""
              }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <AnimatePresence initial={false}>
          {aircraftOpen && (
            <motion.div
              key="aircraft-dd"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-3"
            >
              {/* Pass empty title so CheckBoxGroup doesn't render its own header on mobile */}
              <CheckBoxGroup
                title=""
                items={aircraftOptions}
                selected={selected}
                onChange={toggleAircraft}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop/tablet (≥ md): always visible */}
      <div className="hidden md:block">
        <CheckBoxGroup
          title="Aircraft"
          items={aircraftOptions}
          selected={selected}
          onChange={toggleAircraft}
        />
      </div>

      {/* Airframes (continuous) */}
      <div className="mb-8 mt-6">
        <h3 className="text-sm font-semibold text-white mb-3">Airframes</h3>
        <Slider
          className="slider"
          min={Number(minAirframe ?? 0)}
          max={Number(maxAirframe ?? 0)}
          step={1}
          value={
            airframeRange ?? [
              Number(minAirframe ?? 0),
              Number(maxAirframe ?? 0),
            ]
          }
          onChange={(v) => {
            const [a, b] = Array.isArray(v) ? v : [v, v];
            setAirframeRange([Number(a), Number(b)]);
          }}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`slider-track ${state.index === 0 ? "track-0" : "track-1"
                }`}
            />
          )}
          renderThumb={(props) => (
            <div {...props} className="slider-thumb relative" />
          )}
        />
        <div className="flex justify-between mt-3 text-[.6rem] xl:text-xs text-gray-300 font-bold">
          <span>Min: {fmt((airframeRange ?? [minAirframe])[0])}</span>
          <span>
            Max: {fmt((airframeRange ?? [minAirframe, maxAirframe])[1])}
          </span>
        </div>
      </div>

      {/* Engine (continuous) */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white mb-3">Engine</h3>
        <Slider
          className="slider"
          min={Number(minEngine ?? 0)}
          max={Number(maxEngine ?? 0)}
          step={1}
          value={
            engineRange ?? [Number(minEngine ?? 0), Number(maxEngine ?? 0)]
          }
          onChange={(v) => {
            const [a, b] = Array.isArray(v) ? v : [v, v];
            setEngineRange([Number(a), Number(b)]);
          }}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`slider-track ${state.index === 0 ? "track-0" : "track-1"
                }`}
            />
          )}
          renderThumb={(props) => (
            <div {...props} className="slider-thumb relative" />
          )}
        />
        <div className="flex justify-between mt-3 text-[.6rem] xl:text-xs text-gray-300 font-bold">
          <span>Min: {fmt((engineRange ?? [minEngine])[0])}</span>
          <span>Max: {fmt((engineRange ?? [minEngine, maxEngine])[1])}</span>
        </div>
      </div>

      {/* Price Range (continuous) */}
      <div className="pt-2">
        <h3 className="text-sm font-semibold text-white mb-4">Price Range</h3>
        <Slider
          className="slider"
          value={rangeDraft}
          onChange={(v) => {
            setRangeDraft(v);
            debouncedSetRange(v);
          }}
          min={fullPriceRange[0]}
          max={fullPriceRange[1]}
          step={1000}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`slider-track ${state.index === 0 ? "track-0" : "track-1"
                }`}
            />
          )}
          renderThumb={(props) => <div {...props} className="slider-thumb" />}
        />
        <div className="flex justify-between mt-3 text-gray-300">
          <span className="text-[.6rem] xl:text-xs font-bold">
            Min: {fmt(rangeDraft?.[0] ?? fullPriceRange[0])}
          </span>
          <span className="text-[.6rem] xl:text-xs font-bold">
            Max: {fmt(rangeDraft?.[1] ?? fullPriceRange[1])}
          </span>
        </div>
      </div>
    </div>
  );
}
