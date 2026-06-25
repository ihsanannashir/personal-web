"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Experience } from "@/lib/types/database";
import AdminTable from "@/components/admin/AdminTable";

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/experiences")
      .then((r) => r.json())
      .then((data) => { setExperiences(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(exp: Experience) {
    const res = await fetch(`/api/experiences/${exp.id}`, { method: "DELETE" });
    if (res.ok) setExperiences((prev) => prev.filter((e) => e.id !== exp.id));
    else alert("Failed to delete");
  }

  if (loading) {
    return <p className="text-gray-400 py-8">Loading…</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Experiences</h1>
        <Link
          href="/admin/experiences/new"
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          + New Experience
        </Link>
      </div>

      <AdminTable
        columns={[
          {
            key: "display_order",
            label: "#",
            render: (val) => (
              <span className="text-gray-400">{val as number}</span>
            ),
          },
          {
            key: "company",
            label: "Company",
            render: (_val, row) => (
              <span>
                {(row as Experience).flag_emoji} {(row as Experience).company}
              </span>
            ),
          },
          { key: "role", label: "Role" },
          {
            key: "start_date",
            label: "Period",
            render: (_val, row) => {
              const exp = row as Experience;
              return (
                <span className="text-xs text-gray-500">
                  {exp.start_date.slice(0, 7)} –{" "}
                  {exp.end_date?.slice(0, 7) ?? "Present"}
                </span>
              );
            },
          },
        ]}
        rows={experiences}
        getEditHref={(exp) => `/admin/experiences/${(exp as Experience).id}/edit`}
        onDelete={handleDelete}
        emptyMessage="No experiences yet"
      />
    </div>
  );
}
