export type ProjectStatus = "shipped" | "in-progress" | "archived";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  internal?: boolean;
  blurb: string;
  description: string[];
  architectureNote?: string;
  impact?: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  screenshot?: string;
  color: string;
};

export const projects: Project[] = [
  {
    slug: "cockpit",
    name: "Cockpit",
    status: "shipped",
    internal: true,
    blurb:
      "Jeeny's internal configuration platform. Replaces manual database commands and Slack permission chains with a proper UI and access-control layer.",
    description: [
      "Cockpit is Jeeny's internal configuration platform, built to replace a process where ops and logic teams changed live configuration — driver offer distances, banners, surge, landmark offers, ride matching and dispatching rules, and more — by running commands directly against the database, gated by ad-hoc Slack permission requests and Jira tickets.",
      "I was the sole architect, working directly with the CTO and the requirements engineering team: a NestJS backend proxy in front of Jeeny's existing Java microservices (bridged over Axios), a role-based ACL layer so each team only sees and can change the configuration relevant to them, and the React UI on top. It's used daily by roughly 100-150 people across ops and logic teams in Jeeny's Lahore, Karachi, and Jordan offices, and has been in continuous development for over 3 years as new modules get added.",
    ],
    impact: "Config changes: hours-to-days → minutes, for ~100-150 users across 3 offices",
    stack: ["NestJS", "React", "MongoDB", "Axios", "ACL / RBAC"],
    color: "#a78bfa",
  },
  {
    slug: "biogenome",
    name: "BioGenome",
    status: "shipped",
    blurb:
      "A bioinformatics analytics platform for DNA/RNA/protein sequence analysis and restriction-enzyme mapping, built as a fast, serverless Next.js app.",
    description: [
      "BioGenome is a bioinformatics analytics platform for working with DNA, RNA, and protein sequences: GC content, molecular weight, reverse complement, transcription, translation, and ORF detection, plus restriction-enzyme cutting-site analysis across 20 enzymes.",
      "It runs sequence analysis in two modes — a fast in-browser/JS pass for quick iteration, and an accurate Python (Biopython) pass for verification — and exports results as JSON. The UI is a dark, glassmorphism-styled interface built for researchers moving quickly between sequences.",
    ],
    architectureNote:
      "Originally built as three separate services — a Next.js frontend, a NestJS API gateway, and a Python/Biopython/FastAPI analysis service backed by MongoDB. That split added real operational cost for a low-traffic tool, so it was consolidated into a single serverless Next.js app with API routes doing the analysis directly — same functionality, far less infrastructure to run and pay for.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Biopython"],
    liveUrl: "https://bio-genome-fe.vercel.app",
    repoUrl: "https://github.com/AbdulRehman3737/Bioinformatics-Primitive",
    screenshot: "/projects/biogenome.png",
    color: "#22d3ee",
  },
  {
    slug: "aspire-foundation",
    name: "AspireFoundation",
    status: "shipped",
    blurb:
      "A donor-facing marketing site for a non-profit running orphan care, medical aid, food distribution, and emergency relief programs — home, about, programs, contact and donate.",
    description: [
      "AspireFoundation is the public site for a non-profit focused on sustainable community initiatives: orphan care, medical aid, food security, and emergency relief. The home page leads with mission and impact, backed by a programs grid, an about page telling the org's story, and contact/donate flows.",
      "Uses a deep teal/coral/cream palette, bold display type, animated stat counters, and staggered scroll reveals. The brief was to avoid feeling like a generic nonprofit template.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aspire-foundation-ten.vercel.app",
    repoUrl: "https://github.com/AbdulRehman3737/AspireFoundation",
    screenshot: "/projects/aspire-foundation.png",
    color: "#fb7185",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
