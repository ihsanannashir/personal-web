import { Metadata } from "next";

import SectionLabel from "@/components/ui/section-label";
import StatCard from "@/components/ui/stat-card";
import AtlasFilters from "@/components/atlas/atlas-filters";
import { TRIPS, ATLAS_STATS } from "@/lib/data/trips";

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "A living journal of trips — what I saw, what I thought, what I ate.",
};

export default function AtlasPage() {
  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      {/* Page header */}
      <div className="mb-12 sm:mb-16">
        <SectionLabel className="mb-4">Places I&apos;ve been</SectionLabel>
        <h1 className="font-serif text-display-sm sm:text-display mb-4">
          The atlas.
        </h1>
        <p className="text-body-lg text-muted max-w-xl">
          A living journal of trips — what I saw, what I thought, what I ate.
        </p>
      </div>

      {/* Stats row */}
      <section className="mb-14 sm:mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 thin-border rounded-lg">
          <StatCard
            value={String(ATLAS_STATS.tripsLogged)}
            label="Trips logged"
            className="border-b sm:border-b-0 sm:border-r border-[var(--border)]"
          />
          <StatCard
            value={String(ATLAS_STATS.countriesVisited)}
            label="Countries visited"
            className="border-b sm:border-b-0 sm:border-r border-[var(--border)]"
          />
          <StatCard
            value={String(ATLAS_STATS.soloAdventures)}
            label="Solo adventures"
            className="sm:border-r border-[var(--border)]"
          />
          <StatCard
            value={ATLAS_STATS.firstEntry}
            label="First entry"
          />
        </div>
      </section>

      {/* Filters + Trip grid */}
      <section>
        <SectionLabel className="mb-8">Trips</SectionLabel>
        <AtlasFilters trips={TRIPS} />
      </section>
    </div>
  );
}
