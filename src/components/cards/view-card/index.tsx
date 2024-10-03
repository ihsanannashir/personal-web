import clsx from "clsx";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

type ViewCardProps = {
  className?: string;
  url: string;
  text: string;
};

const ViewCard = ({ className, url, text }: ViewCardProps) => {
  return (
    <>
      <Link
        href={url}
        target="_blank"
        className={clsx(
          className,
          "border hover:bg-blurple-300 hover:text-white transition-colors duration-200 rounded-lg bg-white px-4 py-2 flex justify-between items-center max-w-fit"
        )}
      >
        {text}
        <BsArrowUpRight size={18} className="ml-6" />
      </Link>
    </>
  );
};

export default ViewCard;
