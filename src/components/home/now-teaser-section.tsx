import Link from "next/link";

import Section from "@/components/ui/section";
import SectionLabel from "@/components/ui/section-label";
import { NOW_TEASERS } from "@/lib/data/now";

const NowTeaserSection = () => {
  return (
    <Section>
      <SectionLabel className="mb-10">Now</SectionLabel>

      <h2 className="font-serif text-heading sm:text-heading mb-10">
        What I&apos;m up to right now
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {NOW_TEASERS.map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-lg thin-border bg-card/50 flex gap-4 items-start"
          >
            <span className="text-xl flex-shrink-0">{item.emoji}</span>
            <div>
              <span className="text-body font-medium text-foreground block">
                {item.title}
              </span>
              <span className="text-body-sm text-muted">{item.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/now"
          className="text-body-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          See what I&apos;m up to
          <span className="ml-0.5">→</span>
        </Link>
      </div>
    </Section>
  );
};

export default NowTeaserSection;
