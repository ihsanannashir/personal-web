"use client";

import {
  BsChatLeftTextFill,
  BsGithub,
  BsLinkedin,
  BsList,
} from "react-icons/bs";
import Link from "next/link";
import { MenuData, SocialData } from "../../lib/types/item-data";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const MENUS: MenuData[] = [
  { title: "Home", slug: "/" },
  { title: "About", slug: "/about" },
  { title: "Projects", slug: "/project" },
];

const SOCIALS: SocialData[] = [
  {
    title: "Github",
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
    url: "mailto:ihsanannashir@gmail.com",
    icon: (
      <BsChatLeftTextFill
        size={22}
        className="sm:hover:-translate-y-1 hover:text-blurple-400 duration-500 transition-transform"
      />
    ),
  },
];

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 top-4 w-full">
      <div className="sm:max-w-4xl sm:mx-auto">
        <div className="flex justify-between mx-6 sm:mx-6 p-4 sm:p-2 bg-white drop-shadow-[4px_4px_0px_rgba(118,116,250,0.75)] rounded-2xl border">
          {/* Navigation Desktop */}
          <ul className="hidden sm:flex text-sm">
            {MENUS.map((menu, index) => {
              return (
                <Link href={menu.slug} key={index}>
                  <li
                    className={clsx(
                      pathname == menu.slug && "bg-blurple-300 text-white",
                      "duration-500 py-2 px-4 hover:bg-blurple-300 hover:text-white rounded-xl"
                    )}
                  >
                    {menu.title}
                  </li>
                </Link>
              );
            })}
          </ul>

          {/* Navigation Mobile */}
          <Sheet>
            <SheetTrigger className="sm:hidden">
              <BsList size={22} />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <ul className="text-lg space-y-4">
                {MENUS.map((menu, index) => {
                  return (
                    <li
                      key={index}
                      className={clsx(pathname == menu.slug && "font-bold")}
                    >
                      <Link href={menu.slug}>{menu.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>

          {/* Social Media */}
          <div className="flex space-x-4 p-0 sm:p-2">
            {SOCIALS.map((social, index) => {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <Link href={social.url ?? ""} target="_blank">
                      {social.icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.title}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
