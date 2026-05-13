import { Metadata } from "next";

import SectionLabel from "@/components/ui/section-label";
import Title from "@/components/ui/title";
import ProgressBar from "@/components/ui/progress-bar";
import { LANGUAGES } from "@/lib/data/languages";
import { NOW_DATA } from "@/lib/data/now";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Ihsan An-Nashir is doing right now — current work, training, reading, and what's on his mind.",
};

export default function NowPage() {
  const { lastUpdated, city, focus, running, reading, thinkingAbout } =
    NOW_DATA;

  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      {/* Page header + updated pill */}
      <div className="mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full thin-border text-caption text-muted mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Updated {lastUpdated} · {city}
        </div>
        <Title>Now</Title>
        <p className="text-body-lg text-muted max-w-xl">
          A living snapshot of what I&apos;m focused on, training for, reading,
          and thinking about.
        </p>
      </div>

      {/* ─── Current Focus ─── */}
      <section className="mb-16 sm:mb-20">
        <SectionLabel className="mb-8">Current focus</SectionLabel>

        <div className="p-6 sm:p-8 rounded-lg thin-border bg-card/50">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <h3 className="text-body-lg font-medium text-foreground">
              {focus.company}
            </h3>
            <span className="text-body-sm text-subtle">{focus.role}</span>
          </div>
          <p className="text-body text-muted mb-5 leading-relaxed">
            {focus.description}
          </p>
          <ul className="space-y-2">
            {focus.highlights.map((highlight, i) => (
              <li
                key={i}
                className="text-body-sm text-muted pl-4 relative before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Half Marathon ─── */}
      <section className="mb-16 sm:mb-20">
        <SectionLabel className="mb-8">Training</SectionLabel>

        <div className="p-6 sm:p-8 rounded-lg thin-border bg-card/50">
          <h3 className="font-serif text-heading-sm mb-2">{running.goal}</h3>
          <p className="text-body-sm text-muted mb-6">
            Target: {running.raceMonth}
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-caption text-muted mb-2">
              <span>Progress</span>
              <span>{running.progress}%</span>
            </div>
            <ProgressBar value={running.progress} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 thin-border-t">
            <div>
              <span className="text-heading-sm font-serif text-foreground block">
                {running.runsPerWeek}
              </span>
              <span className="text-caption text-muted">runs / week</span>
            </div>
            <div>
              <span className="text-heading-sm font-serif text-foreground block">
                {running.longestRun}
              </span>
              <span className="text-caption text-muted">longest run</span>
            </div>
            <div>
              <span className="text-heading-sm font-serif text-foreground block">
                {running.raceMonth.split(" ")[0]}
              </span>
              <span className="text-caption text-muted">race month</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Currently Reading ─── */}
      <section className="mb-16 sm:mb-20">
        <SectionLabel className="mb-8">Reading</SectionLabel>

        <div className="p-6 sm:p-8 rounded-lg thin-border bg-card/50">
          <h3 className="text-body-lg font-medium text-foreground mb-1">
            {reading.title}
          </h3>
          <p className="text-body-sm text-subtle mb-4">{reading.author}</p>
          <p className="text-body-sm text-muted leading-relaxed">
            {reading.note}
          </p>
        </div>
      </section>

      {/* ─── Languages ─── */}
      <section className="mb-16 sm:mb-20">
        <SectionLabel className="mb-8">Language proficiency</SectionLabel>

        <div className="space-y-4">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-4 p-4 rounded-lg thin-border bg-card/50"
            >
              <span className="text-lg flex-shrink-0">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-body-sm font-medium text-foreground">
                    {lang.name}
                  </span>
                  <span className="text-caption text-muted">
                    {lang.proficiency}
                  </span>
                </div>
                <ProgressBar value={lang.progress} />
              </div>
            </div>
          ))}
        </div>

        {/* IELTS note */}
        <p className="text-caption text-subtle mt-4">
          📋 IELTS Academic Band 7.0 (C1) — English proficiency certification
        </p>
      </section>

      {/* ─── Thinking About ─── */}
      <section className="mb-16 sm:mb-20">
        <SectionLabel className="mb-8">Thinking about</SectionLabel>

        <div className="space-y-4">
          {thinkingAbout.map((question, i) => (
            <div key={i} className="pl-5 py-2 border-l-2 border-border">
              <p className="text-body text-muted italic leading-relaxed">
                {question}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer attribution ─── */}
      <div className="thin-border-t pt-8">
        <p className="text-caption text-subtle leading-relaxed max-w-lg">
          This page is inspired by{" "}
          <a
            href="https://sive.rs/nowff"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-muted transition-colors"
          >
            Derek Sivers&apos; /now page
          </a>{" "}
          movement. What are you doing now?
        </p>
      </div>
    </div>
  );
}
