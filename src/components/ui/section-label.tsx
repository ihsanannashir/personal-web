import clsx from "clsx";

const SectionLabel = ({ children, className }: CommonProps) => {
  return (
    <span
      className={clsx(
        "section-label inline-block text-label font-medium uppercase tracking-[0.15em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
};

export default SectionLabel;
