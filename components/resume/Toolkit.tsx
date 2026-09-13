"use client";

import { motion, useReducedMotion } from "motion/react";
import { skillGroups } from "@/lib/profile";
import SectionHeading from "./SectionHeading";

export default function Toolkit() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="py-16 sm:py-24">
      <SectionHeading id="toolkit">Toolkit</SectionHeading>
      <div className="flex flex-col gap-6">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <div className="signal-mono w-24 shrink-0 text-xs uppercase tracking-[0.1em]" style={{ color: "var(--signal-text-faint)" }}>
              {group.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="signal-chip">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
