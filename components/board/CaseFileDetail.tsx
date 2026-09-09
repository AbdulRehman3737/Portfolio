import Image from "next/image";
import { ExternalLink } from "lucide-react";
import BrowserFrame from "@/components/ui/BrowserFrame";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project } from "@/lib/projects";

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Solved",
  "in-progress": "Active investigation",
  archived: "Cold case",
};

export default function CaseFileDetail({ project }: { project: Project }) {
  return (
    <div>
      <div className="stamp-label mb-2">{project.caseNumber}</div>
      <h2 className="font-display mb-3 text-[1.6rem] leading-tight">{project.name}</h2>
      <span
        className="rubber-stamp mb-4 inline-block text-[0.68rem]"
        style={{ color: project.status === "shipped" ? "var(--string)" : "#3a5a40" }}
      >
        {STATUS_LABEL[project.status]}
      </span>
      <p className="font-type mb-5 text-[0.92rem] text-ink-soft">{project.blurb}</p>

      <div className="mb-5">
        <BrowserFrame url={project.liveUrl}>
          <Image
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover object-top"
          />
        </BrowserFrame>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="chip font-type px-2.5 py-1 text-[0.72rem] text-ink-soft">
            {tech}
          </span>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-type inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.78rem] font-bold text-paper transition-transform hover:scale-[1.03]"
          style={{ background: "var(--ink)" }}
        >
          <ExternalLink size={13} />
          Live demo
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="chip font-type inline-flex items-center gap-2 px-4 py-2 text-[0.78rem] font-bold text-ink"
        >
          <GithubIcon size={13} />
          Source
        </a>
      </div>

      <div className="font-type flex max-w-[620px] flex-col gap-3 text-[0.88rem] leading-relaxed text-ink">
        {project.description.map((paragraph, i) => (
          <p key={i} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>

      {project.architectureNote && (
        <div className="mt-5 max-w-[620px] rounded border-l-2 border-ink/30 bg-black/[0.04] p-4">
          <div className="stamp-label mb-1.5">Investigator&apos;s note</div>
          <p className="font-type m-0 text-[0.85rem] leading-relaxed text-ink-soft">
            {project.architectureNote}
          </p>
        </div>
      )}
    </div>
  );
}
