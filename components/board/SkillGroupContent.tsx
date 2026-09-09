import type { skillGroups } from "@/lib/profile";

export default function SkillGroupContent({ group }: { group: (typeof skillGroups)[number] }) {
  return (
    <div>
      <div className="stamp-label mb-4 text-[0.8rem]">{group.label} toolkit</div>
      <div className="flex flex-wrap gap-2.5">
        {group.items.map((item) => (
          <span key={item} className="chip font-type px-3.5 py-2 text-sm text-ink sm:text-base">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
