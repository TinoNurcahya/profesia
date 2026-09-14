import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const bodySchema = z.object({ professionId: z.number().int().positive() });

async function authenticatedClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}

export async function GET() {
  const { supabase, user } = await authenticatedClient();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { data, error } = await supabase.from("bookmarks").select("profession_id, created_at, professions(*)").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "read_failed" }, { status: 503 });
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_bookmark" }, { status: 400 });
  const { supabase, user } = await authenticatedClient();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { error } = await supabase.from("bookmarks").upsert({ user_id: user.id, profession_id: parsed.data.professionId }, { onConflict: "user_id,profession_id", ignoreDuplicates: true });
  if (error) return NextResponse.json({ error: "write_failed" }, { status: 503 });
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid_bookmark" }, { status: 400 });
  const { supabase, user } = await authenticatedClient();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { error } = await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("profession_id", parsed.data.professionId);
  if (error) return NextResponse.json({ error: "delete_failed" }, { status: 503 });
  return NextResponse.json({ success: true });
}
