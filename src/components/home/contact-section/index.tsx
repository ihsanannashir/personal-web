import ContainerCard from "@/components/cards/container-card";
import SocialCard from "@/components/cards/social-card";
import { SOCIALS } from "@/lib/data/socials";

const ContactSection = () => {
  return (
    <ContainerCard
      title="Hit me up!"
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
  );
};

export default ContactSection;
