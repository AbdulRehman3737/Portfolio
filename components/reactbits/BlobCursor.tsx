"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import "./BlobCursor.css";

type BlobCursorProps = {
  fillColor?: string;
  size?: number;
  innerSize?: number;
  innerColor?: string;
  opacity?: number;
  fastDuration?: number;
  fastEase?: string;
};

/**
 * Adapted from reactbits' Blob Cursor. Reduced from the default 3-blob trailing
 * effect to a single small, low-opacity dot (this project's craft-floor pass flags
 * custom cursors as a generic "AI template" tell, so this is scoped down to read as
 * a refined focus indicator rather than a decorative flourish). Also patched to
 * track `window` mousemove and render in a fixed, fully `pointer-events: none`
 * layer — the original tracks its own bounding box via onMouseMove, which only
 * works when scoped to a small demo container, not a full page overlay.
 */
export default function BlobCursor({
  fillColor = "#eab269",
  size = 22,
  innerSize = 8,
  innerColor = "rgba(10, 14, 20, 0.85)",
  opacity = 0.55,
  fastDuration = 0.12,
  fastEase = "power3.out",
}: BlobCursorProps) {
  const blobRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const el = blobRef.current;
      if (!el) return;
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: fastDuration, ease: fastEase });
    },
    [fastDuration, fastEase]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);

  return (
    <div className="blob-cursor-container" aria-hidden="true">
      <div
        ref={blobRef}
        className="blob-cursor-dot"
        style={{
          width: size,
          height: size,
          backgroundColor: fillColor,
          opacity,
        }}
      >
        <div
          className="blob-cursor-inner"
          style={{
            width: innerSize,
            height: innerSize,
            top: (size - innerSize) / 2,
            left: (size - innerSize) / 2,
            backgroundColor: innerColor,
          }}
        />
      </div>
    </div>
  );
}
