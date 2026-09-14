import questionsSeed from "@/data/mbti-questions.json";

export type MbtiAnswerMap = Record<number, number>;
export interface MbtiResult { base_code: string; variant: "A" | "T"; full_code: string; scores: Record<string, number>; version: string; }

export function calculateMbtiResult(answers: MbtiAnswerMap): MbtiResult {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, A: 0, T_: 0 };
  for (const question of questionsSeed) {
    const score = answers[question.id] || 0;
    const first = question.direction as keyof typeof scores;
    const second = ({ E: "I", I: "E", S: "N", N: "S", T: "F", F: "T", J: "P", P: "J", A: "T_", T_: "A" } as Record<string, keyof typeof scores>)[first];
    scores[first === "T" ? "T" : first === "A" ? "A" : first] += score;
    scores[second] -= score;
  }
  const baseCode = `${scores.E >= scores.I ? "E" : "I"}${scores.S >= scores.N ? "S" : "N"}${scores.T >= scores.F ? "T" : "F"}${scores.J >= scores.P ? "J" : "P"}`;
  const variant = scores.A >= scores.T_ ? "A" : "T";
  return { base_code: baseCode, variant, full_code: `${baseCode}-${variant}`, scores, version: "mbti-v1" };
}
