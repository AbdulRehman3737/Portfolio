import { profile } from "@/lib/profile";

export default function SubjectContent() {
  return (
    <div>
      <div className="mb-5 flex items-center gap-5">
        <div className="font-display flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-ink/70 text-3xl sm:h-24 sm:w-24 sm:text-4xl">
          AR
        </div>
        <div>
          <div className="stamp-label mb-1 text-[0.8rem]">Subject of file</div>
          <h1 className="font-display text-3xl leading-tight sm:text-4xl">{profile.name}</h1>
          <p className="font-type text-base text-ink-soft sm:text-lg">{profile.title}</p>
        </div>
      </div>
      <p className="font-type mb-4 text-[0.8rem] tracking-wide text-ink-soft uppercase">
        Last known location: {profile.location}
      </p>
      <p className="font-type text-lg leading-relaxed sm:text-xl">{profile.summary}</p>
      <div className="mt-5">
        <span className="rubber-stamp text-sm" style={{ color: "var(--string)" }}>
          Open to work
        </span>
      </div>
    </div>
  );
}
