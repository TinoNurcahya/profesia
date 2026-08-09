# Profesia

**Platform Informasi Karir & Kecocokan Kepribadian MBTI**

Profesia adalah platform web bilingual (Indonesia/English) yang menyediakan informasi lengkap tentang ratusan profesi dan fitur tes kepribadian MBTI interaktif untuk mencocokkan pengguna dengan karir yang sesuai.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | `16.x` |
| UI Library | React / React DOM | `19.x` |
| Styling | Tailwind CSS (PostCSS) | `^4` |
| Language | TypeScript | `^5` (strict) |
| Database | Supabase (PostgreSQL + Auth + RLS) | Latest |
| i18n | `next-intl` | Latest |
| Icons | Lucide React | Latest |
| Charts | Recharts | Latest |
| Fonts | Inter (via `next/font/google`) | - |
| Linter | ESLint + eslint-config-next | `^9` |

---

## Common Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Compile production bundle
npm run start    # Serve production build
npm run lint     # Run ESLint checks
npx tsc --noEmit # TypeScript type-check
```

---

## Features Overview

### 1. Katalog Profesi Lengkap
Daftar ~50 jenis pekerjaan (dokter, polisi, guru, programmer, desainer, pedagang, dll) dengan informasi detail:
- Deskripsi pekerjaan
- Range gaji rata-rata (IDR)
- Pendidikan yang dibutuhkan
- Skills/keahlian yang diperlukan
- Lingkungan kerja
- Jalur karir (career path)
- Prospek masa depan (tinggi/sedang/rendah)
- Rating work-life balance (1-5)

### 2. Tes MBTI Interaktif
Kuis kepribadian MBTI dengan 40 pertanyaan (10 per dimensi) yang menghasilkan salah satu dari 16 tipe kepribadian:
- **E/I** -- Extraversion vs Introversion (sumber energi)
- **S/N** -- Sensing vs Intuition (cara menerima informasi)
- **T/F** -- Thinking vs Feeling (cara mengambil keputusan)
- **J/P** -- Judging vs Perceiving (cara menghadapi dunia luar)

### 3. Rekomendasi Pekerjaan Berdasarkan MBTI
Setelah tes, pengguna mendapat daftar profesi yang cocok berdasarkan tipe kepribadiannya, lengkap dengan skor kecocokan dan alasan.

### 4. Search & Filter Profesi
Pencarian dan penyaringan profesi berdasarkan:
- Nama profesi (keyword search)
- Kategori (kesehatan, pendidikan, teknologi, dll)
- Range gaji
- Tingkat pendidikan
- Prospek karir

### 5. Perbandingan Profesi Side-by-Side
Fitur untuk membandingkan 2 profesi secara berdampingan dalam tabel komparatif lengkap dengan radar chart.

### 6. Bookmark Profesi Favorit
Pengguna yang login dapat menyimpan profesi favorit ke daftar bookmark pribadi.

### 7. Profil User
Dashboard pengguna yang menampilkan:
- Hasil tes MBTI terakhir + riwayat tes sebelumnya
- Daftar profesi yang di-bookmark
- Pengaturan profil (nama, avatar, bio)

### 8. Bilingual (Indonesia / English)
Seluruh tampilan UI dan konten profesi tersedia dalam 2 bahasa dengan toggle switcher.

### 9. Admin Panel
Panel admin untuk mengelola:
- CRUD data profesi
- CRUD kategori profesi
- Kelola pertanyaan MBTI
- Kelola data user
- Statistik platform

---

## Project Structure

```text
profesia/
├── app/
│   └── [locale]/                  # Semua route di-wrap locale (en/id)
│       ├── (auth)/                # Route group: auth pages
│       │   ├── login/
│       │   │   └── page.tsx       # Halaman login
│       │   └── register/
│       │       └── page.tsx       # Halaman register
│       ├── professions/           # Katalog & detail profesi
│       │   ├── page.tsx           # Browse semua profesi + search/filter
│       │   ├── [slug]/
│       │   │   └── page.tsx       # Detail profesi individual
│       │   └── compare/
│       │       └── page.tsx       # Perbandingan 2 profesi side-by-side
│       ├── mbti/                  # Fitur tes MBTI
│       │   ├── page.tsx           # Intro & penjelasan MBTI
│       │   ├── test/
│       │   │   └── page.tsx       # Kuis interaktif (40 pertanyaan)
│       │   └── result/
│       │       └── [type]/
│       │           └── page.tsx   # Hasil tes + rekomendasi profesi
│       ├── profile/
│       │   └── page.tsx           # Dashboard profil user
│       ├── admin/                 # Admin panel (protected)
│       │   ├── layout.tsx         # Admin layout + sidebar
│       │   ├── page.tsx           # Admin dashboard
│       │   ├── professions/
│       │   │   └── page.tsx       # CRUD profesi
│       │   ├── categories/
│       │   │   └── page.tsx       # CRUD kategori
│       │   ├── mbti/
│       │   │   └── page.tsx       # Kelola pertanyaan MBTI
│       │   └── users/
│       │       └── page.tsx       # Kelola users
│       ├── about/
│       │   └── page.tsx           # Tentang Profesia
│       ├── globals.css            # Tailwind v4 + design tokens
│       ├── layout.tsx             # Root layout (locale-aware, fonts, providers)
│       └── page.tsx               # Landing page / beranda
├── components/
│   ├── layout/                    # Layout components
│   │   ├── Navbar.tsx             # Header navigation + language switcher
│   │   ├── Footer.tsx             # Site footer
│   │   ├── LanguageSwitcher.tsx   # Toggle ID/EN
│   │   └── Sidebar.tsx            # Admin sidebar
│   ├── profession/                # Profession-related components
│   │   ├── ProfessionCard.tsx     # Card tampilan profesi di grid
│   │   ├── ProfessionDetail.tsx   # Detail view content
│   │   ├── CompareTable.tsx       # Tabel perbandingan 2 profesi
│   │   ├── FilterBar.tsx          # Filter sidebar/topbar
│   │   ├── SalaryChart.tsx        # Chart gaji (Recharts)
│   │   └── CareerPathTimeline.tsx # Timeline jalur karir
│   ├── mbti/                      # MBTI-related components
│   │   ├── QuizCard.tsx           # Tampilan 1 pertanyaan kuis
│   │   ├── ProgressBar.tsx        # Progress bar kuis (N/40)
│   │   ├── ResultCard.tsx         # Card hasil tipe MBTI
│   │   ├── DimensionChart.tsx     # Chart 4 dimensi MBTI
│   │   └── MbtiTypeGrid.tsx       # Grid 16 tipe kepribadian
│   └── ui/                        # Reusable UI primitives
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Skeleton.tsx
│       ├── Toast.tsx
│       └── Badge.tsx
├── services/                      # Supabase data-fetching layer
│   ├── professions.ts             # Profession queries
│   ├── professions-server.ts      # Server-side profession queries (SSR)
│   ├── categories.ts              # Category queries
│   ├── mbti.ts                    # MBTI questions, results, types
│   ├── bookmarks.ts               # Bookmark CRUD
│   ├── auth.ts                    # Auth helpers
│   └── admin.ts                   # Admin-specific queries
├── types/                         # Shared TypeScript types
│   └── index.ts                   # All interfaces & types
├── utils/
│   └── supabase/                  # Supabase client helpers
│       ├── client.ts              # Browser client
│       ├── server.ts              # Server client (RSC)
│       └── proxy.ts               # Proxy helper (pengganti middleware)
├── i18n/
│   └── request.ts                 # next-intl configuration
├── proxy.ts                       # Next.js 16 Proxy (gabungan next-intl + Supabase session refresh)
├── messages/                      # Translation files
│   ├── id.json                    # Bahasa Indonesia
│   └── en.json                    # English
├── data/                          # Static seed data
│   ├── mbti-questions.json        # 40 pertanyaan tes MBTI (bilingual)
│   ├── mbti-types.json            # 16 tipe MBTI (bilingual)
│   └── professions-seed.json      # ~50 profesi awal (bilingual)
├── supabase/
│   └── schema.sql                 # Database schema + RLS policies + seed data
├── public/                        # Static assets
│   ├── og-image.png               # Social preview image
│   └── favicon.ico
├── AGENTS.md                      # Engineering guidelines
├── next.config.ts                 # Next.js + next-intl plugin config
├── postcss.config.mjs             # PostCSS for Tailwind v4
├── tsconfig.json                  # TypeScript strict config
└── README.md                      # This file
```

---

## Database Schema

### Tabel: `profiles`

Extends Supabase Auth users. Menyimpan data profil pengguna.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | References `auth.users(id)` |
| `name` | TEXT NOT NULL | Nama lengkap |
| `username` | TEXT UNIQUE NOT NULL | Username unik |
| `avatar_url` | TEXT | URL foto profil |
| `mbti_type` | TEXT | Hasil MBTI terakhir (e.g. "INTJ") |
| `mbti_taken_at` | TIMESTAMPTZ | Kapan terakhir tes MBTI |
| `bio` | TEXT | Bio singkat |
| `role` | TEXT DEFAULT 'user' | `'user'` atau `'admin'` |
| `created_at` | TIMESTAMPTZ | Auto |
| `updated_at` | TIMESTAMPTZ | Auto |

### Tabel: `private_profiles`

Data privat pengguna yang tidak boleh diakses publik.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | References `auth.users(id)` |
| `email` | TEXT NOT NULL | Alamat email (privat) |
| `phone` | TEXT | Nomor telepon (opsional) |
| `created_at` | TIMESTAMPTZ | Auto |

### Tabel: `profession_categories`

Kategori pengelompokan profesi.

| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | Auto increment |
| `name_id` | TEXT NOT NULL | Nama kategori (Indonesia) |
| `name_en` | TEXT NOT NULL | Category name (English) |
| `slug` | TEXT UNIQUE NOT NULL | URL-friendly identifier |
| `icon` | TEXT | Nama ikon Lucide |
| `color` | TEXT | Tailwind color class |
| `description_id` | TEXT | Deskripsi (ID) |
| `description_en` | TEXT | Description (EN) |
| `created_at` | TIMESTAMPTZ | Auto |

**Contoh kategori**: Kesehatan, Pendidikan, Teknologi, Hukum, Seni & Kreatif, Bisnis, Pemerintahan, Teknik, Pertanian, Olahraga, Media, Keuangan, Transportasi, Keamanan, Jasa.

### Tabel: `professions`

Data utama setiap profesi/pekerjaan.

| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | Auto increment |
| `category_id` | INTEGER FK | References `profession_categories(id)` |
| `slug` | TEXT UNIQUE NOT NULL | URL-friendly (e.g. "dokter-umum") |
| `name_id` | TEXT NOT NULL | Nama profesi (Indonesia) |
| `name_en` | TEXT NOT NULL | Profession name (English) |
| `description_id` | TEXT NOT NULL | Deskripsi lengkap (ID) |
| `description_en` | TEXT NOT NULL | Full description (EN) |
| `salary_min` | INTEGER | Gaji minimum (IDR/bulan) |
| `salary_max` | INTEGER | Gaji maksimum (IDR/bulan) |
| `education_id` | TEXT | Pendidikan yang dibutuhkan (ID) |
| `education_en` | TEXT | Required education (EN) |
| `skills_id` | TEXT[] | Array of required skills (ID) |
| `skills_en` | TEXT[] | Array of required skills (EN) |
| `work_environment_id` | TEXT | Lingkungan kerja (ID) |
| `work_environment_en` | TEXT | Work environment (EN) |
| `career_path_id` | TEXT | Jalur karir (ID) |
| `career_path_en` | TEXT | Career path (EN) |
| `prospects` | TEXT | `'high'`, `'medium'`, atau `'low'` |
| `work_life_balance` | INTEGER | Rating 1-5 |
| `image_url` | TEXT | Gambar representatif |
| `is_featured` | BOOLEAN DEFAULT false | Tampil di halaman utama |
| `created_at` | TIMESTAMPTZ | Auto |
| `updated_at` | TIMESTAMPTZ | Auto |

### Tabel: `mbti_types`

Data 16 tipe kepribadian MBTI.

| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | Auto increment |
| `code` | TEXT UNIQUE NOT NULL | Kode 4 huruf: "INTJ", "ENFP", dll |
| `name_id` | TEXT NOT NULL | Julukan (ID): "Sang Arsitek" |
| `name_en` | TEXT NOT NULL | Nickname (EN): "The Architect" |
| `description_id` | TEXT NOT NULL | Deskripsi kepribadian (ID) |
| `description_en` | TEXT NOT NULL | Personality description (EN) |
| `strengths_id` | TEXT[] | Kekuatan (ID) |
| `strengths_en` | TEXT[] | Strengths (EN) |
| `weaknesses_id` | TEXT[] | Kelemahan (ID) |
| `weaknesses_en` | TEXT[] | Weaknesses (EN) |
| `work_style_id` | TEXT | Gaya kerja (ID) |
| `work_style_en` | TEXT | Work style (EN) |
| `color` | TEXT | Warna unik tipe (hex/tailwind) |
| `icon` | TEXT | Ikon representatif |

**16 Tipe MBTI:**

| Kode | Julukan (ID) | Nickname (EN) | Grup |
|------|-------------|---------------|------|
| INTJ | Sang Arsitek | The Architect | Analis |
| INTP | Sang Pemikir | The Logician | Analis |
| ENTJ | Sang Komandan | The Commander | Analis |
| ENTP | Sang Pendebat | The Debater | Analis |
| INFJ | Sang Advokat | The Advocate | Diplomat |
| INFP | Sang Mediator | The Mediator | Diplomat |
| ENFJ | Sang Protagonis | The Protagonist | Diplomat |
| ENFP | Sang Juru Kampanye | The Campaigner | Diplomat |
| ISTJ | Sang Ahli Logistik | The Logistician | Sentinel |
| ISFJ | Sang Pelindung | The Defender | Sentinel |
| ESTJ | Sang Eksekutif | The Executive | Sentinel |
| ESFJ | Sang Konsul | The Consul | Sentinel |
| ISTP | Sang Virtuoso | The Virtuoso | Penjelajah |
| ISFP | Sang Petualang | The Adventurer | Penjelajah |
| ESTP | Sang Pengusaha | The Entrepreneur | Penjelajah |
| ESFP | Sang Penghibur | The Entertainer | Penjelajah |

### Tabel: `mbti_profession_matches`

Relasi many-to-many: tipe MBTI mana yang cocok dengan profesi mana.

| Column | Type | Notes |
|--------|------|-------|
| `mbti_type_id` | INTEGER FK | References `mbti_types(id)` |
| `profession_id` | INTEGER FK | References `professions(id)` |
| `match_score` | INTEGER DEFAULT 80 | Skor kecocokan 1-100 |
| `reason_id` | TEXT | Alasan kecocokan (ID) |
| `reason_en` | TEXT | Match reason (EN) |
| **PK** | Composite | `(mbti_type_id, profession_id)` |

### Tabel: `mbti_questions`

40 pertanyaan tes MBTI (10 per dimensi).

| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | Auto increment |
| `dimension` | TEXT NOT NULL | `'EI'`, `'SN'`, `'TF'`, atau `'JP'` |
| `question_id` | TEXT NOT NULL | Teks pertanyaan (ID) |
| `question_en` | TEXT NOT NULL | Question text (EN) |
| `option_a_id` | TEXT NOT NULL | Pilihan A (ID) |
| `option_a_en` | TEXT NOT NULL | Option A (EN) |
| `option_b_id` | TEXT NOT NULL | Pilihan B (ID) |
| `option_b_en` | TEXT NOT NULL | Option B (EN) |
| `option_a_value` | TEXT NOT NULL | Nilai A: `'E'`, `'S'`, `'T'`, atau `'J'` |
| `option_b_value` | TEXT NOT NULL | Nilai B: `'I'`, `'N'`, `'F'`, atau `'P'` |
| `sort_order` | INTEGER DEFAULT 0 | Urutan tampil |

**Logika Penghitungan MBTI:**
1. User menjawab 40 pertanyaan (10 per dimensi)
2. Setiap jawaban menambah skor ke salah satu kutub dimensi
3. Untuk setiap dimensi, kutub dengan skor lebih tinggi menjadi huruf tipe
4. Contoh: E=7, I=3 -> "E"; S=4, N=6 -> "N"; T=8, F=2 -> "T"; J=5, P=5 -> "J" -> Hasil: **ENTJ**

### Tabel: `mbti_results`

Riwayat hasil tes MBTI setiap user.

| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | Auto increment |
| `user_id` | UUID FK | References `profiles(id)` |
| `result_type` | TEXT NOT NULL | Kode hasil: "INTJ", "ENFP", dll |
| `answers` | JSONB | Record lengkap semua jawaban |
| `ei_score` | INTEGER | Skor E (dari 10). I = 10 - ei_score |
| `sn_score` | INTEGER | Skor S. N = 10 - sn_score |
| `tf_score` | INTEGER | Skor T. F = 10 - tf_score |
| `jp_score` | INTEGER | Skor J. P = 10 - jp_score |
| `created_at` | TIMESTAMPTZ | Auto |

### Tabel: `bookmarks`

Profesi yang di-bookmark/disimpan oleh user.

| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | Auto increment |
| `user_id` | UUID FK | References `profiles(id)` |
| `profession_id` | INTEGER FK | References `professions(id)` |
| `created_at` | TIMESTAMPTZ | Auto |
| **UNIQUE** | Constraint | `(user_id, profession_id)` |

### RLS Policies (Row Level Security)

Semua tabel wajib mengaktifkan RLS. Berikut aturan utamanya:

| Tabel | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| `profiles` | Public read | Auth user (own) | Auth user (own) | - |
| `private_profiles` | Own records | Auth user (own) | Auth user (own) | - |
| `profession_categories` | Public read | `is_admin()` | `is_admin()` | `is_admin()` |
| `professions` | Public read | `is_admin()` | `is_admin()` | `is_admin()` |
| `mbti_types` | Public read | `is_admin()` | `is_admin()` | `is_admin()` |
| `mbti_profession_matches` | Public read | `is_admin()` | `is_admin()` | `is_admin()` |
| `mbti_questions` | Public read | `is_admin()` | `is_admin()` | `is_admin()` |
| `mbti_results` | Own records | Auth user (own) | - | Own records |
| `bookmarks` | Own records | Auth user (own) | - | Own records |

> **Catatan Keamanan**: Pengecekan status admin tidak lagi menggunakan subquery manual di setiap policy, melainkan disentralisasi melalui fungsi PostgreSQL `is_admin()` dengan *SECURITY DEFINER*, atau menggunakan JWT custom claims.

---

## Implementation Phases

### Phase 1: Foundation & Scaffold

**Tujuan**: Setup project dari nol, konfigurasi lengkap, desain system, dan halaman landing yang memukau.

| Task | File(s) | Detail |
|------|---------|--------|
| Scaffold Next.js | Root | `npx create-next-app@latest ./` dengan TS, Tailwind, App Router |
| Install dependencies | `package.json` | `next-intl`, `@supabase/ssr`, `lucide-react`, `sonner`, `recharts` |
| Setup next-intl | `next.config.ts`, `i18n/request.ts` | Plugin config + request loader |
| Translation files | `messages/id.json`, `messages/en.json` | Semua teks UI (navbar, footer, buttons, labels, errors) |
| Supabase helpers | `utils/supabase/*` | `client.ts`, `server.ts`, `proxy.ts` |
| Proxy Setup (Next.js 16) | `proxy.ts` | Gabungan routing locale `next-intl` dan refresh session Supabase |
| Design system | `app/[locale]/globals.css` | Tailwind v4 `@theme inline`, custom properties, base styles |
| Root layout | `app/[locale]/layout.tsx` | Font Inter, `<html lang>`, providers, Navbar, Footer |
| Navbar | `components/layout/Navbar.tsx` | Logo, nav links, LanguageSwitcher, Login button, mobile menu |
| Footer | `components/layout/Footer.tsx` | Links, copyright, social |
| Language switcher | `components/layout/LanguageSwitcher.tsx` | Toggle ID <-> EN, updates URL locale |
| Landing page | `app/[locale]/page.tsx` | Hero + stats + featured professions + MBTI CTA |
| Database schema | `supabase/schema.sql` | Semua tabel + indexes + RLS policies + `is_admin()` function |
| AGENTS.md | `AGENTS.md` | Aturan Next.js 16 (wajib `await params/searchParams` di dynamic routes) |
| A11y Baseline | Semua komponen | Semantic HTML, proper contrast, aria-labels dasar |

**Deliverable**: Website bisa diakses di `localhost:3000/id` dan `localhost:3000/en` dengan landing page yang sudah responsive dan menarik.

---

### Phase 2: Auth & Katalog Profesi

**Tujuan**: Sistem autentikasi dan halaman katalog profesi lengkap dengan search/filter.

| Task | File(s) | Detail |
|------|---------|--------|
| Auth service | `services/auth.ts` | Login, register, logout helpers |
| Login page | `app/[locale]/(auth)/login/page.tsx` | Form email + password, link ke register |
| Register page | `app/[locale]/(auth)/register/page.tsx` | Form nama, username, email, password |
| Auth callback | `app/[locale]/auth/callback/route.ts` | Handle Supabase auth redirect |
| Profession types | `types/index.ts` | Semua interfaces: `Profession`, `Category`, `MbtiType`, dll |
| Profession service | `services/professions.ts` | `fetchProfessions()`, `fetchBySlug()`, `fetchCategories()`, `fetchFeatured()` |
| Server service | `services/professions-server.ts` | SSR versions untuk halaman publik |
| Browse page | `app/[locale]/professions/page.tsx` | Grid profesi + search + filter + sort + pagination |
| ProfessionCard | `components/profession/ProfessionCard.tsx` | Card: nama, kategori, gaji, prospek badge, bookmark btn |
| FilterBar | `components/profession/FilterBar.tsx` | Filter kategori, gaji range, pendidikan, prospek |
| Detail page | `app/[locale]/professions/[slug]/page.tsx` | Full detail: deskripsi, gaji chart, skills, career path, MBTI cocok |
| SalaryChart | `components/profession/SalaryChart.tsx` | Bar chart range gaji (Recharts) |
| CareerPath | `components/profession/CareerPathTimeline.tsx` | Visual timeline jalur karir |
| Seed data | `data/professions-seed.json` | ~50 profesi populer, bilingual, detail lengkap |
| A11y Audit | Komponen Filter/Grid | Keyboard navigation untuk dropdown dan grid |

**Deliverable**: User bisa register/login, browse semua profesi, search/filter, dan lihat detail profesi lengkap.

---

### Phase 3: Tes MBTI Interaktif

**Tujuan**: Kuis MBTI 40 pertanyaan dengan UI yang engaging dan hasil yang informatif.

| Task | File(s) | Detail |
|------|---------|--------|
| MBTI service | `services/mbti.ts` | `fetchQuestions()`, `submitResult()`, `fetchType()`, `fetchMatches()`, `fetchHistory()` |
| MBTI intro page | `app/[locale]/mbti/page.tsx` | Penjelasan 4 dimensi, grid 16 tipe, CTA mulai tes, FAQ |
| MbtiTypeGrid | `components/mbti/MbtiTypeGrid.tsx` | Grid visual 16 tipe (4x4) dengan warna & ikon |
| Quiz page | `app/[locale]/mbti/test/page.tsx` | 40 pertanyaan, 1 per layar, progress bar, animasi transisi |
| QuizCard | `components/mbti/QuizCard.tsx` | Tampilan pertanyaan + 2 pilihan + animasi slide |
| ProgressBar | `components/mbti/ProgressBar.tsx` | Visual progress: pertanyaan ke-N dari 40 |
| Result page | `app/[locale]/mbti/result/[type]/page.tsx` | Tipe + deskripsi + chart dimensi + kekuatan/kelemahan + profesi cocok |
| ResultCard | `components/mbti/ResultCard.tsx` | Card besar hasil MBTI dengan warna tipe |
| DimensionChart | `components/mbti/DimensionChart.tsx` | Bar chart 4 dimensi (E vs I, S vs N, T vs F, J vs P) |
| Unit Tests | `__tests__/mbti.test.ts` | Tes unit (Vitest/Jest) khusus untuk logic kalkulasi/scoring MBTI |
| Questions data | `data/mbti-questions.json` | 40 pertanyaan berkualitas, bilingual |
| Types data | `data/mbti-types.json` | 16 tipe MBTI lengkap, bilingual |
| A11y Audit | Komponen Kuis | Fokus otomatis pada transisi soal, Screen Reader support |

**Alur Tes MBTI:**
```
[Intro Page] -> [Mulai Tes] -> [Pertanyaan 1/40] -> ... -> [Pertanyaan 40/40]
     -> [Kalkulasi Skor] -> [Redirect ke Hasil] -> [Tipe MBTI + Profesi Cocok]
```

**Deliverable**: User bisa mengambil tes MBTI, mendapat hasil tipe kepribadian, melihat profesi yang cocok, dan menyimpan hasil ke profil.

---

### Phase 4: Bookmark, Profil, & Perbandingan

**Tujuan**: Fitur interaksi user (bookmark, profil) dan tool perbandingan profesi.

| Task | File(s) | Detail |
|------|---------|--------|
| Bookmark service | `services/bookmarks.ts` | `toggle()`, `fetchUserBookmarks()`, `isBookmarked()` |
| Bookmark UI | Integrated into ProfessionCard & Detail | Tombol bookmark (heart/star) di card dan detail page |
| Profile page | `app/[locale]/profile/page.tsx` | Tab: Hasil MBTI + Riwayat, Bookmark, Settings |
| Compare page | `app/[locale]/professions/compare/page.tsx` | Pilih 2 profesi, tabel side-by-side, radar chart |
| CompareTable | `components/profession/CompareTable.tsx` | Tabel perbandingan yang reusable |
| Shareable compare | Query params | URL: `/professions/compare?a=dokter-umum&b=programmer` |
| A11y Audit | Tabel Komparasi | ARIA attributes untuk struktur tabel kompleks |

**Deliverable**: User bisa bookmark profesi, melihat profil lengkap dengan riwayat MBTI, dan membandingkan 2 profesi secara visual.

---

### Phase 5: Admin Panel, Polish & Deploy

**Tujuan**: Panel admin untuk manajemen data + optimasi final.

| Task | File(s) | Detail |
|------|---------|--------|
| Admin layout | `app/[locale]/admin/layout.tsx` | Sidebar nav + role check (redirect non-admin) |
| Admin dashboard | `app/[locale]/admin/page.tsx` | Stats overview: total profesi, user, tes MBTI |
| Profession CRUD | `app/[locale]/admin/professions/page.tsx` | Tabel + search + form tambah/edit/hapus profesi |
| Category CRUD | `app/[locale]/admin/categories/page.tsx` | Tabel + form kategori |
| User management | `app/[locale]/admin/users/page.tsx` | Daftar user + manage role |
| MBTI management | `app/[locale]/admin/mbti/page.tsx` | Kelola pertanyaan + lihat statistik hasil |
| About page | `app/[locale]/about/page.tsx` | Tentang Profesia, misi, tim |
| SEO optimization | All pages | `generateMetadata()` bilingual dengan `alternates.languages` (hreflang), OG images |
| Sitemap & robots | `app/sitemap.ts`, `app/robots.ts` | Auto-generated |
| Loading states | All pages | Skeleton loaders, no blank screens |
| Error handling | All pages | Error boundaries, toast messages |
| Dark mode | `globals.css` + components | Slate-based dark palette |
| Final A11y | Semua komponen | Audit akhir (Lighthouse/Axe), memastikan contrast dan nav |
| Performance | All pages | Pagination, lazy loading, code splitting |
| OG Image | `public/og-image.png` | Social preview image (1200x630) |

**Deliverable**: Platform lengkap, siap deploy ke Vercel, dengan admin panel dan semua optimasi produksi.

---

## Design Language

| Element | Specification |
|---------|--------------|
| **Primary Color** | Indigo-to-blue gradient -- profesional, terpercaya |
| **Accent Color** | Amber/Gold -- highlight, CTA, badge |
| **Success/Positive** | Emerald green |
| **Warning** | Amber/Orange |
| **Error** | Rose/Red |
| **Font Family** | Inter (clean, profesional, highly readable) |
| **Border Radius** | `rounded-2xl` (cards), `rounded-xl` (buttons), `rounded-full` (badges/avatars) |
| **Cards** | White bg, `border border-slate-200`, `shadow-sm`, hover elevation |
| **Buttons (CTA)** | `rounded-full`, gradient bg, bold text, shadow |
| **Buttons (Secondary)** | `rounded-xl`, subtle bg, border |
| **Dark Mode** | Slate-900 bg, slate-800 cards, slate-700 borders |
| **Spacing** | Consistent 4px grid (Tailwind default) |
| **Transitions** | `transition-all duration-200` on all interactive elements |

### MBTI Type Colors (Distinct dari UI Utama)

| Grup | Tipe | Color Theme |
|------|------|------------|
| Analis | INTJ, INTP, ENTJ, ENTP | Purple / Fuchsia |
| Diplomat | INFJ, INFP, ENFJ, ENFP | Teal / Cyan |
| Sentinel | ISTJ, ISFJ, ESTJ, ESFJ | Sky / Light Blue |
| Penjelajah | ISTP, ISFP, ESTP, ESFP | Orange / Peach |

---

## Page Wireframes (Textual)

### Landing Page (`/`)
```
[Navbar: Logo | Profesi | Tes MBTI | About | [ID/EN] | [Login]]

[Hero Section]
  "Temukan Karir Impianmu"
  "Platform informasi profesi terlengkap dengan tes kepribadian MBTI"
  [Mulai Tes MBTI]  [Jelajahi Profesi]

[Stats Bar]
  50 Profesi | 16 Tipe MBTI | [Total Users Dynamic DB] Pengguna

[Featured Professions Grid - 6 cards]

[How It Works - 3 steps]
  1. Ambil Tes MBTI -> 2. Lihat Hasil -> 3. Temukan Karir

[CTA Section]
  "Siap menemukan profesi yang cocok untukmu?"
  [Mulai Sekarang - Gratis]

[Footer]
```

### Profession Detail (`/professions/dokter-umum`)
```
[Header: Nama Profesi + Kategori + Badge Prospek]
[Bookmark Button] [Share Button]

[Info Cards Row]
  [Gaji: Rp X - Rp Y] [Pendidikan: S1 Kedokteran] [Prospek: Tinggi] [WLB: 3/5]

[Description - paragraf panjang]

[Skills Required - tags/badges]

[Salary Chart - bar chart range]

[Career Path Timeline]
  Magang -> Dokter Umum -> Spesialis -> Konsultan

[MBTI Types yang Cocok - small cards with match score]

[Related Professions - 3-4 cards]
```

### MBTI Test (`/mbti/test`)
```
[Progress Bar: 12/40]
[Dimension Badge: "Sensing vs Intuition"]

[Question Card - centered, large]
  "Saat menghadapi masalah, kamu lebih suka..."

  [Option A - full width button]
  "Menganalisis fakta dan data yang ada"

  [Option B - full width button]
  "Melihat kemungkinan dan pola tersembunyi"

[Navigation: <- Kembali | Lewati ->]
```

### MBTI Result (`/mbti/result/INTJ`)
```
[Result Header - gradient bg with type color]
  INTJ - Sang Arsitek / The Architect
  [Save Result] [Share] [Tes Ulang]

[Dimension Chart - 4 horizontal bars]
  E [====------] I  (30% E / 70% I)
  S [===-------] N  (30% S / 70% N)
  T [========--] F  (80% T / 20% F)
  J [=======---] P  (70% J / 30% P)

[Description Card]
[Strengths] [Weaknesses]
[Work Style]

[Profesi yang Cocok - grid cards with match score %]
```

---

## Verification Plan

### Automated Checks
```bash
cmd.exe /c npx tsc --noEmit       # Zero TypeScript errors
cmd.exe /c npm run lint            # Zero ESLint errors
cmd.exe /c npm run build           # Successful production build
```

### Manual Testing Checklist
- [ ] Landing page renders di `/id` dan `/en`
- [ ] Language switcher toggle berfungsi di semua halaman
- [ ] Register + login flow berjalan
- [ ] Browse profesi: search, filter, sort, pagination bekerja
- [ ] Detail profesi tampil lengkap dengan chart
- [ ] Tes MBTI: 40 pertanyaan -> hasil -> rekomendasi profesi
- [ ] Hasil MBTI tersimpan ke profil user
- [ ] Bookmark profesi: toggle on/off, tampil di profil
- [ ] Perbandingan 2 profesi side-by-side
- [ ] Admin panel: CRUD profesi + kategori
- [ ] Dark mode toggle berfungsi
- [ ] Responsive di mobile, tablet, desktop
- [ ] Semua halaman punya metadata SEO (bilingual)
- [ ] Loading skeletons tampil saat data loading
- [ ] Error states handled gracefully dengan toast

---

## Environment Variables

```env
# Supabase (project baru khusus Profesia)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Deployment

- **Hosting**: Vercel (recommended, native Next.js support)
- **Database**: Supabase (project baru, terpisah dari Lunarys)
- **Domain**: Custom domain (opsional)

---

## License

MIT