import HeroSection from "../components/home/hero-section";
import ProjectSection from "../components/home/project-section";
import StackSection from "../components/home/stack-section";

export default function Home() {
  return (
    <main className="space-y-10">
      <HeroSection />
      <StackSection />
      <ProjectSection />
    </main>
  );
}
