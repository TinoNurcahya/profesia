import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const [profile, bookmarks, mbti, riasec, recommendations] = await Promise.all([
    supabase.from("profiles").select("name, username, created_at").eq("id", user.id).maybeSingle(),
    supabase.from("bookmarks").select("profession_id, created_at").eq("user_id", user.id),
    supabase.from("mbti_results").select("base_code, variant, full_code, scores, version, created_at").eq("user_id", user.id),
    supabase.from("riasec_results").select("top_3_code, scores, version, created_at").eq("user_id", user.id),
    supabase.from("recommendations").select("locale, provider, model, version, result, generated_at").eq("user_id", user.id),
  ]);
  return NextResponse.json({ exportedAt: new Date().toISOString(), account: { email: user.email, profile: profile.data }, bookmarks: bookmarks.data ?? [], mbtiResults: mbti.data ?? [], riasecResults: riasec.data ?? [], recommendations: recommendations.data ?? [] });
}
