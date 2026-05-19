import { Metadata } from "next";

import SectionLabel from "@/components/ui/section-label";
import Title from "@/components/ui/title";
import StatCard from "@/components/ui/stat-card";
import AtlasFilters from "@/components/atlas/atlas-filters";
import { supabase } from "@/lib/supabase";
import type { Trip as DBTrip } from "@/lib/types/database";
import type { Trip } from "@/lib/types/item-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "A living journal of trips — what I saw, what I thought, what I ate.",
};

function mapTrip(t: DBTrip): Trip {
  return {
    slug: t.slug,
    title: t.title,
    date: t.location,
    category: t.type as Trip["category"],
    coverEmoji: "🗺️",
    description: t.opening_paragraph ?? "",
    featured: t.is_featured,
    kicker: t.kicker ?? "",
    opening: t.opening_paragraph ?? "",
    stats: [],
    journal: t.journal_entry ?? "",
    places: [],
    photoSlots: 0,
  };
}

export default async function AtlasPage() {
  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .eq("status", "published")
    .order("trip_start_date", { ascending: false });

  const mappedTrips: Trip[] = (trips ?? []).map(mapTrip);
  const uniqueCountries = new Set((trips ?? []).map((t: DBTrip) => t.country));

  const stats = {
    tripsLogged: mappedTrips.length,
    countriesVisited: uniqueCountries.size,
    mountainsClimbed: (trips ?? []).filter(
      (t: DBTrip) => t.type === "Hiking",
    ).length,
    nightsAway: "—",
  };

  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      {/* Page header */}
      <div className="mb-12 sm:mb-16">
        <SectionLabel className="mb-4">Places I&apos;ve been</SectionLabel>
        <Title>The atlas.</Title>
        <p className="text-body-lg text-muted max-w-xl">
          A living journal of trips — what I saw, what I thought, what I ate.
        </p>
      </div>

      {/* Stats row */}
      <section className="mb-14 sm:mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 thin-border rounded-lg">
          <StatCard
            value={String(stats.tripsLogged)}
            label="Trips logged"
            className="border-b sm:border-b-0 sm:border-r border-[var(--border)]"
          />
          <StatCard
            value={String(stats.countriesVisited)}
            label="Countries visited"
            className="border-b sm:border-b-0 sm:border-r border-[var(--border)]"
          />
          <StatCard
            value={String(stats.mountainsClimbed)}
            label="Mountains climbed"
            className="sm:border-r border-[var(--border)]"
          />
          <StatCard value={String(stats.nightsAway)} label="Nights away" />
        </div>
      </section>

      {/* Filters + Trip grid */}
      <section>
        <SectionLabel className="mb-8">Trips</SectionLabel>
        <AtlasFilters trips={mappedTrips} />
      </section>
    </div>
  );
}
