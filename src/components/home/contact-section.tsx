import Section from "@/components/ui/section";
import SectionLabel from "@/components/ui/section-label";

const ContactSection = () => {
  return (
    <Section>
      <SectionLabel className="mb-10">Say hello</SectionLabel>

      <div className="max-w-xl">
        <h2 className="font-serif text-heading sm:text-heading mb-4">
          Want to work together or just say hi?
        </h2>
        <p className="text-body text-muted mb-8 leading-relaxed">
          I&apos;m always open to interesting conversations, collaboration opportunities,
          or just a friendly hello. Reach out via email or find me on socials.
        </p>

        {/* Email */}
        <a
          href="mailto:ihsanannashir@gmail.com"
          className="inline-block text-body-lg font-medium text-foreground hover:opacity-70 transition-opacity mb-6"
        >
          ihsanannashir@gmail.com ↗
        </a>

        {/* Social links */}
        <div className="flex gap-6 pt-4 thin-border-t">
          <a
            href="https://github.com/ihsanannashir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-muted hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ihsanannashir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-muted hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
