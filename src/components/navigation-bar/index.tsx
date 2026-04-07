"use client";

import { BsList } from "react-icons/bs";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SOCIALS } from "@/lib/data/socials";

type NavMenu = {
  title: string;
  href: string;
};

const MENUS: NavMenu[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "Projects", href: "/#projects" },
];

const NavigationBar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // On the home page, "Home" is always a valid base
    // On project detail pages, highlight "Projects"
    if (href === "/") return pathname === "/";
    if (href === "/#projects") return pathname.startsWith("/project");
    return false;
  };

  return (
    <nav className="fixed z-50 top-4 w-full">
      <div className="sm:max-w-4xl sm:mx-auto">
        <div className="flex justify-between mx-6 sm:mx-6 p-4 sm:p-2 bg-white drop-shadow-[4px_4px_0px_rgba(118,116,250,0.75)] rounded-2xl border">
          {/* Navigation Desktop */}
          <ul className="hidden sm:flex text-sm">
            {MENUS.map((menu, index) => {
              return (
                <Link href={menu.href} key={index}>
                  <li
                    className={clsx(
                      isActive(menu.href) && "bg-blurple-300 text-white",
                      "duration-500 py-2 px-4 hover:bg-blurple-300 hover:text-white rounded-xl",
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
                      className={clsx(isActive(menu.href) && "font-bold")}
                    >
                      <Link href={menu.href}>{menu.title}</Link>
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
