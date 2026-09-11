import { profile } from "@/lib/profile";

const links = [
  { href: `tel:${profile.phone.replace(/\s+/g, "")}`, label: profile.phone },
  { href: `mailto:${profile.email}`, label: profile.email },
  { href: profile.github, label: profile.githubHandle, external: true },
  { href: profile.linkedin, label: profile.linkedinHandle, external: true },
];

export default function ContactLinks() {
  return (
    <ul
      className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase text-text-muted"
      style={{ letterSpacing: "0.04em" }}
    >
      {links.map(({ href, label, external }) => (
        <li key={href}>
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="transition-colors hover:text-accent"
          >
            {"/// "}
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
