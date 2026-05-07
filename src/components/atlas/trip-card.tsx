import Link from "next/link";
import { Trip } from "@/lib/types/item-data";

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  return (
    <Link
      href={`/atlas/${trip.slug}`}
      className="group block rounded-lg thin-border bg-card/50 hover:bg-card transition-colors overflow-hidden"
    >
      {/* Cover area */}
      <div className="h-44 sm:h-52 bg-border-light flex items-center justify-center">
        <span className="text-6xl">{trip.coverEmoji}</span>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <span className="text-caption text-subtle">{trip.date}</span>
        <h3 className="text-body-lg font-medium text-foreground mt-1 mb-2 group-hover:opacity-70 transition-opacity">
          {trip.title}
        </h3>
        <p className="text-body-sm text-muted leading-relaxed mb-4 line-clamp-3">
          {trip.description}
        </p>

        {/* Region tags */}
        <div className="flex flex-wrap gap-1.5">
          {trip.regionTags.map((tag) => (
            <span
              key={tag}
              className="text-caption text-subtle px-2.5 py-0.5 rounded-full thin-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
