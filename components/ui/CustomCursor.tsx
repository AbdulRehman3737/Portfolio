"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    document.documentElement.classList.add("custom-cursor-active");
    // One-time client-only capability check (matchMedia) that can't run during SSR/render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor-hover]")));
    };
    window.addEventListener("pointermove", handleMove);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{ scale: hovering ? 1.25 : 1, rotate: hovering ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ position: "relative", width: 26, height: 26 }}
      >
        <span
          className="absolute rounded-full border-2"
          style={{ borderColor: "var(--string)", top: 0, left: 0, width: 18, height: 18 }}
        />
        <span
          className="absolute rounded-full"
          style={{ background: "rgba(163,36,29,0.12)", top: 0, left: 0, width: 18, height: 18 }}
        />
        <span
          className="absolute"
          style={{
            background: "var(--string)",
            width: 2,
            height: 10,
            top: 15,
            left: 16,
            transform: "rotate(45deg)",
            borderRadius: 1,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
