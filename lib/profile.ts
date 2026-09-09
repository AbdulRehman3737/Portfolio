export const profile = {
  name: "Abdul Rehman",
  title: "Senior Full-Stack Engineer",
  location: "Lahore, Pakistan",
  email: "abdurehman917@gmail.com",
  github: "https://github.com/AbdulRehman3737",
  githubHandle: "@AbdulRehman3737",
  linkedin: "https://www.linkedin.com/in/abdul-rehman-10876521b/",
  linkedinHandle: "abdul-rehman-10876521b",
  summary:
    "Senior Full-Stack Engineer with 5+ years building and shipping React + NestJS applications. Owns features end-to-end — from API design and MongoDB schema through to polished frontend and CI/CD. Currently leading platform development at Jeeny, a ride-hailing and mobility platform across Jordan, Saudi Arabia, and Pakistan.",
  availability: "Available for senior full-time roles and mid-to-senior freelance contracts.",
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
    context: "Ride-hailing & mobility platform — Jordan, Saudi Arabia, Pakistan",
    period: "Apr 2023 — Present",
    highlights: [
      "Sole architect of a new platform's React frontend and NestJS + MongoDB backend — blank repo to production.",
      "Built a shared component library adopted across the product; new UI features went from days to hours.",
      "Set up CI/CD and automated testing where none existed; production incidents dropped noticeably.",
      "Mentored junior engineers and owned technical design discussions for the team.",
    ],
  },
  {
    company: "Devsinc",
    title: "Software Engineer",
    context: "Software consultancy",
    period: "Apr 2022 — Apr 2023",
    highlights: [
      "Onboarded into a large, mature codebase and shipped production-ready features from the first sprint.",
      "Refactored legacy modules into clean, modular components — bug reports in those areas fell off meaningfully.",
    ],
  },
  {
    company: "Tkxel",
    title: "Intern Software Engineer",
    context: "Software consultancy",
    period: "Jan 2021 — Mar 2022",
    highlights: [
      "Sole frontend engineer on a client project — converted Figma designs into responsive, accessible UI.",
      "Built Axios-based API integrations with error-handling patterns the team reused on later projects.",
    ],
  },
];

export const education = {
  degree: "B.S. Software Engineering",
  school: "University of Management and Technology, Lahore",
  period: "2017 — 2021",
  current: "AI Nano Degree, University of Management and Technology — Apr 2026 – present",
};
