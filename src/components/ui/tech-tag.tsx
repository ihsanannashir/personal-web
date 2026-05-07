import clsx from "clsx";

type TagDomain = "ai" | "frontend" | "backend" | "default";

interface TechTagProps {
  label: string;
  domain?: TagDomain;
  className?: string;
}

const domainStyles: Record<TagDomain, string> = {
  ai: "text-tag-ai bg-tag-ai-bg",
  frontend: "text-tag-frontend bg-tag-frontend-bg",
  backend: "text-tag-backend bg-tag-backend-bg",
  default: "text-tag-default bg-tag-default-bg",
};

const TechTag = ({ label, domain = "default", className }: TechTagProps) => {
  return (
    <span
      className={clsx(
        "inline-block px-2.5 py-0.5 rounded-full text-caption font-medium",
        domainStyles[domain],
        className
      )}
    >
      {label}
    </span>
  );
};

export default TechTag;
