"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "▦" },
  { label: "Trips", href: "/admin/trips", icon: "✈" },
  { label: "Projects", href: "/admin/projects", icon: "◫" },
  { label: "Experiences", href: "/admin/experiences", icon: "◉" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page renders without the admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ─── Sidebar ─── */}
      <aside className="w-56 bg-gray-900 text-gray-300 flex flex-col flex-shrink-0">
        {/* Logo / brand */}
        <div className="px-5 py-5 border-b border-gray-800">
          <Link
            href="/admin"
            className="text-white font-bold text-lg tracking-tight hover:opacity-90 transition-opacity"
          >
            Admin
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← View site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="p-6 lg:p-8 max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
