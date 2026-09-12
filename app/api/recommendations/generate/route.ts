import { NextResponse } from "next/server";
import { calculateTopCandidates, MbtiResultInput } from "@/services/recommendationService";
import { generatePersonalizedRecommendations } from "@/services/aiService";
import { RiasecScores } from "@/services/riasecService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mbtiResult, riasecResult, locale } = body as {
      mbtiResult: MbtiResultInput;
      riasecResult?: RiasecScores | null;
      locale?: string;
    };

    if (!mbtiResult || !mbtiResult.base_code) {
      return NextResponse.json(
        { error: "Hasil MBTI (base_code) wajib disertakan." },
        { status: 400 }
      );
    }

    // Layer 1: Deterministic candidate calculation (Top 20)
    const topCandidates = await calculateTopCandidates(mbtiResult, riasecResult, 20);

    // Layer 2: AI Personalization (Google Gemini Free API or Fallback)
    const aiOutput = await generatePersonalizedRecommendations(
      mbtiResult,
      riasecResult || null,
      topCandidates,
      locale || "id"
    );

    return NextResponse.json({
      success: true,
      candidates_evaluated: topCandidates.length,
      ...aiOutput,
    });
  } catch (error) {
    console.error("Error in /api/recommendations/generate route:", error);
    return NextResponse.json(
      { error: "Gagal memproses rekomendasi karir berbasis AI." },
      { status: 500 }
    );
  }
}
