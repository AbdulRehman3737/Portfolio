"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { useIsTouch } from "@/lib/useIsTouch";
import DockNav from "./DockNav";

const BlobCursor = dynamic(() => import("@/components/reactbits/BlobCursor"), { ssr: false });

const DESKTOP_QUERY = "(min-width: 900px)";

function subscribeDesktop(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useIsDesktopWidth() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
}

export default function ChromeLayer() {
  const reduceMotion = Boolean(useReducedMotion());
  const isTouch = useIsTouch();
  const isDesktop = useIsDesktopWidth();
  const showCursor = !reduceMotion && !isTouch && isDesktop;

  return (
    <>
      {showCursor && <BlobCursor />}
      <DockNav reduceMotion={reduceMotion} />
    </>
  );
}
