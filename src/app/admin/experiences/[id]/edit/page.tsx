"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Experience } from "@/lib/types/database";
import AdminForm from "@/components/admin/AdminForm";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";

export default function EditExperiencePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
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
    display_order: 0,
  });
  const [techTags, setTechTags] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/experiences/${params.id}`)
      .then((r) => r.json())
      .then((exp: Experience) => {
        setForm({
          company: exp.company,
          country_code: exp.country_code,
          flag_emoji: exp.flag_emoji,
          role: exp.role,
          start_date: exp.start_date.slice(0, 10),
          end_date: exp.end_date?.slice(0, 10) ?? "",
          factual_line: exp.factual_line,
          personal_note: exp.personal_note ?? "",
          display_order: exp.display_order,
        });
        setTechTags(exp.tech_tags);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  function updateField(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      tech_tags: techTags,
      end_date: form.end_date || null,
      personal_note: form.personal_note || null,
    };

    const res = await fetch(`/api/experiences/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to update experience");
      setSaving(false);
      return;
    }

    router.push("/admin/experiences");
  }

  if (loading) {
    return <p className="text-gray-400 py-8">Loading…</p>;
  }

  const inputClasses =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none";

  return (
    <AdminForm
      title="Edit Experience"
      onSubmit={handleSubmit}
      submitLabel="Update Experience"
      saving={saving}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Company" required>
          <input
            required
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="Role" required>
          <input
            required
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="Country Code" required>
          <input
            required
            value={form.country_code}
            onChange={(e) => updateField("country_code", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="Flag Emoji" required>
          <input
            required
            value={form.flag_emoji}
            onChange={(e) => updateField("flag_emoji", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="Start Date" required>
          <input
            required
            type="date"
            value={form.start_date}
            onChange={(e) => updateField("start_date", e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <FormField label="End Date" hint='Leave empty for "Present"'>
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => updateField("end_date", e.target.value)}
            className={inputClasses}
          />
        </FormField>
      </div>

      <FormField label="Factual Line" required>
        <textarea
          required
          value={form.factual_line}
          onChange={(e) => updateField("factual_line", e.target.value)}
          rows={2}
          className={inputClasses}
        />
      </FormField>

      <FormField label="Personal Note">
        <textarea
          value={form.personal_note}
          onChange={(e) => updateField("personal_note", e.target.value)}
          rows={2}
          className={inputClasses}
        />
      </FormField>

      <FormField label="Tech Tags">
        <TagInput value={techTags} onChange={setTechTags} />
      </FormField>

      <FormField label="Display Order">
        <input
          type="number"
          value={form.display_order}
          onChange={(e) => updateField("display_order", Number(e.target.value))}
          className={`${inputClasses} w-24`}
        />
      </FormField>
    </AdminForm>
  );
}
