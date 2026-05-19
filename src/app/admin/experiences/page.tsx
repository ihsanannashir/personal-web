"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Experience } from "@/lib/types/database";

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/experiences")
      .then((r) => r.json())
      .then((data) => { setExperiences(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this experience?")) return;
    const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    if (res.ok) setExperiences((prev) => prev.filter((e) => e.id !== id));
    else alert("Failed to delete");
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Experiences</h1>
        <Link href="/admin/experiences/new" style={{ padding: "8px 16px", background: "#111", color: "#fff", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
          + New Experience
        </Link>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: 8 }}>#</th>
            <th style={{ padding: 8 }}>Company</th>
            <th style={{ padding: 8 }}>Role</th>
            <th style={{ padding: 8 }}>Period</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 8, color: "#999" }}>{exp.display_order}</td>
              <td style={{ padding: 8 }}>{exp.flag_emoji} {exp.company}</td>
              <td style={{ padding: 8 }}>{exp.role}</td>
              <td style={{ padding: 8, fontSize: 13, color: "#666" }}>
                {exp.start_date.slice(0, 7)} – {exp.end_date?.slice(0, 7) ?? "Present"}
              </td>
              <td style={{ padding: 8, display: "flex", gap: 8 }}>
                <Link href={`/admin/experiences/${exp.id}/edit`} style={{ color: "#0070f3", textDecoration: "none", fontSize: 14 }}>Edit</Link>
                <button onClick={() => handleDelete(exp.id)} style={{ background: "none", border: "none", color: "#e00", cursor: "pointer", fontSize: 14 }}>Delete</button>
              </td>
            </tr>
          ))}
          {experiences.length === 0 && (
            <tr><td colSpan={5} style={{ padding: 16, textAlign: "center", color: "#999" }}>No experiences yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
