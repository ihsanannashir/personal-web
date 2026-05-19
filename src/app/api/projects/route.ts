import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types/database";

// GET /api/projects — all published projects
export async function GET() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Project[]);
}

// POST /api/projects — create a new project
export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("projects")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data as Project, { status: 201 });
}
