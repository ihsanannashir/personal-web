import SectionLabel from "@/components/ui/section-label";
import TechTag from "@/components/ui/tech-tag";

const CAREER_ARC = [
  {
    company: "CIMB Niaga",
    role: "AI Enablement & Automation",
    period: "2025 – Present",
    domain: "ai" as const,
  },
  {
    company: "Bloom Alternance",
    role: "Frontend Engineer",
    period: "2024 – 2025",
    domain: "frontend" as const,
  },
  {
    company: "KB Bank",
    role: "Core Banking System",
    period: "2023 – 2024",
    domain: "backend" as const,
  },
  {
    company: "NoscAi GmbH",
    role: "Frontend Developer",
    period: "2023",
    domain: "frontend" as const,
  },
  {
    company: "Hukumonline.com",
    role: "Frontend Intern",
    period: "2022",
    domain: "frontend" as const,
  },
];

const DOMAIN_TAGS = [
  { label: "Frontend", domain: "frontend" as const },
  { label: "Backend", domain: "backend" as const },
  { label: "AI / ML", domain: "ai" as const },
  { label: "Core Banking", domain: "default" as const },
];

const IdentitySection = () => {
  return (
    <section className="editorial-container py-20 sm:py-26">
      <SectionLabel className="mb-10">About</SectionLabel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Left — Narrative bio */}
        <div className="space-y-6">
          <h2 className="font-serif text-heading sm:text-heading leading-snug">
            Frontend roots, AI ambitions
          </h2>
          <div className="space-y-4 text-body text-muted leading-relaxed">
            <p>
              I started as a frontend developer — building interfaces, obsessing
              over pixels, and learning to think in components. That foundation
              shaped how I approach every system I touch today.
            </p>
            <p>
              From there, I grew through full-stack engineering and spent a year
              deep in core banking — migrating legacy AS400 systems to modern
              Java-based platforms. It taught me how critical software can be,
              and what it means to build systems that can&apos;t afford to break.
            </p>
            <p>
              Now I&apos;m in AI Engineering — building RAG systems, optimizing
              LLM-powered platforms, and figuring out how to make AI genuinely
              useful inside large organizations. I haven&apos;t left my frontend roots;
              I&apos;m expanding my domain.
            </p>
          </div>

          {/* Domain tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {DOMAIN_TAGS.map((tag) => (
              <TechTag key={tag.label} label={tag.label} domain={tag.domain} />
            ))}
          </div>
        </div>

        {/* Right — Career arc timeline */}
        <div>
          <h3 className="text-body-sm font-medium text-muted mb-8 uppercase tracking-wide">
            Career arc
          </h3>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-8">
              {CAREER_ARC.map((entry, index) => (
                <div key={index} className="flex gap-5">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-2">
                    <div
                      className={`w-[11px] h-[11px] rounded-full border-2 ${
                        index === 0
                          ? "bg-foreground border-foreground"
                          : "bg-background border-border"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-body font-medium text-foreground">
                        {entry.company}
                      </span>
                      <TechTag label={entry.role} domain={entry.domain} />
                    </div>
                    <span className="text-caption text-subtle mt-1 block">
                      {entry.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;
