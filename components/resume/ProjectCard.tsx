import Image from "next/image";
import { ExternalLink, Lock, TrendingUp } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <div
      className={`card flex flex-col overflow-hidden transition-colors hover:border-text-faint ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div
        className={`relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-bg ${
          featured ? "sm:aspect-auto sm:w-2/5" : ""
        }`}
      >
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`Screenshot of ${project.name}`}
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${project.color}26, ${project.color}08)` }}
          >
            <Lock size={featured ? 52 : 40} style={{ color: project.color }} aria-hidden="true" />
          </div>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${featured ? "sm:p-7" : ""}`}>
        <div className="mb-2 flex items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: project.color }}
            aria-hidden="true"
          />
          <h3 className={`font-display text-text ${featured ? "text-xl" : "text-lg"}`}>{project.name}</h3>
        </div>
        <p className={`leading-snug text-text-muted ${featured ? "text-base" : "text-sm"}`}>{project.blurb}</p>
        {featured && project.description[1] && (
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{project.description[1]}</p>
        )}
        {project.impact && (
          <p className="mt-3 flex items-center gap-2 text-sm font-medium" style={{ color: project.color }}>
            <TrendingUp size={14} className="shrink-0" aria-hidden="true" />
            {project.impact}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="chip px-2 py-0.5 text-[0.68rem]">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-text"
            >
              Live <ExternalLink size={13} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
            >
              <GithubIcon size={13} /> Source
            </a>
          )}
          {project.internal && !project.liveUrl && !project.repoUrl && (
            <span className="text-sm text-text-faint">Internal tool · Jeeny</span>
          )}
        </div>
      </div>
    </div>
  );
}
