import { Metadata } from "next";
import Image from "next/image";

import FaktaThumbnail from "@public/assets/fakta.png";
import FaktaLandingPage from "@public/assets/fakta/landing-page.png";
import FaktaNewsDetail from "@public/assets/fakta/news-detail.png";
import FaktaVideoDetail from "@public/assets/fakta/video-detail.png";
import FaktaVideoMobile from "@public/assets/fakta/video-mobile.png";
import FaktaSubdomainList from "@public/assets/fakta/subdomain-list.png";

import TitleCard from "@/components/cards/title-card";
import ViewCard from "@/components/cards/view-card";
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
    <div>
      {/* Thumbnail */}
      <Image
        src={FaktaThumbnail}
        alt="Fakta.com 2.0"
        placeholder="blur"
        sizes="100vw"
        className="w-full h-60 rounded-lg object-cover border"
      />

      {/* Description */}
      <div className="my-6">
        <TitleCard className="mb-2" variant="small" title="Description" />
        <div className="space-y-2 text-justify">
          <p>
            <b>Fakta.com</b> is an Indonesian online media platform that offers
            news, data, and opinions on a wide range of topics. This project is
            divided into two parts: the <b>main website</b> and a{" "}
            <b>Content Management System</b> (CMS).
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
      </div>

      {/* Demo Link */}
      <ViewCard url="https://fakta.com" text="View Live" />

      {/* Features */}
      <div className="my-6">
        <TitleCard variant="small" title="Key Features" />
        <ul className="list-disc pl-4 mt-2 md:grid md:grid-rows-4 md:grid-flow-col">
          <li>Detailed and Categorized News</li>
          <li>Interactive Slider</li>
          <li>Content Managament System</li>
          <li>Swipeable Videos</li>
          <li>Authorization with Multiple Roles</li>
          <li>Comments</li>
          <li>Mobile Views</li>
          <li>Automatic Sub-domains</li>
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="my-6">
        <TitleCard variant="small" title="Tech Stack" />
        <ul className="list-disc pl-4 mt-2 md:grid md:grid-rows-3 md:grid-flow-col">
          <li>Typescript</li>
          <li>TailwindCSS</li>
          <li>NextJS</li>
          <li>ExpressJS</li>
          <li>MySQL</li>
          <li>Kubernetes</li>
        </ul>
      </div>

      {/* Visuals */}
      <div className="my-6 space-y-6">
        <TitleCard
          className="mb-6 text-justify"
          variant="small"
          title="Visuals"
          description={`These are some preview of the project's live ${`(some cannot be shown due to NDA)`}`}
        />

        {/* Landing Page */}
        <div className="space-y-1">
          <Image
            src={FaktaLandingPage}
            alt="Fakta.com Landing Page"
            placeholder="blur"
            sizes="100vw"
            className="w-full rounded-lg object-cover border"
          />
          <p className="text-sm text-gray-600">Landing Page</p>
        </div>

        {/* Landing Page */}
        <div className="space-y-1">
          <Image
            src={FaktaNewsDetail}
            alt="Fakta.com News Page"
            placeholder="blur"
            sizes="100vw"
            className="w-full rounded-lg object-cover border"
          />
          <p className="text-sm text-gray-600">News Detail Page</p>
        </div>

        {/* Video Detail */}
        <div className="space-y-1">
          <div className="w-full sm:h-96 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
            <Image
              src={FaktaVideoDetail}
              alt="Fakta.com Video Page"
              placeholder="blur"
              sizes="100vw"
              className="w-full rounded-lg object-contain border bg-white"
            />
            <Image
              src={FaktaVideoMobile}
              alt="Fakta.com Video Mobile view"
              placeholder="blur"
              sizes="100vw"
              className="w-full rounded-lg object-contain border bg-white"
            />
          </div>

          <p className="text-sm text-gray-600">Video Detail Page</p>
        </div>

        {/* Subdomain */}
        <div className="space-y-1 w-full sm:h-96">
          <Image
            src={FaktaSubdomainList}
            alt="Fakta.com Subdomain List"
            placeholder="blur"
            sizes="100vw"
            className="w-full h-full rounded-lg object-contain border bg-white"
          />
          <p className="text-sm text-gray-600">Fakta&apos;s Subdomain list</p>
        </div>
      </div>
    </div>
  );
};

export default FaktaDetailPage;
