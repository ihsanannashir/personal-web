"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Trip } from "@/lib/types/database";

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trips")
      .then((r) => r.json())
      .then((data) => { setTrips(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete trip "${slug}"?`)) return;
    const res = await fetch(`/api/trips/${slug}`, { method: "DELETE" });
    if (res.ok) setTrips((prev) => prev.filter((t) => t.slug !== slug));
    else alert("Failed to delete");
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Trips</h1>
        <Link href="/admin/trips/new" style={{ padding: "8px 16px", background: "#111", color: "#fff", borderRadius: 6, textDecoration: "none", fontSize: 14 }}>
          + New Trip
        </Link>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: 8 }}>Title</th>
            <th style={{ padding: 8 }}>Slug</th>
            <th style={{ padding: 8 }}>Type</th>
            <th style={{ padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 8 }}>{trip.title}</td>
              <td style={{ padding: 8, fontFamily: "monospace", fontSize: 13 }}>{trip.slug}</td>
              <td style={{ padding: 8 }}>{trip.type}</td>
              <td style={{ padding: 8 }}>{trip.status}</td>
              <td style={{ padding: 8, display: "flex", gap: 8 }}>
                <Link href={`/admin/trips/${trip.slug}/edit`} style={{ color: "#0070f3", textDecoration: "none", fontSize: 14 }}>Edit</Link>
                <button onClick={() => handleDelete(trip.slug)} style={{ background: "none", border: "none", color: "#e00", cursor: "pointer", fontSize: 14 }}>Delete</button>
              </td>
            </tr>
          ))}
          {trips.length === 0 && (
            <tr><td colSpan={5} style={{ padding: 16, textAlign: "center", color: "#999" }}>No trips yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
