"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewExperiencePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    company: "",
    country_code: "",
    flag_emoji: "",
    role: "",
    start_date: "",
    end_date: "",
    factual_line: "",
    personal_note: "",
    tech_tags: "",
    display_order: 0,
  });

  function updateField(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      tech_tags: form.tech_tags.split(",").map((t) => t.trim()).filter(Boolean),
      end_date: form.end_date || null,
      personal_note: form.personal_note || null,
    };

    const res = await fetch("/api/experiences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to create experience");
      setSaving(false);
      return;
    }

    router.push("/admin/experiences");
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>New Experience</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Company *</span>
            <input required value={form.company} onChange={(e) => updateField("company", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Role *</span>
            <input required value={form.role} onChange={(e) => updateField("role", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Country Code *</span>
            <input required value={form.country_code} onChange={(e) => updateField("country_code", e.target.value)} placeholder="ID" style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Flag Emoji *</span>
            <input required value={form.flag_emoji} onChange={(e) => updateField("flag_emoji", e.target.value)} placeholder="🇮🇩" style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Start Date *</span>
            <input required type="date" value={form.start_date} onChange={(e) => updateField("start_date", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>End Date</span>
            <input type="date" value={form.end_date} onChange={(e) => updateField("end_date", e.target.value)} style={inputStyle} />
            <span style={{ fontSize: 11, color: "#999" }}>Leave empty for &quot;Present&quot;</span>
          </label>
        </div>
        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Factual Line *</span>
          <textarea required value={form.factual_line} onChange={(e) => updateField("factual_line", e.target.value)} rows={2} style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Personal Note</span>
          <textarea value={form.personal_note} onChange={(e) => updateField("personal_note", e.target.value)} rows={2} style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Tech Tags (comma-separated)</span>
          <input value={form.tech_tags} onChange={(e) => updateField("tech_tags", e.target.value)} placeholder="React, Node.js" style={inputStyle} />
        </label>
        <label style={{ display: "block", marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Display Order</span>
          <input type="number" value={form.display_order} onChange={(e) => updateField("display_order", Number(e.target.value))} style={{ ...inputStyle, width: 100 }} />
        </label>
        <button type="submit" disabled={saving} style={{ padding: "10px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14 }}>
          {saving ? "Saving…" : "Create Experience"}
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
