# Profesia — Production Readiness Sprint Plan

Dokumen ini adalah rencana eksekusi faktual untuk membawa Profesia dari prototype lokal menuju aplikasi production-ready.

Tanggal audit status: 12 September 2026.

## Prinsip eksekusi

- Status [x] hanya digunakan untuk deliverable yang terbukti ada dan berfungsi di repository.
- Prototype lokal tidak dianggap selesai sebelum memiliki persistence, authorization, error handling, test coverage, dan verifikasi production.
- Tidak ada klaim psikometri, social proof, accuracy, atau business metric tanpa sumber yang dapat diverifikasi.
- Setiap sprint memiliki Definition of Done yang dapat diuji.

## Status repository saat ini

| Area | Status aktual | Evidence utama |
|---|---|---|
| Next.js App Router dan locale route | Parsial selesai | app/[locale]/ tersedia |
| Landing page | Prototype tersedia | app/[locale]/page.tsx dan components/landing/ |
| i18n | Parsial selesai | messages/id.json dan messages/en.json |
| Authentication | Migrasi Supabase dimulai | Supabase Auth digunakan oleh API auth dan middleware |
| Profession catalog | Prototype lokal | 5 item di data/professions-seed.json |
| Profession detail | Belum ada | Route slug belum tersedia |
| MBTI quiz dan scoring | Prototype tersedia | 50 questions dan localStorage |
| MBTI persistence/history | Belum ada | Tidak ada result table/service |
| RIASEC quiz/result | Prototype lokal | 36 questions dan localStorage |
| Majors catalog/detail | Prototype lokal | 6 majors dari JSON |
| Zodiac | Landing page parsial | Detail slug route belum tersedia |
| Recommendation engine | Service/API parsial | Belum terhubung ke UI dan persistence |
| Bookmarks | UI simulasi | State lokal di ProfessionCard |
| Profile dashboard | Belum ada | Route belum tersedia |
| Comparison tool | Belum ada | Route dan components belum tersedia |
| Admin CMS | Belum ada | Route dan authorization belum tersedia |
| Database production | Fondasi tersedia | supabase/schema.sql memuat profiles, RLS, dan signup trigger |
| Supabase schema/RLS | Fondasi tersedia | RLS profile dan ownership policy sudah didefinisikan |
| Production deployment | Belum terbukti | Build, migration, environment, monitoring belum lengkap |

## Architecture decision gate

Supabase sudah dipilih sebagai backend resmi. Jangan menambahkan fitur baru dengan MySQL atau mencampur dua sumber data production.

### Keputusan — Supabase (Selesai)

Supabase Auth, PostgreSQL, RLS, server-side clients, migration, dan seed workflow menjadi standar implementasi berikutnya. MySQL tidak lagi menjadi source of truth.

---

# Roadmap Sprint

## Sprint 0 — Product, Architecture, and Security Baseline

Status: [ ] Belum dimulai

Tujuan: menghilangkan konflik dokumentasi dan mengunci keputusan production.

### Deliverables

- [~] Finalisasi konfigurasi Supabase project, environment, dan migration workflow (konfigurasi repo tersedia; migration belum dijalankan ke project).
- Sinkronkan PRD.md dengan backend, Next.js version, routes, dan status aktual.
- Tetapkan environment local, preview/staging, dan production.
- [x] Dokumentasikan public/private environment variables dan secret ownership.
- Buat threat model untuk auth, profile, bookmarks, admin, dan recommendation API.
- Tetapkan data ownership, retention, deletion, dan export policy.
- Definisikan istilah recommendation, fit, dan evidence agar tidak menjadi klaim deterministik.

### Definition of Done

- [x] Architecture decision tertulis dan disetujui.
- Klaim Supabase, RLS, admin, atau deployment tidak lagi disebut selesai tanpa evidence.
- Secret lokal tetap di .env.local dan tidak masuk Git.
- Risk register memiliki owner dan mitigation.

## Sprint 1 — Application Foundation and CI Quality Gate

Status: [x] Selesai

