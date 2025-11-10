import React from "react";
import { useLocation } from "react-router-dom";

export default function TaxiCardsDarkSection({ tagline, title, description, cards }) {

  const location = useLocation();

  return (
    <section className="relative overflow-hidden bg-[#111218] py-20 text-slate-100">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-28 h-[28rem] w-[28rem] rotate-12 rounded-full bg-gradient-to-br from-[#1777cb]/20 to-[#1777cb]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-28 h-[28rem] w-[28rem] -rotate-12 rounded-full bg-gradient-to-tr from-[#1777cb]/20 to-[#1777cb]/20 blur-3xl" />
      </div>

      <div className="container px-5">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1 text-xs font-semibold text-slate-300">
            {tagline}
          </div>
          <h2 className="text-3xl mx-auto font-bold tracking-tight md:text-4xl max-w-3xl py-4">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
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
