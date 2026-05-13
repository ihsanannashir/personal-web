import { Metadata } from "next";
import Image from "next/image";

import FaktaThumbnail from "@public/assets/project/fakta/fakta.png";
import FaktaLandingPage from "@public/assets/project/fakta/landing-page.png";
import FaktaNewsDetail from "@public/assets/project/fakta/news-detail.png";
import FaktaVideoDetail from "@public/assets/project/fakta/video-detail.png";
import FaktaVideoMobile from "@public/assets/project/fakta/video-mobile.png";
import FaktaSubdomainList from "@public/assets/project/fakta/subdomain-list.png";

import ProjectDetailLayout, {
  ProjectSection,
  FeatureGrid,
  ImageFigure,
} from "@/components/project/project-detail-layout";
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
    <ProjectDetailLayout
      title="Fakta.com 2.0"
      subtitle="An Indonesian online media platform that offers news, data, and opinions on a wide range of topics."
      heroImage={FaktaThumbnail}
      heroAlt="Fakta.com 2.0"
      period="Feb 2024 – Aug 2024"
      role="Frontend Developer"
      stack={[
        { label: "TypeScript", domain: "frontend" },
        { label: "Next.js", domain: "frontend" },
        { label: "TailwindCSS", domain: "frontend" },
        { label: "Express.js", domain: "backend" },
        { label: "MySQL", domain: "backend" },
        { label: "Kubernetes", domain: "backend" },
      ]}
      liveUrl="https://fakta.com"
      liveLabel="fakta.com"
    >
      {/* Description */}
      <ProjectSection label="Description">
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
      </ProjectSection>

      {/* Features */}
      <ProjectSection label="Key features">
        <FeatureGrid
          features={[
            "Detailed and categorized news",
            "Interactive slider",
            "Content management system",
            "Swipeable videos",
            "Authorization with multiple roles",
            "Comments",
            "Mobile views",
            "Automatic sub-domains",
          ]}
        />
      </ProjectSection>

      {/* Visuals */}
      <ProjectSection label="Visuals">
        <p className="text-body-sm text-subtle mb-8">
          Some previews of the live project (some cannot be shown due to NDA)
        </p>

        <div className="space-y-8">
          <ImageFigure
            src={FaktaLandingPage}
            alt="Fakta.com Landing Page"
            caption="Landing page"
          />

          <ImageFigure
            src={FaktaNewsDetail}
            alt="Fakta.com News Page"
            caption="News detail page"
          />

          <figure className="rounded-lg thin-border overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:aspect-video">
              <div className="relative overflow-hidden">
                <Image
                  src={FaktaVideoDetail}
                  alt="Fakta.com Video Page"
                  placeholder="blur"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-cover bg-card"
                />
              </div>
              <div className="relative overflow-hidden thin-border-t sm:border-t-0 sm:border-l sm:border-border/50">
                <Image
                  src={FaktaVideoMobile}
                  alt="Fakta.com Video Mobile view"
                  placeholder="blur"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="w-full h-full object-contain bg-card"
                />
              </div>
            </div>
            <figcaption className="px-4 py-2.5 text-caption text-subtle bg-card/30 thin-border-t">
              Video detail page — desktop and mobile
            </figcaption>
          </figure>

          <ImageFigure
            src={FaktaSubdomainList}
            alt="Fakta.com Subdomain List"
            caption="Fakta's subdomain list"
            contain
          />
        </div>
      </ProjectSection>
    </ProjectDetailLayout>
  );
};

export default FaktaDetailPage;
