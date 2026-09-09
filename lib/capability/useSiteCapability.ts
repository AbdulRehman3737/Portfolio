"use client";

import { useEffect, useState } from "react";

function supportsCanvas2D() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("2d"));
  } catch {
    return false;
  }
}

export type SiteCapability = {
  ready: boolean;
  reduceMotion: boolean;
  canvasOk: boolean;
  animatedOk: boolean;
};

export function useSiteCapability(): SiteCapability {
  const [state, setState] = useState<SiteCapability>({
    ready: false,
    reduceMotion: false,
    canvasOk: false,
    animatedOk: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvasOk = supportsCanvas2D();
    // One-time client-only feature detection that can't run during SSR/render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      ready: true,
      reduceMotion: mq.matches,
      canvasOk,
      animatedOk: canvasOk && !mq.matches,
    });
    const handler = (e: MediaQueryListEvent) =>
      setState((s) => ({ ...s, reduceMotion: e.matches, animatedOk: s.canvasOk && !e.matches }));
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return state;
}
