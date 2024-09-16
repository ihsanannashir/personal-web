import { ReactElement } from "react";
import { IconType } from "react-icons";

export type ProjectData = {
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string | StaticImport;
  tech?: any;
  className?: string;
};

export type MenuData = {
  title: string;
  slug: string;
};

export type SocialData = {
  title: string;
  display: string;
  url?: string;
  icon: ReactElement;
  tag: "Github" | "Linkedin" | "Email";
};
