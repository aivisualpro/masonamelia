// FilterSideBar.jsx
import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import FilterCheckboxList from "./FilterCheckboxList";

const FilterSideBar = ({
  isOpen,
  setIsOpen,
  selected,
  setSelected,

  range,
  setRange,
  minPrice,
  maxPrice,

  airframeRange,
  setAirframeRange,
  minAirframe,
  maxAirframe,

  engineRange,
  setEngineRange,
  minEngine,
  maxEngine,

  aircraftOptions = [],
  onClearAll
}) => {
  const toggleSidebar = () => setIsOpen(!isOpen);

  // 🔒 Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[9]"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`filter-sidebar overflow-y-auto fixed top-0 left-0 w-[80%] max-w-[300px] h-[100vh] bg-black z-[9999] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-end p-4">
          <IoMdClose
            size={28}
            color="white"
            onClick={toggleSidebar}
            className="cursor-pointer"
            aria-label="Close filters"
          />
        </div>

        <div className="px-4 relative overflow-y-auto h-[calc(100vh-64px)] pb-6">
          <FilterCheckboxList
            selected={selected}
            setSelected={setSelected}
            range={range}
            setRange={setRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            aircraftOptions={aircraftOptions}
            airframeRange={airframeRange}
            setAirframeRange={setAirframeRange}
            minAirframe={minAirframe}
            maxAirframe={maxAirframe}
            engineRange={engineRange}
            setEngineRange={setEngineRange}
            minEngine={minEngine}
            maxEngine={maxEngine}
            onClearAll={onClearAll}
          />
        </div>
      </div>
    </>
  );
};

export default FilterSideBar;
