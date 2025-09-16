// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import FilterCheckboxList from "./FilterCheckboxList";

// const FilterSideBar = ({
//   selectedFilters,
//   setSelectedFilters,
//   priceRange,
//   setPriceRange,
//   minPrice,
//   maxPrice,
//   categories,
//   isOpen,
//   setIsOpen,
// }) => {
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-[9]"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`filter-sidebar overflow-scroll fixed top-0 left-0 w-[80%] max-w-[300px] h-screen bg-black z-[9999] transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Close Icon */}
//         <div className="flex justify-end p-4">
//           <IoMdClose
//             size={28}
//             color="white"
//             onClick={toggleSidebar}
//             className="cursor-pointer"
//           />
//         </div>

//         {/* Filter Form */}
//         <div className="filter-sidebar p-4 overflow-y-auto h-[calc(100vh-64px)]">
//           <FilterCheckboxList
//             selected={selectedFilters}
//             setSelected={setSelectedFilters}
//             range={priceRange}
//             setRange={(value) => {
//               setPriceRange(value);
//             }}
//             minPrice={minPrice}
//             maxPrice={maxPrice}
//             categories={categories}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterSideBar;


import React from "react";
import { IoMdClose } from "react-icons/io";
import FilterCheckboxList from "./FilterCheckboxList";

const FilterSideBar = ({
  selectedFilters,
  setSelectedFilters,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
  categories,
  isOpen,
  setIsOpen,
  airframeOptions = [],
  engineOptions = [],
  aircraftOptions = [],
}) => {
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[9]"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`filter-sidebar overflow-scroll fixed top-0 left-0 w-[80%] max-w-[300px] h-screen bg-black z-[9999] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <IoMdClose
            size={28}
            color="white"
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        </div>

        <div className="filter-sidebar p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <FilterCheckboxList
            selected={selectedFilters}
            setSelected={setSelectedFilters}
            range={priceRange}
            setRange={(value) => setPriceRange(value)}
            minPrice={minPrice}
            maxPrice={maxPrice}
            airframeOptions={airframeOptions}
            engineOptions={engineOptions}
            aircraftOptions={aircraftOptions}
          />
        </div>
      </div>
    </>
  );
};

export default FilterSideBar;

