import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

type RouteParams = { params: Promise<{ slug: string }> };

// POST /api/trips/[slug]/relations — batch insert photos and places for a trip
export async function POST(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const body = await request.json();
  const { trip_id, photos, places } = body as {
    trip_id: number;
    photos: { url: string; caption: string; display_order: number }[];
    places: { name: string; display_order: number }[];
  };

  // Verify trip exists
  const { data: trip } = await supabase
    .from("trips")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  const errors: string[] = [];

  // Insert photos
  if (photos && photos.length > 0) {
    const photoRows = photos.map((p) => ({
      trip_id,
      url: p.url,
      caption: p.caption || null,
      display_order: p.display_order,
    }));
    const { error } = await supabase.from("trip_photos").insert(photoRows);
    if (error) errors.push(`Photos: ${error.message}`);
  }

  // Insert places
  if (places && places.length > 0) {
    const placeRows = places.map((p) => ({
      trip_id,
      name: p.name,
      display_order: p.display_order,
    }));
    const { error } = await supabase.from("trip_places").insert(placeRows);
    if (error) errors.push(`Places: ${error.message}`);
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  return NextResponse.json({ message: "Relations saved" }, { status: 201 });
}

// PUT /api/trips/[slug]/relations — replace all photos and places for a trip
export async function PUT(request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const body = await request.json();
  const { trip_id, photos, places } = body as {
    trip_id: number;
    photos: { url: string; caption: string; display_order: number }[];
    places: { name: string; display_order: number }[];
  };

  // Delete existing
  await supabase.from("trip_photos").delete().eq("trip_id", trip_id);
  await supabase.from("trip_places").delete().eq("trip_id", trip_id);

  const errors: string[] = [];

  // Re-insert photos
  if (photos && photos.length > 0) {
    const photoRows = photos.map((p) => ({
      trip_id,
      url: p.url,
      caption: p.caption || null,
      display_order: p.display_order,
    }));
    const { error } = await supabase.from("trip_photos").insert(photoRows);
    if (error) errors.push(`Photos: ${error.message}`);
  }

  // Re-insert places
  if (places && places.length > 0) {
    const placeRows = places.map((p) => ({
      trip_id,
      name: p.name,
      display_order: p.display_order,
    }));
    const { error } = await supabase.from("trip_places").insert(placeRows);
    if (error) errors.push(`Places: ${error.message}`);
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  return NextResponse.json({ message: "Relations updated" });
}
