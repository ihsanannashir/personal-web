import { Metadata } from "next";
import Link from "next/link";

import SectionLabel from "@/components/ui/section-label";
import Title from "@/components/ui/title";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "A living journal of trips — what I saw, what I thought, what I ate.",
};

export default async function AtlasPage() {
  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      <div className="mb-10 sm:mb-12">
        <SectionLabel className="mb-4">Atlas</SectionLabel>
        <Title>Under construction</Title>
        <p className="text-body-lg text-muted max-w-2xl">
          I&apos;m still building this page. Soon it&apos;ll be a living journal of
          trips — what I saw, what I thought, and what I ate.
        </p>
      </div>

      <div className="thin-border rounded-lg p-6 sm:p-8 bg-card/50 max-w-2xl">
        <p className="text-body text-muted leading-relaxed">
          For now, you can browse my work — and I&apos;ll ship the Atlas when the
          content + layout are ready.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/work"
            className="inline-flex items-center px-5 py-2.5 bg-foreground text-background text-body-sm font-medium rounded-full hover:opacity-85 transition-opacity"
          >
            See my work
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2.5 thin-border text-body-sm font-medium rounded-full hover:bg-card transition-colors"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
