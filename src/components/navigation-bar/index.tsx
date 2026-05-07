"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Now", href: "/now" },
];

const NavigationBar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed z-50 top-0 w-full bg-background/90 backdrop-blur-sm">
        <div className="editorial-container">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <Link
              href="/"
              className="font-serif text-heading-sm text-foreground hover:opacity-70 transition-opacity"
            >
              ihsan.
            </Link>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "text-body-sm transition-colors relative py-1",
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground" />
                  )}
                </Link>
              ))}
              <a
                href="mailto:ihsanannashir@gmail.com"
                className="text-body-sm text-muted hover:text-foreground transition-colors"
              >
                Say hello ↗
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={clsx(
                  "block w-5 h-px bg-foreground transition-transform duration-300",
                  mobileOpen && "rotate-45 translate-y-[3.5px]"
                )}
              />
              <span
                className={clsx(
                  "block w-5 h-px bg-foreground transition-opacity duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={clsx(
                  "block w-5 h-px bg-foreground transition-transform duration-300",
                  mobileOpen && "-rotate-45 -translate-y-[3.5px]"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20">
          <div className="editorial-container flex flex-col gap-6 pt-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "font-serif text-display-sm transition-colors",
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:ihsanannashir@gmail.com"
              onClick={() => setMobileOpen(false)}
              className="text-body-lg text-muted hover:text-foreground transition-colors pt-4 thin-border-t"
            >
              ihsanannashir@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
