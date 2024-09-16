import clsx from "clsx";
import Link from "next/link";
import { ReactElement } from "react";

type SocialCardProps = {
  className?: string;
  display: string;
  url?: string;
  icon: ReactElement;
};

const SocialCard = ({ className, display, url, icon }: SocialCardProps) => {
  return (
    <Link
      href={url ?? ""}
      target="_blank"
      className={clsx(
        className,
        "flex align-middle items-center space-x-2 border p-4 w-full rounded-lg hover:text-blurple-400"
      )}
    >
      <div>{icon}</div>
      <span>{display}</span>
    </Link>
  );
};

export default SocialCard;
