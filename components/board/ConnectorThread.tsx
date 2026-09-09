"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ConnectorSegment } from "./useConnectorPaths";

function segmentPath(s: ConnectorSegment, offset: number) {
  const nx = s.c.x + offset;
  return `M ${s.p1.x} ${s.p1.y} Q ${nx} ${s.c.y} ${s.p2.x} ${s.p2.y}`;
}

export default function ConnectorThread({ segments }: { segments: ConnectorSegment[] }) {
  const reduce = useReducedMotion();

  return (
    <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true">
      {segments.map((s, i) => {
        const transition = { duration: 0.8, ease: "easeInOut" as const };
        const viewport = { once: true, margin: "-30% 0px -30% 0px" };
        return (
          <g key={i} style={{ filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.4))" }}>
            <motion.path
              d={segmentPath(s, 0)}
              stroke="#5c1712"
              strokeWidth={6.5}
              strokeLinecap="round"
              fill="none"
              opacity={0.55}
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewport}
              transition={transition}
            />
            <motion.path
              d={segmentPath(s, 0)}
              stroke="var(--string)"
              strokeWidth={4.5}
              strokeLinecap="round"
              fill="none"
              opacity={0.95}
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewport}
              transition={transition}
            />
            <motion.path
              d={segmentPath(s, 6)}
              stroke="#e8837a"
              strokeWidth={1.4}
              strokeLinecap="round"
              fill="none"
              opacity={0.55}
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewport}
              transition={transition}
            />
          </g>
        );
      })}
    </svg>
  );
}
