import { Metadata } from "next";

import YomyThumbnail from "@public/assets/project/yomy/yomy.png";
import YomyDashboardLanding from "@public/assets/project/yomy/yomy-dashboard-landing.png";
import YomyDashboardMain from "@public/assets/project/yomy/yomy-dashboard-main.png";
import YomyRatingPage from "@public/assets/project/yomy/yomy-rating-page.png";
import YomyReview from "@public/assets/project/yomy/yomy-review.png";

import ProjectDetailLayout, {
  ProjectSection,
  FeatureGrid,
  ImageFigure,
} from "@/components/project/project-detail-layout";
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
    <ProjectDetailLayout
      title="Yomy"
      subtitle="A web-based SaaS application for managing customer feedback."
      heroImage={YomyThumbnail}
      heroAlt="Yomy App"
      period="Aug 2023 – Jan 2024"
      role="Frontend Developer"
      stack={[
        { label: "TypeScript", domain: "frontend" },
        { label: "React", domain: "frontend" },
        { label: "TailwindCSS", domain: "frontend" },
        { label: "Strapi CMS", domain: "backend" },
        { label: "AdonisJS", domain: "backend" },
        { label: "MySQL", domain: "backend" },
      ]}
      liveUrl="https://dashboard.yomy.org"
      liveLabel="dashboard.yomy.org"
    >
      {/* Description */}
      <ProjectSection label="Description">
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
      </ProjectSection>

      {/* Features */}
      <ProjectSection label="Key features">
        <FeatureGrid
          features={[
            "Star and comment reviews",
            "Stripe payment gateway",
            "QR code generator",
            "Referral link",
            "Mailing list",
            "Google sign-in",
          ]}
        />
      </ProjectSection>

      {/* Visuals */}
      <ProjectSection label="Visuals">
        <p className="text-body-sm text-subtle mb-8">
          Some previews of the application (screenshots taken during
          development, some cannot be shown due to NDA)
        </p>

        <div className="space-y-8">
          <ImageFigure
            src={YomyDashboardLanding}
            alt="Yomy Dashboard Login"
            caption="Dashboard login page"
          />

          <ImageFigure
            src={YomyDashboardMain}
            alt="Yomy Dashboard Main"
            caption="Dashboard main page"
          />

          <ImageFigure
            src={YomyRatingPage}
            alt="Yomy Rating Page"
            caption="Dashboard rating page"
          />

          <ImageFigure
            src={YomyReview}
            alt="Yomy Client App"
            caption="Client app landing page"
            contain
          />
        </div>
      </ProjectSection>
    </ProjectDetailLayout>
  );
};

export default YomyDetailPage;
