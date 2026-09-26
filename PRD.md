# Technical Product Requirement Document (PRD) - Profesia

**Spesifikasi Teknis, Arsitektur Sistem, Skema Kode, & Algoritma Database (16Personalities & Zodiac Model)**

---

## 1. Dokumen Kontrol & Ringkasan Arsitektur Sistem

| Parameter Teknis | Spesifikasi Produksi |
|---|---|
| **Nama Proyek** | Profesia (Platform Informasi Karir, Psikometri MBTI & Zodiak) |
| **Document Type** | Technical & Code Specifications PRD |
| **Model Psikometri** | Standard 16Personalities Model (5 Dimensi: E/I, S/N, T/F, J/P, A/T) + Zodiac Explorer |
| **Status** | Production-readiness implementation in progress (repository verified; external rollout pending) |
| **Framework Web** | Next.js 16.3.5 (App Router, React Server Components / RSC) |
| **UI & Style System** | Tailwind CSS v4 (`@theme inline`), PostCSS, Lucide React, Recharts |
| **Backend & DB** | Supabase (PostgreSQL 15+, Auth Service, Storage, Row Level Security) |
| **Internasionalisasi** | `next-intl` (Locale Prefix Routing `/id` dan `/en`) |
| **Linting & Types** | TypeScript 5.x Strict Mode, ESLint v9 (`eslint-config-next`) |

---

## 2. Model Psikometri & 4 Rumpun Kepribadian (16Personalities Standard)

Platform Profesia memakai pengelompokan populer 16 tipe ke dalam **4 Rumpun Utama (Role Groups)** sebagai alat refleksi eksploratif, bukan diagnosis atau prediksi keberhasilan:

### 2.1 4 Rumpun Utama (Role Groups) & Palet Warna UI
1. **Analis (Analysts)** — *Purple Theme (`#88619A` / `from-purple-600 to-indigo-700`)*:
   - **INTJ**: Arsitek (*Architect*)
   - **INTP**: Pemikir (*Logician*)
   - **ENTJ**: Komandan (*Commander*)
   - **ENTP**: Pendebat (*Debater*)
2. **Diplomat (Diplomats)** — *Emerald Theme (`#33A474` / `from-emerald-600 to-teal-700`)*:
   - **INFJ**: Advokat (*Advocate*)
   - **INFP**: Mediator (*Mediator*)
   - **ENFJ**: Protagonis (*Protagonist*)
   - **ENFP**: Juru Kampanye (*Campaigner*)
3. **Sentinel (Sentinels)** — *Sky Blue Theme (`#4298B4` / `from-sky-600 to-blue-700`)*:
   - **ISTJ**: Ahli Logistik (*Logistician*)
   - **ISFJ**: Pelindung (*Defender*)
   - **ESTJ**: Eksekutif (*Executive*)
   - **ESFJ**: Konsul (*Consul*)
4. **Penjelajah (Explorers)** — *Amber Theme (`#E4A42C` / `from-amber-500 to-orange-600`)*:
   - **ISTP**: Virtuoso (*Virtuoso*)
   - **ISFP**: Petualang (*Adventurer*)
   - **ESTP**: Pengusaha (*Entrepreneur*)
   - **ESFP**: Penghibur (*Entertainer*)

---

## 3. Persyaratan Fungsional Detail (F-01 s/d F-11)

### F-01: System i18n & Localization
Routing dua bahasa (`/id` dan `/en`) via `next-intl` dengan language switcher tanpa full reload.

### F-02: Authentication & User Profile Management
Supabase Auth (Email + Password), pemisahan profil publik (`profiles`) dan privat (`private_profiles`), riwayat kuis, serta pilihan Zodiak pengguna.

### F-03: Katalog Profesi, Advanced Filtering & MBTI/Zodiac Quick-Filter
Pencarian kata kunci realtime, multi-kategori, range gaji, pendidikan, prospek, serta filter khusus MBTI dan Zodiak.

### F-04: Detail Profesi & Data Analytics
Halaman detail berbasis slug dengan visualisasi Bar Chart Gaji (Recharts), Career Path Timeline, MBTI cocok, dan Zodiak cocok.

### F-05: Modul Kuis MBTI Interaktif & Auto-Save State
50 Pernyataan Likert Scale 5 Poin dengan Auto-Save State draf kuis di `localStorage`.

### F-06: Algoritma Scoring & Halaman Hasil MBTI
Kalkulasi presisi 5 dimensi ($E/I, S/N, T/F, J/P, A/T$), persentase kecenderungan, dan rekomendasi profesi cocok.

