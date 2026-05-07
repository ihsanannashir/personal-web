import { ExperienceEntry } from "@/lib/types/item-data";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "CIMB Niaga",
    role: "Software Engineer, AI Enablement & Automation",
    location: "Jakarta, Indonesia",
    flag: "🇮🇩",
    period: "Jul 2025 – Present",
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
    location: "Paris, France (Remote)",
    flag: "🇫🇷",
    period: "Nov 2024 – Jan 2025",
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
    location: "Jakarta, Indonesia",
    flag: "🇮🇩",
    period: "Dec 2023 – Sept 2024",
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
    location: "Hamburg, Germany (Remote)",
    flag: "🇩🇪",
    period: "Jun 2023 – Oct 2023",
    bullets: [
      "Built 15+ features using React, Next.js, Strapi, and GraphQL",
      "Designed 5 UI pages",
      "Implemented German–English i18n with Next.js",
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
    location: "Jakarta, Indonesia",
    flag: "🇮🇩",
    period: "Feb 2022 – Jul 2022",
    bullets: [
      "Participated in 3 internal projects",
      "Co-built an Omnibus Law platform using Next.js",
    ],
    tags: [
      { label: "Next.js", domain: "frontend" },
      { label: "React", domain: "frontend" },
    ],
  },
];
