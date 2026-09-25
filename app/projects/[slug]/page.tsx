import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { STATUS_LABEL } from "@/lib/adapt";
import CockpitConsoleArt from "@/components/resume/CockpitConsoleArt";
import { softBreak } from "@/lib/softBreak";
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/ssr";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Abdul Rehman`,
    description: project.blurb,
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <div className="signal-root relative min-h-screen overflow-x-clip">
      <main className="relative mx-auto max-w-[1100px] px-6 pb-28 pt-10 sm:px-10">
        <Link href="/#projects" className="signal-mono inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] transition-colors hover:text-[var(--signal-amber)]" style={{ color: "var(--signal-text-muted)" }}>
          <ArrowLeft size={14} aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-12 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <h1 className="signal-display text-4xl text-balance [overflow-wrap:anywhere] sm:text-6xl" style={{ color: "var(--signal-text)" }}>
              {softBreak(project.name)}
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed" style={{ color: "var(--signal-text-muted)" }}>
              {project.blurb}
            </p>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[filter] hover:brightness-110"
                  style={{ background: "var(--signal-amber)", color: "#10130a" }}
                >
                  Visit live site <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="signal-chip gap-2 !px-5 !py-2.5 !text-sm">
                  <GithubLogo size={16} aria-hidden="true" /> Source code
                </a>
              )}
            </div>
          </div>
        </header>

        <div
          className={`relative mt-12 overflow-hidden rounded-2xl border ${project.screenshot ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-[21/9]"}`}
          style={{
            borderColor: "var(--signal-border)",
            background: "var(--signal-bg)",
          }}
        >
          {project.screenshot ? (
            <Image src={project.screenshot} alt={`${project.name} homepage`} fill preload sizes="(max-width: 1100px) 100vw, 1020px" className="object-cover object-top" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-full max-w-[480px] sm:scale-125">
                <CockpitConsoleArt />
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <section>
            <SectionLabel>Overview</SectionLabel>
            <div className="flex flex-col gap-5 text-[1.02rem] leading-relaxed" style={{ color: "var(--signal-text-muted)" }}>
              {project.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <>
                <SectionLabel className="mt-12">Highlights</SectionLabel>
                <ul className="flex flex-col gap-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 leading-relaxed" style={{ color: "var(--signal-text-muted)" }}>
                      <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--signal-amber)" }} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {project.architectureNote && (
              <>
                <SectionLabel className="mt-12">Architecture</SectionLabel>
                <p className="leading-relaxed" style={{ color: "var(--signal-text-muted)" }}>
                  {project.architectureNote}
                </p>
              </>
            )}
          </section>

          <aside className="flex flex-col gap-8">
            {project.impact && (
              <div className="rounded-2xl border p-6" style={{ borderColor: "var(--signal-border)", background: "var(--signal-surface)" }}>
                <SectionLabel className="!mb-3">Impact</SectionLabel>
                <p className="leading-relaxed" style={{ color: "var(--signal-text)" }}>
                  {project.impact}
                </p>
              </div>
            )}
            <div className="rounded-2xl border p-6" style={{ borderColor: "var(--signal-border)", background: "var(--signal-surface)" }}>
              <SectionLabel className="!mb-2">Status</SectionLabel>
              <p className="mb-7 flex items-center gap-2 text-sm" style={{ color: "var(--signal-text)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--signal-amber)" }} aria-hidden="true" />
                {STATUS_LABEL[project.status]}
                {project.internal && <span style={{ color: "var(--signal-text-muted)" }}>· Internal tool, not public</span>}
              </p>
              {project.stack.length > 0 && (
                <>
                  <SectionLabel className="!mb-4">Tech stack</SectionLabel>
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech} className="signal-chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        </div>

        {next.slug !== project.slug && (
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-24 flex items-center justify-between gap-6 rounded-2xl border p-6 transition-colors sm:p-8"
            style={{ borderColor: "var(--signal-border)", background: "var(--signal-surface)" }}
          >
            <div>
              <span className="signal-mono text-xs uppercase tracking-[0.1em]" style={{ color: "var(--signal-text-faint)" }}>
                Next project
              </span>
              <div className="signal-display mt-2 text-2xl sm:text-3xl" style={{ color: "var(--signal-text)" }}>
                {softBreak(next.name)}
              </div>
            </div>
            <ArrowRight size={28} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--signal-amber)" }} />
          </Link>
        )}
      </main>
    </div>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`signal-mono mb-5 text-xs uppercase tracking-[0.12em] ${className}`} style={{ color: "var(--signal-text-faint)" }}>
      {children}
    </h2>
  );
}
