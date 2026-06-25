import { Metadata } from "next";
import Link from "next/link";

import SectionLabel from "@/components/ui/section-label";
import Title from "@/components/ui/title";

export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Atlas — ${slug}`,
    description: "Under construction.",
  };
}

export default async function TripDetailPage({ params }: Props) {
  return (
    <div className="editorial-container pt-16 sm:pt-24 pb-20">
      <Link
        href="/atlas"
        className="text-body-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8"
      >
        ← Back to atlas
      </Link>

      <div className="mb-10 sm:mb-12">
        <SectionLabel className="mb-4">Atlas</SectionLabel>
        <Title>Under construction</Title>
        <p className="text-body-lg text-muted max-w-2xl">
          This trip page isn&apos;t live yet. I&apos;m still building the Atlas.
        </p>
      </div>

      <div className="thin-border rounded-lg p-6 sm:p-8 bg-card/50 max-w-2xl">
        <p className="text-body text-muted leading-relaxed">
          Check back soon — I&apos;ll publish the first entries once the writing
          and layout are ready.
        </p>
      </div>
    </div>
  );
}
