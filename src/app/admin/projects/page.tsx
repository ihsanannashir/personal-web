"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types/database";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete project "${slug}"?`)) return;
    const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    if (res.ok) setProjects((prev) => prev.filter((p) => p.slug !== slug));
    else alert("Failed to delete");
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Projects</h1>
        <Link href="/admin/projects/new" style={{ padding: "8px 16px", background: "#111", color: "#fff", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
          + New Project
        </Link>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: 8 }}>Title</th>
            <th style={{ padding: 8 }}>Slug</th>
            <th style={{ padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>Tags</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 8 }}>{project.title}</td>
              <td style={{ padding: 8, fontFamily: "monospace", fontSize: 13 }}>{project.slug}</td>
              <td style={{ padding: 8 }}>{project.status}</td>
              <td style={{ padding: 8, fontSize: 13, color: "#666" }}>{project.tech_tags.join(", ")}</td>
              <td style={{ padding: 8, display: "flex", gap: 8 }}>
                <Link href={`/admin/projects/${project.slug}/edit`} style={{ color: "#0070f3", textDecoration: "none", fontSize: 14 }}>Edit</Link>
                <button onClick={() => handleDelete(project.slug)} style={{ background: "none", border: "none", color: "#e00", cursor: "pointer", fontSize: 14 }}>Delete</button>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr><td colSpan={5} style={{ padding: 16, textAlign: "center", color: "#999" }}>No projects yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
