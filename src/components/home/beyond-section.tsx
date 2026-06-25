import Section from "@/components/ui/section";
import SectionLabel from "@/components/ui/section-label";
import { INTERESTS } from "@/lib/data/interests";

const BeyondSection = () => {
  return (
    <Section>
      <SectionLabel className="mb-10">Beyond the screen</SectionLabel>

      <div className="space-y-10 max-w-2xl">
        {INTERESTS.map((interest) => (
          <div key={interest.label}>
            <h3 className="font-serif text-heading-sm mb-3">
              {interest.label}
            </h3>
            <p className="text-body text-muted leading-relaxed">
              {interest.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default BeyondSection;
