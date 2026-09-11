"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function FadeUp({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
