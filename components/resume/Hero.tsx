import { Download } from "lucide-react";
import Portrait from "./Portrait";
import ContactLinks from "./ContactLinks";
import { profile } from "@/lib/profile";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[280px_1fr] lg:gap-16">
      <div className="overflow-hidden rounded-lg border border-border sm:max-w-[280px]">
        <Portrait />
      </div>

      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Open to work · Remote
          </p>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-bg transition-opacity hover:opacity-90"
          >
            <Download size={13} />
            Download Resume
          </a>
        </div>
        <h1 className="font-display text-5xl leading-[1.05] text-text sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl text-text-muted sm:text-2xl">{profile.title}</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
          {profile.summary}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.1em] text-text-faint">{profile.location}</p>
        <div className="mt-6 border-t border-border pt-6">
          <ContactLinks />
          <p className="mt-4 text-sm text-text-faint">{profile.availability}</p>
        </div>
      </div>
    </section>
  );
}
