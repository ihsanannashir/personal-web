import StackShowcase from "../../components/stack-showcase";
import { ProjectData } from "../types/item-data";

export const PROJECTS: ProjectData[] = [
  {
    title: "Yomy",
    slug: "yomy",
    description: "A web based SaaS Customer Feedback Manager Application",
    thumbnail: "/assets/yomy.png",
    tech: <StackShowcase react tailwind />,
  },
  {
    title: "Fakta 2.0",
    slug: "fakta-com",
    description:
      "An Indonesian online media platform that offers news, data, and opinions on a wide range of topics.",
    thumbnail: "/assets/faktacom.png",
    tech: <StackShowcase nextjs tailwind />,
  },
];
