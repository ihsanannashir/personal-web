import { ProjectData } from "@/lib/types/item-data";

export const PROJECTS: ProjectData[] = [
  {
    title: "Fakta.com 2.0",
    slug: "fakta-com",
    description:
      "Indonesian online media platform with news, data, and opinions. Built with CMS, multi-role authorization, and dynamic content delivery.",
    thumbnail: "/assets/project/fakta/fakta.png",
    period: "Feb 2024 – Aug 2024",
    tags: [
      { label: "Next.js", domain: "frontend" },
      { label: "TailwindCSS", domain: "frontend" },
      { label: "Node.js", domain: "backend" },
    ],
  },
  {
    title: "Yomy",
    slug: "yomy",
    description:
      "SaaS customer feedback manager with Stripe payments, QR-based reviews, and business dashboards.",
    thumbnail: "/assets/project/yomy/yomy.png",
    period: "Aug 2023 – Jan 2024",
    tags: [
      { label: "React", domain: "frontend" },
      { label: "TailwindCSS", domain: "frontend" },
      { label: "PostgreSQL", domain: "backend" },
      { label: "Node.js", domain: "backend" },
    ],
  },
];
