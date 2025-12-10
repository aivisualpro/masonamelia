import React from "react";
import image from "../../public/images/clearForTakeoff.webp"

export default function ClearForTakeoff({
  eyebrow,                // small label above title
  title,                  // main heading
  subtitle,               // bold subheading
  intro,                  // intro paragraph
  bullets = [],           // array of bullet strings
  outro,                  // closing line
  imageAlt = "",
  imageOn = "right",      // "right" | "left"
}) {
  const imageFirst = imageOn === "left";

  return (
    <section className="relative bg-[#fff] py-20">
      <div className="container px-5">
        <div
          className={`flex lg:flex-row flex-col gap-8 ${
            imageFirst ? "md:[&>div:first-child]:order-2" : ""
          }`}
        >
          {/* Text */}
          <div className="lg:w-1/2 w-full">
            {title && (
              <h2 className="text-[1.8rem] md:text-[3rem] xl:text-7xl font-bold tracking-tight text-[#111218]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl xl:text-2xl font-bold text-[#222] py-6">
                {subtitle}
              </p>
            )}
            {intro && <p className="text-[#222] md:text-lg">{intro}</p>}

            {bullets.length > 0 && (
              <ul className="mt-6 space-y-3 text-text-[#222]">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-tertiary_color" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {outro && <p className="mt-6 text-[#222]">{outro}</p>}
          </div>

          {/* Image */}
          <div className="relative lg:w-1/2 w-full">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-sky-500/10 blur-3xl" />
            <img
              src={image}
              alt={imageAlt}
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
