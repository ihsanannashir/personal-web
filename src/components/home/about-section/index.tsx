import Image from "next/image";

import ContainerCard from "@/components/cards/container-card";

const AboutSection = () => {
  return (
    <section id="about">
      <ContainerCard
        title="About Me"
        className="text-justify grid grid-cols-1 sm:grid-cols-3 gap-10"
      >
        {/* Image */}
        <div className="relative mt-2 sm:mt-0 sm:col-span-1 order-1 sm:order-2">
          <div className="w-full h-72 sm:h-full absolute z-20">
            <Image
              alt="Ihsan An-Nashir"
              src={"/Ihsan-prau.jpg"}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-lg object-cover border-b"
            />
          </div>
          <div className="w-full h-72 sm:h-full bg-gray-200 rotate-6 rounded-lg z-10" />
        </div>

        {/* Paragraph */}
        <div className="space-y-4 text-justify sm:col-span-2 order-2 sm:order-1">
          <p>
            Hi there! I am <b>Ihsan</b>, a Software Engineer currently based in
            Jakarta, Indonesia.
          </p>
          <p>
            I graduated from Brawijaya University, Malang in early 2023 with a
            bachelor degree in Computer Engineering and have prior experiences
            working as a software engineer in several companies.
          </p>
          <p>
            Recently, I&apos;ve been expanding into AI engineering and
            data-driven systems, focusing on building intelligent workflows and
            automation.
          </p>
          <p>
            My expertise spans in web development and artificial intelligence.
            I&apos;m open to explore many new stacks in order to learn and keep
            myself updated within the industries.
          </p>
        </div>
      </ContainerCard>
    </section>
  );
};

export default AboutSection;
