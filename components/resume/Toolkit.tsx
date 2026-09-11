import Bracket from "./Bracket";
import { skillGroups } from "@/lib/profile";

export default function Toolkit() {
  return (
    <section>
      <Bracket>Toolkit</Bracket>
      <div className="flex flex-col gap-4">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <div className="mb-2 text-[0.65rem] uppercase text-text-faint" style={{ letterSpacing: "0.1em" }}>
              {group.label}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase text-text-muted">
              {group.items.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < group.items.length - 1 ? " /" : ""}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
