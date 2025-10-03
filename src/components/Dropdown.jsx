import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

  const isActive = (link) => {
    // if it's an anchor link (like /#testimonial)
    if (link.includes("#")) {
      return location.pathname === "/" && location.hash === link.replace("/", "");
    }
    // normal path
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
      <div className="flex flex-col z-[99999]" style={{ alignItems: "start", justifyContent: "start" }}>
        {items.map((item, idx) =>
          item.link.includes("#") ? (
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
