import Image from "next/image";
import { Metadata } from "next";

import TitleCard from "@/components/cards/title-card";
import ViewCard from "@/components/cards/view-card";
import { constructMetadata } from "@/lib/utils/metadata";

import YomyThumbnail from "@public/assets/yomy.png";
import YomyDashboardLanding from "@public/assets/yomy/yomy-dashboard-landing.png";
import YomyDashboardMain from "@public/assets/yomy/yomy-dashboard-main.png";
import YomyRatingPage from "@public/assets/yomy/yomy-rating-page.png";
import YomyReview from "@public/assets/yomy/yomy-review.png";

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
    <div>
      {/* Thumbnail */}
      <Image
        src={YomyThumbnail}
        alt="Yomy App"
        placeholder="blur"
        sizes="100vw"
        className="w-full h-60 rounded-lg object-cover border"
      />

      {/* Description */}
      <div className="my-6">
        <TitleCard className="mb-2" variant="small" title="Description" />
        <div className="space-y-2 text-justify">
          <p>
            <b>Yomy</b> is a web-based <em>Software-as-a-Service</em> (SaaS)
            application for managing customer feedback. It includes two parts: a{" "}
            <b>client website</b> and a <b>dashboard</b>.
          </p>
          <p>
            The client website allows users to submit rating and reviews for
            specific locations, while the dashboard lets business owners view
            reviews, monitor statistics, and manage information about their
            locations.
          </p>
          <p>I was appointed as the Frontend Developer for this project.</p>
        </div>
      </div>

      {/* Demo Link */}
      <ViewCard url="https://dashboard.yomy.org" text="View Dashboard" />

      {/* Features */}
      <div className="my-6">
        <TitleCard variant="small" title="Key Features" />
        <ul className="list-disc pl-4 mt-2 md:grid md:grid-rows-3 md:grid-flow-col">
          <li>Star and Comment Reviews</li>
          <li>Stripe Payment Gateway</li>
          <li>QR Code Generator</li>
          <li>Referral Link</li>
          <li>Mailing List</li>
          <li>Google Sign-In</li>
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="my-6">
        <TitleCard
          variant="small"
          title="Tech Stack"
          description="Both applications were build fully on a React-Typescript environment, consist as follows:"
        />
        <ul className="list-disc pl-4 mt-2 md:grid md:grid-rows-3 md:grid-flow-col">
          <li>Typescript</li>
          <li>ReactJS</li>
          <li>TailwindCSS</li>
          <li>Strapi CMS</li>
          <li>AdonisJS</li>
          <li>MySQL</li>
        </ul>
      </div>

      {/* Visuals */}
      <div className="my-6 space-y-6">
        <TitleCard
          className="mb-6 text-justify"
          variant="small"
          title="Visuals"
          description={`These are some preview of the project's application ${`(this screenshot was taken during the development, and some cannot be shown due to NDA)`}`}
        />

        {/* Login Page */}
        <div className="space-y-1">
          <Image
            src={YomyDashboardLanding}
            alt="Yomy App"
            placeholder="blur"
            sizes="100vw"
            className="w-full rounded-lg object-cover border"
          />
          <p className="text-sm text-gray-600">Dashboard Login Page</p>
        </div>

        {/* Dashboard */}
        <div className="space-y-1">
          <Image
            src={YomyDashboardMain}
            alt="Yomy App"
            placeholder="blur"
            sizes="100vw"
            className="w-full rounded-lg object-cover border"
          />
          <p className="text-sm text-gray-600">Dashboard Main Page</p>
        </div>

        {/* Rating */}
        <div className="space-y-1">
          <Image
            src={YomyRatingPage}
            alt="Yomy App"
            placeholder="blur"
            sizes="100vw"
            className="w-full rounded-lg object-cover border"
          />
          <p className="text-sm text-gray-600">Dashboard Rating Page</p>
        </div>

        {/* Yomy App */}
        <div className="space-y-1 w-full sm:h-96">
          <Image
            src={YomyReview}
            alt="Yomy App"
            placeholder="blur"
            sizes="100vw"
            className="w-full h-full rounded-lg object-contain border bg-white"
          />
          <p className="text-sm text-gray-600">Client App Landing Page</p>
        </div>
      </div>
    </div>
  );
};

export default YomyDetailPage;

