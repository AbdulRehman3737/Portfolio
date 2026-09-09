import { education, experience, profile, skillGroups } from "@/lib/profile";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Abdul Rehman — Resume",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white py-10 print:py-0" style={{ colorScheme: "light" }}>
      <div className="mx-auto max-w-[720px] px-10 font-sans text-[10.5px] leading-[1.45] text-neutral-800 print:px-0">
        <header className="mb-4 border-b border-neutral-300 pb-3">
          <h1 className="text-[22px] font-bold tracking-tight text-neutral-900">{profile.name}</h1>
          <p className="mt-0.5 text-[13px] text-neutral-600">{profile.title}</p>
          <p className="mt-2 text-neutral-600">
            {profile.phone} · {profile.email} · {profile.githubHandle} (github.com/AbdulRehman3737) ·
            linkedin.com/in/{profile.linkedinHandle} · {profile.location} (Remote-open)
          </p>
        </header>

        <section className="mb-4">
          <p className="leading-relaxed text-neutral-700">{profile.summary}</p>
        </section>

        <section className="mb-4">
          <h2 className="mb-2 border-b border-neutral-300 pb-0.5 text-[11px] font-bold uppercase tracking-wide text-neutral-900">
            Experience
          </h2>
          <div className="flex flex-col gap-3">
            {experience.map((role) => (
              <div key={role.company} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-neutral-900">
                    {role.title} · {role.company}
                  </span>
                  <span className="shrink-0 text-neutral-500">{role.period}</span>
                </div>
                <div className="text-neutral-500">{role.context}</div>
                <ul className="mt-1 list-disc pl-4">
                  {role.highlights.map((h) => (
                    <li key={h} className="text-neutral-700">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="mb-2 border-b border-neutral-300 pb-0.5 text-[11px] font-bold uppercase tracking-wide text-neutral-900">
            Projects
          </h2>
          <div className="flex flex-col gap-2.5">
            {projects.map((project) => (
              <div key={project.slug} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-neutral-900">
                    {project.name}
                    {project.internal ? " (internal, Jeeny)" : ""}
                  </span>
                  <span className="shrink-0 text-neutral-500">{project.stack.join(", ")}</span>
                </div>
                <div className="text-neutral-700">{project.blurb}</div>
                {project.impact && <div className="text-neutral-500">Impact: {project.impact}</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="mb-2 border-b border-neutral-300 pb-0.5 text-[11px] font-bold uppercase tracking-wide text-neutral-900">
            Skills
          </h2>
          <div className="flex flex-col gap-0.5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <span className="font-semibold text-neutral-900">{group.label}: </span>
                <span className="text-neutral-700">{group.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 border-b border-neutral-300 pb-0.5 text-[11px] font-bold uppercase tracking-wide text-neutral-900">
            Education
          </h2>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-semibold text-neutral-900">{education.degree}</span>
            <span className="shrink-0 text-neutral-500">{education.period}</span>
          </div>
          <div className="text-neutral-700">{education.school}</div>
          <div className="mt-1 text-neutral-500">{education.current}</div>
        </section>
      </div>
    </div>
  );
}
