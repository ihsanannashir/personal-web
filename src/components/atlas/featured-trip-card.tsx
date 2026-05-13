import Link from "next/link";
import { Trip } from "@/lib/types/item-data";

interface FeaturedTripCardProps {
  trip: Trip;
}

const FeaturedTripCard = ({ trip }: FeaturedTripCardProps) => {
  return (
    <Link
      href={`/atlas/${trip.slug}`}
      className="group block col-span-1 sm:col-span-2 rounded-lg thin-border bg-card/50 hover:bg-card transition-colors overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Cover area — left */}
        <div className="h-52 sm:h-auto sm:w-1/2 bg-border-light flex items-center justify-center flex-shrink-0">
          <span className="text-7xl sm:text-8xl">{trip.coverEmoji}</span>
        </div>

        {/* Content — right */}
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <span className="text-label uppercase tracking-[0.15em] text-subtle mb-3">
            Latest trip
          </span>
          <span className="text-caption text-subtle">{trip.date}</span>
          <h3 className="font-serif text-heading sm:text-heading text-foreground mt-1 mb-3 group-hover:opacity-70 transition-opacity">
            {trip.title}
          </h3>
          <p className="text-body-sm text-muted leading-relaxed mb-5">
            {trip.description}
          </p>

          {/* Category tag */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-caption text-subtle px-2.5 py-0.5 rounded-full thin-border">
              {trip.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedTripCard;
