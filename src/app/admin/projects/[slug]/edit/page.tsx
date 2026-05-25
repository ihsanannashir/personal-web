"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Project } from "@/lib/types/database";
import AdminForm from "@/components/admin/AdminForm";
import FormField from "@/components/admin/FormField";
import ImageUpload from "@/components/admin/ImageUpload";
import TagInput from "@/components/admin/TagInput";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    external_url: "",
    cover_image_url: "",
    status: "draft",
  });
  const [techTags, setTechTags] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/projects/${params.slug}`)
      .then((r) => r.json())
      .then((project: Project) => {
        setForm({
          slug: project.slug,
          title: project.title,
          description: project.description ?? "",
          external_url: project.external_url ?? "",
          cover_image_url: project.cover_image_url ?? "",
          status: project.status,
        });
        setTechTags(project.tech_tags);
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

    try {
      const payload = {
        ...form,
        tech_tags: techTags,
        external_url: form.external_url || null,
        description: form.description || null,
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

      router.push("/admin/projects");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-gray-400 py-8">Loading…</p>;
  }

  return (
    <AdminForm
      title="Edit Project"
      onSubmit={handleSubmit}
      submitLabel="Update Project"
      saving={saving}
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
          currentUrl={form.cover_image_url || null}
          onUpload={(url) => updateField("cover_image_url", url)}
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
