import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { supabase } from "@/lib/supabase";
import { authOptions } from "@/lib/auth";
import type { Project } from "@/lib/types/database";

// GET /api/projects — all published projects (or all if ?all=true)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";

  let query = supabase.from("projects").select("*");

  if (!all) {
    query = query.eq("status", "published");
  } else {
    const session = await getServerSession(authOptions);
    if (!session) {
      // Do not allow fetching drafts for unauthenticated users
      query = query.eq("status", "published");
    }
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Project[]);
}

// POST /api/projects — create a new project
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
