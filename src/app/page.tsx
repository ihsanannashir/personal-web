import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import StackSection from "@/components/home/stack-section";
import ProjectSection from "@/components/home/project-section";

export default function Home() {
  return (
    <section className="space-y-10 sm:space-y-14">
      <HeroSection />
      <StackSection />
      <AboutSection />
      <ProjectSection />
    </section>
  );
}
