import { ReactElement, ReactNode } from "react";

export type TagDomain = "ai" | "frontend" | "backend" | "default";

export type TechTagData = {
  label: string;
  domain: TagDomain;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  shortRole: string;
  shortPeriod: string;
  primaryDomain: TagDomain;
  location: string;
  flag: string;
  period: string;
  factual: string;
  narrative: string;
  bullets: string[];
  tags: TechTagData[];
};

export type LanguageEntry = {
  name: string;
  flag: string;
  greeting: string;
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

export type NowTeaser = {
  emoji: string;
  title: string;
  description: string;
};

export type Interest = {
  label: string;
  description: ReactNode;
};

export type SocialData = {
  title: string;
  display: string;
  url?: string;
  icon: ReactElement;
  tag: "Github" | "Linkedin" | "Email";
};

export type TripCategory = "City" | "Hiking";

export type TripPlace = {
  name: string;
  type: string;
  note: string;
};

export type TripStat = {
  value: string;
  label: string;
};

export type Trip = {
  slug: string;
  title: string;
  date: string;
  category: TripCategory;
  coverEmoji: string;
  hero_image_url?: string;
  description: string;
  featured: boolean;
  kicker: string;
  opening: string;
  stats: TripStat[];
  journal: string;
  places: TripPlace[];
  photoSlots: number;
  country?: string;
  year?: number;
};
