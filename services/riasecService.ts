import riasecQuestionsSeed from "@/data/riasec-questions.json";

export type RiasecDimension = "R" | "I" | "A" | "S" | "E" | "C";

export interface RiasecQuestion {
  id: number;
  dimension: RiasecDimension;
  statement_id: string;
  statement_en: string;
}

export interface RiasecScores {
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
  top_3_code: string;
}

export interface RiasecResult extends RiasecScores {
  id?: string;
  user_id?: string;
  created_at?: string;
}

export function getRiasecQuestions(): RiasecQuestion[] {
  return riasecQuestionsSeed as RiasecQuestion[];
}

export function calculateRiasecScores(
  answers: Record<number, number>
): RiasecScores {
  const rawScores: Record<RiasecDimension, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  const questions = getRiasecQuestions();

  questions.forEach((q) => {
    const value = answers[q.id] || 3; // Default 3 (Neutral)
    rawScores[q.dimension] += value;
  });

  // Calculate percentage: min score = 6 (6 * 1), max score = 30 (6 * 5)
  const normalize = (raw: number) => {
    const pct = Math.round(((raw - 6) / 24) * 100);
    return Math.max(0, Math.min(100, pct));
  };

  const scores: Record<RiasecDimension, number> = {
    R: normalize(rawScores.R),
    I: normalize(rawScores.I),
    A: normalize(rawScores.A),
    S: normalize(rawScores.S),
    E: normalize(rawScores.E),
    C: normalize(rawScores.C),
  };

  // Derive top 3 Holland Code
  const sorted = (Object.keys(scores) as RiasecDimension[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const top3Code = sorted.slice(0, 3).join("");

  return {
    realistic: scores.R,
    investigative: scores.I,
    artistic: scores.A,
    social: scores.S,
    enterprising: scores.E,
    conventional: scores.C,
    top_3_code: top3Code,
  };
}

export const RIASEC_DIMENSION_NAMES: Record<
  RiasecDimension,
  { name_id: string; name_en: string; color: string; description_id: string; description_en: string }
> = {
  R: {
    name_id: "Realistic (Praktis & Teknis)",
    name_en: "Realistic (Practical & Technical)",
    color: "amber",
    description_id: "Menyukai pekerjaan fisik, alat teknis, mesin, dan aktivitas luar ruangan yang berwujud nyata.",
    description_en: "Prefers physical tasks, technical tools, machinery, and tangible outdoor activities.",
  },
  I: {
    name_id: "Investigative (Analitis & Riset)",
    name_en: "Investigative (Analytical & Research)",
    color: "indigo",
    description_id: "Senang meneliti, menganalisis data kompleks, dan memecahkan masalah teoretis ilmiah.",
    description_en: "Enjoys researching, analyzing complex data, and solving theoretical scientific problems.",
  },
  A: {
    name_id: "Artistic (Kreatif & Ekspresif)",
    name_en: "Artistic (Creative & Expressive)",
    color: "purple",
    description_id: "Memiliki imajinasi tinggi, menyukai estetika visual, musik, tulisan, dan fleksibilitas tanpa aturan kaku.",
    description_en: "Highly imaginative, prefers visual aesthetics, music, writing, and flexibility over rigid rules.",
  },
  S: {
    name_id: "Social (Membantu & Mengedukasi)",
    name_en: "Social (Helping & Educating)",
    color: "emerald",
    description_id: "Fokus pada hubungan antarmanusia, konseling, mengajar, serta pelayanan masyarakat.",
    description_en: "Focuses on interpersonal relationships, counseling, teaching, and community service.",
  },
  E: {
    name_id: "Enterprising (Kepemimpinan & Bisnis)",
    name_en: "Enterprising (Leadership & Business)",
    color: "rose",
    description_id: "Berani mengambil risiko, senang memimpin tim, bernegosiasi, dan mencapai target organisasi/bisnis.",
    description_en: "Takes calculated risks, enjoys leading teams, negotiating, and achieving business targets.",
  },
  C: {
    name_id: "Conventional (Terstruktur & Detail)",
    name_en: "Conventional (Structured & Detailed)",
    color: "sky",
    description_id: "Teliti dengan angka, data administrasi, menyukai SOP yang jelas, serta ketertiban sistemis.",
    description_en: "Meticulous with numbers, data administration, prefers clear SOPs, and systemic order.",
  },
};
