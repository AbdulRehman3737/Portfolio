"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import TrailCard from "./TrailCard";
import CaseFileDetail from "./CaseFileDetail";
import type { Project } from "@/lib/projects";

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Solved",
  "in-progress": "Active investigation",
  archived: "Cold case",
};

function ClosedTeaser({ project }: { project: Project }) {
  return (
    <>
      <div className="stamp-label mb-2 text-[0.8rem]">{project.caseNumber}</div>
      <div className="font-display mb-3 text-2xl sm:text-3xl">{project.name}</div>
      <p className="font-type mb-4 text-base text-ink-soft sm:text-lg">{project.blurb}</p>
      <span
        className="rubber-stamp text-sm"
        style={{ color: project.status === "shipped" ? "var(--string)" : "#3a5a40" }}
      >
        {STATUS_LABEL[project.status]}
      </span>
    </>
  );
}

export default function CaseFile({
  project,
  isOpen,
  onOpen,
  onClose,
  index = 0,
  side = "left",
}: {
  project: Project;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  index?: number;
  side?: "left" | "right";
}) {
  const layoutId = `file-${project.slug}`;

  return (
    <>
      {!isOpen && (
        <TrailCard index={index} side={side} variant="folder">
          <motion.button
            layoutId={layoutId}
            type="button"
            onClick={onOpen}
            className="block w-full text-left"
          >
            <ClosedTeaser project={project} />
          </motion.button>
        </TrailCard>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                layoutId={layoutId}
                className="folder-card max-h-[85vh] w-[92vw] max-w-[680px] overflow-y-auto p-7 sm:p-9"
              >
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case file"
                  className="chip absolute right-4 top-4 flex h-8 w-8 items-center justify-center"
                >
                  <X size={16} />
                </button>
                <CaseFileDetail project={project} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
