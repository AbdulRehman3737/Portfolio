"use client";

import { useEffect, useState, type RefObject } from "react";

export type ConnectorSegment = {
  p1: { x: number; y: number };
  c: { x: number; y: number };
  p2: { x: number; y: number };
};

export function useConnectorPaths(
  containerRef: RefObject<HTMLDivElement | null>,
  nodeRefs: RefObject<(HTMLDivElement | null)[]>,
) {
  const [segments, setSegments] = useState<ConnectorSegment[]>([]);

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      const points = nodeRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          top: { x: r.left + r.width / 2 - cRect.left, y: r.top - cRect.top },
          bottom: { x: r.left + r.width / 2 - cRect.left, y: r.bottom - cRect.top },
        };
      });

      const next: ConnectorSegment[] = [];
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        if (!a || !b) continue;
        const p1 = a.bottom;
        const p2 = b.top;
        const dx = Math.abs(p2.x - p1.x);
        const sag = Math.min(90, 32 + dx * 0.24);
        const jitter = i % 2 === 0 ? 14 : -14;
        const midX = (p1.x + p2.x) / 2 + jitter;
        const midY = (p1.y + p2.y) / 2 + sag;
        next.push({ p1, c: { x: midX, y: midY }, p2 });
      }
      setSegments(next);
    }

    measure();
    const raf = requestAnimationFrame(measure);
    const timeouts = [setTimeout(measure, 300), setTimeout(measure, 900)];
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach(clearTimeout);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeRefs.current.length]);

  return segments;
}
