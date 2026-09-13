"use client";

import ShinyText from "../reactbits/ShinyText";

export default function StatusLine({ text, reduceMotion }: { text: string; reduceMotion: boolean }) {
  return (
    <p className="signal-mono mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.1em]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--signal-amber)" }} aria-hidden="true" />
      <ShinyText text={text} color="rgba(242,237,228,0.66)" shineColor="#eab269" speed={2.6} disabled={reduceMotion} />
    </p>
  );
}
