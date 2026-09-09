import type { Role } from "@/lib/profile";

export default function RoleContent({ role }: { role: Role }) {
  return (
    <div>
      <div className="stamp-label mb-2 text-[0.8rem]">{role.period}</div>
      <div className="font-display mb-2 text-2xl sm:text-3xl">{role.title}</div>
      <div className="font-type mb-4 text-base text-ink-soft sm:text-lg">
        {role.company} · {role.context}
      </div>
      <ul className="flex flex-col gap-2.5">
        {role.highlights.map((highlight) => (
          <li key={highlight} className="font-type flex gap-3 text-base leading-snug text-ink sm:text-lg">
            <span className="text-[var(--string)]">—</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
