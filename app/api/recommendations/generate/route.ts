import { NextResponse } from "next/server";
import { calculateTopCandidates } from "@/services/recommendationService";
import { generatePersonalizedRecommendations } from "@/services/aiService";
import { recommendationRequestSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { createClient } from "@/lib/supabase/server";
import { createHash } from "node:crypto";

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    const rateLimit = checkRateLimit(forwardedFor);
    if (!rateLimit.allowed) return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } });
    const parsed = recommendationRequestSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "invalid_request", details: parsed.error.flatten() }, { status: 400 });
    const { mbtiResult, riasecResult, locale, mbtiResultId, riasecResultId } = parsed.data;

    // Layer 1: Deterministic candidate calculation (Top 20)
    const topCandidates = await calculateTopCandidates(mbtiResult, riasecResult, 20);

    // Layer 2: AI Personalization (Google Gemini Free API or Fallback)
    const aiOutput = await generatePersonalizedRecommendations(
      mbtiResult,
      riasecResult || null,
      topCandidates,
      locale
    );

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const requestHash = createHash("sha256").update(JSON.stringify({ userId: user.id, mbtiResultId, riasecResultId, mbtiResult, riasecResult, locale })).digest("hex");
      await supabase.from("recommendations").upsert({
        user_id: user.id, mbti_result_id: mbtiResultId, riasec_result_id: riasecResultId, locale,
        provider: aiOutput.generated_by, model: aiOutput.generated_by === "gemini_free_tier" ? "gemini-2.5-flash" : "deterministic-v1",
        version: "recommendation-v1", request_hash: requestHash, result: aiOutput,
      }, { onConflict: "user_id,request_hash", ignoreDuplicates: true });
    }

    return NextResponse.json({
      success: true,
      candidates_evaluated: topCandidates.length,
      ...aiOutput,
    });
  } catch (error) {
    console.error("Recommendation request failed", { name: error instanceof Error ? error.name : "unknown" });
    return NextResponse.json(
      { error: "Gagal memproses rekomendasi karir berbasis AI." },
      { status: 500 }
    );
  }
}
