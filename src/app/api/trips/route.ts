import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import type { Trip } from "@/lib/types/database";

// GET /api/trips — all published trips
export async function GET() {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("status", "published")
    .order("trip_start_date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data as Trip[]);
}

// POST /api/trips — create a new trip
export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("trips")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data as Trip, { status: 201 });
}
