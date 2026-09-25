"use client";

import { motion, useReducedMotion } from "motion/react";
import CockpitConsoleArt from "./CockpitConsoleArt";
import ProjectCarousel, { type CarouselProject } from "@/components/reactbits/ProjectCarousel";
import { projects } from "@/lib/projects";

const items: CarouselProject[] = projects.map((project) => ({
  slug: project.slug,
  name: project.name,
  blurb: project.blurb,
  tags: project.stack.slice(0, 5),
  impact: project.impact,
  image: project.screenshot,
  fallback: project.screenshot ? undefined : <CockpitConsoleArt />,
  liveUrl: project.liveUrl,
  repoUrl: project.repoUrl,
  footNote: project.internal && !project.liveUrl && !project.repoUrl ? "Internal tool · Jeeny" : undefined,
}));

export default function Projects() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="py-16 sm:py-24">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ProjectCarousel
          items={items}
          reduceMotion={reduceMotion}
          // Same type as the other section headings; the carousel supplies the spacing
          // so the controls can share the heading's row.
          heading={
            <h2 id="projects" className="signal-display scroll-mt-24 text-3xl sm:text-4xl">
              Projects
            </h2>
          }
        />
      </motion.div>
    </section>
  );
}
