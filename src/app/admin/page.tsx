import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

const sections = [
  {
    label: "Trips",
    href: "/admin/trips",
    description: "Manage travel journal entries",
    icon: "✈",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    description: "Manage portfolio projects",
    icon: "◫",
  },
  {
    label: "Experiences",
    href: "/admin/experiences",
    description: "Manage career timeline",
    icon: "◉",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group block bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{s.icon}</span>
              <h2 className="text-base font-semibold text-gray-900 group-hover:text-gray-700">
                {s.label}
              </h2>
            </div>
            <p className="text-sm text-gray-500">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
