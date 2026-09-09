import { education } from "@/lib/profile";

export default function Education() {
  return (
    <section>
      <h2 className="section-label mb-6">Education</h2>
      <div>
        <h3 className="font-display text-lg text-text">{education.degree}</h3>
        <p className="mt-1 text-sm text-text-muted">
          {education.school} · {education.period}
        </p>
        <p className="mt-3 text-sm text-text-muted">{education.current}</p>
      </div>
    </section>
  );
}
