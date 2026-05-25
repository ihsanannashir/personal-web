import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import type { Trip } from "@/lib/types/database";

// GET /api/trips — all published trips (or all if ?all=true)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";

  let query = supabase.from("trips").select("*");

  if (!all) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query.order("trip_start_date", { ascending: false });

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
