"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Project } from "@/lib/types/database";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    tech_tags: "",
    external_url: "",
    status: "draft",
  });

  useEffect(() => {
    fetch(`/api/projects/${params.slug}`)
      .then((r) => r.json())
      .then((project: Project) => {
        setForm({
          slug: project.slug,
          title: project.title,
          description: project.description ?? "",
          tech_tags: project.tech_tags.join(", "),
          external_url: project.external_url ?? "",
          status: project.status,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      tech_tags: form.tech_tags.split(",").map((t) => t.trim()).filter(Boolean),
      external_url: form.external_url || null,
      description: form.description || null,
    };

    const res = await fetch(`/api/projects/${params.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to update project");
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Edit Project</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Slug *</span>
          <input required value={form.slug} onChange={(e) => updateField("slug", e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Title *</span>
          <input required value={form.title} onChange={(e) => updateField("title", e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Description</span>
          <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={3} style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tech Tags (comma-separated)</span>
          <input value={form.tech_tags} onChange={(e) => updateField("tech_tags", e.target.value)} placeholder="React, Node.js, PostgreSQL" style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>External URL</span>
          <input value={form.external_url} onChange={(e) => updateField("external_url", e.target.value)} placeholder="https://..." style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Status</span>
          <select value={form.status} onChange={(e) => updateField("status", e.target.value)} style={inputStyle}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14 }}>
          {saving ? "Saving…" : "Update Project"}
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: 14,
  boxSizing: "border-box",
};
