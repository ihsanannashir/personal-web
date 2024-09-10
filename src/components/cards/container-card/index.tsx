import clsx from "clsx";

interface ContainerCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "transparent";
  title?: string;
}

const ContainerCard = ({
  children,
  className,
  variant = "default",
  title,
}: ContainerCardProps) => {
  const variantClassName = clsx({
    ["bg-white rounded-lg border p-6"]: variant === "default",
    ["bg-transparent"]: variant === "transparent",
  });

  return (
    <section>
      {title && (
        <h2 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8">{title}</h2>
      )}
      <div className={clsx(variantClassName, className)}>{children}</div>
    </section>
  );
};

export default ContainerCard;
