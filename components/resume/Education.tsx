import Bracket from "./Bracket";
import { education } from "@/lib/profile";

export default function Education() {
  return (
    <section>
      <Bracket>Education</Bracket>
      <div>
        <h3 className="font-display text-xl text-text">{education.degree}</h3>
        <p className="mt-1 text-xs uppercase text-text-muted" style={{ letterSpacing: "0.06em" }}>
          {education.school} {"// "}
          {education.period}
        </p>
        <p className="mt-3 text-xs text-text-faint">{education.current}</p>
      </div>
    </section>
  );
}
