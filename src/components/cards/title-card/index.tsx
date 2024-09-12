import clsx from "clsx";

type TitleCardProps = {
  title: string;
  description?: string;
  className?: string;
};

const TitleCard = ({ title, description, className }: TitleCardProps) => {
  return (
    <div className={clsx("space-y-2", className)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};

export default TitleCard;
