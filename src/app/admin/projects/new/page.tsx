"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/utils/storage";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    tech_tags: "",
    external_url: "",
    status: "draft",
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleCoverFile(file: File | undefined) {
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      // Upload cover image if selected
      let coverImageUrl: string | null = null;
      if (coverFile) {
        const ext = coverFile.name.split(".").pop() || "jpg";
        coverImageUrl = await uploadImage(
          "images",
          `projects/${form.slug}/cover.${ext}`,
          coverFile
        );
      }

      const payload = {
        ...form,
        tech_tags: form.tech_tags.split(",").map((t) => t.trim()).filter(Boolean),
        external_url: form.external_url || null,
        description: form.description || null,
        cover_image_url: coverImageUrl,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert("Failed to create project");
        setSaving(false);
        return;
      }

      router.push("/admin/projects");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>New Project</h1>
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
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Cover Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleCoverFile(e.target.files?.[0])}
            style={{ ...inputStyle, padding: "6px 10px" }}
          />
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover preview"
              style={{ marginTop: 8, maxWidth: 320, maxHeight: 200, borderRadius: 6, objectFit: "cover" }}
            />
          )}
        </div>
        <label style={{ display: "block", marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Status</span>
          <select value={form.status} onChange={(e) => updateField("status", e.target.value)} style={inputStyle}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", background: saving ? "#666" : "#111", color: "#fff", border: "none", borderRadius: 6, cursor: saving ? "not-allowed" : "pointer", fontSize: 14 }}>
          {saving ? "Uploading & Saving…" : "Create Project"}
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
