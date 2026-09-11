import { Download } from "lucide-react";
import Portrait from "./Portrait";
import ContactLinks from "./ContactLinks";
import { profile } from "@/lib/profile";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-[240px_1fr] sm:gap-12">
      <div className="sm:max-w-[240px]">
        <Portrait />
      </div>

      <div>
        <p className="mb-4 flex items-center gap-2 text-xs uppercase" style={{ letterSpacing: "0.1em" }}>
          <span className="h-2 w-2 shrink-0 bg-terminal-green" aria-hidden="true" />
          <span className="text-terminal-green">Status: Open to work</span>
          <span className="text-text-faint">{"// Remote"}</span>
        </p>
        <h1 className="font-display text-5xl text-text sm:text-6xl lg:text-7xl">{profile.name}</h1>
        <p className="mt-4 text-lg uppercase text-text-muted" style={{ letterSpacing: "0.04em" }}>
          {profile.title}
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
          {profile.summary}
        </p>
        <p className="mt-4 text-xs uppercase text-text-faint" style={{ letterSpacing: "0.08em" }}>
          &gt;&gt;&gt; {profile.location}
          <span className="cursor-blink ml-1 text-accent" aria-hidden="true">
            _
          </span>
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-border pt-6">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 border border-accent px-4 py-2 text-xs uppercase text-accent transition-[color,background-color,transform] active:scale-[0.97] hover:bg-accent hover:text-black"
            style={{ letterSpacing: "0.08em" }}
          >
            <Download size={13} />
            Download Resume
          </a>
          <ContactLinks />
        </div>
        <p className="mt-4 text-xs text-text-faint">{profile.availability}</p>
      </div>
    </section>
  );
}
