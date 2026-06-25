import { cn } from "@/lib/utils";

const Title = ({ children, className }: CommonProps) => {
  return (
    <h1
      className={cn(
        "font-serif text-display-sm sm:text-display mb-4",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
