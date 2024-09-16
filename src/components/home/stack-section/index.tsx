import Image from "next/image";
import ContainerCard from "../../cards/container-card";
import { Tooltip, TooltipContent } from "../../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

type StackData = {
  title: string;
  icon: string;
};

const STACK: StackData[] = [
  { title: "Typescript", icon: "/icons/typescript.svg" },
  { title: "ReactJS", icon: "/icons/react.svg" },
  { title: "NextJS", icon: "/icons/nextjs.svg" },
  { title: "TailwindCSS", icon: "/icons/tailwindcss.svg" },
  { title: "NodeJS", icon: "/icons/nodejs.svg" },
  { title: "ExpressJS", icon: "/icons/express.svg" },
  { title: "MySQL", icon: "/icons/mysql.svg" },
  { title: "PostgreSQL", icon: "/icons/postgresql.svg" },
];

const StackSection = () => {
  return (
    <ContainerCard title="My Current Tech Stack">
      <div className="flex flex-wrap gap-4">
        {STACK.map((item, index) => {
          return (
            <Tooltip key={index}>
              <TooltipTrigger>
                <Image
                  alt={item.title}
                  src={item.icon}
                  width={35}
                  height={35}
                  className="sm:hover:scale-125 transition-transform animate-scale-up"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </ContainerCard>
  );
};

export default StackSection;
