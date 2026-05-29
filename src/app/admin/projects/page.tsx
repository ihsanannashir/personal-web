"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types/database";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?all=true")
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(project: Project) {
    const res = await fetch(`/api/projects/${project.slug}`, { method: "DELETE" });
    if (res.ok) setProjects((prev) => prev.filter((p) => p.slug !== project.slug));
    else alert("Failed to delete");
  }

  if (loading) {
    return <p className="text-gray-400 py-8">Loading…</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          + New Project
        </Link>
      </div>

      <AdminTable
        columns={[
          { key: "title", label: "Title" },
          {
            key: "slug",
            label: "Slug",
            render: (val) => (
              <span className="font-mono text-xs text-gray-500">
                {val as string}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (val) => (
              <StatusBadge status={val as "published" | "draft"} />
            ),
          },
          {
            key: "tech_tags",
            label: "Tags",
            render: (val) => (
              <span className="text-xs text-gray-500">
                {(val as { label: string }[]).map((t) => t.label).join(", ")}
              </span>
            ),
          },
        ]}
        rows={projects}
        getEditHref={(project) => `/admin/projects/${project.slug}/edit`}
        onDelete={handleDelete}
        emptyMessage="No projects yet"
      />
    </div>
  );
}
