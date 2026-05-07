import clsx from "clsx";

interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  className?: string;
}

const StatCard = ({ value, label, sublabel, className }: StatCardProps) => {
  return (
    <div className={clsx("flex flex-col gap-1 py-6 px-2 sm:px-6", className)}>
      <span className="font-serif text-display-sm sm:text-display tracking-tight">
        {value}
      </span>
      <span className="text-body-sm text-foreground font-medium">{label}</span>
      {sublabel && (
        <span className="text-caption text-muted">{sublabel}</span>
      )}
    </div>
  );
};

export default StatCard;
