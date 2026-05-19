import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import type { Experience } from "@/lib/types/database";

// GET /api/experiences — all experiences ordered by display_order
export async function GET() {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Experience[]);
}

// POST /api/experiences — create a new experience
export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("experiences")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data as Experience, { status: 201 });
}
