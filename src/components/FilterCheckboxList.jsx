import React, { useMemo, useState, useEffect, useRef } from "react";
import Slider from "react-slider";
import CheckBoxGroup from "./CheckBoxGroup";

// Discrete sliders (order matters)
const AIRFRAME_OPTIONS = ["2500", "5000", "7500"];
const ENGINE_OPTIONS = ["2665", "3517/3421", "220", "3710", "380/380"];
const AIRCRAFT_OPTIONS = ["cirrus", "cessna", "piper", "tbm"];

// Tiny debounce helper
const useDebouncedCallback = (cb, delay = 120) => {
  const t = useRef();
  return (...args) => {
    clearTimeout(t.current);
    t.current = setTimeout(() => cb(...args), delay);
  };
};

// format helper: numeric string -> 1,234 | keep mixed strings
const pretty = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && String(n) === v ? n.toLocaleString() : v;
};

// --- NEW: always take text before '/' ---
const beforeSlash = (v) => String(v ?? "").split("/")[0];

export default function FilterCheckboxList({
  selected,
  setSelected,
  range,         // [min,max] from parent
  setRange,      // setter from parent
  minPrice,
  maxPrice,
}) {
  const stripGroup = (prev, group) => prev.filter((x) => !group.includes(x));

  const defaultAirframe = [0, AIRFRAME_OPTIONS.length - 1];
  const defaultEngine = [0, ENGINE_OPTIONS.length - 1];

  const initialAirframe = useMemo(() => {
    const picked = AIRFRAME_OPTIONS.map((v, i) =>
      selected.includes(v) ? i : null
    ).filter((i) => i !== null);
    return picked.length
      ? [Math.min(...picked), Math.max(...picked)]
      : defaultAirframe;
  }, [selected]);

  const initialEngine = useMemo(() => {
    const picked = ENGINE_OPTIONS.map((v, i) =>
      selected.includes(v) ? i : null
    ).filter((i) => i !== null);
    return picked.length
      ? [Math.min(...picked), Math.max(...picked)]
      : defaultEngine;
  }, [selected]);

  const [airframeIdx, setAirframeIdx] = useState(initialAirframe);
  const [engineIdx, setEngineIdx] = useState(initialEngine);

  useEffect(() => setAirframeIdx(initialAirframe), [initialAirframe]);
  useEffect(() => setEngineIdx(initialEngine), [initialEngine]);

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

  const onAirframeChange = (val) => {
    const next = Array.isArray(val) ? val : [val, val];
    setAirframeIdx(next);
    applyRange(AIRFRAME_OPTIONS, next);
  };

  const onEngineChange = (val) => {
    const next = Array.isArray(val) ? val : [val, val];
    setEngineIdx(next);
    applyRange(ENGINE_OPTIONS, next);
  };

  // Lowercase storage for aircraft slugs
  const toggleAircraft = (value) => {
    const slug = String(value).toLowerCase();
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((i) => i !== slug) : [...prev, slug]
    );
  };

  const clearAll = () => {
    setSelected((prev) =>
      prev.filter(
        (x) =>
          !AIRFRAME_OPTIONS.includes(x) &&
          !ENGINE_OPTIONS.includes(x) &&
          !AIRCRAFT_OPTIONS.includes(x)
      )
    );
    setAirframeIdx(defaultAirframe);
    setEngineIdx(defaultEngine);
    setRangeDraft([minPrice, maxPrice]);
    setRange([minPrice, maxPrice]);
  };

  // ---- Dynamic labels ----
  const airframeMinLabel = AIRFRAME_OPTIONS[airframeIdx[0]];
  const airframeMaxLabel = AIRFRAME_OPTIONS[airframeIdx[1]];

  // Engine labels: ALWAYS show value before '/'
  const rawMinEngine = ENGINE_OPTIONS[engineIdx[0]];
  const rawMaxEngine = ENGINE_OPTIONS[engineIdx[1]];
  const formatEngineLabel = (raw) => pretty(beforeSlash(raw));

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

      {/* Aircraft (checkbox group) */}
      <CheckBoxGroup
        title="Aircraft"
        items={AIRCRAFT_OPTIONS}
        selected={selected}
        onChange={toggleAircraft}
      />

      {/* Airframes — discrete range */}
      <div className="mb-8 mt-6">
        <h3 className="text-sm font-semibold text-white mb-3">Airframes</h3>
        <Slider
          className="slider"
          min={0}
          max={AIRFRAME_OPTIONS.length - 1}
          step={1}
          value={airframeIdx}
          onChange={onAirframeChange}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`slider-track ${
                state.index === 0 ? "track-0" : "track-1"
              }`}
            />
          )}
          renderThumb={(props) => (
            <div {...props} className="slider-thumb relative" />
          )}
        />
        <div className="flex justify-between mt-3 text-[.6rem] xl:text-base text-gray-300">
          <span className="text-[.6rem] xl:text-xs font-bold">
            Min: {pretty(airframeMinLabel)}
          </span>
          <span className="text-[.6rem] xl:text-xs font-bold">
            Max: {pretty(airframeMaxLabel)}
          </span>
        </div>
      </div>

      {/* Engine — discrete range with BEFORE-SLASH labels */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white mb-3">Engine</h3>
        <Slider
          className="slider"
          min={0}
          max={ENGINE_OPTIONS.length - 1}
          step={1}
          value={engineIdx}
          onChange={onEngineChange}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`slider-track ${
                state.index === 0 ? "track-0" : "track-1"
              }`}
            />
          )}
          renderThumb={(props) => (
            <div {...props} className="slider-thumb relative" />
          )}
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
            setRangeDraft(v);        // instant UI update
            debouncedSetRange(v);    // parent ko debounced update
          }}
          min={minPrice}
          max={maxPrice}
          step={1000}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`slider-track ${
                state.index === 0 ? "track-0" : "track-1"
              }`}
            />
          )}
          renderThumb={(props) => <div {...props} className="slider-thumb" />}
        />
        <div className="flex justify-between mt-3 text-gray-300">
          <span className="text-[.6rem] xl:text-xs font-bold">
            Min: {Number(rangeDraft?.[0] ?? minPrice).toLocaleString()}
          </span>
          <span className="text-[.6rem] xl:text-xs font-bold">
            Max: {Number(rangeDraft?.[1] ?? maxPrice).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
