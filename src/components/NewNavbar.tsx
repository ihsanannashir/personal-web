"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { IoMdMenu, IoMdClose } from "react-icons/io";

interface NavItem {
  label: string;
  page: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    page: "/",
  },
  {
    label: "Experiences",
    page: "/experiences",
  },
  {
    label: "Projects",
    page: "/projects",
  },
];

export const NewNavbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);

  return (
    <header className="w-full mx-auto px-4 bg-white shadow fixed top-0 z-50 sm:px-20">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex item-center justify-between py-3">
            <Link href="/">
              <div className="md:py-5 md:block">
                <h2 className="text-2xl font-bold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  Ihsan An-Nashir
                </h2>
              </div>
            </Link>
            <div className="md:hidden">
              <button onClick={() => setNavbar(!navbar)}>
                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center space-y-8 md:flex md:space-x-10 md:space-y-0">
              {NAV_ITEMS.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    href={item.page}
                    className={
                      "block lg:inline-block text-neutral-900 hover:text-blue-600 cursor-pointer"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={
                  "block lg:inline-block text-neutral-100 font-semibold bg-blue-600 shadow hover:bg-blue-800 cursor-default py-2 px-4 rounded w-28 md:w-auto"
                }
              >
                Let&apos;s Talk!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
