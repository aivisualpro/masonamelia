// FilterSideBar.jsx
import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import FilterCheckboxList from "./FilterCheckboxList";

const FilterSideBar = ({
  searchJets,
  setSearchJets,

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
  onClearAll,
}) => {
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}  // 0.75 try karo
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`filter-sidebar fixed top-0 left-0 w-[80%] max-w-[300px] h-[100vh] bg-black z-[9999] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute right-0 top-0 flex justify-end p-4 z-[99999999]">
          <IoMdClose
            size={28}
            color="white"
            onClick={toggleSidebar}
            className="cursor-pointer"
            aria-label="Close filters"
          />
        </div>

        {/* ✅ Make this area flex + scroll */}
        <div className="px-4 relative h-screen overflow-y-auto flex flex-col py-6">
          {/* ✅ This wrapper centers the filter box vertically */}
          <div className="my-auto" style={{ margin: "auto 0" }}>
            <FilterCheckboxList
              searchJets={searchJets}
              setSearchJets={setSearchJets}
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
      </div>
    </>
  );
};

export default FilterSideBar;