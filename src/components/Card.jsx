// import React, { useMemo } from "react";
// import { motion } from "framer-motion";
// import { Link, useLocation } from "react-router-dom";
// import DOMPurify from "dompurify";

// const categoryGradients = {
//   acquired: ["from-[#3b82f6]", "to-[#7eb0fc]"],
//   "coming-soon": ["from-[#9333ea]", "to-[#c084fc]"],
//   "for-sale": ["from-[#6bfc3f]", "to-[#a5fc8a]"],
//   "off-market": ["from-[#4e54fc]", "to-[#8f93fc]"],
//   "sale-pending": ["from-[#9a2c3a]", "to-[#ce93d8]"],
//   sold: ["from-[#ff0000]", "to-[#fc6262]"],
//   wanted: ["from-[#f97316]", "to-[#fb923c]"],
// };

// const Card = ({ detail }) => {

  
//   const location = useLocation();
  
//   console.log("detail", location.pathname, detail)

//   const categoryName =
//     (typeof detail?.category === "string"
//       ? detail?.category
//       : detail?.raw?.status) // fallback if object provided
//       ?.toLowerCase() || "";

//   const gradient =
//     categoryGradients[categoryName] || ["from-[#ff8a41]", "to-[#fca168]"];

//   // Sanitize the incoming HTML (overview)
//   const overviewHTML = useMemo(() => {
//     const dirty = location.pathname !== "/showroom" ? detail?.overview || "" : detail?.raw?.overview || "";
//     return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
//   }, [detail?.raw?.overview]);

//   // Take ONLY the first non-empty paragraph's text and slice (0, 330)
//   const overviewSnippet = useMemo(() => {
//     const html = overviewHTML || "";
//     if (!html) return "";

//     try {
//       const div = document.createElement("div");
//       div.innerHTML = html;

//       // find first non-empty <p>
//       const paragraphs = Array.from(div.querySelectorAll("p"));
//       let text =
//         paragraphs
//           .map((p) => (p.textContent || "").replace(/\s+/g, " ").trim())
//           .find(Boolean) || (div.textContent || "");

//       text = text.replace(/\s+/g, " ").trim();

//       const MAX = 30;
//       if (text.length <= MAX) return text;
//       // pure slice(0, 330) with a neat ellipsis
//       return text.slice(0, MAX).replace(/\s+$/, "") + "…";
//     } catch {
//       return "";
//     }
//   }, [overviewHTML]);

//   return (
//     <Link to={`/showroom/${detail._id}`}>
//       <motion.div
//         className="relative card rounded-lg overflow-hidden shadow-lg"
//         initial={{ scale: 0 }}
//         whileInView={{ scale: 1 }}
//         viewport={{ once: true, amount: 0.2 }}
//         transition={{ duration: 0.4 }}
//       >
//         {/* Ribbon */}
//         <div
//           className={`absolute top-6 -right-14 w-48 text-center rotate-45 bg-gradient-to-r ${
//             gradient[0]
//           } ${gradient[1]} ${
//             categoryName === "for-sale" ? "text-black" : "text-white"
//           } font-medium py-1 shadow-lg`}
//         >
//           <h1 className="text-[.8rem]">
//             {(typeof detail?.category === "string"
//               ? detail?.category
//               : detail?.raw?.status || ""
//             )
//               .split("-")
//               .map((w) => String(w).toUpperCase())
//               .join(" ")}
//           </h1>
//         </div>

//         {/* Image */}
//         <div className="card-img">
//           <img
//             src={location.pathname !== "/showroom" ? detail?.featuredImage || "" : detail?.raw?.featuredImage || ""}
//             alt={detail?.title || "aircraft"}
//             className="w-full min-h-[225px] object-cover rounded-2xl"
//             // width={640}
//             // height={360}
//             loading="lazy"
//             decoding="async"
//           />
//         </div>

//         {/* Body */}
//         <div className="py-4 px-5 relative mt-2">
//           <div
//             className="liquid-glass--edge"
//             style={{
//               boxShadow:
//                 "inset 3px 3px 3px 0 rgba(255, 255, 255, .05), inset -3px -3px 3px 0 rgba(255, 255, 255, .05)",
//             }}
//           />
//           <h3 className="text-white text-lg mb-2 text-start">
//             {detail?.title?.length > 20 ? detail?.title?.slice(0, 20) + "..." : detail?.title}
//           </h3>

//           {/* Overview snippet (first <p> only, 0..330 chars) */}
//           <div>
//             {overviewSnippet ? (
//               <p className="text-white/90 text-start text-[0.95rem] leading-relaxed">
//                 {overviewSnippet}
//               </p>
//             ) : (
//               <p className="text-white/70">No overview available.</p>
//             )}
//           </div>

//           {/* Price */}
//           <div className="price pt-3 text-start">
//             <span className="text-tertiary_color text-[1.2rem]">
//               {typeof detail?.price === "number"
//                 ? detail?.price === 0 ? "$ Call" : `$ ${detail?.price.toLocaleString()}`
//                 : ""}
//             </span>
//           </div>

