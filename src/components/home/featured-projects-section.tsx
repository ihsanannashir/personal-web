import Link from "next/link";

import Section from "@/components/ui/section";
import SectionLabel from "@/components/ui/section-label";
import TechTag from "@/components/ui/tech-tag";
import type { Project } from "@/lib/types/database";

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

const FeaturedProjectsSection = ({ projects }: FeaturedProjectsSectionProps) => {
  if (projects.length === 0) return null;

  return (
    <Section>
      <SectionLabel className="mb-10">Selected work</SectionLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="group block rounded-lg thin-border bg-card/50 hover:bg-card transition-colors overflow-hidden"
          >
            <div className="h-40 sm:h-44 bg-border-light flex items-center justify-center relative overflow-hidden border-b border-border/30">
              {project.cover_image_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={project.cover_image_url}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="text-5xl transition-transform duration-500 group-hover:scale-110 select-none">
                  💻
                </span>
              )}
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-body-lg font-medium text-foreground group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <span className="text-body-sm text-subtle">↗</span>
              </div>
              {project.short_description && (
                <p className="text-body-sm text-muted mb-4 leading-relaxed line-clamp-2">
                  {project.short_description}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {project.tech_tags.slice(0, 3).map((tag) => (
                  <TechTag
                    key={tag.label}
                    label={tag.label}
                    domain={tag.domain === "other" ? "default" : tag.domain}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/work"
          className="text-body-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          See all work
          <span className="ml-0.5">→</span>
        </Link>
      </div>
    </Section>
  );
};

export default FeaturedProjectsSection;