### F-07: Tool Komparasi Profesi Side-by-Side
Komparasi 2 profesi secara berdampingan dengan Radar Chart dan *shareable URL parameters*.

### F-08: Bookmark & Saved Careers
Fitur simpan profesi ke tabel `bookmarks` pengguna terautentikasi via Supabase RLS.

### F-09: Admin Panel CMS Platform
CMS terproteksi fungsi `is_admin()` untuk CRUD Profesi, Kategori, Bank Soal MBTI, Zodiak, dan Pengguna.

### F-10: Shareable MBTI Result Card Generator (Social Story Card)
Komponen `ShareCard` yang memungkinkan pengguna mengekspor kartu visual ringkasan hasil MBTI & profesi cocoknya dalam format gambar (rasio 9:16).

### F-11: Navigasi Karir Berdasarkan Zodiak (Zodiac Career Module)
- Halaman eksplorasi 12 Zodiak (`/zodiac` dan `/zodiac/[slug]`).
- Visualisasi elemen Zodiak (Api, Tanah, Udara, Air), tanggal, dan rekomendasi profesi yang paling cocok dengan energi Zodiak tersebut.

### F-12: Modul Jurusan Kuliah (O*NET CIP Majors & Study Programs Module)
- Katalog 64 jurusan kuliah terstandarisasi taksonomi resmi **O*NET CIP (*Classification of Instructional Programs*)** mencakup 3 rumpun keilmuan: Saintek, Soshum, dan Seni & Desain.
- Informasi mendalam per jurusan: kode resmi CIP (misal `11.0701`), Holland Code RIASEC (`riasec_code`), silabus 5 mata kuliah inti bilingual, jenjang (S1/D4/Profesi), estimasi durasi, dan prospek karir.
- Paginasi kompak 12 kartu per halaman dengan penomoran elipsis (`1, 2, 3 ... 6`), sinkronisasi URL (`?page=N`), auto-scroll ke atas grid, dan status bar jumlah hasil.
- Penyelarasan warna identitas MBTI 4 kelompok peran (Analis ungu, Diplomat hijau zamrud, Sentinel biru langit, Penjelajah kuning amber) sesuai standar `DESIGN.md`.
- Relasi dua arah (*bidirectional cross-link*) dengan 54 profesi O*NET terdaftar (`matched_professions_slugs`).

### F-13: Integrasi Psikometri RIASEC (Holland Code Model)
- Kuis vokasional terpisah (36 pernyataan Likert Scale) mengukur 6 dimensi: *Realistic*, *Investigative*, *Artistic*, *Social*, *Enterprising*, *Conventional*.
- Generasi kode Holland 3-huruf (mis. `IAS`) dan kalkulasi skor kecocokan karir gabungan ($\text{combined\_fit\_score} = \text{riasec\_fit} \times 0.6 + \text{mbti\_fit} \times 0.4$).

### F-14: AI Recommendation Engine (2-Layer Hybrid Architecture)
- **Layer 1 (Deterministik)**: Kalkulasi instan SQL/TypeScript untuk menyeleksi 20 kandidat profesi & jurusan terbaik.
- **Layer 2 (LLM Personalizer)**: Integrasi server-side ke Google Gemini API (`gemini-2.5-flash` Free Tier) untuk membuat rekomendasi terpersonalisasi 5-8 item dengan *structured JSON reasoning*, dilengkapi zero-cost fallback engine.

---

## 4. Spesifikasi Teknis Algoritma Kalkulasi MBTI & RIASEC

Kuis MBTI Profesia menggunakan **Skala Likert 5-Poin** (50 pernyataan, 10 soal per dimensi) untuk mengukur 5 dimensi kepribadian:
1. **Mind ($E/I$)**: Extraverted vs Introverted
2. **Energy ($S/N$)**: Observant/Sensing vs Intuitive
3. **Nature ($T/F$)**: Thinking vs Feeling
4. **Tactics ($JP$)**: Judging vs Prospecting/Perceiving
5. **Identity ($AT$)**: Assertive ($-A$) vs Turbulent ($-T$)

Kuis RIASEC mengukur 6 dimensi Holland Code (36 pernyataan):
1. **Realistic (R)**: Praktis, teknis, fisik.
2. **Investigative (I)**: Analitis, ilmiah, penyelesaian masalah.
3. **Artistic (A)**: Kreatif, ekspresif, mendesain.
4. **Social (S)**: Mengedukasi, membantu, berinteraksi sosial.
5. **Enterprising (E)**: Memimpin, persuasi, bisnis.
6. **Conventional (C)**: Terstruktur, administratif, manajemen data.

---

## 5. Database Architecture & Complete SQL DDL Schema

