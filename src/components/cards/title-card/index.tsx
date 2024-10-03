import clsx from "clsx";

type TitleCardProps = {
  title: string;
  description?: string;
  className?: string;
  variant?: "default" | "small";
};

const TitleCard = ({
  title,
  description,
  className,
  variant = "default",
}: TitleCardProps) => {
  return (
    <div className={clsx("space-y-2", className)}>
      {variant === "default" && <h1 className="text-3xl font-bold">{title}</h1>}
      {variant === "small" && (
        <h2 className="font-bold text-xl sm:text-2xl">{title}</h2>
      )}
      {description && <p>{description}</p>}
    </div>
  );
};

export default TitleCard;
