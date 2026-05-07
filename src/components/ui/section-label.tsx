import clsx from "clsx";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SectionLabel = ({ children, className }: SectionLabelProps) => {
  return (
    <span
      className={clsx(
        "section-label inline-block text-label font-medium uppercase tracking-[0.15em] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
};

export default SectionLabel;
