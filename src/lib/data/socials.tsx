import { BsChatLeftTextFill, BsGithub, BsLinkedin } from "react-icons/bs";
import { SocialData } from "../types/item-data";

export const SOCIALS: SocialData[] = [
  {
    title: "Github",
    tag: "Github",
    display: "ihsanannashir",
    url: "https://github.com/ihsanannashir",
    icon: (
      <BsGithub
        size={22}
        className="sm:hover:-translate-y-1 hover:text-blurple-400 duration-500 transition-transform"
      />
    ),
  },
  {
    title: "LinkedIn",
    tag: "Linkedin",
    display: "in/ihsanannashir",
    url: "https://linkedin.com/in/ihsanannashir",
    icon: (
      <BsLinkedin
        size={22}
        className="sm:hover:-translate-y-1 hover:text-blurple-400 duration-500 transition-transform"
      />
    ),
  },
  {
    title: "Email",
    tag: "Email",
    display: "ihsanannashir@gmail.com",
    url: "mailto:ihsanannashir@gmail.com",
    icon: (
      <BsChatLeftTextFill
        size={22}
        className="sm:hover:-translate-y-1 hover:text-blurple-400 duration-500 transition-transform"
      />
    ),
  },
];
