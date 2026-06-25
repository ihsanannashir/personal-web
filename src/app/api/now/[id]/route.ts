import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { supabase } from "@/lib/supabase";
import { authOptions } from "@/lib/auth";
import type { NowEntry } from "@/lib/types/database";

type RouteParams = { params: Promise<{ id: string }> };

// PUT /api/now/[id] — update a now entry
export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const { data, error } = await supabase
    .from("now_entries")
    .update(body)
    .eq("id", Number(id))
    .select()
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json(data as NowEntry);
}
