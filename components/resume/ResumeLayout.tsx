"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function ResumeLayout({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const sections = Children.toArray(children);

  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-16 px-6 py-16 lg:px-10 lg:py-20">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
        >
          {section}
        </motion.div>
      ))}
    </div>
  );
}
