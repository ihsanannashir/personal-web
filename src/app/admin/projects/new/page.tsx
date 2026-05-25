"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminForm from "@/components/admin/AdminForm";
import FormField from "@/components/admin/FormField";
import ImageUpload from "@/components/admin/ImageUpload";
import TagInput from "@/components/admin/TagInput";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    external_url: "",
    status: "draft",
  });
  const [techTags, setTechTags] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        tech_tags: techTags,
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
      alert(err instanceof Error ? err.message : "Failed to create project");
      setSaving(false);
    }
  }

  return (
    <AdminForm
      title="New Project"
      onSubmit={handleSubmit}
      submitLabel="Create Project"
      saving={saving}
      cancelHref="/admin/projects"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Slug" required>
          <input
            required
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
          />
        </FormField>
        <FormField label="Title" required>
          <input
            required
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
          />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
        />
      </FormField>

      <FormField label="Tech Tags">
        <TagInput value={techTags} onChange={setTechTags} />
      </FormField>

      <FormField label="External URL">
        <input
          value={form.external_url}
          onChange={(e) => updateField("external_url", e.target.value)}
          placeholder="https://..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
        />
      </FormField>

      <FormField label="Cover Image">
        <ImageUpload
          currentUrl={null}
          onUpload={(url) => setCoverImageUrl(url)}
          bucket="images"
          path={`projects/${form.slug}/cover`}
        />
      </FormField>

      <FormField label="Status">
        <select
          value={form.status}
          onChange={(e) => updateField("status", e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none bg-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </FormField>
    </AdminForm>
  );
}
