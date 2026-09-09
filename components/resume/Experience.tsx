import { experience } from "@/lib/profile";

export default function Experience() {
  return (
    <section>
      <h2 className="section-label mb-6">Experience</h2>
      <div className="flex flex-col gap-8">
        {experience.map((role) => (
          <div key={role.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg text-text sm:text-xl">
                {role.title} <span className="text-text-muted">· {role.company}</span>
              </h3>
              <span className="whitespace-nowrap text-xs uppercase tracking-wide text-text-faint">
                {role.period}
              </span>
            </div>
            <p className="mt-1 text-sm text-text-muted">{role.context}</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {role.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-sm leading-snug text-text">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
