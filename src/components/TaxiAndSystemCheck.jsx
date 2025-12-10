import React from "react";
import { useLocation } from "react-router-dom";

export default function TaxiCardsDarkSection({ tagline, title, description, cards }) {

  const location = useLocation();

  return (
    <section className="relative overflow-hidden bg-[#111218] py-20 text-slate-100">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="lg:block hidden absolute -top-40 -right-28 h-[28rem] w-[28rem] rotate-12 rounded-full bg-gradient-to-br from-[#1777cb]/20 to-[#1777cb]/20 blur-3xl" />
        <div className="lg:block hidden absolute -bottom-40 -left-28 h-[28rem] w-[28rem] -rotate-12 rounded-full bg-gradient-to-tr from-[#1777cb]/20 to-[#1777cb]/20 blur-3xl" />
      </div>

      <div className="container px-5">
        <div className="mb-12 text-center">
          <div className="text-[1.8rem] md:text-[3rem] xl:text-7xl inline-block  mx-autoinline-flex items-center gap-2 rounded-full bg-slate-900/60 px-8 py-3 font-bold text-slate-400 border-[1px] border-slate-800">
            {tagline}
          </div>
          <h2 className="mx-auto font-light text-xl xl:text-2xl max-w-3xl py-8">{title}</h2>
          <p className="mx-auto max-w-[55rem] 2xl:max-w-[60rem] md:text-lg text-slate-300">
            {description}
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 md:grid-cols-3 ${location.pathname === "/brokerage" ? "xl:grid-cols-4" : "xl:grid-cols-5"}`}>
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/30 p-5 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              {/* top gradient bar */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.gradient}`} />

              {/* big icon */}
              <div className="mb-4 flex items-center justify-between">
                <div className={`mx-auto md:mx-0 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${card.gradient} text-slate-900`}>{card.icon}</div>
              </div>

              <h3 className="mb-2 text-lg font-semibold md:text-start text-center">{card.title}</h3>

              <div className="mb-4 list-disc space-y-2 text-base text-slate-300 md:text-start text-center">
                {card.points.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100`}>
                <div className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r ${card.gradient} blur-[18px] opacity-20`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
