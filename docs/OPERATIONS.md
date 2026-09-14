# Environments, Deployment, and Incident Operations

## Environments

| Environment | Purpose | Database | Release rule |
|---|---|---|---|
| Local | Development | Local Supabase or fallback JSON | Never use production secrets |
| Preview | Pull request validation | Isolated preview project | Seed reviewed fixtures only |
| Staging | Migration and acceptance | Staging Supabase project | Production-like RLS and provider configuration |
| Production | Public traffic | Production Supabase project | Protected branch and migration gate |

Server secrets are owned by the platform administrator. `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are server-only. Public site configuration and the Supabase anon key may use `NEXT_PUBLIC_`. Values live in platform secret storage and `.env.local`, never Git.

## Release procedure

1. Run `npm ci`, `npm run verify`, and a clean production build.
2. Back up the database and record the restore point.
3. Apply pending migrations to staging, run `npm run smoke`, then apply them to production.
4. Deploy the exact reviewed commit. Run `/api/health` and post-deployment smoke journeys for both locales, auth, catalog, assessments, profile, bookmark, comparison, and recommendations.
5. Roll back the application to the prior immutable deployment when health or smoke checks fail. Use forward-only corrective migrations; restore the database only after incident-owner approval.

## Incident runbook

- Disable the affected integration or AI key; deterministic recommendations remain available.
- Preserve redacted logs and timestamps, identify scope, and rotate exposed credentials immediately.
- Notify the data owner for any suspected personal-data exposure.
- Record impact, remediation, and preventive follow-up. Do not place personal data in the incident document.

## Backup and restore drill

Quarterly, restore the latest backup into an isolated project, run schema checks, compare representative row counts, authenticate a test owner, and verify RLS isolation. Record the date, operator, backup identifier, checks, and result. Repository documentation cannot claim this drill passed until that external evidence exists.
