import React, { useMemo, useState, useEffect, useRef } from "react";
import Slider from "react-slider";
import CheckBoxGroup from "./CheckBoxGroup";

const useDebouncedCallback = (cb, delay = 150) => {
  const t = useRef();
  return (...args) => {
    clearTimeout(t.current);
    t.current = setTimeout(() => cb(...args), delay);
  };
};

const toNums = (arr) =>
  arr
    .map((x) => Number(String(x).replace(/,/g, "")))
    .filter(Number.isFinite);

export default function FilterCheckboxList({
  selected,
  setSelected,
  range,              // current server range [min,max] (or undefined)
  setRange,           // debounced → parent → server
  minPrice,           // STABLE domain min for current dataset
  maxPrice,           // STABLE domain max for current dataset
  airframeOptions = [], // STABLE sorted numeric array
  engineOptions = [],   // STABLE sorted numeric array
  aircraftOptions = [],
  airframeRange,
  setAirframeRange,
  engineRange,
  setEngineRange,
}) {
  const debouncedSetRange = useDebouncedCallback(setRange, 150);

  // ---------- PRICE (continuous) ----------
  const fullPriceRange = useMemo(() => {
    const lo = Number.isFinite(minPrice) ? minPrice : 0;
    const hi = Number.isFinite(maxPrice) ? maxPrice : 0;
    return [lo, hi];
  }, [minPrice, maxPrice]);

  const [rangeDraft, setRangeDraft] = useState(range ?? fullPriceRange);
  useEffect(() => {
    // When domain or controlled value changes from parent, sync local draft
    setRangeDraft(range ?? fullPriceRange);
  }, [range?.[0], range?.[1], fullPriceRange[0], fullPriceRange[1]]);

  // ---------- AIRFRAME / ENGINE (discrete) ----------
  const airframeDisabled = (airframeOptions?.length || 0) < 2;
  const engineDisabled = (engineOptions?.length || 0) < 2;

  const lastAirIdx = Math.max(0, airframeOptions.length - 1);
  const lastEngIdx = Math.max(0, engineOptions.length - 1);

  const datasetAirDefault = useMemo(() => [0, lastAirIdx], [lastAirIdx]);
  const datasetEngDefault = useMemo(() => [0, lastEngIdx], [lastEngIdx]);

  const [airframeIdx, setAirframeIdx] = useState(datasetAirDefault);
  const [engineIdx, setEngineIdx] = useState(datasetEngDefault);

  // Reset indices whenever dataset options change (status/categories)
  useEffect(() => setAirframeIdx(datasetAirDefault), [datasetAirDefault]);
  useEffect(() => setEngineIdx(datasetEngDefault), [datasetEngDefault]);

  const onAirframeChange = (val) => {
    if (airframeDisabled) return;
    const next = Array.isArray(val) ? val : [val, val];
    setAirframeIdx(next);
    const slice = airframeOptions.slice(next[0], next[1] + 1);
    const nums = toNums(slice);
    setAirframeRange(nums.length ? [nums[0], nums[nums.length - 1]] : undefined);
  };

  const onEngineChange = (val) => {
    if (engineDisabled) return;
    const next = Array.isArray(val) ? val : [val, val];
    setEngineIdx(next);
    const slice = engineOptions.slice(next[0], next[1] + 1);
    const nums = toNums(slice);
    setEngineRange(nums.length ? [nums[0], nums[nums.length - 1]] : undefined);
  };

  const toggleAircraft = (value) => {
    const slug = String(value).toLowerCase().trim();
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((i) => i !== slug) : [...prev, slug]
    );
  };

  const clearAll = () => {
    setSelected([]);
    setAirframeIdx(datasetAirDefault);
    setEngineIdx(datasetEngDefault);
    setAirframeRange(undefined);
    setEngineRange(undefined);
    setRangeDraft(fullPriceRange);
    setRange(fullPriceRange); // fetch full price range for this dataset
  };

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

      <CheckBoxGroup
        title="Aircraft"
        items={aircraftOptions}
        selected={selected}
        onChange={toggleAircraft}
      />

      {/* Airframes */}
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
        <div className="flex justify-between mt-3 text-[.6rem] xl:text-xs text-gray-300 font-bold">
          <span>Min: {airframeOptions[airframeIdx[0]] ?? "-"}</span>
          <span>Max: {airframeOptions[airframeIdx[1]] ?? "-"}</span>
        </div>
      </div>

      {/* Engine */}
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
        <div className="flex justify-between mt-3 text-[.6rem] xl:text-xs text-gray-300 font-bold">
          <span>Min: {engineOptions[engineIdx[0]] ?? "-"}</span>
          <span>Max: {engineOptions[engineIdx[1]] ?? "-"}</span>
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
            debouncedSetRange(v); // 👉 backend call (debounced)
          }}
          // IMPORTANT: keep domain fixed for the current dataset
          min={fullPriceRange[0]}
          max={fullPriceRange[1]}
          step={1000}
          renderTrack={(props, state) => (
            <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
          )}
          renderThumb={(props) => <div {...props} className="slider-thumb" />}
        />
        <div className="flex justify-between mt-3 text-gray-300">
          <span className="text-[.6rem] xl:text-xs font-bold">
            Min: {Number(rangeDraft?.[0] ?? fullPriceRange[0]).toLocaleString()}
          </span>
          <span className="text-[.6rem] xl:text-xs font-bold">
            Max: {Number(rangeDraft?.[1] ?? fullPriceRange[1]).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
