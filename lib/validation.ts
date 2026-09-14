import { z } from "zod";

export const localeSchema = z.enum(["id", "en"]);
export const mbtiCodeSchema = z.string().regex(/^(E|I)(S|N)(T|F)(J|P)$/);
export const mbtiResultSchema = z.object({
  base_code: mbtiCodeSchema,
  variant: z.enum(["A", "T"]),
  full_code: z.string().regex(/^(E|I)(S|N)(T|F)(J|P)-(A|T)$/),
  scores: z.record(z.string(), z.number().finite()),
  version: z.literal("mbti-v1"),
});

export const riasecScoresSchema = z.object({
  realistic: z.number().int().min(0).max(100),
  investigative: z.number().int().min(0).max(100),
  artistic: z.number().int().min(0).max(100),
  social: z.number().int().min(0).max(100),
  enterprising: z.number().int().min(0).max(100),
  conventional: z.number().int().min(0).max(100),
  top_3_code: z.string().regex(/^[RIASEC]{3}$/),
  version: z.literal("riasec-v1").optional(),
});

export const recommendationRequestSchema = z.object({
  mbtiResult: z.object({ base_code: mbtiCodeSchema, variant_code: z.enum(["A", "T"]).optional() }),
  riasecResult: riasecScoresSchema.nullish(),
  locale: localeSchema.default("id"),
  mbtiResultId: z.string().uuid().optional(),
  riasecResultId: z.string().uuid().optional(),
});

export const recommendationItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  type: z.enum(["profession", "major"]),
  slug: z.string().min(1),
  name_id: z.string().min(1),
  name_en: z.string().min(1),
  match_score: z.number().min(0).max(100),
  reasoning_id: z.string().min(20).max(600),
  reasoning_en: z.string().min(20).max(600),
});

export const recommendationOutputSchema = z.object({ recommendations: z.array(recommendationItemSchema).min(1).max(8) });
