import Image from "next/image";

interface StackShowcaseProps {
  react?: boolean;
  nextjs?: boolean;
  tailwind?: boolean;
  nodejs?: boolean;
  expressjs?: boolean;
  mysql?: boolean;
  postgresql?: boolean;
}

const StackShowcase = ({
  react,
  nextjs,
  tailwind,
  nodejs,
  expressjs,
  mysql,
  postgresql,
}: StackShowcaseProps) => {
  return (
    <div className="flex space-x-2">
      {react && (
        <Image alt="ReactJS" src={"/icons/react.svg"} width={25} height={25} />
      )}
      {nextjs && (
        <Image alt="NextJS" src={"/icons/nextjs.svg"} width={25} height={25} />
      )}
      {tailwind && (
        <Image
          alt="TailwindCSS"
          src={"/icons/tailwindcss.svg"}
          width={25}
          height={25}
        />
      )}
      {nodejs && (
        <Image alt="NodeJS" src={"/icons/nodejs.svg"} width={25} height={25} />
      )}
      {expressjs && (
        <Image
          alt="ExpressJs"
          src={"/icons/express.svg"}
          width={25}
          height={25}
        />
      )}
      {mysql && (
        <Image alt="MySQL" src={"/icons/mysql.svg"} width={25} height={25} />
      )}
      {postgresql && (
        <Image
          alt="PostgreSQL"
          src={"/icons/postgresql.svg"}
          width={25}
          height={25}
        />
      )}
    </div>
  );
};

export default StackShowcase;
