import { Metadata } from "next";

import OpenGraphFakta from "../../../../public/assets/fakta.png";
import Image from "next/image";
import TitleCard from "../../../components/cards/title-card";
import ViewCard from "../../../components/cards/view-card";

export const metadata: Metadata = {
  title: "Fakta.com 2.0",
  description:
    "An Indonesian online media platform that offers news, data, and opinions on a wide range of topics.",
  keywords:
    "React, react, ReactJS, React,js, NextJS, Next.js, News Portal Project, Fakta.com, Tailwind, TailwindCSS, CMS, News Website, Fakta News, React Project, Frontend Project",
  openGraph: {
    title: "Yomy",
    description:
      "An Indonesian online media platform that offers news, data, and opinions on a wide range of topics.",
    siteName: "Fakta.com 2.0 - Ihsan An-Nashir's Portfolio",
    type: "website",
    url: `https://ihsanannashir.dev/project/fakta-com`,
    images: [
      {
        url: OpenGraphFakta.src,
        width: OpenGraphFakta.width,
        height: OpenGraphFakta.height,
      },
    ],
  },
};

const FaktaDetailPage = () => {
  return (
    <div>
      {/* Thumbnail */}
      <Image
        src={"/assets/fakta.png"}
        alt="Fakta.com 2.0"
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
          <p>coming soon</p>
        </div>
      </div>

      {/* Demo Link */}
      <ViewCard url="https://fakta.com" text="View Live" />

      {/* Features */}
      <div className="my-6">
        <TitleCard variant="small" title="Key Features" />
        <ul className="list-disc pl-4 mt-2 md:grid md:grid-rows-3 md:grid-flow-col">
          <li>Soon</li>
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
    </div>
  );
};

export default FaktaDetailPage;
