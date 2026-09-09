import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/profile";

const links = [
  { href: `tel:${profile.phone.replace(/\s+/g, "")}`, label: profile.phone, icon: Phone, external: false },
  { href: `mailto:${profile.email}`, label: profile.email, icon: Mail, external: false },
  { href: profile.github, label: profile.githubHandle, icon: GithubIcon, external: true },
  { href: profile.linkedin, label: profile.linkedinHandle, icon: LinkedinIcon, external: true },
];

export default function ContactLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
      {links.map(({ href, label, icon: Icon, external }) => (
        <li key={href}>
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
          >
            <Icon size={15} />
            <span>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
