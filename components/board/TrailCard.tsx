"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ROTATIONS = [-0.8, 0.9, -0.5, 0.7, -1, 0.5, -0.6, 0.8];

export default function TrailCard({
  index,
  side = "left",
  variant = "paper",
  className = "",
  children,
}: {
  index: number;
  side?: "left" | "right";
  variant?: "paper" | "folder";
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const fromX = side === "left" ? -32 : 32;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: fromX, y: 24 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -4 }}
      style={{ rotate: rotation }}
      className={`relative z-10 flex min-h-[360px] flex-col justify-center p-9 sm:min-h-[440px] sm:p-12 lg:min-h-[580px] lg:p-14 ${
        variant === "folder" ? "folder-card" : "index-card"
      } ${className}`}
    >
      <span className="pin" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
