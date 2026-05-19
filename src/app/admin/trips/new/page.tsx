"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PhotoInput = { url: string; caption: string; display_order: number };
type PlaceInput = { name: string; display_order: number };

export default function NewTripPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    location: "",
    country: "",
    type: "City",
    trip_start_date: "",
    trip_end_date: "",
    is_featured: false,
    kicker: "",
    opening_paragraph: "",
    journal_entry: "",
    hero_image_url: "",
    status: "draft",
  });
  const [photos, setPhotos] = useState<PhotoInput[]>([]);
  const [places, setPlaces] = useState<PlaceInput[]>([]);

  function updateField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    // Create trip
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Failed to create trip");
      setSaving(false);
      return;
    }

    const trip = await res.json();

    // Create photos
    for (const photo of photos) {
      await fetch("/api/trips/" + trip.slug, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      // Insert photos directly via separate fetch
    }

    // Insert photos and places via supabase through a batch endpoint
    // For now, we'll use individual inserts via the trip slug
    if (photos.length > 0 || places.length > 0) {
      const batchRes = await fetch(`/api/trips/${trip.slug}/relations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_id: trip.id,
          photos: photos.filter((p) => p.url),
          places: places.filter((p) => p.name),
        }),
      });
      if (!batchRes.ok) {
        console.warn("Failed to save photos/places");
      }
    }

    router.push("/admin/trips");
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>New Trip</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Slug *</span>
            <input required value={form.slug} onChange={(e) => updateField("slug", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Title *</span>
            <input required value={form.title} onChange={(e) => updateField("title", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Location *</span>
            <input required value={form.location} onChange={(e) => updateField("location", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Country *</span>
            <input required value={form.country} onChange={(e) => updateField("country", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Type</span>
            <select value={form.type} onChange={(e) => updateField("type", e.target.value)} style={inputStyle}>
              <option value="City">City</option>
              <option value="Hiking">Hiking</option>
            </select>
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Status</span>
            <select value={form.status} onChange={(e) => updateField("status", e.target.value)} style={inputStyle}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Start Date</span>
            <input type="date" value={form.trip_start_date} onChange={(e) => updateField("trip_start_date", e.target.value)} style={inputStyle} />
          </label>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>End Date</span>
            <input type="date" value={form.trip_end_date} onChange={(e) => updateField("trip_end_date", e.target.value)} style={inputStyle} />
          </label>
        </div>

        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Kicker</span>
          <input value={form.kicker} onChange={(e) => updateField("kicker", e.target.value)} style={inputStyle} />
        </label>

        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Hero Image URL</span>
          <input value={form.hero_image_url} onChange={(e) => updateField("hero_image_url", e.target.value)} style={inputStyle} />
        </label>

        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Opening Paragraph</span>
          <textarea value={form.opening_paragraph} onChange={(e) => updateField("opening_paragraph", e.target.value)} rows={3} style={inputStyle} />
        </label>

        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Journal Entry</span>
          <textarea value={form.journal_entry} onChange={(e) => updateField("journal_entry", e.target.value)} rows={5} style={inputStyle} />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <input type="checkbox" checked={form.is_featured} onChange={(e) => updateField("is_featured", e.target.checked)} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Featured</span>
        </label>

        {/* ─── Photos ─── */}
        <fieldset style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <legend style={{ fontWeight: 600, fontSize: 14, padding: "0 8px" }}>Photos</legend>
          {photos.map((photo, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input placeholder="URL" value={photo.url} onChange={(e) => { const next = [...photos]; next[i].url = e.target.value; setPhotos(next); }} style={{ ...inputStyle, flex: 2 }} />
              <input placeholder="Caption" value={photo.caption} onChange={(e) => { const next = [...photos]; next[i].caption = e.target.value; setPhotos(next); }} style={{ ...inputStyle, flex: 2 }} />
              <input type="number" placeholder="#" value={photo.display_order} onChange={(e) => { const next = [...photos]; next[i].display_order = Number(e.target.value); setPhotos(next); }} style={{ ...inputStyle, width: 60 }} />
              <button type="button" onClick={() => setPhotos(photos.filter((_, j) => j !== i))} style={{ color: "#e00", background: "none", border: "none", cursor: "pointer" }}>✕</button>
            </div>
          ))}
          <button type="button" onClick={() => setPhotos([...photos, { url: "", caption: "", display_order: photos.length + 1 }])} style={{ fontSize: 13, padding: "4px 12px", borderRadius: 4, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>
            + Add photo
          </button>
        </fieldset>

        {/* ─── Places ─── */}
        <fieldset style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <legend style={{ fontWeight: 600, fontSize: 14, padding: "0 8px" }}>Places</legend>
          {places.map((place, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input placeholder="Place name" value={place.name} onChange={(e) => { const next = [...places]; next[i].name = e.target.value; setPlaces(next); }} style={{ ...inputStyle, flex: 2 }} />
              <input type="number" placeholder="#" value={place.display_order} onChange={(e) => { const next = [...places]; next[i].display_order = Number(e.target.value); setPlaces(next); }} style={{ ...inputStyle, width: 60 }} />
              <button type="button" onClick={() => setPlaces(places.filter((_, j) => j !== i))} style={{ color: "#e00", background: "none", border: "none", cursor: "pointer" }}>✕</button>
            </div>
          ))}
          <button type="button" onClick={() => setPlaces([...places, { name: "", display_order: places.length + 1 }])} style={{ fontSize: 13, padding: "4px 12px", borderRadius: 4, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>
            + Add place
          </button>
        </fieldset>

        <button type="submit" disabled={saving} style={{ padding: "10px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14 }}>
          {saving ? "Saving…" : "Create Trip"}
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
