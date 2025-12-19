import React, { useMemo } from "react";

const CheckBoxGroup = ({ title, items = [], selected = [], onChange }) => {
  const topItems = useMemo(() => items.slice(0, 10), [items]);
  const otherItems = useMemo(() => items.slice(10), [items]);

  const otherSlugs = useMemo(
    () => otherItems.map((x) => x?.slug).filter(Boolean),
    [otherItems]
  );

  // Others is checked if ALL hidden slugs are selected
  const othersChecked =
    otherSlugs.length > 0 && otherSlugs.every((s) => selected.includes(s));

  // toggle hidden slugs silently (no UI for them)
  const handleOthersToggle = () => {
    const next = !othersChecked;

    otherSlugs.forEach((slug) => {
      const already = selected.includes(slug);
      if (next && !already) onChange(slug);
      if (!next && already) onChange(slug);
    });
  };

  const formatName = (name = "") =>
    name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const CheckboxRow = ({ label, checked, onToggle }) => (
    <label className="relative flex items-center cursor-pointer mb-4">
      <input type="checkbox" checked={checked} onChange={onToggle} className="sr-only" />
      <div
        className={`w-6 h-6 border border-white/50 rounded-sm overflow-hidden relative transition-colors duration-300 ${
          checked ? "border-white" : ""
        }`}
      >
        <div
          className={`absolute bottom-0 left-0 w-full bg-white transition-all duration-700 ease-out ${
            checked ? "h-full" : "h-0"
          }`}
        />
        {checked && (
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
      <span className="text-white text-base ms-3">{label}</span>
    </label>
  );

  return (
    <div className="pr-2">
      <h4 className="text-white text-sm font-semibold mb-4">{title}</h4>

      <ul className="space-y-2">
        {/* Top 10 visible */}
        {topItems.map((item) => {
          const checked = selected.includes(item.slug);

          return (
            <li key={item.slug}>
              <CheckboxRow
                label={formatName(item?.name)}
                checked={checked}
                onToggle={() => onChange(item.slug)}
              />
            </li>
          );
        })}

        {/* Others visible ONLY */}
        {otherItems.length > 0 && (
          <li key="__others__">
            <CheckboxRow
              label="Others"
              checked={othersChecked}
              onToggle={handleOthersToggle}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default CheckBoxGroup;
