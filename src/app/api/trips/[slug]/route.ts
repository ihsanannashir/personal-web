import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import type { TripWithRelations } from "@/lib/types/database";

type RouteParams = { params: Promise<{ slug: string }> };

// GET /api/trips/[slug] — single trip with photos and places joined
export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("trips")
    .select("*, trip_photos(*), trip_places(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  // Sort related records by display_order
  const trip = data as TripWithRelations;
  trip.trip_photos.sort((a, b) => a.display_order - b.display_order);
  trip.trip_places.sort((a, b) => a.display_order - b.display_order);

  return NextResponse.json(trip);
}

// PUT /api/trips/[slug] — update a trip
export async function PUT(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const body = await request.json();

  const { data, error } = await supabase
    .from("trips")
    .update(body)
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json(data);
}

// DELETE /api/trips/[slug] — delete a trip (cascades to photos/places via FK)
export async function DELETE(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  const { error } = await supabase.from("trips").delete().eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted" });
}
