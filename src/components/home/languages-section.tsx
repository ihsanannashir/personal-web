import Section from "@/components/ui/section";
import SectionLabel from "@/components/ui/section-label";

const LANGUAGES = [
  { flag: "🇬🇧", name: "English" },
  { flag: "🇮🇩", name: "Indonesian" },
  { flag: "🇮🇩", name: "Minang" },
  { flag: "🇮🇩", name: "Javanese" },
  { flag: "🇩🇪", name: "German" },
];

const LanguagesSection = () => {
  return (
    <Section>
      <SectionLabel>You can talk to me in</SectionLabel>

      <p className="mt-4 text-[15px] text-muted leading-[1.9]">
        {LANGUAGES.map((lang, i) => (
          <span key={lang.name}>
            {i > 0 && <span className="mx-1.5">·</span>}
            {lang.flag} {lang.name}
          </span>
        ))}
      </p>
    </Section>
  );
};

export default LanguagesSection;
