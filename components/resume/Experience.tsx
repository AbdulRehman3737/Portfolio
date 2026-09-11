import Bracket from "./Bracket";
import FadeUp from "./FadeUp";
import { experience } from "@/lib/profile";

export default function Experience() {
  return (
    <section>
      <Bracket>Experience</Bracket>
      <div className="flex flex-col">
        {experience.map((role, i) => (
          <FadeUp key={role.company} index={i}>
            <div className="border-t border-border py-7 sm:flex sm:justify-between sm:gap-8">
              <div className="sm:max-w-xl">
                <h3 className="font-display text-2xl text-text">{role.title}</h3>
                <p className="mt-1 text-xs uppercase text-text-muted" style={{ letterSpacing: "0.06em" }}>
                  {role.company} {"// "}
                  {role.context}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-text">
                      <span className="text-accent">&gt;</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span
                className="mt-3 block whitespace-nowrap text-xs uppercase text-text-faint sm:mt-0"
                style={{ letterSpacing: "0.06em" }}
              >
                {role.period}
              </span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
