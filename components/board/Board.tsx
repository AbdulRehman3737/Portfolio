"use client";

import { useRef, useState, type ReactNode } from "react";
import SubjectContent from "./SubjectContent";
import ContactContent from "./ContactContent";
import RoleContent from "./RoleContent";
import EducationContent from "./EducationContent";
import SkillGroupContent from "./SkillGroupContent";
import TrailCard from "./TrailCard";
import TrailRow from "./TrailRow";
import ConnectorThread from "./ConnectorThread";
import CaseFile from "./CaseFile";
import { useConnectorPaths } from "./useConnectorPaths";
import { experience, skillGroups } from "@/lib/profile";
import { projects, type Project } from "@/lib/projects";

type Side = "left" | "right";

type TrailNode =
  | { kind: "role"; key: string; content: ReactNode }
  | { kind: "education"; key: string; content: ReactNode }
  | { kind: "skills"; key: string; content: ReactNode }
  | { kind: "project"; key: string; project: Project };

const TRAIL_NODES: TrailNode[] = [
  ...experience.map((role) => ({
    kind: "role" as const,
    key: role.company,
    content: <RoleContent role={role} />,
  })),
  { kind: "education", key: "education", content: <EducationContent /> },
  ...projects.map((project) => ({ kind: "project" as const, key: project.slug, project })),
  ...skillGroups.map((group) => ({
    kind: "skills" as const,
    key: group.label,
    content: <SkillGroupContent group={group} />,
  })),
];

export default function Board() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const segments = useConnectorPaths(containerRef, nodeRefs);

  return (
    <div ref={containerRef} className="corkboard relative min-h-dvh w-full px-6 py-24 lg:px-10 lg:py-32">
      <ConnectorThread segments={segments} />

      <div
        ref={(el) => {
          nodeRefs.current[0] = el;
        }}
        className="mx-auto mb-24 max-w-3xl px-3 lg:mb-32 lg:px-0"
      >
        <TrailCard index={0} side="left">
          <SubjectContent />
        </TrailCard>
      </div>

      <div className="mx-auto max-w-[1400px]">
        {TRAIL_NODES.map((node, i) => {
          const side: Side = i % 2 === 0 ? "left" : "right";
          return (
            <TrailRow
              key={node.key}
              side={side}
              ref={(el) => {
                nodeRefs.current[i + 1] = el;
              }}
            >
              {node.kind === "project" ? (
                <CaseFile
                  project={node.project}
                  index={i}
                  side={side}
                  isOpen={openSlug === node.project.slug}
                  onOpen={() => setOpenSlug(node.project.slug)}
                  onClose={() => setOpenSlug(null)}
                />
              ) : (
                <TrailCard index={i} side={side} variant="paper">
                  {node.content}
                </TrailCard>
              )}
            </TrailRow>
          );
        })}
      </div>

      <div
        ref={(el) => {
          nodeRefs.current[TRAIL_NODES.length + 1] = el;
        }}
        className="mx-auto mt-24 max-w-3xl px-3 lg:mt-32 lg:px-0"
      >
        <TrailCard index={TRAIL_NODES.length} side="right">
          <ContactContent />
        </TrailCard>
      </div>
    </div>
  );
}
