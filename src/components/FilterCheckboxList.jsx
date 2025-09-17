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

export default function FilterCheckboxList({
  selected,
  setSelected,

  /* PRICE (continuous) */
  range,
  setRange,
  minPrice,
  maxPrice,

  /* AIRFRAME/ENGINE — now also continuous, NOT options arrays */
  airframeRange,                  // [min,max] or undefined
  setAirframeRange,
  minAirframe,
  maxAirframe,

  engineRange,                    // [min,max] or undefined
  setEngineRange,
  minEngine,
  maxEngine,

  /* Categories list for checkboxes */
  aircraftOptions = [],
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
    setSelected([]);
    setRangeDraft(fullPriceRange);
    setRange(fullPriceRange);
    // reset numeric ranges back to domain
    setAirframeRange(undefined);
    setEngineRange(undefined);
  };

  /* helpers to render labels safely (0 should show as 0, not “–”) */
  const fmt = (n) => Number(n ?? 0).toLocaleString();

  return (
    <div className="p-6 rounded-2xl border border-[#ffffff48]">
      <div className="flex justify-between mb-4">
        <h3 className="text-white font-medium">Filter Options</h3>
        <button onClick={clearAll} className="text-white font-medium text-xs hover:text-tertiary_color">
          Clear All
        </button>
      </div>

      <CheckBoxGroup
        title="Aircraft"
        items={aircraftOptions}
        selected={selected}
        onChange={toggleAircraft}
      />

      {/* Airframes (continuous) */}
      <div className="mb-8 mt-6">
        <h3 className="text-sm font-semibold text-white mb-3">Airframes</h3>
        <Slider
          className="slider"
          min={Number(minAirframe ?? 0)}
          max={Number(maxAirframe ?? 0)}
          step={1}
          value={airframeRange ?? [Number(minAirframe ?? 0), Number(maxAirframe ?? 0)]}
          onChange={(v) => {
            const [a, b] = Array.isArray(v) ? v : [v, v];
            setAirframeRange([Number(a), Number(b)]);
          }}
          renderTrack={(props, state) => (
            <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
          )}
          renderThumb={(props) => <div {...props} className="slider-thumb relative" />}
        />
        <div className="flex justify-between mt-3 text-[.6rem] xl:text-xs text-gray-300 font-bold">
          <span>Min: {fmt((airframeRange ?? [minAirframe])[0])}</span>
          <span>Max: {fmt((airframeRange ?? [minAirframe, maxAirframe])[1])}</span>
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
          value={engineRange ?? [Number(minEngine ?? 0), Number(maxEngine ?? 0)]}
          onChange={(v) => {
            const [a, b] = Array.isArray(v) ? v : [v, v];
            setEngineRange([Number(a), Number(b)]);
          }}
          renderTrack={(props, state) => (
            <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
          )}
          renderThumb={(props) => <div {...props} className="slider-thumb relative" />}
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
            <div {...props} className={`slider-track ${state.index === 0 ? "track-0" : "track-1"}`} />
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
