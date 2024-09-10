import {
  BsChatLeftTextFill,
  BsGithub,
  BsLinkedin,
  BsList,
} from "react-icons/bs";
import Link from "next/link";
import { MenuData } from "../../lib/types/item-data";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const MENUS: MenuData[] = [
  { title: "Home", slug: "/" },
  { title: "About", slug: "/about" },
  { title: "Projects", slug: "/project" },
];

const NavigationBar = () => {
  return (
    <nav className="fixed z-50 top-4 w-full">
      <div className="sm:max-w-4xl sm:mx-auto">
        <div className="flex justify-between p-4 mx-6 sm:mx-6 bg-white rounded-2xl border">
          {/* Navigation Desktop */}
          <ul className="hidden sm:flex space-x-4 text-sm">
            {MENUS.map((menu, index) => {
              return (
                <li key={index}>
                  <Link href={menu.slug}>{menu.title}</Link>
                </li>
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
                    <li key={index}>
                      <Link href={menu.slug}>{menu.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>

          {/* Social Media */}
          <div className="flex space-x-4">
            <Link href={"https://github.com/ihsanannashir"}>
              <BsGithub
                size={22}
                className="hover:-translate-y-1 transition-transform"
              />
            </Link>
            <Link href={"https://linkedin.com/in/ihsanannashir"}>
              <BsLinkedin
                size={22}
                className="hover:-translate-y-1 transition-transform"
              />
            </Link>
            <Link href={"mailto:ihsanannashir@gmail.com"}>
              <BsChatLeftTextFill
                size={22}
                className="hover:-translate-y-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
