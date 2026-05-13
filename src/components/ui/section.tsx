import clsx from "clsx";

const Section = ({ children, className }: CommonProps) => {
  return (
    <section className={clsx("editorial-container py-12 sm:py-16", className)}>
      {children}
    </section>
  );
};

export default Section;
