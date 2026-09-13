"use client";

import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/lib/profile";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="py-16 sm:py-24">
      <SectionHeading id="experience">Experience</SectionHeading>
      <div className="flex flex-col gap-20 sm:gap-28">
        {experience.map((role, i) => {
          const reverse = i % 2 === 1;
          const [headline, ...rest] = role.highlights;
          return (
            <motion.div
              key={role.company}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`relative ${reverse ? "sm:text-right" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`signal-display pointer-events-none absolute top-[-2.5rem] select-none text-[7rem] leading-none sm:top-[-4rem] sm:text-[11rem] ${reverse ? "right-0" : "left-0"}`}
                style={{ color: "var(--signal-text)", opacity: 0.045 }}
              >
                0{i + 1}
              </span>

              <div className="relative z-[1]">
                <span className="signal-mono text-xs uppercase tracking-[0.1em]" style={{ color: "var(--signal-text-faint)" }}>
                  {role.period}
                </span>
                <h3 className="signal-display mt-2 text-4xl sm:text-6xl">{role.company}</h3>
                <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--signal-text-muted)" }}>
                  {role.title} · {role.context}
                </p>

                <p className={`mt-7 max-w-2xl text-xl leading-snug sm:text-2xl ${reverse ? "sm:ml-auto" : ""}`} style={{ color: "var(--signal-amber)" }}>
                  {headline}
                </p>

                {rest.length > 0 && (
                  <ul className={`mt-6 flex max-w-xl flex-col gap-2 text-sm leading-relaxed ${reverse ? "sm:ml-auto" : ""}`} style={{ color: "var(--signal-text-muted)" }}>
                    {rest.map((h) => (
                      <li key={h} className={`flex gap-3 ${reverse ? "sm:flex-row-reverse sm:text-right" : ""}`}>
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--signal-text-faint)" }} aria-hidden="true" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
