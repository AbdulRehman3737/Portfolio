import { skillGroups } from "@/lib/profile";

export default function Toolkit() {
  return (
    <section>
      <h2 className="section-label mb-4">Toolkit</h2>
      <div className="flex flex-col gap-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
            <span className="w-20 shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-text-faint">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="chip px-2 py-0.5 text-[0.7rem]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
