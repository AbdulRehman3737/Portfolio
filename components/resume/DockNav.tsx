"use client";

import { useEffect, useRef, useState } from "react";
import { House, Briefcase, SquaresFour, Wrench, GraduationCap, DownloadSimple } from "@phosphor-icons/react";
import Dock, { type DockItemData } from "@/components/reactbits/Dock";

const SECTIONS = [
  { id: "hero", label: "Home", Icon: House },
  { id: "projects", label: "Projects", Icon: SquaresFour },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "toolkit", label: "Toolkit", Icon: Wrench },
  { id: "education", label: "Education", Icon: GraduationCap },
] as const;

export default function DockNav({ reduceMotion }: { reduceMotion: boolean }) {
  const [active, setActive] = useState<string>("hero");
  // While a dock click is smooth-scrolling, the observer would otherwise light up
  // every section the page passes on the way. Hold the clicked target until the
  // scroll settles.
  const lockRef = useRef<string | null>(null);
  const releaseRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Most anchors are on the section's <h2>. Watch the whole <section> so there is
    // always one section under the viewport's center line.
    const targets = SECTIONS.map(({ id }) => {
      const anchor = document.getElementById(id);
      const section = anchor?.closest("section") ?? anchor;
      return section ? { id, el: section } : null;
    }).filter((t): t is { id: (typeof SECTIONS)[number]["id"]; el: HTMLElement } => Boolean(t));
    if (targets.length === 0) return;

    const idFor = new Map(targets.map((t) => [t.el, t.id]));
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(idFor.get(hit.target as HTMLElement) ?? "hero");
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t.el));

    // The last section may be too short to ever reach the center line.
    const onScroll = () => {
      if (lockRef.current) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(targets[targets.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    releaseRef.current?.();
    setActive(id);
    lockRef.current = id;

    // Release on `scrollend`, or after scrolling has been idle for a moment. The idle
    // timer covers browsers without `scrollend` and clicks that don't scroll at all.
    let idle = 0;
    const release = () => {
      lockRef.current = null;
      window.clearTimeout(idle);
      window.removeEventListener("scrollend", release);
      window.removeEventListener("scroll", bump);
      releaseRef.current = null;
    };
    releaseRef.current = release;
    const bump = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(release, 180);
    };
    window.addEventListener("scrollend", release);
    window.addEventListener("scroll", bump, { passive: true });
    bump();

    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const items: DockItemData[] = [
    ...SECTIONS.map(({ id, label, Icon }) => ({
      label,
      onClick: () => scrollTo(id),
      icon: <Icon size={20} weight={active === id ? "fill" : "regular"} color={active === id ? "var(--signal-amber)" : "currentColor"} />,
    })),
    {
      label: "Resume",
      onClick: () => {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "";
        a.click();
      },
      icon: <DownloadSimple size={20} />,
    },
  ];

  return <Dock items={items} reduceMotion={reduceMotion} />;
}
