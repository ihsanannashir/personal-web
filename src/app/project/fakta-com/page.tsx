import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FaktaThumbnail from "@public/assets/fakta.png";
import FaktaLandingPage from "@public/assets/fakta/landing-page.png";
import FaktaNewsDetail from "@public/assets/fakta/news-detail.png";
import FaktaVideoDetail from "@public/assets/fakta/video-detail.png";
import FaktaVideoMobile from "@public/assets/fakta/video-mobile.png";
import FaktaSubdomainList from "@public/assets/fakta/subdomain-list.png";

import SectionLabel from "@/components/ui/section-label";
import { constructMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Fakta.com 2.0",
  description:
    "An Indonesian online media platform that offers news, data, and opinions on a wide range of topics.",
  keywords:
    "React, react, ReactJS, React,js, NextJS, Next.js, News Portal Project, Fakta.com, Tailwind, TailwindCSS, CMS, News Website, Fakta News, React Project, Frontend Project",
  slug: "/project/fakta-com",
  ogImage: FaktaThumbnail,
});

const FaktaDetailPage = () => {
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
        src={FaktaThumbnail}
        alt="Fakta.com 2.0"
        placeholder="blur"
        sizes="100vw"
        className="w-full h-60 sm:h-80 rounded-lg object-cover thin-border"
      />

      {/* Header */}
      <div className="mt-8 mb-12">
        <h1 className="font-serif text-display-sm sm:text-display mb-4">
          Fakta.com 2.0
        </h1>
        <p className="text-body-lg text-muted max-w-xl">
          An Indonesian online media platform that offers news, data, and
          opinions on a wide range of topics.
        </p>
      </div>

      {/* Description */}
      <section className="mb-12">
        <SectionLabel className="mb-6">Description</SectionLabel>
        <div className="space-y-4 text-body text-muted leading-relaxed max-w-2xl">
          <p>
            <strong className="text-foreground">Fakta.com</strong> is an
            Indonesian online media platform that offers news, data, and
            opinions on a wide range of topics. This project is divided into two
            parts: the <strong className="text-foreground">main website</strong>{" "}
            and a{" "}
            <strong className="text-foreground">
              Content Management System
            </strong>{" "}
            (CMS).
          </p>
          <p>
            The main website features headlines, trending news, and the latest
            updates in the form of articles and videos (all shown and written in
            Indonesian). The CMS allows admins to create, update, and manage the
            content displayed on the main website.
          </p>
          <p>
            On this project, I was appointed as the Frontend Developer for the
            main website.
          </p>
        </div>
      </section>

      {/* Demo Link */}
      <a
        href="https://fakta.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 text-body-sm font-medium rounded-full thin-border text-foreground hover:bg-foreground hover:text-background transition-colors mb-12"
      >
        View live ↗
      </a>

      {/* Features */}
      <section className="mb-12">
        <SectionLabel className="mb-6">Key features</SectionLabel>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Detailed and categorized news",
            "Interactive slider",
            "Content management system",
            "Swipeable videos",
            "Authorization with multiple roles",
            "Comments",
            "Mobile views",
            "Automatic sub-domains",
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
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {["TypeScript", "TailwindCSS", "Next.js", "Express.js", "MySQL", "Kubernetes"].map(
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
          Some previews of the live project (some cannot be shown due to NDA)
        </p>

        <div className="space-y-8">
          <div className="space-y-2">
            <Image
              src={FaktaLandingPage}
              alt="Fakta.com Landing Page"
              placeholder="blur"
              sizes="100vw"
              className="w-full rounded-lg object-cover thin-border"
            />
            <p className="text-caption text-subtle">Landing page</p>
          </div>

          <div className="space-y-2">
            <Image
              src={FaktaNewsDetail}
              alt="Fakta.com News Page"
              placeholder="blur"
              sizes="100vw"
              className="w-full rounded-lg object-cover thin-border"
            />
            <p className="text-caption text-subtle">News detail page</p>
          </div>

          <div className="space-y-2">
            <div className="w-full sm:h-96 flex flex-col sm:flex-row gap-2">
              <Image
                src={FaktaVideoDetail}
                alt="Fakta.com Video Page"
                placeholder="blur"
                sizes="100vw"
                className="w-full rounded-lg object-contain thin-border bg-card"
              />
              <Image
                src={FaktaVideoMobile}
                alt="Fakta.com Video Mobile view"
                placeholder="blur"
                sizes="100vw"
                className="w-full rounded-lg object-contain thin-border bg-card"
              />
            </div>
            <p className="text-caption text-subtle">Video detail page</p>
          </div>

          <div className="space-y-2 w-full sm:h-96">
            <Image
              src={FaktaSubdomainList}
              alt="Fakta.com Subdomain List"
              placeholder="blur"
              sizes="100vw"
              className="w-full h-full rounded-lg object-contain thin-border bg-card"
            />
            <p className="text-caption text-subtle">
              Fakta&apos;s subdomain list
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaktaDetailPage;