### Sudah tersedia

- Next.js App Router, TypeScript strict, Tailwind CSS v4.
- Locale routing dasar.
- Basic layout, Navbar, Footer, dan landing components.
- .gitignore untuk dependency, build output, cache, dan environment lokal.
- Script `typecheck`, ESLint flat config, dan workflow CI dasar.
- Script `test` untuk parity i18n dan `smoke` untuk route validation.

### Pekerjaan tersisa

- [x] Tambahkan CI untuk typecheck, lint, dan build.
- [x] Selesaikan ESLint configuration agar npm run lint non-interaktif.
- [x] Tambahkan translation validation script dan test script.
- [x] Tambahkan route smoke tests untuk /id dan /en.
- [x] Validasi translation key parity.
- [x] Lengkapi metadata, canonical, hreflang, sitemap, robots, dan Open Graph.
- [x] Verifikasi production build dalam environment lokal.
- [x] Tambahkan error boundary dan not-found handling dasar melalui Next.js.
- [x] Bersihkan hardcoded UI strings pada area Navbar, Footer, auth, professions, majors, dan assessment.
- [x] Memindahkan string user-facing Navbar, Footer, dan LanguageSwitcher ke i18n.
- [x] Memindahkan brand dan password visibility labels pada halaman login/register ke i18n.
- [x] Memindahkan label user-facing pada halaman professions, FilterBar, dan ProfessionCard ke i18n.
- [x] Memindahkan label user-facing pada halaman majors ke i18n.
- [x] Memindahkan label user-facing pada halaman MBTI test ke i18n.
- [x] Memindahkan label user-facing pada halaman RIASEC test dan result ke i18n.
- [x] Memindahkan label user-facing pada halaman MBTI result ke i18n.

### Definition of Done

- tsc --noEmit, lint, tests, dan production build lulus di CI.
- /id dan /en dirender tanpa missing translation.
- Tidak ada secret atau build artifact ter-track.

## Sprint 2 — Production Data Layer and Profession Catalog

Status: [~] Prototype tersedia

### Pekerjaan

- [x] Implementasikan fondasi schema `professions` sesuai backend decision.
- Buat migration dan seed workflow yang repeatable.
- Migrasikan katalog dari 5 seed items ke dataset yang direview.
- Tambahkan provenance untuk salary, prospects, education, skills, dan career path.
- Implementasikan typed profession service dengan error fallback.
- Selesaikan search, category, salary, education, prospects, MBTI, dan RIASEC filters.
- [x] Buat route /[locale]/professions/[slug].
- Buat salary visualization dan career path timeline yang accessible.

### Definition of Done

- Dataset memiliki sumber dan validasi.
- Filter dapat di-deep-link dan menghasilkan hasil yang benar.
- Dynamic route memiliki loading, not-found, dan error states.
- Unit test mencakup search, filter, sorting, dan slug lookup.

## Sprint 3 — Secure Authentication and User Profile

Status: [~] Prototype auth tersedia

### Pekerjaan

- Implementasikan backend auth sesuai keputusan Sprint 0.
- Lengkapi secure password/session handling atau managed Auth provider.
- Buat profile schema dan ownership checks.
- Lengkapi login, register, logout, expiry, invalid session, dan redirect.
- Buat /[locale]/profile.
- Tampilkan active MBTI, latest RIASEC, recommendation history, dan saved careers.
- Tambahkan account deletion dan data deletion policy.

### Definition of Done

- Protected routes menolak session yang tidak valid.
- User hanya dapat membaca dan mengubah datanya sendiri.
- Session cookie aman untuk production.
- Auth flows memiliki tests.
- Private key tidak masuk client bundle.

## Sprint 4 — MBTI Assessment Integrity and Result Persistence

Status: [~] Prototype lokal tersedia

### Pekerjaan

