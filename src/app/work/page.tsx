import { Metadata } from "next";
import Link from "next/link";

import SectionLabel from "@/components/ui/section-label";
import TechTag from "@/components/ui/tech-tag";
import { EXPERIENCE } from "@/lib/data/experience";
import { PROJECTS } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Career timeline, projects, and education of Ihsan An-Nashir — Software & AI Engineer.",
};

export default function WorkPage() {
  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      {/* Page header */}
      <div className="mb-16 sm:mb-20">
        <h1 className="font-serif text-display-sm sm:text-display mb-4">
          Work
        </h1>
        <p className="text-body-lg text-muted max-w-xl">
          Career timeline, projects, and education. From frontend to AI
          engineering, here&apos;s where I&apos;ve been.
        </p>
      </div>

      {/* ─── Projects ─── */}
      <section className="mb-20 sm:mb-26">
        <SectionLabel className="mb-10">Projects</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/project/${project.slug}`}
              className="group block p-6 rounded-lg thin-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-body-lg font-medium text-foreground group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <span className="text-body-sm text-subtle">↗</span>
              </div>
              {project.period && (
                <p className="text-caption text-subtle mb-3">
                  {project.period}
                </p>
              )}
              <p className="text-body-sm text-muted mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TechTag
                    key={tag.label}
                    label={tag.label}
                    domain={tag.domain}
                  />
                ))}
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
            {EXPERIENCE.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative pl-5 lg:pl-0">
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
                              {entry.period}
                              <span className="lg:hidden">
                                {" "}
                                · {entry.location}
                              </span>
                            </p>
                            <p className="hidden lg:block text-caption text-subtle mt-0.5">
                              {entry.location}
                            </p>
                          </div>
                        </div>

                        {/* Content — right on desktop */}
                        <div className="mt-3 lg:mt-0 lg:pl-12">
                          <h4 className="text-[16px] lg:text-body-lg font-medium text-foreground mb-2">
                            {entry.role}
                          </h4>
                          <p className="text-[13px] lg:text-body-sm text-muted leading-[1.7] mb-2">
                            {entry.factual}
                          </p>
                          <p className="text-[13px] lg:text-body-sm text-muted italic leading-[1.7] mb-4">
                            {entry.narrative}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.tags.map((tag) => (
                              <TechTag
                                key={tag.label}
                                label={tag.label}
                                domain={tag.domain}
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
                              {entry.period}
                              <span className="lg:hidden">
                                {" "}
                                · {entry.location}
                              </span>
                            </p>
                            <p className="hidden lg:block text-caption text-subtle mt-0.5">
                              {entry.location}
                            </p>
                          </div>
                        </div>

                        {/* Content — second on mobile, left (1st col) on desktop */}
                        <div className="mt-3 lg:mt-0 lg:order-1 lg:pr-12 lg:text-right">
                          <h4 className="text-[16px] lg:text-body-lg font-medium text-foreground mb-2">
                            {entry.role}
                          </h4>
                          <p className="text-[13px] lg:text-body-sm text-muted leading-[1.7] mb-2">
                            {entry.factual}
                          </p>
                          <p className="text-[13px] lg:text-body-sm text-muted italic leading-[1.7] mb-4">
                            {entry.narrative}
                          </p>
                          <div className="flex flex-wrap gap-1.5 lg:justify-end">
                            {entry.tags.map((tag) => (
                              <TechTag
                                key={tag.label}
                                label={tag.label}
                                domain={tag.domain}
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

      {/* ─── Education ─── */}
      {/* <section>
        <SectionLabel className="mb-10">Education</SectionLabel>

        <div className="p-6 sm:p-8 rounded-lg thin-border bg-card/50">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
            <h3 className="text-body-lg font-medium text-foreground">
              Brawijaya University
            </h3>
            <span className="text-body-sm text-subtle">
              Aug 2019 – Feb 2023
            </span>
          </div>
          <p className="text-body text-muted mb-2">
            B.Eng. Computer Engineering, Computer Science Faculty
          </p>
          <p className="text-body-sm text-subtle mb-4">GPA: 3.76 / 4.00</p>
          <div className="thin-border-t pt-4">
            <span className="text-caption text-subtle uppercase tracking-wide">
              Thesis
            </span>
            <p className="text-body-sm text-muted mt-1 leading-relaxed">
              Intensity Detection of Angry Emotion Through Speech Using
              Wavelet-Based Frequency Cepstral Coefficients and K-Nearest
              Neighbor Algorithm on Raspberry Pi 4
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
