# Recommendation Method

Version: `recommendation-v1`.

The deterministic layer ranks only records present in the reviewed catalog. When both assessments exist, the score is `RIASEC fit × 0.60 + MBTI fit × 0.40`. Without RIASEC, the MBTI fit is used. Ties preserve stable catalog order. Candidate selection is capped at 20 before personalization.

RIASEC category affinities are explicit heuristics in `services/recommendationService.ts`; they are not empirical predictions. The optional Gemini layer may reorder and explain 5–8 allowlisted candidates but cannot invent IDs or slugs. Output failing the runtime schema or allowlist falls back to the deterministic result. Provider errors, missing keys, and timeouts also use the fallback.

Known limitations: the current catalog is small, fit values require editorial provenance, and the scoring has not been validated as a psychometric instrument. Results should be combined with interests, opportunity, constraints, experience, and advice from qualified people.
