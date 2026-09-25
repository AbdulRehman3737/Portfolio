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
  highlights?: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  screenshot?: string;
};

export const projects: Project[] = [
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
    highlights: [
      "GC content, molecular weight, reverse complement, transcription, translation and ORF detection",
      "Restriction-enzyme cutting-site analysis across 20 enzymes",
      "Two analysis modes: a fast in-browser JS pass and an accurate Python (Biopython) pass",
      "JSON export of results",
      "Consolidated from three services into one serverless Next.js app",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Biopython"],
    liveUrl: "https://bio-genome-fe.vercel.app",
    repoUrl: "https://github.com/AbdulRehman3737/Bioinformatics-Primitive",
    screenshot: "/projects/biogenome.png",
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
    highlights: [
      "Home page that leads with mission and impact, backed by a programs grid",
      "About page telling the organization's story, plus contact and donate flows",
      "Animated stat counters and staggered scroll reveals",
      "Custom deep teal, coral and cream palette with bold display type, deliberately unlike a nonprofit template",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://aspire-foundation-ten.vercel.app",
    repoUrl: "https://github.com/AbdulRehman3737/AspireFoundation",
    screenshot: "/projects/aspire-foundation.png",
  },
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
    highlights: [
      "Replaced direct database commands, gated by Slack permission requests and Jira tickets, with a proper UI",
      "Manages live configuration for driver offer distances, banners, surge, landmark offers, and ride matching and dispatching rules",
      "Role-based ACL so each team only sees and changes the configuration relevant to it",
      "NestJS proxy in front of Jeeny's existing Java microservices, bridged over Axios",
      "Used daily across the Lahore, Karachi and Jordan offices, and in continuous development for 3+ years",
    ],
    stack: ["NestJS", "React", "MongoDB", "Axios", "ACL / RBAC"],
  },
  {
    slug: "prometheus",
    name: "Prometheus",
    status: "shipped",
    blurb:
      "An invite-only network that makes curated introductions between single-family offices managing $1B+ and the founders and fund managers looking to reach them.",
    description: [
      "Prometheus is a private network for the principals of single-family offices managing $1 billion or more in assets. Its whole purpose is warm, curated introductions: the right people, at the right moment, for the relationships that move private capital and close transactions.",
      "The public site sets that tone with a restrained, editorial landing page and two separate intake flows. Family offices request an invite, and founders and fund managers submit a deal for the community to review. Both sit alongside a full legal and disclosure library, which a regulated investment business needs.",
    ],
    highlights: [
      "Two audience-specific funnels: Request Invite for family offices, Submit Deal for founders and fund managers",
      "Structured intake forms that capture entity type (single or multi family office, UHNW, institutional, founder, fund manager), entity name, website and LinkedIn",
      "A legal library covering privacy policy, terms of use, community guidelines, disclosure library and important disclosures",
      "Product analytics and session recording to measure how visitors move through the invite and deal funnels",
    ],
    stack: ["Framer"],
    liveUrl: "https://prometheusalts.com",
    screenshot: "/projects/prometheus.png",
  },
  {
    slug: "pulse-iq",
    name: "Pulse iQ",
    status: "shipped",
    blurb:
      "The marketing site for an analytics & AI company: offerings for AI/BI analytics, ROI calculators and HIPAA-compliant healthcare apps, a blog, and an AI chat assistant.",
    description: [
      "Pulse iQ builds analytics and AI tools, ROI calculators and healthcare (EHR) apps for businesses, non-profits and healthcare practices. The marketing site is where all of that is presented: a promo-led hero, offering pages for each product line, an \"Our Story\" page, a blog, and contact and demo flows.",
      "The front end is built with jQuery and Bootstrap: scroll-triggered reveals, responsive layouts across every offering page, carousels for examples and testimonials, and a chat assistant that answers visitor questions.",
    ],
    highlights: [
      "Offering pages for Analytics & AI, ROI Calculators, Smart EHR / Healthcare Apps and Data-Driven Growth",
      "Bootstrap carousels for examples and testimonials, with jQuery-driven interactions",
      "Scroll-reveal animations on the home and offering pages",
      "A blog with an insights section for content marketing",
    ],
    stack: ["jQuery", "Bootstrap"],
    liveUrl: "https://pulse-iq.com",
    screenshot: "/projects/pulse-iq.png",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
