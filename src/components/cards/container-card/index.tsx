import clsx from "clsx";
import Link from "next/link";
import { BsArrowRight, BsChevronRight } from "react-icons/bs";

interface ContainerCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "transparent";
  title?: string;
  moreUrl?: string;
}

const ContainerCard = ({
  children,
  className,
  variant = "default",
  title,
  moreUrl,
}: ContainerCardProps) => {
  const variantClassName = clsx({
    ["bg-white rounded-lg border p-6"]: variant === "default",
    ["bg-transparent"]: variant === "transparent",
  });

  return (
    <section>
      {title && (
        <div className="flex justify-between mb-6 sm:mb-8">
          <h2 className="font-bold text-xl sm:text-2xl">{title}</h2>
          {moreUrl && (
            <Link
              href={moreUrl}
              className="hover:underline text-sm my-auto flex items-center space-x-2"
            >
              <span>More</span>
              <BsChevronRight size={15} />
            </Link>
          )}
        </div>
      )}
      <div className={clsx(variantClassName, className)}>{children}</div>
    </section>
  );
};

export default ContainerCard;
