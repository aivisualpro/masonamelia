import { Link } from "react-router-dom";
export default function Button({
  buttonLabel,
  isWidthFull = false,
  isNormalPedding = false,
  onClick,
  isContact = false,
  bgColor = "fff",
  arrowColor = "#fff",
  txtColor = "text-[#111218]",
  borderColor = "border-gray-800",
  fillColor = "fill-gray-800"
}) {
  return (
    
    <Link to={onClick} className="z-[9999]">
      <button
        type="submit"
        className={`${txtColor} flex gap-2 items-center shadow-xl text-sm md:text-lg bg-[#${bgColor}] backdrop-blur-md lg:font-medium isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-tertiary_color hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 md:px-4 py-1 md:py-2 overflow-hidden border-2 border-[${borderColor}] transition-all duration-700 hover:border-tertiary_color rounded-full group`}
      >
        {buttonLabel}
        <svg
          className={`w-5 h-5 md:w-8 md:h-8 justify-end group-hover:rotate-90 border-[1px] ${borderColor} group-hover:bg-gray-50 text-${arrowColor} ease-linear duration-300 rounded-full border border-[${borderColor}] group-hover:border-none md:p-2 p-1 rotate-45`}
          viewBox="0 0 16 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            className={`${fillColor} group-hover:fill-gray-800`}
          ></path>
        </svg>
      </button>
    </Link>
  );
}
