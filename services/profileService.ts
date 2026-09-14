import { createClient } from "@/lib/supabase/server";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  created_at: string;
}

export interface ProfileDashboardData {
  latestMbti: { full_code: string; version: string; created_at: string } | null;
  latestRiasec: { top_3_code: string; version: string; created_at: string } | null;
  bookmarks: { profession_id: number; created_at: string; professions: { slug: string; name_id: string; name_en: string } | null }[];
  recommendations: { id: string; provider: string; generated_at: string; result: unknown }[];
}

export async function getCurrentUserProfile(): Promise<{ user: { id: string; email?: string } | null; profile: UserProfile | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null };
  const { data, error } = await supabase.from("profiles").select("id, name, username, created_at").eq("id", user.id).maybeSingle();
  if (error) {
    console.error("Profile lookup failed:", error);
    return { user: { id: user.id, email: user.email }, profile: null };
  }
  return { user: { id: user.id, email: user.email }, profile: data as UserProfile | null };
}

export async function getProfileDashboardData(userId: string): Promise<ProfileDashboardData> {
  const supabase = await createClient();
  const [mbti, riasec, bookmarks, recommendations] = await Promise.all([
    supabase.from("mbti_results").select("full_code, version, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("riasec_results").select("top_3_code, version, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("bookmarks").select("profession_id, created_at, professions(slug, name_id, name_en)").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("recommendations").select("id, provider, generated_at, result").eq("user_id", userId).order("generated_at", { ascending: false }).limit(10),
  ]);
  return {
    latestMbti: mbti.data,
    latestRiasec: riasec.data,
    bookmarks: (bookmarks.data ?? []) as unknown as ProfileDashboardData["bookmarks"],
    recommendations: recommendations.data ?? [],
  };
}
