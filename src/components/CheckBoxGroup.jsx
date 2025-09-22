import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CheckBoxGroup = ({ title, items, selected, onChange }) => {

  const [aircraftOpen, setAircraftOpen] = useState(false);

  return (
    <div className="pr-2 pt-4">
      <h4 className="text-white text-sm font-semibold mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => {
          const isChecked = title === "Categories" ? selected.includes(item.slug) : selected.includes(item);
          return (
            <li key={item}>
              <label className="relative flex items-center cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => title === "Categories" ? onChange(item.slug) : onChange(item)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 border border-white/50 rounded-sm overflow-hidden relative transition-colors duration-300 ${
                    isChecked ? "border-white" : ""
                  }`}
                >
                  <div
                    className={`absolute bottom-0 left-0 w-full bg-white transition-all duration-700 ease-out ${
                      isChecked ? "h-full" : "h-0"
                    }`}
                  />
                  {isChecked && (
                    <svg
                      className="absolute w-4 h-4 text-black left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                {
                  title === "Categories" ? (
                    <span className="text-white text-base ms-3">{item?.name}</span>
                  ) : (
                    <span className="text-white text-base ms-3">{item}</span>
                  )
                }
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CheckBoxGroup;
