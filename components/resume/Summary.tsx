import { profile } from "@/lib/profile";

export default function Summary() {
  return (
    <section>
      <p className="max-w-2xl text-lg font-medium leading-relaxed text-text sm:text-xl">
        {profile.summary}
      </p>
      <p className="mt-3 max-w-2xl text-sm text-text-muted">{profile.availability}</p>
    </section>
  );
}
