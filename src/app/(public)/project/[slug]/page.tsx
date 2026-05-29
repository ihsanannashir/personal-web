import { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetailLayout, {
  ProjectSection,
  FeatureGrid,
  ImageFigure,
} from "@/components/project/project-detail-layout";
import { supabase } from "@/lib/supabase";
import type { ProjectWithVisuals } from "@/lib/types/database";
import type { TechTagData } from "@/lib/types/item-data";

// ─── Config ─────────────────────────────────────────────────────────

export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

// ─── Metadata ───────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", slug)
    .single();

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description ?? "",
  };
}

// ─── Page ───────────────────────────────────────────────────────────

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("projects")
    .select("*, project_visuals(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) notFound();

  const project = data as ProjectWithVisuals;

  if (!project.cover_image_url) notFound();

  // Sort visuals by display_order
  const visuals = project.project_visuals.sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
  );

  const stack: TechTagData[] = project.tech_tags.map((t) => ({
    label: t.label,
    domain: t.domain === "other" ? "default" : t.domain,
  }));

  return (
    <ProjectDetailLayout
      title={project.title}
      subtitle={project.subtitle ?? ""}
      heroImage={project.cover_image_url}
      heroAlt={project.title}
      period={project.period ?? ""}
      role={project.role ?? ""}
      stack={stack}
      liveUrl={project.live_url ?? undefined}
      liveLabel={project.live_label ?? undefined}
      repoUrl={project.repo_url ?? undefined}
    >
      {project.description && (
        <ProjectSection label="Description">
          <div className="space-y-4">
            {project.description
              .split("\n")
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} className="text-body leading-relaxed">
                  {para}
                </p>
              ))}
          </div>
        </ProjectSection>
      )}

      {project.features && project.features.length > 0 && (
        <ProjectSection label="Key features">
          <FeatureGrid features={project.features} />
        </ProjectSection>
      )}

      {visuals && visuals.length > 0 && (
        <ProjectSection label="Visuals">
          <div className="space-y-4 mb-4 text-body leading-relaxed">
            These are some preview of the project's application (some cannot be
            shown due to NDA)
          </div>

          <div className="space-y-8">
            {visuals.map((v) => (
              <ImageFigure
                key={v.id}
                src={v.url}
                alt={v.caption ?? ""}
                caption={v.caption ?? ""}
                contain={v.contain}
              />
            ))}
          </div>
        </ProjectSection>
      )}
    </ProjectDetailLayout>
  );
}
