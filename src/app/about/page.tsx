import Image from "next/image";
import ContainerCard from "../../components/cards/container-card";
import TitleCard from "../../components/cards/title-card";
import SocialCard from "../../components/cards/social-card";
import { SOCIALS } from "../../lib/data/socials";

const AboutPage = () => {
  return (
    <div>
      <TitleCard title="About Me" className="mb-4" />
      {/* Main */}
      <ContainerCard className="text-justify grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Image */}
        <div className="relative mt-2 sm:mt-0 sm:col-span-1 order-1 sm:order-2">
          <div className="w-full h-72 sm:h-full absolute z-20">
            <Image
              alt="Ihsan An-Nashir"
              src={"/ihsan_2.webp"}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-lg object-cover border-b"
              unoptimized
            />
          </div>
          <div className="w-full h-72 sm:h-full bg-gray-200 rotate-6 rounded-lg z-10" />
        </div>

        {/* Paragraph */}
        <div className="space-y-4 text-justify sm:col-span-2 order-2 sm:order-1">
          <p>
            Hi there! I am <b>Ihsan</b>, a highly ambitious Web Developer
            currently based in Jakarta, Indonesia.
          </p>
          <p>
            I graduated from Brawijaya University, Malang in early 2023 with a
            bachelor degree in Computer Engineering and have prior experiences
            working as a web developer in several companies.
          </p>
          <p>
            Experienced in Web Development, I have developed software with
            various technologies like Javascript/Typescript, Java, and
            frameworks like NextJS and ExpressJS.
          </p>
          <p>
            My expertise spans in frontend development, especially React.
            I&apos;m open to explore many new stacks in order to learn and keep
            myself updated within the industries.
          </p>
        </div>
      </ContainerCard>

      {/* Fun Fact */}
      <ContainerCard className="space-y-1 mt-4">
        <span className="italic">A little bit fun fact about me:</span>
        <p>
          I&apos;m a <span className="text-red-500">Bayern München</span> fans,
          love reading, and having a huge interest in The Lord of the Rings and
          Narnia 😆
        </p>
      </ContainerCard>

      <ContainerCard
        title="Hit me up!"
        parentClassName="mt-10"
        className="flex justify-between flex-wrap lg:flex-nowrap gap-4"
      >
        {SOCIALS.map((social, index) => {
          return (
            <SocialCard
              key={index}
              display={social.display}
              url={social.url}
              icon={social.icon}
            />
          );
        })}
      </ContainerCard>
    </div>
  );
};

export default AboutPage;
