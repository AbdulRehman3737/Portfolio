"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
  type SpringOptions,
} from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import "./Dock.css";

export type DockItemData = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
};

type DockItemProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
  reduceMotion: boolean;
};

/**
 * Adapted from reactbits' Dock. Two patches on top of the original source:
 * (1) real <button> elements instead of a div+role="button", for native keyboard
 * activation; (2) the magnify transform now also responds to keyboard focus, not
 * only pointer position — reactbits' own version only triggered the label tooltip
 * on focus, leaving the magnify effect itself mouse-only.
 */
function DockItem({ icon, label, onClick, className = "", mouseX, spring, distance, magnification, baseItemSize, reduceMotion }: DockItemProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const isActive = useMotionValue(0);
  const isFocused = useMotionValue(0);
  const [labelVisible, setLabelVisible] = useState(false);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const sizeFromPointer = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const targetSize = useTransform([sizeFromPointer, isFocused], (latest) => {
    if (reduceMotion) return baseItemSize;
    const [pointerSize, focused] = latest as [number, number];
    return focused ? magnification : pointerSize;
  });
  const size = useSpring(targetSize, spring);

  useEffect(() => {
    const unsubActive = isActive.on("change", (v) => setLabelVisible(v === 1));
    return () => unsubActive();
  }, [isActive]);

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ width: size, height: size }}
      onHoverStart={() => isActive.set(1)}
      onHoverEnd={() => isActive.set(0)}
      onFocus={() => {
        isActive.set(1);
        isFocused.set(1);
      }}
      onBlur={() => {
        isActive.set(0);
        isFocused.set(0);
      }}
      onClick={onClick}
      className={`dock-item ${className}`}
      aria-label={label}
    >
      <div className="dock-icon">{icon}</div>
      <AnimatePresence>
        {labelVisible && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="dock-label"
            role="tooltip"
            style={{ x: "-50%" }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

type DockProps = {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
  reduceMotion?: boolean;
};

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 170, damping: 18 },
  magnification = 64,
  distance = 160,
  panelHeight = 60,
  dockHeight = 200,
  baseItemSize = 44,
  reduceMotion = false,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification, dockHeight]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          if (reduceMotion) return;
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel signal-dock-glass ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Section navigation"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            reduceMotion={reduceMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
