import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import SectionLabel from "@/components/ui/section-label";
import { TRIPS } from "@/lib/data/trips";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return TRIPS.map((trip) => ({ slug: trip.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const trip = TRIPS.find((t) => t.slug === params.slug);
  if (!trip) return { title: "Trip not found" };

  return {
    title: trip.title,
    description: trip.description,
  };
}

export default function TripDetailPage({ params }: Props) {
  const trip = TRIPS.find((t) => t.slug === params.slug);
  if (!trip) notFound();

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
      <div className="w-full h-64 sm:h-80 rounded-lg bg-border-light flex items-center justify-center mb-8">
        <span className="text-7xl sm:text-8xl">{trip.coverEmoji}</span>
      </div>

      {/* Kicker + Title */}
      <div className="mb-12">
        <SectionLabel className="mb-3">{trip.kicker}</SectionLabel>
        <h1 className="font-serif text-display-sm sm:text-display mb-4">
          {trip.title}
        </h1>
        <p className="text-body-lg text-muted max-w-2xl leading-relaxed">
          {trip.opening}
        </p>
      </div>

      {/* Stats row */}
      <section className="mb-14 sm:mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {trip.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 sm:p-5 rounded-lg bg-card/50 thin-border"
            >
              <span className="font-serif text-heading-sm sm:text-heading block mb-1">
                {stat.value}
              </span>
              <span className="text-caption text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section className="mb-14 sm:mb-16">
        <SectionLabel className="mb-6">Journal</SectionLabel>
        <div className="border-l-2 border-border pl-6 sm:pl-8 max-w-2xl">
          <p className="text-body text-muted leading-relaxed italic">
            {trip.journal}
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="mb-14 sm:mb-16">
        <SectionLabel className="mb-6">Photos</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: trip.photoSlots }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-lg border border-dashed border-border flex items-center justify-center bg-border-light/30"
            >
              <span className="text-2xl opacity-30">📷</span>
            </div>
          ))}
        </div>
      </section>

      {/* Places visited */}
      <section>
        <SectionLabel className="mb-6">Places visited</SectionLabel>
        <div className="space-y-0">
          {trip.places.map((place, index) => (
            <div
              key={place.name}
              className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-4 ${
                index < trip.places.length - 1 ? "thin-border-b" : ""
              }`}
            >
              <div className="flex items-baseline gap-3 flex-1">
                <h4 className="text-body font-medium text-foreground">
                  {place.name}
                </h4>
                <span className="text-caption text-subtle px-2 py-0.5 rounded-full thin-border flex-shrink-0">
                  {place.type}
                </span>
              </div>
              <p className="text-body-sm text-muted sm:text-right sm:max-w-xs">
                {place.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
