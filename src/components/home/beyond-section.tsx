import Section from "@/components/ui/section";
import SectionLabel from "@/components/ui/section-label";

const INTERESTS = [
  {
    label: "Reading",
    description:
      "Non-fiction, history, and ideas. Books that change how I think about systems — both technical and human.",
  },
  {
    label: "Running",
    description:
      "Training for my first half marathon in June 2026. The discipline of running teaches patience — something engineering also demands.",
  },
  {
    label: "Languages",
    description:
      "Five languages and counting. Each one opens a different way of seeing the world. Currently working on German.",
  },
];

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
