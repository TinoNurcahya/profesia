import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { riasecScoresSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = riasecScoresSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_assessment", details: parsed.error.flatten() }, { status: 400 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { top_3_code, version = "riasec-v1", ...scores } = parsed.data;
  const { data, error } = await supabase.from("riasec_results").insert({ user_id: user.id, top_3_code, scores, version }).select("id, created_at").single();
  if (error) return NextResponse.json({ error: "persistence_failed" }, { status: 503 });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