//           {/* Mini specs */}
//           <div className="mt-4 flex items-center justify-between gap-4">
//             <div className="w-[33%] flex flex-col items-center gap-2 bg-[#171921] py-2 rounded-lg">
//               <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">
//                 Airframe
//               </span>
//               <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">
//                 {detail?.airframe}
//               </span>
//             </div>
//             <div className="w-[33%] flex flex-col items-center gap-2 bg-[#171921] py-2 rounded-lg">
//               <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">
//                 Engine
//               </span>
//               <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">
//                 {detail?.engine}
//               </span>
//             </div>
//             <div className="w-[33%] flex flex-col items-center gap-2 bg-[#171921] py-2 rounded-lg">
//               <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">
//                 Propeller
//               </span>
//               <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">
//                 {detail?.propeller}
//               </span>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// export default React.memo(Card);



import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const categoryGradients = {
  acquired: ["from-[#3b82f6]", "to-[#7eb0fc]"],
  "coming-soon": ["from-[#9333ea]", "to-[#c084fc]"],
  "for-sale": ["from-[#6bfc3f]", "to-[#a5fc8a]"],
  "off-market": ["from-[#4e54fc]", "to-[#8f93fc]"],
  "sale-pending": ["from-[#9a2c3a]", "to-[#ce93d8]"],
  sold: ["from-[#ff0000]", "to-[#fc6262]"],
  wanted: ["from-[#f97316]", "to-[#fb923c]"],
};

const Card = ({ detail }) => {
  const status = (detail?.status || "").toLowerCase();
  const gradient = categoryGradients[status] || ["from-[#ff8a41]", "to-[#fca168]"];

  // sanitize overview (HTML string from server)
  const overviewHTML = useMemo(() => {
    const html = detail?.overview || "";
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  }, [detail?.overview]);

  // first non-empty paragraph -> trimmed snippet
  const overviewSnippet = useMemo(() => {
    if (!overviewHTML) return "";
    try {
      const div = document.createElement("div");
      div.innerHTML = overviewHTML;
      const paras = Array.from(div.querySelectorAll("p"));
      let text =
        paras.map(p => (p.textContent || "").replace(/\s+/g, " ").trim()).find(Boolean) ||
        (div.textContent || "");
      text = text.replace(/\s+/g, " ").trim();
      const MAX = 120; // a sane preview length
      return text.length <= MAX ? text : text.slice(0, MAX).replace(/\s+$/, "") + "…";
    } catch {
      return "";
    }
  }, [overviewHTML]);

  const ribbonText = (status || "for-sale")
    .split("-")
    .map(w => String(w).toUpperCase())
    .join(" ");

  const imgSrc = detail?.featuredImage || "";

  return (
    <Link to={`/showroom/${detail?._id}`}>
      <motion.div
        className="relative card rounded-lg overflow-hidden shadow-lg"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        {/* Ribbon */}
        <div
          className={`absolute top-6 -right-14 w-48 text-center rotate-45 bg-gradient-to-r ${gradient[0]} ${gradient[1]} ${
            status === "for-sale" ? "text-black" : "text-white"
          } font-medium py-1 shadow-lg`}
        >
          <h1 className="text-[.8rem]">{ribbonText}</h1>
        </div>

        {/* Image */}
        <div className="card-img">
          <img
            src={imgSrc}
            alt={detail?.title || "aircraft"}
            className="w-full min-h-[225px] object-cover rounded-2xl"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Body */}
        <div className="py-4 px-5 relative mt-2">
          <div
            className="liquid-glass--edge"
            style={{
              boxShadow:
                "inset 3px 3px 3px 0 rgba(255, 255, 255, .05), inset -3px -3px 3px 0 rgba(255, 255, 255, .05)",
            }}
          />
          <h3 className="text-white text-lg mb-2 text-start">
            {detail?.title?.length > 20 ? detail.title.slice(0, 20) + "..." : (detail?.title || "")}
          </h3>

          <div>
            {overviewSnippet ? (
              <p className="text-white/90 text-start text-[0.95rem] leading-relaxed">{overviewSnippet.length > 20 ? overviewSnippet.slice(0, 20) + "..." : overviewSnippet}</p>
            ) : (
              <p className="text-white/70">No overview available.</p>
            )}
          </div>

          {/* Price */}
          <div className="price pt-3 text-start">
            <span className="text-tertiary_color text-[1.2rem]">
              {typeof detail?.price === "number"
                ? detail.price === 0
                  ? "$ Call"
                  : `$ ${detail.price.toLocaleString()}`
                : ""}
            </span>
          </div>

          {/* Mini specs */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="w-[33%] flex flex-col items-center gap-2 bg-[#171921] py-2 rounded-lg">
              <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">Airframe</span>
              <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">{detail?.airframe ?? 0}</span>
            </div>
            <div className="w-[33%] flex flex-col items-center gap-2 bg-[#171921] py-2 rounded-lg">
              <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">Engine</span>
              <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">{detail?.engine ?? 0}</span>
            </div>
            <div className="w-[33%] flex flex-col items-center gap-2 bg-[#171921] py-2 rounded-lg">
              <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">Propeller</span>
              <span className="text-white xl:text-[.8rem] lg:text-[.6rem] text-[.8rem]">{detail?.propeller ?? 0}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default React.memo(Card);