Tabel `zodiacs`, `majors`, `major_professions`, `major_mbti_fit`, `major_riasec_fit`, `riasec_results`, dan `recommendations` ditambahkan ke skema PostgreSQL Supabase (`supabase/schema.sql`).

> **Catatan Tipe**: Tabel `professions` dan `mbti_results` menggunakan `id SERIAL` (INTEGER), bukan UUID, sesuai skema aktual.

```sql
-- 10. TABLE: zodiacs
CREATE TABLE IF NOT EXISTS public.zodiacs (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,        -- e.g. "leo"
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  symbol TEXT NOT NULL,
  dates_id TEXT NOT NULL,
  dates_en TEXT NOT NULL,
  element_id TEXT NOT NULL,
  element_en TEXT NOT NULL,
  element_color TEXT NOT NULL,
  traits_id TEXT[] NOT NULL DEFAULT '{}',
  traits_en TEXT[] NOT NULL DEFAULT '{}',
  career_summary_id TEXT NOT NULL,
  career_summary_en TEXT NOT NULL
);

-- 11. TABLE: zodiac_profession_matches
CREATE TABLE IF NOT EXISTS public.zodiac_profession_matches (
  zodiac_id INTEGER REFERENCES public.zodiacs(id) ON DELETE CASCADE,
  profession_id INTEGER REFERENCES public.professions(id) ON DELETE CASCADE,
  PRIMARY KEY (zodiac_id, profession_id)
);

-- 12. TABLE: majors
CREATE TABLE IF NOT EXISTS public.majors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_id TEXT,
  description_en TEXT,
  category TEXT,              -- 'Saintek' / 'Soshum' / 'Seni'
  typical_subjects_id TEXT[] DEFAULT '{}',
  typical_subjects_en TEXT[] DEFAULT '{}',
  min_education_level TEXT DEFAULT 'S1',
  avg_duration_years NUMERIC DEFAULT 4,
  career_prospect TEXT CHECK (career_prospect IN ('High', 'Medium', 'Low')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 13. TABLE: major_professions
CREATE TABLE IF NOT EXISTS public.major_professions (
  major_id UUID REFERENCES public.majors(id) ON DELETE CASCADE,
  profession_id UUID REFERENCES public.professions(id) ON DELETE CASCADE,
  relevance_score INT CHECK (relevance_score BETWEEN 0 AND 100),
  PRIMARY KEY (major_id, profession_id)
);

-- 14. TABLE: major_mbti_fit
CREATE TABLE IF NOT EXISTS public.major_mbti_fit (
  major_id UUID REFERENCES public.majors(id) ON DELETE CASCADE,
  mbti_type TEXT NOT NULL,
  fit_score INT CHECK (fit_score BETWEEN 0 AND 100),
  reasoning_id TEXT,
  reasoning_en TEXT,
  PRIMARY KEY (major_id, mbti_type)
);

-- 15. TABLE: riasec_results
CREATE TABLE IF NOT EXISTS public.riasec_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  realistic INT CHECK (realistic BETWEEN 0 AND 100),
  investigative INT CHECK (investigative BETWEEN 0 AND 100),
  artistic INT CHECK (artistic BETWEEN 0 AND 100),
  social INT CHECK (social BETWEEN 0 AND 100),
  enterprising INT CHECK (enterprising BETWEEN 0 AND 100),
  conventional INT CHECK (conventional BETWEEN 0 AND 100),
  top_3_code TEXT,          -- e.g. 'IAS'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 17. TABLE: major_riasec_fit
CREATE TABLE IF NOT EXISTS public.major_riasec_fit (
  major_id UUID REFERENCES public.majors(id) ON DELETE CASCADE,
  riasec_code TEXT NOT NULL CHECK (riasec_code IN ('R', 'I', 'A', 'S', 'E', 'C')),
  fit_score INT CHECK (fit_score BETWEEN 0 AND 100),
  reasoning_id TEXT,
  reasoning_en TEXT,
  PRIMARY KEY (major_id, riasec_code)
);

-- 18. TABLE: recommendations
CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  mbti_result_id INTEGER REFERENCES public.mbti_results(id) ON DELETE SET NULL,
  riasec_result_id UUID REFERENCES public.riasec_results(id) ON DELETE SET NULL,
  locale TEXT NOT NULL DEFAULT 'id',
  result JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 6. QA Verification Matrix & Automated Checks

- **TypeScript Strict Validation**: `npx tsc --noEmit` (Must pass with 0 errors).
- **ESLint Code Quality**: `npm run lint` (Must pass with 0 warnings/errors).
- **Production Build Check**: `npm run build` (Static and dynamic route generation must succeed).
