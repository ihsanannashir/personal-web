import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import SectionLabel from "@/components/ui/section-label";
import Title from "@/components/ui/title";
import { supabase } from "@/lib/supabase";
import type { TripWithRelations } from "@/lib/types/database";

export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: trip } = await supabase
    .from("trips")
    .select("title, opening_paragraph")
    .eq("slug", slug)
    .single();

  if (!trip) return { title: "Trip not found" };

  return {
    title: trip.title,
    description: trip.opening_paragraph ?? "",
  };
}

export default async function TripDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("trips")
    .select("*, trip_photos(*), trip_places(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) notFound();

  const trip = data as TripWithRelations;
  trip.trip_photos.sort((a, b) => a.display_order - b.display_order);
  trip.trip_places.sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      {/* Back link */}
      <Link
        href="/atlas"
        className="text-body-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8"
      >
        ← Back to atlas
      </Link>

      {/* Hero image area */}
      {trip.hero_image_url ? (
        <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-8 relative">
          <img
            src={trip.hero_image_url}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          {trip.kicker && (
            <span className="absolute bottom-3 left-3 text-caption uppercase tracking-[0.15em] text-white bg-black/50 px-3 py-1 rounded-full">
              {trip.kicker}
            </span>
          )}
        </div>
      ) : (
        <div className="w-full h-64 sm:h-80 rounded-lg bg-border-light flex items-center justify-center mb-8 relative">
          <span className="text-7xl sm:text-8xl">🗺️</span>
          {trip.kicker && (
            <span className="absolute bottom-3 left-3 text-caption uppercase tracking-[0.15em] text-white bg-black/50 px-3 py-1 rounded-full">
              {trip.kicker}
            </span>
          )}
        </div>
      )}

      {/* Title + metadata */}
      <div className="mb-12">
        <SectionLabel className="mb-3">
          {trip.country} &middot; {trip.type}
        </SectionLabel>

        <Title>{trip.title}</Title>

        <div className="mt-3 space-y-0.5">
          <p className="text-body-sm text-muted">
            {formatTripDates(trip.trip_start_date, trip.trip_end_date)}
          </p>
        </div>

        {trip.opening_paragraph && (
          <div className="mt-6 space-y-4">
            {trip.opening_paragraph.split("\n").filter(Boolean).map((para, i) => (
              <p key={i} className="text-body-lg text-muted leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Journal */}
      {trip.journal_entry && (
        <section className="mb-14 sm:mb-16">
          <SectionLabel className="mb-6">Journal</SectionLabel>
          <div className="border-l-2 border-border pl-6 sm:pl-8 space-y-4">
            {trip.journal_entry.split("\n").filter(Boolean).map((para, i) => (
              <p key={i} className="text-body text-muted leading-relaxed italic">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Photo grid */}
      {trip.trip_photos.length > 0 && (
        <section className="mb-14 sm:mb-16">
          <SectionLabel className="mb-6">Photos</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {trip.trip_photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-[4/3] rounded-lg overflow-hidden relative"
              >
                <img
                  src={photo.url}
                  alt={photo.caption ?? "Trip photo"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Places visited */}
      {trip.trip_places.length > 0 && (
        <section>
          <SectionLabel className="mb-6">Places visited</SectionLabel>
          <div className="space-y-0">
            {trip.trip_places.map((place, index) => (
              <div
                key={place.id}
                className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-4 ${
                  index < trip.trip_places.length - 1 ? "thin-border-b" : ""
                }`}
              >
                <div className="flex items-baseline gap-3 flex-1">
                  <h4 className="text-body font-medium text-foreground">
                    {place.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function formatTripDates(
  startDateStr?: string | null,
  endDateStr?: string | null,
): string {
  if (!startDateStr) return "";

  const parseLocalDate = (dateStr: string) => {
    const parts = dateStr.slice(0, 10).split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  };

  const start = parseLocalDate(startDateStr);
  const end = endDateStr ? parseLocalDate(endDateStr) : null;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startMonth = months[start.getMonth()];
  const startDay = start.getDate();
  const startYear = start.getFullYear();

  if (!end) {
    return `${startMonth} ${startDay}, ${startYear}`;
  }

  const endMonth = months[end.getMonth()];
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
  }

  if (startMonth !== endMonth) {
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
  }

  if (startDay !== endDay) {
    return `${startMonth} ${startDay} – ${endDay}, ${startYear}`;
  }

  return `${startMonth} ${startDay}, ${startYear}`;
}
