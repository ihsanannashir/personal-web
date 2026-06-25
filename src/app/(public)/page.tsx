import HeroSection from "@/components/home/hero-section";
import StatsSection from "@/components/home/stats-section";
import IdentitySection from "@/components/home/identity-section";
import LanguagesSection from "@/components/home/languages-section";
import BeyondSection from "@/components/home/beyond-section";
import ContactSection from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <IdentitySection />
      <LanguagesSection />
      <BeyondSection />
      <ContactSection />
    </>
  );
}
