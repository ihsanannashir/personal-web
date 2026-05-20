"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/utils/storage";

type PhotoInput = { url: string; caption: string; display_order: number; file?: File };
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
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);

  function updateField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleHeroFile(file: File | undefined) {
    if (!file) return;
    setHeroFile(file);
    setHeroPreview(URL.createObjectURL(file));
  }

  function handlePhotoFile(index: number, file: File | undefined) {
    if (!file) return;
    const next = [...photos];
    next[index].file = file;
    // Temporarily set url to the object URL for preview
    next[index].url = URL.createObjectURL(file);
    setPhotos(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      // Upload hero image if selected
      const submittedForm = { ...form };
      if (heroFile) {
        const ext = heroFile.name.split(".").pop() || "jpg";
        const heroUrl = await uploadImage(
          "images",
          `trips/${form.slug}/hero.${ext}`,
          heroFile
        );
        submittedForm.hero_image_url = heroUrl;
      }

      // Upload photo files
      const uploadedPhotos = await Promise.all(
        photos.map(async (photo) => {
          if (photo.file) {
            const ext = photo.file.name.split(".").pop() || "jpg";
            const photoUrl = await uploadImage(
              "images",
              `trips/${form.slug}/photo-${photo.display_order}.${ext}`,
              photo.file
            );
            return { url: photoUrl, caption: photo.caption, display_order: photo.display_order };
          }
          return { url: photo.url, caption: photo.caption, display_order: photo.display_order };
        })
      );

      // Create trip
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedForm),
      });

    if (!res.ok) {
      alert("Failed to create trip");
      setSaving(false);
      return;
    }

      const trip = await res.json();

      // Insert photos and places via batch endpoint
      const validPhotos = uploadedPhotos.filter((p) => p.url);
      if (validPhotos.length > 0 || places.length > 0) {
        const batchRes = await fetch(`/api/trips/${trip.slug}/relations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trip_id: trip.id,
            photos: validPhotos,
            places: places.filter((p) => p.name),
          }),
        });
        if (!batchRes.ok) {
          console.warn("Failed to save photos/places");
        }
      }

      router.push("/admin/trips");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
      setSaving(false);
    }
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

        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>Hero Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleHeroFile(e.target.files?.[0])}
            style={{ ...inputStyle, padding: "6px 10px" }}
          />
          {heroPreview && (
            <img
              src={heroPreview}
              alt="Hero preview"
              style={{ marginTop: 8, maxWidth: 320, maxHeight: 200, borderRadius: 6, objectFit: "cover" }}
            />
          )}
        </div>

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
            <div key={i} style={{ marginBottom: 12, padding: 12, border: "1px solid #eee", borderRadius: 6 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoFile(i, e.target.files?.[0])}
                  style={{ ...inputStyle, flex: 2, padding: "6px 10px" }}
                />
                <input placeholder="Caption" value={photo.caption} onChange={(e) => { const next = [...photos]; next[i].caption = e.target.value; setPhotos(next); }} style={{ ...inputStyle, flex: 2 }} />
                <input type="number" placeholder="#" value={photo.display_order} onChange={(e) => { const next = [...photos]; next[i].display_order = Number(e.target.value); setPhotos(next); }} style={{ ...inputStyle, width: 60 }} />
                <button type="button" onClick={() => setPhotos(photos.filter((_, j) => j !== i))} style={{ color: "#e00", background: "none", border: "none", cursor: "pointer" }}>✕</button>
              </div>
              {photo.url && (
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${photo.display_order}`}
                  style={{ maxWidth: 200, maxHeight: 120, borderRadius: 4, objectFit: "cover" }}
                />
              )}
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

        <button type="submit" disabled={saving} style={{ padding: "10px 24px", background: saving ? "#666" : "#111", color: "#fff", border: "none", borderRadius: 6, cursor: saving ? "not-allowed" : "pointer", fontSize: 14 }}>
          {saving ? "Uploading & Saving…" : "Create Trip"}
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
