import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { supabase } from "@/lib/supabase";
import { authOptions } from "@/lib/auth";
import type { NowEntry } from "@/lib/types/database";

// GET /api/now — single latest now entry
export async function GET() {
  const { data, error } = await supabase
    .from("now_entries")
    .select("*")
    .order("last_updated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json(data as NowEntry);
}

// POST /api/now — create a new now entry
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from("now_entries")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data as NowEntry, { status: 201 });
}
