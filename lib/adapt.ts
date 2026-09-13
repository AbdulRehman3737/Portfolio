import { profile } from "@/lib/profile";
import type { Project } from "@/lib/projects";

export type ProjectAccent = "signal" | "restricted";

export function projectAccent(project: Project): ProjectAccent {
  return project.internal ? "restricted" : "signal";
}

export type ContactLink = { id: string; label: string; href: string; external: boolean };

export function toContactLinks(): ContactLink[] {
  return [
    { id: "phone", label: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}`, external: false },
    { id: "email", label: profile.email, href: `mailto:${profile.email}`, external: false },
    { id: "github", label: profile.githubHandle, href: profile.github, external: true },
    { id: "linkedin", label: profile.linkedinHandle, href: profile.linkedin, external: true },
  ];
}

export const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};
