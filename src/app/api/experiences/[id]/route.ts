import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { supabase } from "@/lib/supabase";
import { authOptions } from "@/lib/auth";
import type { Experience } from "@/lib/types/database";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/experiences/[id] — single experience by id
export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json(data as Experience);
}

// PUT /api/experiences/[id] — update an experience
export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const { data, error } = await supabase
    .from("experiences")
    .update(body)
    .eq("id", Number(id))
    .select()
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json(data as Experience);
}

// DELETE /api/experiences/[id] — delete an experience
export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted" });
}
