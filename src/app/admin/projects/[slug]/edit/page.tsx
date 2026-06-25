"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type { ProjectWithVisuals, StackItem } from "@/lib/types/database";
import { uploadImage, convertImageToJpeg, isAllowedImageType } from "@/lib/utils/storage";
import AdminForm from "@/components/admin/AdminForm";
import FormField from "@/components/admin/FormField";
import ImageUpload from "@/components/admin/ImageUpload";
import StackTagInput from "@/components/admin/StackTagInput";

type VisualInput = { url: string; caption: string; contain: boolean; file?: File | Blob };

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projectId, setProjectId] = useState<string>("");
  const [form, setForm] = useState({
    slug: "",
    title: "",
    subtitle: "",
    short_description: "",
    description: "",
    period: "",
    role: "",
    repo_url: "",
    live_url: "",
    live_label: "",
    cover_image_url: "",
    status: "draft",
  });
  const [techTags, setTechTags] = useState<StackItem[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [visuals, setVisuals] = useState<VisualInput[]>([]);
  const [visualFileErrors, setVisualFileErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch(`/api/projects/${params.slug}`)
      .then((r) => r.json())
      .then((project: ProjectWithVisuals) => {
        setProjectId(project.id);
        setForm({
          slug: project.slug,
          title: project.title,
          subtitle: project.subtitle ?? "",
          short_description: project.short_description ?? "",
          description: project.description ?? "",
          period: project.period ?? "",
          role: project.role ?? "",
          repo_url: project.repo_url ?? "",
          live_url: project.live_url ?? "",
          live_label: project.live_label ?? "",
          cover_image_url: project.cover_image_url ?? "",
          status: project.status,
        });
        setTechTags(project.tech_tags);
        setFeatures(project.features ?? []);
        setVisuals(
          (project.project_visuals ?? []).map((v) => ({
            url: v.url,
            caption: v.caption ?? "",
            contain: v.contain,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleVisualFile(index: number, file: File | undefined, inputEl?: HTMLInputElement | null) {
    if (!file) return;
    if (!isAllowedImageType(file)) {
      setVisualFileErrors((prev) => ({ ...prev, [index]: "Please upload a JPG, JPEG, or PNG file only." }));
      if (inputEl) inputEl.value = "";
      return;
    }
    setVisualFileErrors((prev) => ({ ...prev, [index]: "" }));
    try {
      const convertedBlob = await convertImageToJpeg(file);
      const previewUrl = URL.createObjectURL(convertedBlob);
      setVisuals((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], file: convertedBlob, url: previewUrl };
        return next;
      });
    } catch (err) {
      console.error("Failed to convert image to JPEG for preview:", err);
      const previewUrl = URL.createObjectURL(file);
      setVisuals((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], file, url: previewUrl };
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      // Upload visual files (only new ones with a file blob)
      const uploadedVisuals = await Promise.all(
        visuals.map(async (v, i) => {
          if (v.file) {
            const visualUrl = await uploadImage(
              "images",
              `projects/${form.slug}/visual-${i}.jpg`,
              v.file
            );
            return { url: visualUrl, caption: v.caption, contain: v.contain, display_order: i };
          }
          return { url: v.url, caption: v.caption, contain: v.contain, display_order: i };
        })
      );

      const payload = {
        ...form,
        tech_tags: techTags,
        features: features.filter(Boolean),
        repo_url: form.repo_url || null,
        description: form.description || null,
        subtitle: form.subtitle || null,
        short_description: form.short_description || null,
        period: form.period || null,
        role: form.role || null,
        live_url: form.live_url || null,
        live_label: form.live_label || null,
        cover_image_url: form.cover_image_url || null,
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

      // Replace visuals
      const validVisuals = uploadedVisuals.filter((v) => v.url);
      await fetch(`/api/projects/${form.slug}/visuals`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          visuals: validVisuals,
        }),
      });

      router.push("/admin/projects");
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
      title="Edit Project"
      onSubmit={handleSubmit}
      submitLabel="Update Project"
      saving={saving}
      cancelHref="/admin/projects"
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
      </div>

      <FormField label="Subtitle">
        <input
          value={form.subtitle}
          onChange={(e) => updateField("subtitle", e.target.value)}
          placeholder="Short tagline for the project"
          className={inputClasses}
        />
      </FormField>

      <FormField label="Card description" hint="Shown on the Work page project card">
        <textarea
          value={form.short_description}
          onChange={(e) => updateField("short_description", e.target.value)}
          rows={2}
          className={inputClasses}
        />
      </FormField>

      <FormField label="Description">
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className={inputClasses}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Period">
          <input
            value={form.period}
            onChange={(e) => updateField("period", e.target.value)}
            placeholder="e.g. Aug 2023 – Jan 2024"
            className={inputClasses}
          />
        </FormField>
        <FormField label="Role">
          <input
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
            placeholder="e.g. Frontend Developer"
            className={inputClasses}
          />
        </FormField>
      </div>

      <FormField label="Tech Tags">
        <StackTagInput value={techTags} onChange={setTechTags} />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Live URL">
          <input
            value={form.live_url}
            onChange={(e) => updateField("live_url", e.target.value)}
            placeholder="https://..."
            className={inputClasses}
          />
        </FormField>
        <FormField label="Live Label">
          <input
            value={form.live_label}
            onChange={(e) => updateField("live_label", e.target.value)}
            placeholder="e.g. example.com"
            className={inputClasses}
          />
        </FormField>
      </div>

      <FormField label="Repository URL">
        <input
          value={form.repo_url}
          onChange={(e) => updateField("repo_url", e.target.value)}
          placeholder="https://..."
          className={inputClasses}
        />
      </FormField>

      <FormField label="Cover Image">
        <ImageUpload
          currentUrl={form.cover_image_url || null}
          onUpload={(url) => updateField("cover_image_url", url)}
          bucket="images"
          path={`projects/${form.slug}/cover`}
        />
      </FormField>

      {/* ─── Features ─── */}
      <fieldset className="border border-gray-200 rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold text-gray-700 px-2">
          Features
        </legend>
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400 w-6">#{i + 1}</span>
            <input
              placeholder="Feature name"
              value={feature}
              onChange={(e) => {
                const next = [...features];
                next[i] = e.target.value;
                setFeatures(next);
              }}
              className={`${inputClasses} flex-1`}
            />
            <button
              type="button"
              onClick={() => setFeatures(features.filter((_, j) => j !== i))}
              className="text-red-500 hover:text-red-700 cursor-pointer text-lg leading-none"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFeatures([...features, ""])}
          className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
        >
          + Add feature
        </button>
      </fieldset>

      {/* ─── Visuals ─── */}
      <fieldset className="border border-gray-200 rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold text-gray-700 px-2">
          Visuals
        </legend>
        <p className="text-xs text-gray-400">Only JPG/JPEG and PNG files are accepted.</p>
        {visuals.map((visual, i) => (
          <div key={i} className="p-3 border border-gray-100 rounded-md space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onChange={(e) => handleVisualFile(i, e.target.files?.[0], e.target)}
                className="flex-2 text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-gray-300 file:text-xs file:bg-white file:text-gray-700 file:cursor-pointer"
              />
              <input
                placeholder="Caption"
                value={visual.caption}
                onChange={(e) => {
                  const next = [...visuals];
                  next[i].caption = e.target.value;
                  setVisuals(next);
                }}
                className={`${inputClasses} flex-2`}
              />
              <button
                type="button"
                onClick={() => setVisuals(visuals.filter((_, j) => j !== i))}
                className="text-red-500 hover:text-red-700 cursor-pointer text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`contain-${i}`}
                checked={visual.contain}
                onChange={(e) => {
                  const next = [...visuals];
                  next[i].contain = e.target.checked;
                  setVisuals(next);
                }}
                className="rounded border-gray-300"
              />
              <label htmlFor={`contain-${i}`} className="text-sm text-gray-600">
                Contain image (don&apos;t crop)
              </label>
            </div>
            {visualFileErrors[i] && (
              <p className="text-xs text-red-500">{visualFileErrors[i]}</p>
            )}
            {visual.url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={visual.url}
                alt={visual.caption || `Visual ${i + 1}`}
                className="max-w-[200px] max-h-[120px] rounded object-cover border border-gray-200"
              />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setVisuals([
              ...visuals,
              { url: "", caption: "", contain: false },
            ])
          }
          className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
        >
          + Add visual
        </button>
      </fieldset>

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
    </AdminForm>
  );
}
