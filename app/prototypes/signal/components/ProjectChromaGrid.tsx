"use client";

import { projects } from "@/lib/projects";
import { STATUS_LABEL } from "../lib/adapt";
import ChromaGrid, { type ChromaItem } from "../reactbits/ChromaGrid";
import CockpitConsoleArt from "./CockpitConsoleArt";
import { useIsTouch } from "../lib/useIsTouch";

const GRADIENT_ANGLES = [150, 205, 170];

export default function ProjectChromaGrid({ reduceMotion }: { reduceMotion: boolean }) {
  const isTouch = useIsTouch();

  const items: ChromaItem[] = projects.map((project, i) => {
    const featured = project.slug === "cockpit";
    return {
      image: project.screenshot,
      fallback: !project.screenshot ? <CockpitConsoleArt /> : undefined,
      title: project.name,
      subtitle: project.blurb,
      badge: STATUS_LABEL[project.status],
      tags: project.stack.slice(0, 4),
      liveUrl: project.liveUrl,
      repoUrl: project.repoUrl,
      footNote: project.internal && !project.liveUrl && !project.repoUrl ? "Internal tool · Jeeny" : undefined,
      borderColor: project.color,
      // Muted fill — a toned-down wash of the project color into the surface tone,
      // not the raw saturated hex. The border, badge, and hover spotlight stay the
      // bright, un-muted project.color so the color still reads as an accent.
      // The muted stop is held out to 60% (not just the gradient's start point) so
      // a very wide card (Cockpit spans 2 columns) doesn't end up mostly showing
      // the plain --signal-bg tail — a directional 2-stop gradient on an extreme
      // aspect ratio left most of the box looking like flat black background.
      gradient: `linear-gradient(${GRADIENT_ANGLES[i % GRADIENT_ANGLES.length]}deg, color-mix(in srgb, ${project.color} 26%, var(--signal-surface) 74%) 0%, color-mix(in srgb, ${project.color} 26%, var(--signal-surface) 74%) 60%, var(--signal-bg) 100%)`,
      colSpan: featured ? 2 : 1,
    };
  });

  return <ChromaGrid items={items} columns={2} radius={520} disableSpotlight={reduceMotion || isTouch} />;
}
