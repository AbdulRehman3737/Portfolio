"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "./SectionHeading";
import ProjectChromaGrid from "./ProjectChromaGrid";

export default function Projects() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="py-16 sm:py-24">
      <SectionHeading id="projects">Projects</SectionHeading>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ProjectChromaGrid reduceMotion={reduceMotion} />
      </motion.div>
    </section>
  );
}
