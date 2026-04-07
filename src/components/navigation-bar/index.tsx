"use client";

import { BsList } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

// Map section IDs to their nav hrefs
const SECTION_IDS = ["about", "projects"];

const NavigationBar = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Only run scroll spy on the home page
    if (pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Reset to Home when scrolled to top
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    // On project detail pages, highlight "Projects" via route matching
    if (pathname !== "/") {
      if (href === "/#projects") return pathname.startsWith("/project");
      return false;
    }

    // On home page, use scroll spy
    if (href === "/") return activeSection === null;
    const sectionId = href.replace("/#", "");
    return activeSection === sectionId;
  };

  return (
    <nav className="fixed z-50 top-0 w-full">
      {/* Gradient backdrop - fades content scrolling under the navbar */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />

      <div className="relative sm:max-w-4xl sm:mx-auto mt-4">
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
