import { CandidateItem, MbtiResultInput } from "./recommendationService";
import { RiasecScores } from "./riasecService";

export interface RecommendationItemOutput {
  id: string | number;
  type: "profession" | "major";
  slug: string;
  name_id: string;
  name_en: string;
  match_score: number;
  reasoning_id: string;
  reasoning_en: string;
}

export interface RecommendationResponsePayload {
  recommendations: RecommendationItemOutput[];
  generated_by: "gemini_free_tier" | "deterministic_fallback";
}

export async function generatePersonalizedRecommendations(
  mbtiResult: MbtiResultInput,
  riasecResult: RiasecScores | null,
  candidates: CandidateItem[],
  locale: string = "id"
): Promise<RecommendationResponsePayload> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return generateFallbackRecommendations(mbtiResult, riasecResult, candidates);
  }

  try {
    const systemInstruction = `Kamu adalah asisten konsultan karir Profesia. Tugasmu adalah memilih 5-8 rekomendasi terbaik DARI kandidat yang diberikan dan menuliskan alasan psikologis personal.

ATURAN KETAT:
1. Pilih HANYA dari candidateList yang diberikan. JANGAN membuat profesi atau jurusan baru di luar daftar.
2. Alasan harus merujuk ke pola psikometri spesifik (tipe MBTI ${mbtiResult.base_code} dan skor RIASEC ${riasecResult?.top_3_code || "N/A"}).
3. Nada penulisan harus eksploratif dan memberdayakan, bukan mengklaim takdir mutlak.
4. Format output HARUS JSON valid persis seperti schema ini:
{
  "recommendations": [
    {
      "id": "id-kandidat",
      "type": "profession" atau "major",
      "slug": "slug-kandidat",
      "name_id": "nama id",
      "name_en": "nama en",
      "match_score": 85,
      "reasoning_id": "Alasan bahasa indonesia...",
      "reasoning_en": "Reasoning in english..."
    }
  ]
}`;

    const promptText = JSON.stringify({
      mbti: mbtiResult,
      riasec: riasecResult,
      candidates,
      locale,
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemInstruction}\n\nDATA INPUT:\n${promptText}` }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.3,
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn("Gemini API returned status:", response.status);
      return generateFallbackRecommendations(mbtiResult, riasecResult, candidates);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return generateFallbackRecommendations(mbtiResult, riasecResult, candidates);
    }

    const parsed = JSON.parse(rawText);
    return {
      recommendations: parsed.recommendations || [],
      generated_by: "gemini_free_tier",
    };
  } catch (error) {
    console.error("Error calling Gemini API, falling back to deterministic engine:", error);
    return generateFallbackRecommendations(mbtiResult, riasecResult, candidates);
  }
}

function generateFallbackRecommendations(
  mbtiResult: MbtiResultInput,
  riasecResult: RiasecScores | null,
  candidates: CandidateItem[]
): RecommendationResponsePayload {
  const topList = candidates.slice(0, 6);
  const mbtiCode = mbtiResult.base_code;
  const hollandCode = riasecResult?.top_3_code || "umum";

  const recommendations: RecommendationItemOutput[] = topList.map((item) => ({
    id: item.id,
    type: item.type,
    slug: item.slug,
    name_id: item.name_id,
    name_en: item.name_en,
    match_score: item.combined_fit_score,
    reasoning_id: `Berdasarkan pola psikometri MBTI ${mbtiCode} dan kecenderungan vokasional Holland Code (${hollandCode}), bidang ini menawarkan tingkat keselarasan ${item.combined_fit_score}% dengan cara berpikir analitis dan gaya kerja Anda.`,
    reasoning_en: `Based on your ${mbtiCode} MBTI psychometrics and Holland Code (${hollandCode}), this field presents an estimated ${item.combined_fit_score}% alignment with your analytical mindset and preferred work environment.`,
  }));

  return {
    recommendations,
    generated_by: "deterministic_fallback",
  };
}
