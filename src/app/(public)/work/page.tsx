import { Metadata } from "next";
import Link from "next/link";

import SectionLabel from "@/components/ui/section-label";
import Title from "@/components/ui/title";
import TechTag from "@/components/ui/tech-tag";
import { supabase } from "@/lib/supabase";
import type { Project, Experience } from "@/lib/types/database";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Career timeline, projects, and education of Ihsan An-Nashir — Software & AI Engineer.",
};

function formatPeriod(start: string, end: string | null): string {
  const startDate = new Date(start);
  const startStr = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  if (!end) return `${startStr} – Present`;
  const endDate = new Date(end);
  const endStr = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${startStr} – ${endStr}`;
}

export default async function WorkPage() {
  const [{ data: projects }, { data: experiences }] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false }),
    supabase
      .from("experiences")
      .select("*")
      .order("display_order", { ascending: true }),
  ]);

  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      {/* Page header */}
      <div className="mb-16 sm:mb-20">
        <Title>Work</Title>
        <p className="text-body-lg text-muted max-w-xl">
          Career timeline, projects, and education. From frontend to AI
          engineering, here&apos;s where I&apos;ve been.
        </p>
      </div>

      {/* ─── Projects ─── */}
      <section className="mb-20 sm:mb-26">
        <SectionLabel className="mb-10">Projects</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(projects ?? []).map((project: Project) => (
            <Link
              key={project.slug}
              href={`/project/${project.slug}`}
              className="group block rounded-lg thin-border bg-card/50 hover:bg-card transition-colors overflow-hidden"
            >
              {/* Cover area */}
              <div className="h-44 sm:h-52 bg-border-light flex items-center justify-center relative overflow-hidden border-b border-border/30">
                {project.cover_image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-6xl transition-transform duration-500 group-hover:scale-110 select-none">
                    💻
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-baseline justify-between mb-3">
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
                <div className="flex flex-wrap gap-2">
                  {project.tech_tags.map((tag) => (
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
      </section>

      {/* ─── Experience — Zigzag Timeline ─── */}
      <section className="mb-20 sm:mb-26">
        <SectionLabel className="mb-10">Experience</SectionLabel>

        <div className="relative">
          {/* Mobile: left border line | Desktop: center line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border-light lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-8 lg:space-y-16">
            {(experiences ?? []).map((entry: Experience, index: number) => {
              const isLeft = index % 2 === 0;
              const period = formatPeriod(entry.start_date, entry.end_date);
              const location = `${entry.flag_emoji} ${entry.country_code}`;

              return (
                <div key={entry.id} className="relative pl-5 lg:pl-0">
                  {/* Dot — mobile: left edge | desktop: center */}
                  <div className="absolute left-0 top-1 -translate-x-1/2 z-10 lg:left-1/2 lg:top-8">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  </div>

                  {/* Desktop zigzag grid */}
                  <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                    {isLeft ? (
                      <>
                        {/* Company card — left on desktop */}
                        <div className="lg:text-right lg:pr-12">
                          <div className="lg:inline-block lg:min-w-[280px] lg:p-5 lg:rounded-lg lg:border-[0.5px] lg:border-border lg:bg-card/50 lg:ml-auto lg:text-left">
                            <h3 className="text-[15px] lg:text-[20px] font-medium text-foreground leading-snug">
                              {entry.company}
                            </h3>
                            <p className="text-[12px] lg:text-body-sm text-subtle lg:text-muted mt-0.5 lg:mt-1">
                              {period}
                              <span className="lg:hidden">
                                {" "}
                                · {location}
                              </span>
                            </p>
                            <p className="hidden lg:block text-caption text-subtle mt-0.5">
                              {location}
                            </p>
                          </div>
                        </div>

                        {/* Content — right on desktop */}
                        <div className="mt-3 lg:mt-0 lg:pl-12">
                          <h4 className="text-[16px] lg:text-body-lg font-medium text-foreground mb-2">
                            {entry.role}
                          </h4>
                          <p className="text-[13px] lg:text-body-sm text-muted leading-[1.7] mb-2">
                            {entry.factual_line}
                          </p>
                          {entry.personal_note && (
                            <p className="text-[13px] lg:text-body-sm text-muted italic leading-[1.7] mb-4">
                              {entry.personal_note}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1.5">
                            {entry.tech_tags.map((tag) => (
                              <TechTag
                                key={tag}
                                label={tag}
                                domain="default"
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Company card — first on mobile, right (2nd col) on desktop */}
                        <div className="lg:order-2 lg:text-left lg:pl-12">
                          <div className="lg:inline-block lg:min-w-[280px] lg:p-5 lg:rounded-lg lg:border-[0.5px] lg:border-border lg:bg-card/50 lg:mr-auto lg:text-left">
                            <h3 className="text-[15px] lg:text-[20px] font-medium text-foreground leading-snug">
                              {entry.company}
                            </h3>
                            <p className="text-[12px] lg:text-body-sm text-subtle lg:text-muted mt-0.5 lg:mt-1">
                              {period}
                              <span className="lg:hidden">
                                {" "}
                                · {location}
                              </span>
                            </p>
                            <p className="hidden lg:block text-caption text-subtle mt-0.5">
                              {location}
                            </p>
                          </div>
                        </div>

                        {/* Content — second on mobile, left (1st col) on desktop */}
                        <div className="mt-3 lg:mt-0 lg:order-1 lg:pr-12 lg:text-right">
                          <h4 className="text-[16px] lg:text-body-lg font-medium text-foreground mb-2">
                            {entry.role}
                          </h4>
                          <p className="text-[13px] lg:text-body-sm text-muted leading-[1.7] mb-2">
                            {entry.factual_line}
                          </p>
                          {entry.personal_note && (
                            <p className="text-[13px] lg:text-body-sm text-muted italic leading-[1.7] mb-4">
                              {entry.personal_note}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1.5 lg:justify-end">
                            {entry.tech_tags.map((tag) => (
                              <TechTag
                                key={tag}
                                label={tag}
                                domain="default"
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
