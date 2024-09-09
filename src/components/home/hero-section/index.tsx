import Image from "next/image";
import ContainerCard from "../../cards/container";

const HeroSection = () => {
  return (
    <ContainerCard className="w-full items-center">
      <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between">
        {/* Name and Description */}
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Ihsan An-Nashir</h1>
          <p className="text-base">
            Full-Stack Web Developer based in Indonesia
          </p>
        </div>

        {/* Image Card */}
        <div className="relative mb-10 mt-6 sm:mb-0 sm:mt-0">
          <div className="absolute w-64 h-64 sm:w-20 sm:h-20 z-20">
            <Image
              alt="Ihsan An-Nashir"
              src={"/Ihsan.jpeg"}
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="w-64 h-64 sm:w-20 sm:h-20 bg-slate-300 rotate-6 rounded-lg z-10" />
        </div>
      </div>
    </ContainerCard>
  );
};

export default HeroSection;
