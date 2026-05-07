"use client";

import { useState } from "react";
import clsx from "clsx";
import { Trip, TripRegionTag } from "@/lib/types/item-data";
import FeaturedTripCard from "@/components/atlas/featured-trip-card";
import TripCard from "@/components/atlas/trip-card";

interface AtlasFiltersProps {
  trips: Trip[];
}

const FILTERS = ["All", "Southeast Asia", "Indonesia", "Hiking", "Solo"] as const;
type FilterValue = (typeof FILTERS)[number];

const AtlasFilters = ({ trips }: AtlasFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  const filteredTrips =
    activeFilter === "All"
      ? trips
      : trips.filter((t) =>
          t.regionTags.includes(activeFilter as TripRegionTag),
        );

  const featuredTrip = filteredTrips.find((t) => t.featured);
  const standardTrips = filteredTrips.filter((t) => !t.featured);

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10 sm:mb-12">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={clsx(
              "px-4 py-1.5 rounded-full text-body-sm transition-colors",
              activeFilter === filter
                ? "bg-foreground text-background"
                : "thin-border text-muted hover:text-foreground hover:border-foreground",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Trip grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Featured card */}
        {featuredTrip && <FeaturedTripCard trip={featuredTrip} />}

        {/* Standard cards */}
        {standardTrips.map((trip) => (
          <TripCard key={trip.slug} trip={trip} />
        ))}

        {/* Placeholder card */}
        <div className="flex items-center justify-center rounded-lg border border-dashed border-border min-h-[200px] sm:min-h-[280px]">
          <div className="text-center">
            <span className="text-3xl block mb-3">🗺️</span>
            <p className="text-body-sm text-subtle">More trips coming</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AtlasFilters;
