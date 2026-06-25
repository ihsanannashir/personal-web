import { ExperienceEntry, TechTagData } from "@/lib/types/item-data";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "CIMB Niaga",
    role: "Software Engineer, AI Enablement & Automation",
    shortRole: "AI Enablement & Automation",
    shortPeriod: "2025 – Present",
    primaryDomain: "ai",
    location: "Jakarta, Indonesia",
    flag: "🇮🇩",
    period: "Jul 2025 – Present",
    factual:
      "Built RAG-based knowledge systems, optimized internal LLM platforms, and created 20+ API endpoints across 3 platforms.",
    narrative:
      "The role where everything clicked — frontend instincts finally meeting AI ambitions.",
    bullets: [
      "Built a RAG-based knowledge management system with multi-role workflows using BullMQ, Node.js, Vue.js, and PostgreSQL",
      "Optimized an internal AI platform's model usage with Gemini and Python",
      "Created 20+ REST API endpoints across 3 internal platforms",
      "Refactored legacy frontend codebase to the latest Vue.js version",
    ],
    tags: [
      { label: "RAG", domain: "ai" },
      { label: "LangChain", domain: "ai" },
      { label: "Vue.js", domain: "frontend" },
      { label: "Node.js", domain: "backend" },
      { label: "PostgreSQL", domain: "backend" },
      { label: "Python", domain: "ai" },
    ],
  },
  {
    company: "Bloom Alternance",
    role: "Frontend Engineer",
    shortRole: "Frontend Engineer",
    shortPeriod: "2024 – 2025",
    primaryDomain: "frontend",
    location: "Paris, France (Remote)",
    flag: "🇫🇷",
    period: "Nov 2024 – Jan 2025",
    factual:
      "Built an email and SMS generation system for B2C communication, refactored React features to the latest TypeScript and React versions.",
    narrative:
      "A short stint that proved I could ship fast and adapt in an entirely different timezone and culture.",
    bullets: [
      "Built an email and SMS generation system for B2C communication using React, Redux, and Node.js",
      "Wrote and tested 2 unit test suites using Cypress",
      "Refactored 2 React features to latest TypeScript and React versions",
    ],
    tags: [
      { label: "React", domain: "frontend" },
      { label: "Redux", domain: "frontend" },
      { label: "Node.js", domain: "backend" },
      { label: "Cypress", domain: "default" },
    ],
  },
  {
    company: "KB Bank",
    role: "Software Engineer, Core Banking System",
    shortRole: "Core Banking System",
    shortPeriod: "2023 – 2024",
    primaryDomain: "backend",
    location: "Jakarta, Indonesia",
    flag: "🇮🇩",
    period: "Dec 2023 – Sept 2024",
    factual:
      "Led migration of an AS400 core banking system to Java-based Finastra, built data migration tooling, and wrote 1,200+ test scripts.",
    narrative:
      "A detour that taught me how software works when the stakes are real and the margin for error is zero.",
    bullets: [
      "Led migration of AS400-based core banking to Java-based platform using Finastra",
      "Developed an integrated data migration system using Java Spring Boot",
      "Created 1,200+ test scripts for the new core banking environment",
    ],
    tags: [
      { label: "Java", domain: "backend" },
      { label: "Spring Boot", domain: "backend" },
      { label: "Finastra", domain: "default" },
    ],
  },
  {
    company: "NoscAi GmbH",
    role: "Frontend Developer",
    shortRole: "Frontend Developer",
    shortPeriod: "2023",
    primaryDomain: "frontend",
    location: "Hamburg, Germany (Remote)",
    flag: "🇩🇪",
    period: "Jun 2023 – Oct 2023",
    factual:
      "Built 15+ features using React, Next.js, Strapi, and GraphQL. Implemented German\u2013English i18n and designed 5 UI pages.",
    narrative:
      "My first international role — shipping features in a second language, in a city I\u2019d never been to.",
    bullets: [
      "Built 15+ features using React, Next.js, Strapi, and GraphQL",
      "Designed 5 UI pages",
      "Implemented German\u2013English i18n with Next.js",
    ],
    tags: [
      { label: "React", domain: "frontend" },
      { label: "Next.js", domain: "frontend" },
      { label: "GraphQL", domain: "backend" },
      { label: "Strapi", domain: "backend" },
    ],
  },
  {
    company: "Hukumonline.com",
    role: "Frontend Engineer Intern",
    shortRole: "Frontend Intern",
    shortPeriod: "2022",
    primaryDomain: "frontend",
    location: "Jakarta, Indonesia",
    flag: "🇮🇩",
    period: "Feb 2022 – Jul 2022",
    factual:
      "Participated in 3 internal projects and co-built an Omnibus Law platform with IT interns using Next.js.",
    narrative:
      "Where it all started — the first time I shipped something real that real people used.",
    bullets: [
      "Participated in 3 internal projects",
      "Co-built an Omnibus Law platform using Next.js",
    ],
    tags: [
      { label: "Next.js", domain: "frontend" },
    ],
  },
];

export const DOMAIN_TAGS: TechTagData[] = [
  { label: "Frontend", domain: "frontend" },
  { label: "Backend", domain: "backend" },
  { label: "AI / ML", domain: "ai" },
  { label: "Core Banking", domain: "default" },
];
