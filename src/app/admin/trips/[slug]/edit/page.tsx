"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type { TripWithRelations } from "@/lib/types/database";
import { uploadImage } from "@/lib/utils/storage";
import AdminForm from "@/components/admin/AdminForm";
import FormField from "@/components/admin/FormField";

type PhotoInput = { url: string; caption: string; display_order: number; file?: File };
type PlaceInput = { name: string; display_order: number };

export default function EditTripPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tripId, setTripId] = useState<number>(0);
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

  useEffect(() => {
    fetch(`/api/trips/${params.slug}`)
      .then((r) => r.json())
      .then((trip: TripWithRelations) => {
        setTripId(trip.id);
        setForm({
          slug: trip.slug,
          title: trip.title,
          location: trip.location,
          country: trip.country,
          type: trip.type,
          trip_start_date: trip.trip_start_date?.slice(0, 10) ?? "",
          trip_end_date: trip.trip_end_date?.slice(0, 10) ?? "",
          is_featured: trip.is_featured,
          kicker: trip.kicker ?? "",
          opening_paragraph: trip.opening_paragraph ?? "",
          journal_entry: trip.journal_entry ?? "",
          hero_image_url: trip.hero_image_url ?? "",
          status: trip.status,
        });
        if (trip.hero_image_url) {
          setHeroPreview(trip.hero_image_url);
        }
        setPhotos(
          trip.trip_photos.map((p) => ({
            url: p.url,
            caption: p.caption ?? "",
            display_order: p.display_order,
          }))
        );
        setPlaces(
          trip.trip_places.map((p) => ({
            name: p.name,
            display_order: p.display_order,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

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
    next[index].url = URL.createObjectURL(file);
    setPhotos(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      // Upload hero image if a new file is selected
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

      // Upload photo files (only new ones)
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

      // Update trip
      const res = await fetch(`/api/trips/${params.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedForm),
      });

      if (!res.ok) {
        alert("Failed to update trip");
        setSaving(false);
        return;
      }

      // Update relations (replace all)
      const validPhotos = uploadedPhotos.filter((p) => p.url);
      await fetch(`/api/trips/${form.slug}/relations`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_id: tripId,
          photos: validPhotos,
          places: places
            .filter((p) => p.name)
            .map((p, idx) => ({
              name: p.name,
              display_order: idx + 1,
            })),
        }),
      });

      router.push("/admin/trips");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-gray-400 py-8">Loading…</p>;
  }

  const inputClasses =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none";

  return (
    <AdminForm
      title="Edit Trip"
      onSubmit={handleSubmit}
      submitLabel="Update Trip"
      saving={saving}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Slug" required>
          <input
            required
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="Title" required>
          <input
            required
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="Location" required>
          <input
            required
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="Country" required>
          <input
            required
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="Type">
          <select
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
            className={`${inputClasses} bg-white`}
          >
            <option value="City">City</option>
            <option value="Hiking">Hiking</option>
          </select>
        </FormField>
        <FormField label="Status">
          <select
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className={`${inputClasses} bg-white`}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </FormField>
        <FormField label="Start Date">
          <input
            type="date"
            value={form.trip_start_date}
            onChange={(e) => updateField("trip_start_date", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="End Date">
          <input
            type="date"
            value={form.trip_end_date}
            onChange={(e) => updateField("trip_end_date", e.target.value)}
            className={inputClasses}
          />
        </FormField>
      </div>

      <FormField label="Kicker">
        <input
          value={form.kicker}
          onChange={(e) => updateField("kicker", e.target.value)}
          className={inputClasses}
        />
      </FormField>

      <FormField label="Hero Image">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleHeroFile(e.target.files?.[0])}
          className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 file:cursor-pointer"
        />
        {heroPreview && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={heroPreview}
            alt="Hero preview"
            className="mt-2 max-w-xs max-h-48 rounded-md object-cover border border-gray-200"
          />
        )}
      </FormField>

      <FormField label="Opening Paragraph">
        <textarea
          value={form.opening_paragraph}
          onChange={(e) => updateField("opening_paragraph", e.target.value)}
          rows={3}
          className={inputClasses}
        />
      </FormField>

      <FormField label="Journal Entry">
        <textarea
          value={form.journal_entry}
          onChange={(e) => updateField("journal_entry", e.target.value)}
          rows={5}
          className={inputClasses}
        />
      </FormField>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_featured"
          checked={form.is_featured}
          onChange={(e) => updateField("is_featured", e.target.checked)}
          className="rounded border-gray-300"
        />
        <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
          Featured
        </label>
      </div>

      {/* ─── Photos ─── */}
      <fieldset className="border border-gray-200 rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold text-gray-700 px-2">
          Photos
        </legend>
        {photos.map((photo, i) => (
          <div key={i} className="p-3 border border-gray-100 rounded-md space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoFile(i, e.target.files?.[0])}
                className="flex-2 text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-gray-300 file:text-xs file:bg-white file:text-gray-700 file:cursor-pointer"
              />
              <input
                placeholder="Caption"
                value={photo.caption}
                onChange={(e) => {
                  const next = [...photos];
                  next[i].caption = e.target.value;
                  setPhotos(next);
                }}
                className={`${inputClasses} flex-2`}
              />
              <input
                type="number"
                placeholder="#"
                value={photo.display_order}
                onChange={(e) => {
                  const next = [...photos];
                  next[i].display_order = Number(e.target.value);
                  setPhotos(next);
                }}
                className={`${inputClasses} w-16`}
              />
              <button
                type="button"
                onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                className="text-red-500 hover:text-red-700 cursor-pointer text-lg leading-none"
              >
                ✕
              </button>
            </div>
            {photo.url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={photo.url}
                alt={photo.caption || `Photo ${photo.display_order}`}
                className="max-w-[200px] max-h-[120px] rounded object-cover border border-gray-200"
              />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setPhotos([
              ...photos,
              { url: "", caption: "", display_order: photos.length + 1 },
            ])
          }
          className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
        >
          + Add photo
        </button>
      </fieldset>

      {/* ─── Places ─── */}
      <fieldset className="border border-gray-200 rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold text-gray-700 px-2">
          Places
        </legend>
        {places.map((place, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400 w-6">#{i + 1}</span>
            <input
              placeholder="Place name"
              value={place.name}
              onChange={(e) => {
                const next = [...places];
                next[i].name = e.target.value;
                setPlaces(next);
              }}
              className={`${inputClasses} flex-1`}
            />
            <button
              type="button"
              onClick={() => setPlaces(places.filter((_, j) => j !== i))}
              className="text-red-500 hover:text-red-700 cursor-pointer text-lg leading-none"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setPlaces([
              ...places,
              { name: "", display_order: places.length + 1 },
            ])
          }
          className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
        >
          + Add place
        </button>
      </fieldset>
    </AdminForm>
  );
}
