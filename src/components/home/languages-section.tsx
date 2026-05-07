import SectionLabel from "@/components/ui/section-label";
import ProgressBar from "@/components/ui/progress-bar";
import { LANGUAGES } from "@/lib/data/languages";

const LanguagesSection = () => {
  return (
    <section className="editorial-container py-20 sm:py-26">
      <SectionLabel className="mb-10">Languages</SectionLabel>

      <h2 className="font-serif text-heading sm:text-heading mb-10">
        Five languages, still counting
      </h2>

      {/* Language cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LANGUAGES.map((lang) => (
          <div
            key={lang.name}
            className="p-5 rounded-lg thin-border bg-card/50 space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{lang.flag}</span>
              <div>
                <span className="text-body font-medium text-foreground block">
                  {lang.name}
                </span>
                <span className="text-caption text-muted">
                  {lang.proficiency}
                </span>
              </div>
            </div>
            <ProgressBar value={lang.progress} />
          </div>
        ))}
      </div>

      {/* IELTS callout */}
      <div className="mt-8 p-5 rounded-lg thin-border bg-card/50 flex items-start gap-3">
        <span className="text-body-lg">📋</span>
        <div>
          <span className="text-body-sm font-medium text-foreground">
            IELTS Academic Band 7.0 (C1)
          </span>
          <span className="text-caption text-muted block mt-0.5">
            English proficiency certification
          </span>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
