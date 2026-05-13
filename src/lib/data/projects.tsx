import StackShowcase from "@/components/stack-showcase";
import { ProjectData } from "@/lib/types/item-data";

export const PROJECTS: ProjectData[] = [
  {
    title: "Yomy",
    slug: "yomy",
    description:
      "A multi-tenant SaaS platform for managing customer feedback, featuring Stripe payments, QR-based reviews, and business dashboards.",
    thumbnail: "/assets/yomy.png",
    tech: <StackShowcase react tailwind />,
  },
  {
    title: "Fakta 2.0",
    slug: "fakta-com",
    description:
      "An Indonesian media platform that offers wide range of topics. Built with CMS, multi-role authorization, and dynamic content delivery for news publishing.",
    thumbnail: "/assets/fakta.png",
    tech: <StackShowcase nextjs tailwind />,
  },
];
