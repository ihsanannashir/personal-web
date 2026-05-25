"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Trip } from "@/lib/types/database";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trips")
      .then((r) => r.json())
      .then((data) => { setTrips(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(trip: Trip) {
    const res = await fetch(`/api/trips/${trip.slug}`, { method: "DELETE" });
    if (res.ok) setTrips((prev) => prev.filter((t) => t.slug !== trip.slug));
    else alert("Failed to delete");
  }

  if (loading) {
    return <p className="text-gray-400 py-8">Loading…</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Trips</h1>
        <Link
          href="/admin/trips/new"
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          + New Trip
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
          { key: "type", label: "Type" },
          {
            key: "status",
            label: "Status",
            render: (val) => (
              <StatusBadge status={val as "published" | "draft"} />
            ),
          },
        ]}
        rows={trips}
        getEditHref={(trip) => `/admin/trips/${trip.slug}/edit`}
        onDelete={handleDelete}
        emptyMessage="No trips yet"
      />
    </div>
  );
}
