import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Admin",
    default: "Admin Dashboard",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 960, margin: "0 auto", padding: "20px" }}>
      <nav style={{ borderBottom: "1px solid #ddd", paddingBottom: 12, marginBottom: 24, display: "flex", gap: 16, alignItems: "center" }}>
        <Link href="/admin" style={{ fontWeight: 700, fontSize: 18, textDecoration: "none", color: "#111" }}>
          Admin
        </Link>
        <Link href="/admin/trips" style={{ textDecoration: "none", color: "#555" }}>Trips</Link>
        <Link href="/admin/projects" style={{ textDecoration: "none", color: "#555" }}>Projects</Link>
        <Link href="/admin/experiences" style={{ textDecoration: "none", color: "#555" }}>Experiences</Link>
        <span style={{ marginLeft: "auto" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#888", fontSize: 14 }}>← View site</Link>
        </span>
      </nav>
      {children}
    </div>
  );
}
