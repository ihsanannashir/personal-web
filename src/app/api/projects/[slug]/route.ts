import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import type { Project, ProjectWithVisuals } from "@/lib/types/database";

type RouteParams = { params: Promise<{ slug: string }> };

// GET /api/projects/[slug] — single project by slug (with visuals)
export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("projects")
    .select("*, project_visuals(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  // Sort visuals by display_order
  const project = data as ProjectWithVisuals;
  project.project_visuals.sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );

  return NextResponse.json(project);
}

// PUT /api/projects/[slug] — update a project
export async function PUT(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const body = await request.json();

  const { data, error } = await supabase
    .from("projects")
    .update(body)
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json(data as Project);
}

// DELETE /api/projects/[slug] — delete a project
export async function DELETE(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted" });
}
