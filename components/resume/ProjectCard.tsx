import Image from "next/image";
import { ExternalLink } from "lucide-react";
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
    <div className="panel transition-colors hover:border-border-strong">
      <div className={featured ? "flex flex-col sm:flex-row" : ""}>
        <div
          className={
            featured
              ? "border-b border-border sm:w-2/5 sm:border-b-0 sm:border-r"
              : "border-b border-border"
          }
        >
          {project.screenshot ? (
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={project.screenshot}
                alt={`Screenshot of ${project.name}`}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-top"
                style={{ filter: "grayscale(0.4) contrast(1.1)" }}
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 p-6 text-center">
              <span className="text-xs uppercase text-accent" style={{ letterSpacing: "0.1em" }}>
                [ Access: Internal ]
              </span>
              <span className="text-[0.65rem] uppercase text-text-faint">No public deploy</span>
            </div>
          )}
        </div>
        <div className={featured ? "p-7" : "p-6"}>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 shrink-0" style={{ background: project.color }} aria-hidden="true" />
            <h3 className={`font-display text-text ${featured ? "text-2xl" : "text-xl"}`}>{project.name}</h3>
          </div>
          <p className={`text-text-muted ${featured ? "text-sm" : "text-sm leading-snug"}`}>{project.blurb}</p>
          {featured && project.description[1] && (
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{project.description[1]}</p>
          )}
          {project.impact && (
            <dl className="mt-4 border-t border-border pt-3 text-xs">
              <dt className="uppercase text-text-faint" style={{ letterSpacing: "0.08em" }}>
                Impact
              </dt>
              <dd className="mt-1 text-accent">{project.impact}</dd>
            </dl>
          )}
          <div className={`mt-4 flex flex-wrap gap-x-3 gap-y-1 uppercase text-text-faint ${featured ? "text-xs" : "text-[0.68rem]"}`}>
            {project.stack.map((tech, i) => (
              <span key={tech}>
                {tech}
                {i < project.stack.length - 1 ? " /" : ""}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-5 text-xs uppercase" style={{ letterSpacing: "0.04em" }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-accent"
              >
                Live <ExternalLink size={12} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-text-muted transition-colors hover:text-text"
              >
                <GithubIcon size={12} /> Source
              </a>
            )}
            {project.internal && !project.liveUrl && !project.repoUrl && (
              <span className="text-text-faint">Internal tool · Jeeny</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
