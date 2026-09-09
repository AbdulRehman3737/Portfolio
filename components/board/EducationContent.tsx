import { education } from "@/lib/profile";

export default function EducationContent() {
  return (
    <div>
      <div className="stamp-label mb-3 text-[0.8rem]">Education on file</div>
      <div className="font-display mb-2 text-2xl sm:text-3xl">{education.degree}</div>
      <div className="font-type mb-1 text-base text-ink-soft sm:text-lg">{education.school}</div>
      <div className="font-type text-sm text-ink-faint">{education.period}</div>
      <div className="mt-5 border-t border-ink/15 pt-4">
        <div className="stamp-label mb-2 text-[0.8rem]">Ongoing</div>
        <p className="font-type text-base text-ink-soft sm:text-lg">{education.current}</p>
      </div>
    </div>
  );
}
