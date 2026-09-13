"use client";

import { useEffect, useState } from "react";
import { House, Briefcase, SquaresFour, Wrench, GraduationCap, DownloadSimple } from "@phosphor-icons/react";
import Dock, { type DockItemData } from "@/components/reactbits/Dock";

const SECTIONS = [
  { id: "hero", label: "Home", Icon: House },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: SquaresFour },
  { id: "toolkit", label: "Toolkit", Icon: Wrench },
  { id: "education", label: "Education", Icon: GraduationCap },
] as const;

export default function DockNav({ reduceMotion }: { reduceMotion: boolean }) {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
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
