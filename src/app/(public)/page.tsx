import HeroSection from "@/components/home/hero-section";
import StatsSection from "@/components/home/stats-section";
import IdentitySection from "@/components/home/identity-section";
import FeaturedProjectsSection from "@/components/home/featured-projects-section";
import LanguagesSection from "@/components/home/languages-section";
import NowTeaserSection from "@/components/home/now-teaser-section";
import BeyondSection from "@/components/home/beyond-section";
import ContactSection from "@/components/home/contact-section";
import { supabase } from "@/lib/supabase";
import type { Experience, Project } from "@/lib/types/database";

export const revalidate = 0;

const FEATURED_PROJECT_LIMIT = 3;

export default async function Home() {
  const [{ data: experiences }, { data: projects }] = await Promise.all([
    supabase
      .from("experiences")
      .select("*")
      .order("display_order", { ascending: true }),
    supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(FEATURED_PROJECT_LIMIT),
  ]);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <IdentitySection experiences={(experiences ?? []) as Experience[]} />
      <FeaturedProjectsSection projects={(projects ?? []) as Project[]} />
      <LanguagesSection />
      <NowTeaserSection />
      <BeyondSection />
      <ContactSection />
    </>
  );
}
