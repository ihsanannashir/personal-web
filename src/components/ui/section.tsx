import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={clsx("editorial-container py-12 sm:py-16", className)}>
      {children}
    </section>
  );
};

export default Section;
