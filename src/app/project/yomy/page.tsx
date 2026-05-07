import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import YomyThumbnail from "@public/assets/yomy.png";
import YomyDashboardLanding from "@public/assets/yomy/yomy-dashboard-landing.png";
import YomyDashboardMain from "@public/assets/yomy/yomy-dashboard-main.png";
import YomyRatingPage from "@public/assets/yomy/yomy-rating-page.png";
import YomyReview from "@public/assets/yomy/yomy-review.png";

import SectionLabel from "@/components/ui/section-label";
import { constructMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Yomy",
  description: "A web based SaaS Customer Feedback Manager Application",
  keywords:
    "React, react, ReactJS, React,js, Tailwind, TailwindCSS, CMS, SaaS, Yomy, Yomy App, React Project",
  slug: "/project/yomy",
  ogImage: YomyThumbnail,
});

const YomyDetailPage = () => {
  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      {/* Back link */}
      <Link
        href="/work"
        className="text-body-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8"
      >
        ← Back to work
      </Link>

      {/* Thumbnail */}
      <Image
        src={YomyThumbnail}
        alt="Yomy App"
        placeholder="blur"
        sizes="100vw"
        className="w-full h-60 sm:h-80 rounded-lg object-cover thin-border"
      />

      {/* Header */}
      <div className="mt-8 mb-12">
        <h1 className="font-serif text-display-sm sm:text-display mb-4">
          Yomy
        </h1>
        <p className="text-body-lg text-muted max-w-xl">
          A web-based SaaS application for managing customer feedback.
        </p>
      </div>

      {/* Description */}
      <section className="mb-12">
        <SectionLabel className="mb-6">Description</SectionLabel>
        <div className="space-y-4 text-body text-muted leading-relaxed max-w-2xl">
          <p>
            <strong className="text-foreground">Yomy</strong> is a web-based{" "}
            <em>Software-as-a-Service</em> (SaaS) application for managing
            customer feedback. It includes two parts: a{" "}
            <strong className="text-foreground">client website</strong> and a{" "}
            <strong className="text-foreground">dashboard</strong>.
          </p>
          <p>
            The client website allows users to submit rating and reviews for
            specific locations, while the dashboard lets business owners view
            reviews, monitor statistics, and manage information about their
            locations.
          </p>
          <p>I was appointed as the Frontend Developer for this project.</p>
        </div>
      </section>

      {/* Demo Link */}
      <a
        href="https://dashboard.yomy.org"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 text-body-sm font-medium rounded-full thin-border text-foreground hover:bg-foreground hover:text-background transition-colors mb-12"
      >
        View dashboard ↗
      </a>

      {/* Features */}
      <section className="mb-12">
        <SectionLabel className="mb-6">Key features</SectionLabel>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Star and comment reviews",
            "Stripe payment gateway",
            "QR code generator",
            "Referral link",
            "Mailing list",
            "Google sign-in",
          ].map((feature) => (
            <li
              key={feature}
              className="text-body-sm text-muted pl-4 relative before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border"
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <SectionLabel className="mb-6">Tech stack</SectionLabel>
        <p className="text-body-sm text-muted mb-4">
          Both applications were built fully on a React-TypeScript environment:
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {["TypeScript", "React", "TailwindCSS", "Strapi CMS", "AdonisJS", "MySQL"].map(
            (tech) => (
              <li
                key={tech}
                className="text-body-sm text-muted pl-4 relative before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-border"
              >
                {tech}
              </li>
            )
          )}
        </ul>
      </section>

      {/* Visuals */}
      <section>
        <SectionLabel className="mb-2">Visuals</SectionLabel>
        <p className="text-body-sm text-subtle mb-8">
          Some previews of the application (screenshots taken during development, some cannot
          be shown due to NDA)
        </p>

        <div className="space-y-8">
          <div className="space-y-2">
            <Image
              src={YomyDashboardLanding}
              alt="Yomy Dashboard Login"
              placeholder="blur"
              sizes="100vw"
              className="w-full rounded-lg object-cover thin-border"
            />
            <p className="text-caption text-subtle">Dashboard login page</p>
          </div>

          <div className="space-y-2">
            <Image
              src={YomyDashboardMain}
              alt="Yomy Dashboard Main"
              placeholder="blur"
              sizes="100vw"
              className="w-full rounded-lg object-cover thin-border"
            />
            <p className="text-caption text-subtle">Dashboard main page</p>
          </div>

          <div className="space-y-2">
            <Image
              src={YomyRatingPage}
              alt="Yomy Rating Page"
              placeholder="blur"
              sizes="100vw"
              className="w-full rounded-lg object-cover thin-border"
            />
            <p className="text-caption text-subtle">Dashboard rating page</p>
          </div>

          <div className="space-y-2 w-full sm:h-96">
            <Image
              src={YomyReview}
              alt="Yomy Client App"
              placeholder="blur"
              sizes="100vw"
              className="w-full h-full rounded-lg object-contain thin-border bg-card"
            />
            <p className="text-caption text-subtle">Client app landing page</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YomyDetailPage;
