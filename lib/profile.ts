export const profile = {
  name: "Abdul Rehman",
  title: "Senior Full-Stack Engineer",
  location: "Lahore, Pakistan",
  phone: "+92 326 4049161",
  email: "abdurehman917@gmail.com",
  github: "https://github.com/AbdulRehman3737",
  githubHandle: "@AbdulRehman3737",
  linkedin: "https://www.linkedin.com/in/abdul-rehman-10876521b/",
  linkedinHandle: "abdul-rehman-10876521b",
  summary:
    "Senior Full-Stack Engineer, 5+ years deep in React and NestJS. I take a feature from API and data model through the UI and into CI/CD myself, rather than handing pieces off between specialists. Currently building platform tooling at Jeeny, an international ride-hailing platform operating primarily in Saudi Arabia and Jordan.",
  availability:
    "Available immediately, open to remote, for senior full-time roles and mid-to-senior freelance contracts.",
};

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["React", "Redux Toolkit", "Material UI", "Tailwind CSS", "Framer Motion", "SWR", "Bootstrap", "SCSS"],
  },
  {
    label: "Backend",
    items: ["NestJS", "Node.js", "MongoDB", "Mongoose", "REST API design"],
  },
  {
    label: "Tooling",
    items: ["CI/CD pipelines", "Automated testing", "Git", "Cursor", "Cline"],
  },
];

export type Role = {
  company: string;
  title: string;
  context: string;
  period: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    company: "Jeeny",
    title: "Senior Software Engineer",
    context:
      "International ride-hailing platform (Android & iOS), primarily Saudi Arabia & Jordan · grew from 362 to 700+ employees during my tenure",
    period: "Apr 2023 — Present",
    highlights: [
      "Sole architect of Cockpit, Jeeny's internal configuration platform, working directly with the CTO and the requirements engineering team. Still in active development after 3+ years, with new modules added regularly.",
      "Built the shared component library the rest of the product now runs on. New UI features that used to take days ship in hours.",
      "Introduced CI/CD and automated testing to a codebase that had neither. Production incidents dropped noticeably afterward.",
      "Mentored 4 mid-level engineers over 5 months — all four are now senior and running independently on the driver, passenger, and ride squads.",
    ],
  },
  {
    company: "Devsinc",
    title: "Software Engineer",
    context: "Software consultancy",
    period: "Apr 2022 — Apr 2023",
    highlights: [
      "Onboarded into a large, mature codebase and was shipping production-ready features by the first sprint.",
      "Refactored legacy modules into clean, modular components. Bug reports in those areas fell off noticeably afterward.",
    ],
  },
  {
    company: "Tkxel",
    title: "Intern Software Engineer",
    context: "Software consultancy",
    period: "Jan 2021 — Mar 2022",
    highlights: [
      "Sole frontend engineer on a client project, turning Figma designs into responsive, accessible UI.",
      "Built the Axios-based API integration patterns other engineers on the team reused for later projects.",
    ],
  },
];

export const education = {
  degree: "B.S. Software Engineering",
  school: "University of Management and Technology, Lahore",
  period: "2017 — 2021",
  current: "AI Nano Degree, University of Management and Technology — Apr 2026 – present",
};
