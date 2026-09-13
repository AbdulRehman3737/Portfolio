"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/profile";
import { useIsTouch } from "../lib/useIsTouch";
import ProfileBeacon from "./ProfileBeacon";

const LightRays = dynamic(() => import("../reactbits/LightRays"), { ssr: false });

export default function Hero() {
  const reduceMotion = Boolean(useReducedMotion());
  const isTouch = useIsTouch();
  const showRays = !reduceMotion;

  return (
    <section id="hero" className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden scroll-mt-24">
      {showRays ? (
        <>
          <div className="pointer-events-none absolute inset-0">
            <LightRays
              raysOrigin="top-center"
              raysColor="#eab269"
              raysSpeed={1.1}
              lightSpread={0.45}
              rayLength={2.2}
              pulsating
              fadeDistance={1.1}
              saturation={0.75}
              followMouse
              mouseInfluence={0.06}
            />
          </div>
          {/* Softens the shader's own fade-out into a smooth dissolve rather than
              the hard-edged cutoff the raw ray falloff leaves above the card. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 0%, transparent 38%, var(--signal-bg) 72%)" }}
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(234,178,105,0.18), transparent 70%)" }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-[1] mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-14 px-6 py-20 sm:grid-cols-[minmax(0,460px)_1fr] sm:gap-16 sm:py-24">
        <ProfileBeacon reduceMotion={reduceMotion} isTouch={isTouch} />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="text-center sm:text-left"
        >
          <p className="signal-mono mb-3 text-xs uppercase tracking-[0.15em]" style={{ color: "var(--signal-text-faint)" }}>
            {profile.location}
          </p>
          <h1 className="signal-display text-6xl sm:text-7xl lg:text-[6rem]">{profile.name}</h1>
          <p className="signal-display mt-3 text-2xl sm:text-3xl" style={{ color: "var(--signal-amber)" }}>
            {profile.title}
          </p>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-snug sm:mx-0 sm:text-xl" style={{ color: "var(--signal-text)" }}>
            {profile.summary}
          </p>
          <p className="mt-5 text-sm" style={{ color: "var(--signal-text-faint)" }}>
            {profile.availability}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
