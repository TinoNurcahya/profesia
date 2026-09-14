# Security, Privacy, and Risk Register

Owner teknis: maintainer Profesia. Owner data: operator Supabase project. Dokumen ini harus direview sebelum setiap production release.

## Data policy

- Account data, bookmarks, assessment results, and recommendations belong to the authenticated user.
- Data is retained while the account is active. Users can export it from `/api/account/export` and erase application data with `DELETE /api/account/data`.
- Authentication records are managed by Supabase Auth. Final deletion of the Auth user requires a privileged server workflow and is not performed with the browser anon key.
- Logs must contain event names, latency, status, and opaque request identifiers only. Email, answer sets, result payloads, prompts, and API keys must not be logged.
- Backups follow the Supabase project retention configured by the data owner. A restore drill is required before production launch and every quarter afterward.

## Threat model and risk register

| Risk | Boundary | Mitigation | Owner | Verification |
|---|---|---|---|---|
| Cross-user data access | Profiles, results, bookmarks | RLS using `auth.uid()`, server-derived user ID | Backend | RLS integration test in staging |
| Admin privilege escalation | CMS | Server-side `is_admin` lookup plus admin RLS policies | Backend | Non-admin API and route tests |
| Mass assignment | Admin mutations | Zod schema and explicit allowlist | Backend | Mutation contract tests |
| Session theft | Auth | Supabase SSR cookies, HTTPS, session refresh middleware | Platform | Preview cookie inspection |
| AI prompt/output injection | Recommendation API | Candidate allowlist, runtime output schema, timeout and deterministic fallback | Backend | Provider contract tests |
| Abuse and quota exhaustion | Recommendation API | Per-instance rate limit; replace with distributed limiter before horizontal scale | Platform | Load and 429 tests |
| Sensitive logging | API and provider errors | Structured metadata only; no request body or secret | Maintainer | Log review |
| Unsupported career claims | Catalog and assessments | Provenance fields, cautious language, editorial review | Content | Dataset review report |
| Accidental deletion | Account/admin | Owner-scoped RPC, archive instead of deleting referenced catalog data, backups | Data owner | Restore drill |

## Interpretation language

“Recommendation” means an option worth exploring. “Fit” is a transparent similarity score based on the documented inputs, not predicted success. “Evidence” means a traceable source or an explicit deterministic rule. MBTI, RIASEC, and zodiac content must never be described as diagnosis, certainty, or a guarantee of career outcomes. Zodiac is optional reflective/entertainment content and has zero weight in the deterministic recommendation formula.