- Pindahkan scoring ke typed service module.
- Validasi 50 questions, dimension mapping, locale completeness, dan reverse scoring bila berlaku.
- Pertahankan local draft dengan hydration aman.
- Simpan completed result untuk authenticated users.
- Tambahkan result version.
- Lengkapi result page dengan five dimensions, base type, optional variant, evidence, dan cautious language.
- Uji incomplete answers, reset, refresh, duplicate submission, dan invalid type.

### Definition of Done

- 50 questions dapat diselesaikan dan dipulihkan setelah refresh.
- Scoring memiliki test vectors.
- Result tersimpan hanya untuk owner sah.
- Tidak ada klaim diagnosis, kepastian karier, atau 100% accuracy.

## Sprint 5 — RIASEC, Combined Evidence, and Recommendation UX

Status: [~] Prototype lokal dan service parsial

### Pekerjaan

- Validasi 36 questions dan enam dimensi RIASEC.
- Simpan result untuk authenticated users.
- Tambahkan result version dan provenance.
- Bangun deterministic matching layer dengan fit data yang dapat dijelaskan.
- Dokumentasikan formula combined MBTI/RIASEC.
- Hubungkan recommendation UI ke API.
- Tampilkan top recommendation, match factors, evidence, limitations, dan skill gaps bila tersedia.
- Pastikan fallback tetap valid tanpa Gemini.

### Definition of Done

- RIASEC scoring memiliki test vectors dan tie handling.
- Combined score memiliki dokumentasi dan tests.
- Recommendation hanya memilih candidate data yang valid.
- Reasoning bersifat eksploratif, bukan deterministik.
- Timeout, invalid result, missing key, provider error, dan fallback diuji.

## Sprint 6 — Recommendation API Security and AI Reliability

Status: [~] Service/API tersedia, belum production-ready

### Pekerjaan

- Validasi request dengan Zod.
- Validasi response Gemini dengan runtime schema.
- Verifikasi candidate IDs, types, slugs, scores, dan reasoning di server.
- Tambahkan timeout, retry terbatas, fallback, dan circuit protection.
- Tambahkan rate limiting dan abuse protection.
- Redact sensitive data dari logs.
- Simpan recommendation dengan version, provider, model, timestamp, dan source result IDs.
- Tambahkan quota monitoring dan contract tests.

### Definition of Done

- Tidak ada uncaught request error.
- API memiliki stable typed contract.
- Invalid model output ditolak atau difallback.
- Rate limit, timeout, provider failure, dan duplicate request ditangani.
- API key tidak muncul di browser atau logs.

## Sprint 7 — Bookmarks, Saved Careers, and Comparison

Status: [ ] Belum dimulai

### Pekerjaan

- Buat persistent bookmarks model/table.
- Implementasikan toggle, list, delete, duplicate handling, dan owner authorization.
- Ganti local bookmark state dengan server-backed flow.
- Tambahkan loading, rollback, unauthorized, dan error states.
- Buat /[locale]/professions/compare.
- Batasi comparison ke dua valid professions.
- Buat comparison table responsive dan radar chart dengan accessible alternative.
- Validasi shareable query parameters.

### Definition of Done

- Bookmark bertahan setelah refresh dan login ulang.
- User tidak dapat membaca bookmark user lain.
- Comparison URL dapat dibuka ulang dengan hasil konsisten.
- Comparison usable pada mobile tanpa page overflow.

## Sprint 8 — Majors and Zodiac Production Modules

Status: [~] Local prototype tersedia

### Pekerjaan majors

- Migrasikan majors dari JSON ke production data layer.
- Lengkapi provenance untuk subject, duration, prospect, dan career relation.
- Implementasikan major-profession relationships.
- Implementasikan MBTI/RIASEC fit hanya dari data terverifikasi.
- Lengkapi search, filter, detail, error, dan related careers.

### Pekerjaan Zodiac

- Putuskan apakah Zodiac core feature atau optional exploration.
- Tambahkan /[locale]/zodiac/[slug] bila dipertahankan.
- Simpan zodiac data dan profession relations di backend resmi.
- Gunakan framing eksploratif, bukan scientific atau diagnostic claim.

### Definition of Done

