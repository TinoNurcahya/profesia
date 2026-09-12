import professionsSeed from "@/data/professions-seed.json";
import majorsSeed from "@/data/majors.json";
import { RiasecScores } from "@/services/riasecService";

export interface MbtiResultInput {
  base_code: string; // e.g. "INTJ"
  variant_code?: string; // "A" or "T"
  ei_score?: number;
  sn_score?: number;
  tf_score?: number;
  jp_score?: number;
  at_score?: number;
}

export interface CandidateItem {
  type: "profession" | "major";
  id: string | number;
  slug: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  mbti_fit_score: number;
  riasec_fit_score: number;
  combined_fit_score: number;
}

export async function calculateTopCandidates(
  mbtiResult: MbtiResultInput,
  riasecResult?: RiasecScores | null,
  topLimit: number = 20
): Promise<CandidateItem[]> {
  const candidates: CandidateItem[] = [];

  const userMbti = mbtiResult.base_code.toUpperCase();
  const hollandCode = riasecResult?.top_3_code || "";

  // 1. Evaluate Professions
  professionsSeed.forEach((prof) => {
    let mbtiScore = 50; // Default baseline
    const match = prof.matched_mbti.find((m) => m.code === userMbti);
    if (match) {
      mbtiScore = match.match_score;
    }

    let riasecScore = 50;
    if (riasecResult) {
      let overlapPoints = 0;
      if (prof.category_slug === "teknologi" && hollandCode.includes("I")) overlapPoints += 30;
      if (prof.category_slug === "teknologi" && hollandCode.includes("R")) overlapPoints += 20;
      if (prof.category_slug === "seni-desain" && hollandCode.includes("A")) overlapPoints += 40;
      if (prof.category_slug === "kesehatan" && hollandCode.includes("S")) overlapPoints += 30;
      if (prof.category_slug === "kesehatan" && hollandCode.includes("I")) overlapPoints += 20;
      if (prof.category_slug === "pemasaran" && hollandCode.includes("E")) overlapPoints += 40;
      if (prof.category_slug === "pendidikan" && hollandCode.includes("S")) overlapPoints += 40;

      riasecScore = Math.min(100, 50 + overlapPoints);
    }

    const combinedScore = riasecResult
      ? Math.round(riasecScore * 0.6 + mbtiScore * 0.4)
      : mbtiScore;

    candidates.push({
      type: "profession",
      id: prof.id,
      slug: prof.slug,
      name_id: prof.name_id,
      name_en: prof.name_en,
      description_id: prof.description_id,
      description_en: prof.description_en,
      mbti_fit_score: mbtiScore,
      riasec_fit_score: riasecScore,
      combined_fit_score: combinedScore,
    });
  });

  // 2. Evaluate Majors
  majorsSeed.forEach((major) => {
    let mbtiScore = 50;
    if (major.matched_mbti.some((code) => userMbti.startsWith(code))) {
      mbtiScore = 88;
    }

    let riasecScore = 50;
    if (riasecResult) {
      if (major.category === "Saintek" && hollandCode.includes("I")) riasecScore += 30;
      if (major.category === "Seni" && hollandCode.includes("A")) riasecScore += 40;
      if (major.category === "Soshum" && (hollandCode.includes("S") || hollandCode.includes("E"))) riasecScore += 30;
      riasecScore = Math.min(100, riasecScore);
    }

    const combinedScore = riasecResult
      ? Math.round(riasecScore * 0.6 + mbtiScore * 0.4)
      : mbtiScore;

    candidates.push({
      type: "major",
      id: major.id,
      slug: major.slug,
      name_id: major.name_id,
      name_en: major.name_en,
      description_id: major.description_id,
      description_en: major.description_en,
      mbti_fit_score: mbtiScore,
      riasec_fit_score: riasecScore,
      combined_fit_score: combinedScore,
    });
  });

  // Sort descending by combined_fit_score
  candidates.sort((a, b) => b.combined_fit_score - a.combined_fit_score);

  return candidates.slice(0, topLimit);
}
