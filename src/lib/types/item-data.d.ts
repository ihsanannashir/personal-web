import { ReactElement } from "react";

export type TagDomain = "ai" | "frontend" | "backend" | "default";

export type TechTagData = {
  label: string;
  domain: TagDomain;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  flag: string;
  period: string;
  bullets: string[];
  tags: TechTagData[];
};

export type LanguageEntry = {
  name: string;
  flag: string;
  proficiency: string;
  note?: string;
  progress: number; // 0-100
};

export type ProjectData = {
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  period?: string;
  tags: TechTagData[];
  className?: string;
};

export type NowData = {
  lastUpdated: string;
  city: string;
  focus: {
    company: string;
    role: string;
    description: string;
    highlights: string[];
  };
  running: {
    goal: string;
    runsPerWeek: number;
    longestRun: string;
    raceMonth: string;
    progress: number; // 0-100
  };
  reading: {
    title: string;
    author: string;
    note: string;
  };
  thinkingAbout: string[];
};

export type SocialData = {
  title: string;
  display: string;
  url?: string;
  icon: ReactElement;
  tag: "Github" | "Linkedin" | "Email";
};
