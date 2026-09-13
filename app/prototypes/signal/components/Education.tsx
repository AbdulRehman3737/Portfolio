"use client";

import { motion, useReducedMotion } from "motion/react";
import { education } from "@/lib/profile";
import SectionHeading from "./SectionHeading";

export default function Education() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="py-16 sm:py-24">
      <SectionHeading id="education">Education</SectionHeading>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h3 className="signal-display text-xl">{education.degree}</h3>
        <p className="mt-1.5 text-sm" style={{ color: "var(--signal-text-muted)" }}>
          {education.school} · {education.period}
        </p>
        <p
          className="signal-mono mt-4 inline-flex items-center gap-2 text-sm"
          style={{ color: "var(--signal-amber)" }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--signal-amber)" }} aria-hidden="true" />
          {education.current}
        </p>
      </motion.div>
    </section>
  );
}
