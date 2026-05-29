import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

type RouteParams = { params: Promise<{ slug: string }> };

type VisualInput = {
  url: string;
  caption: string;
  contain: boolean;
  display_order: number;
};

// POST /api/projects/[slug]/visuals — batch insert visuals for a project
export async function POST(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const body = await request.json();
  const { project_id, visuals } = body as {
    project_id: string;
    visuals: VisualInput[];
  };

  // Verify project exists
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (visuals && visuals.length > 0) {
    const rows = visuals.map((v) => ({
      project_id,
      url: v.url,
      caption: v.caption || null,
      contain: v.contain,
      display_order: v.display_order,
    }));
    const { error } = await supabase.from("project_visuals").insert(rows);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  return NextResponse.json({ message: "Visuals saved" }, { status: 201 });
}

// PUT /api/projects/[slug]/visuals — replace all visuals for a project
export async function PUT(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const body = await request.json();
  const { project_id, visuals } = body as {
    project_id: string;
    visuals: VisualInput[];
  };

  // Delete existing visuals
  await supabase.from("project_visuals").delete().eq("project_id", project_id);

  if (visuals && visuals.length > 0) {
    const rows = visuals.map((v) => ({
      project_id,
      url: v.url,
      caption: v.caption || null,
      contain: v.contain,
      display_order: v.display_order,
    }));
    const { error } = await supabase.from("project_visuals").insert(rows);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  return NextResponse.json({ message: "Visuals updated" });
}
