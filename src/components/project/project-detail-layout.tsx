import Link from "next/link";

import SectionLabel from "@/components/ui/section-label";
import TechTag from "@/components/ui/tech-tag";
import { TechTagData } from "@/lib/types/item-data";

interface MetadataRow {
  label: string;
  value: React.ReactNode;
}

interface ProjectDetailLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  period: string;
  role: string;
  stack: TechTagData[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  children: React.ReactNode;
}

const ProjectDetailLayout = ({
  title,
  subtitle,
  heroImage,
  heroAlt,
  period,
  role,
  stack,
  liveUrl,
  liveLabel = "View live",
  repoUrl,
  children,
}: ProjectDetailLayoutProps) => {
  const metadata: MetadataRow[] = [
    { label: "Period", value: period },
    { label: "Role", value: role },
    {
      label: "Stack",
      value: (
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tag) => (
            <TechTag key={tag.label} label={tag.label} domain={tag.domain} />
          ))}
        </div>
      ),
    },
    ...(liveUrl
      ? [
          {
            label: "Live",
            value: (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:opacity-70 transition-opacity"
              >
                {liveLabel} ↗
              </a>
            ),
          },
        ]
      : []),
    ...(repoUrl
      ? [
          {
            label: "Repository",
            value: (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:opacity-70 transition-opacity"
              >
                Repository ↗
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="editorial-container pt-16 sm:pt-18 pb-20">
      <Link
        href="/work"
        className="text-body-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8"
      >
        ← Back to work
      </Link>

      <img
        src={heroImage}
        alt={heroAlt}
        className="w-full aspect-[2/1] sm:aspect-[2.5/1] rounded-xl object-cover thin-border mb-8 max-h-80"
      />

      <div className="p-5 sm:p-6 rounded-lg thin-border bg-card/50 mb-10">
        <div className="space-y-3">
          {metadata.map((row) => (
            <div
              key={row.label}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0"
            >
              <span className="text-caption font-medium uppercase tracking-wide text-subtle w-20 flex-shrink-0">
                {row.label}
              </span>
              <span className="text-body-sm text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
};

export default ProjectDetailLayout;

export const ProjectSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <section className="mb-12 sm:mb-14 thin-border-t pt-10">
    <SectionLabel className="mb-6">{label}</SectionLabel>
    {children}
  </section>
);

export const FeatureGrid = ({ features }: { features: string[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {features.map((feature) => (
      <div
        key={feature}
        className="p-4 rounded-lg thin-border bg-card/50 text-body-sm text-muted"
      >
        {feature}
      </div>
    ))}
  </div>
);

export const ImageFigure = ({
  src,
  alt,
  caption,
  contain,
}: {
  src: string;
  alt: string;
  caption: string;
  contain?: boolean;
}) => (
  <figure className="rounded-lg thin-border overflow-hidden">
    <img
      src={src}
      alt={alt}
      className={`w-full ${contain ? "aspect-video object-contain bg-card" : "object-cover"}`}
    />
    <figcaption className="px-4 py-2.5 text-caption text-subtle bg-card/30 thin-border-t">
      {caption}
    </figcaption>
  </figure>
);
