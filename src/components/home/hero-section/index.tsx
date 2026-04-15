import { DM_Serif_Display } from "next/font/google";

import ContainerCard from "@/components/cards/container-card";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

/* TODO
 * - add icon or image signature
 */

const HeroSection = () => {
  return (
    <ContainerCard className="w-full items-center">
      <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between">
        {/* Name and Description */}
        <div className="flex flex-col space-y-1 items-center sm:items-start">
          <h1
            className={`text-3xl sm:text-4xl font-bold ${dmSerifDisplay.className}`}
          >
            Ihsan An-Nashir
          </h1>
          <p className="text-base">
            Software and AI Engineer based in Indonesia
          </p>
        </div>
      </div>
    </ContainerCard>
  );
};

export default HeroSection;
