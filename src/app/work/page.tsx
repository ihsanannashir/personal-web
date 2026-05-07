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
          Career timeline, projects, and education. From frontend to
          AI engineering — here&apos;s where I&apos;ve been.
        </p>
      </div>

      {/* ─── Experience ─── */}
      <section className="mb-20 sm:mb-26">
        <SectionLabel className="mb-10">Experience</SectionLabel>

        <div className="space-y-0">
          {EXPERIENCE.map((entry, index) => (
            <div
              key={index}
              className={`py-8 sm:py-10 ${
                index < EXPERIENCE.length - 1 ? "thin-border-b" : ""
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                <div>
                  <h3 className="text-body-lg font-medium text-foreground">
                    {entry.role}
                  </h3>
                  <span className="text-body text-muted">
                    {entry.company} {entry.flag}
                  </span>
                </div>
                <span className="text-body-sm text-subtle flex-shrink-0">
                  {entry.period}
                </span>
              </div>

              {/* Location */}
              <p className="text-body-sm text-subtle mb-4">{entry.location}</p>

              {/* Bullets */}
              <ul className="space-y-2 mb-5">
                {entry.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-body-sm text-muted pl-4 relative before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <TechTag
                    key={tag.label}
                    label={tag.label}
                    domain={tag.domain}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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

      {/* ─── Education ─── */}
      <section>
        <SectionLabel className="mb-10">Education</SectionLabel>

        <div className="p-6 sm:p-8 rounded-lg thin-border bg-card/50">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
            <h3 className="text-body-lg font-medium text-foreground">
              Brawijaya University
            </h3>
            <span className="text-body-sm text-subtle">Aug 2019 – Feb 2023</span>
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
      </section>
    </div>
  );
}
