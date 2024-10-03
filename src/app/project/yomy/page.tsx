import Image from "next/image";
import TitleCard from "../../../components/cards/title-card";
import { Metadata } from "next";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import ViewCard from "../../../components/cards/view-card";

export const metadata: Metadata = {
  title: "Yomy",
  description: "A web based SaaS Customer Feedback Manager Application",
};

const YomyDetailPage = () => {
  return (
    <div>
      {/* Thumbnail */}
      <Image
        src={"/assets/yomy.png"}
        alt="Yomy App"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-60 rounded-lg object-cover border"
        unoptimized
      />

      {/* Description */}
      <div className="my-6">
        <TitleCard className="mb-2" variant="small" title="Description" />
        <div className="space-y-2 text-justify">
          <p>
            <b>Yomy</b> (now called <b>ReviewGo</b>) is a web-based
            <em>Software-as-a-Service</em> (SaaS) application for managing
            customer feedback. It includes two parts: a <b>client website</b>{" "}
            and a <b>dashboard</b>.
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
          className="mb-6"
          variant="small"
          title="Visuals"
          description={`These are some preview of the project's application ${`(this screenshot was taken during the development, and some cannot be shown due to NDA)`}`}
        />

        {/* Login Page */}
        <div className="space-y-1">
          <Image
            src={"/assets/yomy/yomy-dashboard-landing.png"}
            alt="Yomy App"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full rounded-lg object-cover border"
            unoptimized
          />
          <p className="text-sm text-gray-600">Dashboard Login Page</p>
        </div>

        {/* Dashboard */}
        <div className="space-y-1">
          <Image
            src={"/assets/yomy/yomy-dashboard-main.png"}
            alt="Yomy App"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full rounded-lg object-cover border"
            unoptimized
          />
          <p className="text-sm text-gray-600">Dashboard Main Page</p>
        </div>

        {/* Rating */}
        <div className="space-y-1">
          <Image
            src={"/assets/yomy/yomy-rating-page.png"}
            alt="Yomy App"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full rounded-lg object-cover border"
            unoptimized
          />
          <p className="text-sm text-gray-600">Dashboard Rating Page</p>
        </div>

        {/* Yomy App */}
        <div className="space-y-1 w-full sm:h-96">
          <Image
            src={"/assets/yomy/yomy-review.png"}
            alt="Yomy App"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full rounded-lg object-contain border bg-white"
            unoptimized
          />
          <p className="text-sm text-gray-600">Client App Landing Page</p>
        </div>
      </div>
    </div>
  );
};

export default YomyDetailPage;