- Semua detail routes memiliki valid data, loading, error, dan not-found states.
- Relasi berasal dari source data yang jelas.
- Filter dan cross-link memiliki test coverage.

## Sprint 9 — Admin CMS and Content Governance

Status: [ ] Belum dimulai

### Pekerjaan

- Buat protected admin route dan layout.
- Implementasikan permission check di server.
- CRUD professions, categories, majors, question banks, dan zodiac data.
- Tambahkan draft/published status, validation, audit trail, dan timestamps.
- Tambahkan preview sebelum publish.
- Tambahkan archive policy untuk data yang sudah direferensikan.
- Tambahkan import/export workflow dengan validation report.

### Definition of Done

- Non-admin tidak dapat mengakses admin APIs atau actions.
- Semua mutation tervalidasi dan memiliki authorization check.
- Content changes dapat diaudit dan dipulihkan secara aman.
- Tidak ada raw payload mass assignment.

## Sprint 10 — Accessibility, Performance, and UX Hardening

Status: [ ] Belum dimulai

### Pekerjaan

- Audit keyboard navigation, focus management, semantics, contrast, target size, alt text, labels, errors, dan live regions.
- Tambahkan reduced-motion behavior.
- Optimalkan image/font loading dan reserve layout space.
- Audit bundle size dan client/server boundaries.
- Test viewport 375, 768, 1024, 1440, dan mobile landscape.
- Test slow network dan API failure states.

### Definition of Done

- Tidak ada horizontal overflow pada target viewport.
- Core journeys dapat dilakukan dengan keyboard.
- Semua critical controls memiliki accessible names.
- Reduced-motion mode tidak menimbulkan regression.
- Performance baseline dan exceptions terdokumentasi.

## Sprint 11 — SEO, Observability, and Production Deployment

Status: [ ] Belum dimulai

### Pekerjaan

- Lengkapi metadata locale, canonical, hreflang, sitemap, robots, Open Graph, dan Twitter metadata.
- Tambahkan error monitoring dan structured logs tanpa PII.
- Tambahkan health/readiness checks untuk database dan AI provider.
- Buat backup, restore drill, migration rollback, dan incident runbook.
- Konfigurasi preview, staging, dan production.
- Jalankan deployment dengan migration gate.
- Tambahkan post-deployment smoke tests dan rollback procedure.

### Definition of Done

- Production build berhasil dalam environment bersih.
- Deployment dapat diulang dari repository dan environment configuration.
- Backup dan restore telah diuji.
- Monitoring menangkap server errors, API failures, latency, dan rate-limit events.
- Smoke tests berhasil untuk auth, catalog, assessment, recommendation, profile, dan locale routes.
- Rollback dapat dilakukan tanpa kehilangan data.

## Global Definition of Done

Feature hanya boleh berstatus selesai jika:

- implementation tersedia di repository
- TypeScript strict check lulus
- lint non-interaktif lulus
- test yang relevan lulus
- production build lulus
- loading, empty, error, unauthorized, dan not-found states tersedia bila relevan
- accessibility dan responsive behavior diverifikasi
- i18n ID/EN lengkap
- security review selesai untuk data, user, dan admin boundaries
- dokumentasi diperbarui berdasarkan evidence
- tidak ada fake metrics, unsupported claims, atau secret ter-expose

## Current priority order

1. Sprint 0 — backend and architecture decision.
2. Sprint 1 — CI, lint, tests, dan production baseline.
3. Sprint 2 — production data layer dan profession detail.
4. Sprint 3 — secure authentication dan profile.
5. Sprint 4 — persistent MBTI results.
6. Sprint 5–6 — RIASEC dan integrated recommendations.
7. Sprint 7 — bookmarks dan comparison.
8. Sprint 8 — majors dan Zodiac production data.
9. Sprint 9 — admin CMS.
10. Sprint 10 — accessibility dan performance hardening.
11. Sprint 11 — deployment, monitoring, backup, dan release readiness.

Fitur tidak boleh dipromosikan sebagai production-ready sebelum melewati Global Definition of Done.
