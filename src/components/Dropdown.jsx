import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dropdown = ({
  items = [],
  className = "",
  isClosing,
  onMouseEnter,
  onMouseLeave,
  location,
}) => {
  const navigate = useNavigate();

  const goToTestimonials = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const el = document.getElementById("testimonial");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: "testimonial" } });
    }
  };

  const goToServiceHighlightAcquisition = (e) => {
    e.preventDefault();
    if (location.pathname === "/acquisition") {
      const el = document.getElementById("service_highlight");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // ✅ route to Acquisition with intent
      navigate("/acquisition", { state: { scrollTo: "service_highlight" } });
    }
  };

  const isActive = (link) => {
    // Support links with hash like "/acquisition#service_highlight" or "/#testimonial"
    if (link.includes("#")) {
      const [path, hash] = link.split("#");
      const wantPath = path || "/";
      const wantHash = hash ? `#${hash}` : "";
      return location.pathname === wantPath && location.hash === wantHash;
    }
    return location.pathname === link;
  };

  return (
    <div
      className={`mt-2 rounded-lg min-w-[220px] bg-[#111218c9] inset-0 ${
        isClosing ? "dropdown-animate-out" : "dropdown-animate-in"
      } ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ transformOrigin: "top center" }}
    >
      <div
        className="flex flex-col z-[99999]"
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {items.map((item, idx) =>
          item.link.includes("#testimonial") ? (
            <a
              key={idx}
              href={item.link}
              onClick={goToTestimonials}
              className={`uppercase block px-4 py-2 my-1 duration-150 transition hover:text-tertiary_color ${
                isActive(item.link) ? "text-tertiary_color" : "text-white"
              }`}
            >
              {item.text}
            </a>
          ) : item.link.includes("#service_highlight") ? (
            <a
              key={idx}
              href={item.link}
              onClick={goToServiceHighlightAcquisition}
              className={`uppercase block px-4 py-2 my-1 duration-150 transition hover:text-tertiary_color ${
                isActive(item.link) ? "text-tertiary_color" : "text-white"
              }`}
            >
              {item.text}
            </a>
          ) : (
            <Link
              key={idx}
              to={item.link}
              className={`uppercase block px-4 py-2 my-1 duration-150 transition hover:text-tertiary_color ${
                isActive(item.link) ? "text-tertiary_color" : "text-white"
              }`}
            >
              {item.text}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Dropdown;
