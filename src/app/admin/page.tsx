import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

const sections = [
  { label: "Trips", href: "/admin/trips", description: "Manage travel journal entries" },
  { label: "Projects", href: "/admin/projects", description: "Manage portfolio projects" },
  { label: "Experiences", href: "/admin/experiences", description: "Manage career timeline" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              display: "block",
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 8,
              textDecoration: "none",
              color: "#111",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{s.label}</h2>
            <p style={{ fontSize: 14, color: "#666", margin: 0 }}>{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
