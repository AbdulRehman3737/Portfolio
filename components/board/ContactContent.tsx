import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/profile";

export default function ContactContent() {
  return (
    <div>
      <div className="stamp-label mb-4 text-[0.8rem]">Make contact</div>
      <p className="font-type mb-6 text-lg text-ink-soft sm:text-xl">
        {profile.availability} Best reached by email.
      </p>
      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="font-type flex items-center gap-3 text-base underline underline-offset-2 hover:no-underline sm:text-lg"
        >
          <Mail size={18} />
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-type flex items-center gap-3 text-base underline underline-offset-2 hover:no-underline sm:text-lg"
        >
          <GithubIcon size={18} />
          {profile.githubHandle}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-type flex items-center gap-3 text-base underline underline-offset-2 hover:no-underline sm:text-lg"
        >
          <LinkedinIcon size={18} />
          {profile.linkedinHandle}
        </a>
      </div>
    </div>
  );
}
