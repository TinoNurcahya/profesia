import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const startedAt = Date.now();
  let database: "ready" | "degraded" = "degraded";
  try {
    const supabase = await createClient();
    const checks = await Promise.all([
      supabase.from("professions").select("id", { head: true, count: "exact" }).limit(1),
      supabase.from("bookmarks").select("id", { head: true, count: "exact" }).limit(1),
      supabase.from("recommendations").select("id", { head: true, count: "exact" }).limit(1),
    ]);
    database = checks.some(({ error }) => error) ? "degraded" : "ready";
  } catch {}
  const ready = database === "ready";
  return NextResponse.json({ status: ready ? "ready" : "degraded", database, ai: process.env.GEMINI_API_KEY ? "configured" : "fallback", latencyMs: Date.now() - startedAt }, { status: ready ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
