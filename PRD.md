# Technical Product Requirement Document (PRD) - Profesia

**Spesifikasi Teknis, Arsitektur Sistem, Skema Kode, & Algoritma Database**

---

## 1. Dokumen Kontrol & Ringkasan Arsitektur Sistem

| Parameter Teknis | Spesifikasi Produksi |
|---|---|
| **Nama Proyek** | Profesia (Platform Informasi Karir & MBTI) |
| **Document Type** | Technical & Code Specifications PRD |
| **Status** | Production Technical Spec v1.1.0 |
| **Framework Web** | Next.js 16.x / 15.x (App Router, React Server Components / RSC) |
| **UI & Style System** | Tailwind CSS v4 (`@theme inline`), PostCSS, Lucide React, Recharts |
| **Backend & DB** | Supabase (PostgreSQL 15+, Auth Service, Storage, Row Level Security) |
| **Internasionalisasi** | `next-intl` (Locale Prefix Routing `/id` dan `/en`) |
| **Linting & Types** | TypeScript 5.x Strict Mode, ESLint v9 (`eslint-config-next`) |

### 1.1 Diagram Arsitektur Data & Alur Request
```text
[ Browser Client / User ]
       │
       ▼  (HTTP / HTTPS Request with Locale Cookie)
[ Next.js 16 Middleware & Proxy (proxy.ts) ]
       │  ├─► next-intl: Resolve Locale (/id atau /en)
       │  └─► Supabase Auth: Refresh Cookie Session Token
       ▼
[ App Router Layout & Pages ([locale]) ]
       │  ├─► Server Components (RSC): Direct Query Supabase Server Client
       │  └─► Client Components ('use client'): React Hooks & Interactive State
       ▼
[ Supabase Backend Service ]
       │  ├─► PostgreSQL Database (Tables + Indexes)
       │  ├─► Security Layer: Row Level Security (RLS Policies)
       │  └─► Helper Function: public.is_admin() & public.handle_new_user()
```

---

## 2. Persyaratan Fungsional Detail & Spesifikasi Modul (F-01 s/d F-10)

### F-01: System i18n & Localization
Routing dua bahasa (`/id` dan `/en`) via `next-intl` dengan language switcher tanpa full reload.

### F-02: Authentication & User Profile Management
Supabase Auth (Email + Password), pemisahan profil publik (`profiles`) dan privat (`private_profiles`), serta riwayat kuis.

### F-03: Katalog Profesi, Advanced Filtering & MBTI Quick-Filter
- Pencarian kata kunci realtime, multi-kategori, range gaji, pendidikan, dan prospek.
- **MBTI Quick-Filter**: Filter khusus untuk menampilkan profesi yang cocok bagi tipe MBTI tertentu (contoh: `?mbti=INTJ`).

### F-04: Detail Profesi & Data Analytics
Halaman detail berbasis slug dengan visualisasi Bar Chart Gaji (Recharts), Career Path Timeline, dan daftar MBTI cocok.

### F-05: Modul Kuis MBTI Interaktif & Auto-Save State
- 40 Pertanyaan psikometri (10 per dimensi).
- **Auto-Save State**: Progres kuis secara otomatis tersimpan di `localStorage` (`profesia_quiz_draft`) agar tidak hilang jika terjadi gangguan koneksi atau refresh halaman.

### F-06: Algoritma Scoring & Halaman Hasil MBTI
Kalkulasi presisi 4 dimensi ($E/I, S/N, T/F, J/P$), persentase kecenderungan, dan rekomendasi profesi cocok dari tabel `mbti_profession_matches`.

### F-07: Tool Komparasi Profesi Side-by-Side
Komparasi 2 profesi secara berdampingan dengan Radar Chart dan *shareable URL parameters*.

### F-08: Bookmark & Saved Careers
Fitur simpan profesi ke tabel `bookmarks` pengguna terautentikasi via Supabase RLS.

### F-09: Admin Panel CMS Platform
CMS terproteksi fungsi `is_admin()` untuk CRUD Profesi, Kategori, Bank Soal MBTI, dan Pengguna.

### F-10: Shareable MBTI Result Card Generator (Social Story Card)
Komponen `ShareCard` yang memungkinkan pengguna mengekspor kartu visual ringkasan hasil MBTI & profesi cocoknya dalam format gambar/canvas (format rasio 9:16 untuk Instagram Story / LinkedIn).

---

## 3. Spesifikasi Teknis Algoritma Kalkulasi MBTI

Kuis MBTI Profesia terdiri dari 40 pertanyaan yang terbagi rata ke dalam 4 dimensi (10 pertanyaan per dimensi):
1. **Dimension $EI$**: Extraversion ($E$) vs Introversion ($I$)
2. **Dimension $SN$**: Sensing ($S$) vs Intuition ($N$)
3. **Dimension $TF$**: Thinking ($T$) vs Feeling ($F$)
4. **Dimension $JP$**: Judging ($J$) vs Perceiving ($P$)

### 3.1 Formula Matematika Scoring MBTI
Diberikan himpunan jawaban pengguna $A = \{a_1, a_2, \dots, a_{40}\}$ di mana setiap jawaban $a_i$ memilih nilai $v(a_i) \in \{E, I, S, N, T, F, J, P\}$.

Untuk setiap dimensi $D \in \{EI, SN, TF, JP\}$ dengan sub-himpunan soal $Q_D (|Q_D| = 10)$:

$$\text{Score}(E) = \sum_{i \in Q_{EI}} \mathbb{I}(v(a_i) = 'E'), \quad \text{Score}(I) = 10 - \text{Score}(E)$$
$$\text{Score}(S) = \sum_{i \in Q_{SN}} \mathbb{I}(v(a_i) = 'S'), \quad \text{Score}(N) = 10 - \text{Score}(S)$$
$$\text{Score}(T) = \sum_{i \in Q_{TF}} \mathbb{I}(v(a_i) = 'T'), \quad \text{Score}(F) = 10 - \text{Score}(T)$$
$$\text{Score}(J) = \sum_{i \in Q_{JP}} \mathbb{I}(v(a_i) = 'J'), \quad \text{Score}(P) = 10 - \text{Score}(J)$$

### 3.2 Penentuan Huruf Tipe MBTI
Empat huruf tipe MBTI akhir ditentukan oleh nilai mayoritas setiap dimensi:

$$\text{Letter}_1 = \begin{cases} 'E' & \text{jika } \text{Score}(E) \ge \text{Score}(I) \\ 'I' & \text{jika } \text{Score}(I) > \text{Score}(E) \end{cases}$$

$$\text{Letter}_2 = \begin{cases} 'S' & \text{jika } \text{Score}(S) \ge \text{Score}(N) \\ 'N' & \text{jika } \text{Score}(N) > \text{Score}(S) \end{cases}$$

$$\text{Letter}_3 = \begin{cases} 'T' & \text{jika } \text{Score}(T) \ge \text{Score}(F) \\ 'F' & \text{jika } \text{Score}(F) > \text{Score}(T) \end{cases}$$

$$\text{Letter}_4 = \begin{cases} 'J' & \text{jika } \text{Score}(J) \ge \text{Score}(P) \\ 'P' & \text{jika } \text{Score}(P) > \text{Score}(J) \end{cases}$$

$$\text{MBTI Result Code} = \text{Letter}_1 + \text{Letter}_2 + \text{Letter}_3 + \text{Letter}_4$$

---

## 4. Database Architecture & Complete SQL DDL Schema

Berikut adalah script SQL DDL resmi PostgreSQL yang diterapkan di Supabase (tersimpan di `supabase/schema.sql`):

```sql
-- ============================================================================
-- PROFESIA DATABASE SCHEMA & RLS POLICIES
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLE: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  mbti_type TEXT,
  mbti_taken_at TIMESTAMPTZ,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE: private_profiles
CREATE TABLE IF NOT EXISTS public.private_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE: profession_categories
CREATE TABLE IF NOT EXISTS public.profession_categories (
  id SERIAL PRIMARY KEY,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  color TEXT,
  description_id TEXT,
  description_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE: professions
CREATE TABLE IF NOT EXISTS public.professions (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES public.profession_categories(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  salary_min INTEGER NOT NULL DEFAULT 0,
  salary_max INTEGER NOT NULL DEFAULT 0,
  education_id TEXT NOT NULL,
  education_en TEXT NOT NULL,
  skills_id TEXT[] NOT NULL DEFAULT '{}',
  skills_en TEXT[] NOT NULL DEFAULT '{}',
  work_environment_id TEXT,
  work_environment_en TEXT,
  career_path_id TEXT,
  career_path_en TEXT,
  prospects TEXT DEFAULT 'medium' CHECK (prospects IN ('high', 'medium', 'low')),
  work_life_balance INTEGER DEFAULT 3 CHECK (work_life_balance BETWEEN 1 AND 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE: mbti_types
CREATE TABLE IF NOT EXISTS public.mbti_types (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  strengths_id TEXT[] NOT NULL DEFAULT '{}',
  strengths_en TEXT[] NOT NULL DEFAULT '{}',
  weaknesses_id TEXT[] NOT NULL DEFAULT '{}',
  weaknesses_en TEXT[] NOT NULL DEFAULT '{}',
  work_style_id TEXT,
  work_style_en TEXT,
  color TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- 6. TABLE: mbti_profession_matches
CREATE TABLE IF NOT EXISTS public.mbti_profession_matches (
  mbti_type_id INTEGER REFERENCES public.mbti_types(id) ON DELETE CASCADE,
  profession_id INTEGER REFERENCES public.professions(id) ON DELETE CASCADE,
  match_score INTEGER DEFAULT 80 CHECK (match_score BETWEEN 1 AND 100),
  reason_id TEXT,
  reason_en TEXT,
  PRIMARY KEY (mbti_type_id, profession_id)
);

-- 7. TABLE: mbti_questions
CREATE TABLE IF NOT EXISTS public.mbti_questions (
  id SERIAL PRIMARY KEY,
  dimension TEXT NOT NULL CHECK (dimension IN ('EI', 'SN', 'TF', 'JP')),
  question_id TEXT NOT NULL,
  question_en TEXT NOT NULL,
  option_a_id TEXT NOT NULL,
  option_a_en TEXT NOT NULL,
  option_b_id TEXT NOT NULL,
  option_b_en TEXT NOT NULL,
  option_a_value TEXT NOT NULL CHECK (option_a_value IN ('E', 'S', 'T', 'J')),
  option_b_value TEXT NOT NULL CHECK (option_b_value IN ('I', 'N', 'F', 'P')),
  sort_order INTEGER DEFAULT 0
);

-- 8. TABLE: mbti_results
CREATE TABLE IF NOT EXISTS public.mbti_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  result_type TEXT NOT NULL,
  answers JSONB NOT NULL,
  ei_score INTEGER NOT NULL,
  sn_score INTEGER NOT NULL,
  tf_score INTEGER NOT NULL,
  jp_score INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABLE: bookmarks
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  profession_id INTEGER REFERENCES public.professions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, profession_id)
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_professions_category ON public.professions(category_id);
CREATE INDEX IF NOT EXISTS idx_professions_slug ON public.professions(slug);
CREATE INDEX IF NOT EXISTS idx_professions_featured ON public.professions(is_featured);
CREATE INDEX IF NOT EXISTS idx_mbti_results_user ON public.mbti_results(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);

-- SECURITY FUNCTION FOR ADMIN ROLE CHECK
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 5. Keamanan & Row Level Security (RLS) Matrix

Setiap tabel di dalam database dikendalikan oleh kebijakan RLS berikut:

| Tabel | SELECT (Baca) | INSERT (Tambah) | UPDATE (Ubah) | DELETE (Hapus) |
|---|---|---|---|---|
| `profiles` | Public (Semua orang) | Auth User (Milik sendiri) | Auth User (Milik sendiri) | - |
| `private_profiles` | Auth User (Milik sendiri) | Auth User (Milik sendiri) | Auth User (Milik sendiri) | - |
| `profession_categories` | Public (Semua orang) | Admin `is_admin()` | Admin `is_admin()` | Admin `is_admin()` |
| `professions` | Public (Semua orang) | Admin `is_admin()` | Admin `is_admin()` | Admin `is_admin()` |
| `mbti_types` | Public (Semua orang) | Admin `is_admin()` | Admin `is_admin()` | Admin `is_admin()` |
| `mbti_profession_matches` | Public (Semua orang) | Admin `is_admin()` | Admin `is_admin()` | Admin `is_admin()` |
| `mbti_questions` | Public (Semua orang) | Admin `is_admin()` | Admin `is_admin()` | Admin `is_admin()` |
| `mbti_results` | Auth User (Milik sendiri) | Auth User (Milik sendiri) | - | Auth User (Milik sendiri) |
| `bookmarks` | Auth User (Milik sendiri) | Auth User (Milik sendiri) | - | Auth User (Milik sendiri) |

---

## 6. Arsitektur Layer Kode & Interface TypeScript

### 6.1 Main TypeScript Types (`types/index.ts`)
```typescript
export interface Profession {
  id: number;
  category_id: number;
  slug: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  salary_min: number;
  salary_max: number;
  education_id: string;
  education_en: string;
  skills_id: string[];
  skills_en: string[];
  work_environment_id: string;
  work_environment_en: string;
  career_path_id: string;
  career_path_en: string;
  prospects: 'high' | 'medium' | 'low';
  work_life_balance: number;
  image_url: string;
  is_featured: boolean;
  created_at: string;
}

export interface MbtiType {
  id: number;
  code: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  strengths_id: string[];
  strengths_en: string[];
  weaknesses_id: string[];
  weaknesses_en: string[];
  work_style_id: string;
  work_style_en: string;
  color: string;
  icon: string;
}

export interface MbtiQuestion {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  question_id: string;
  question_en: string;
  option_a_id: string;
  option_a_en: string;
  option_b_id: string;
  option_b_en: string;
  option_a_value: 'E' | 'S' | 'T' | 'J';
  option_b_value: 'I' | 'N' | 'F' | 'P';
  sort_order: number;
}
```

---

## 7. Aturan Khusus Next.js 15/16 (`AGENTS.md`)

1. **Dynamic Route Parameters Must Be Awaited**:
   Setiap komponen Halaman (`page.tsx`) atau Route Handler yang menerima `params` atau `searchParams` WAJIB meng-`await` promise tersebut sesuai standar Next.js 15+:
   ```tsx
   export default async function Page({
     params
   }: {
     params: Promise<{ slug: string; locale: string }>
   }) {
     const { slug, locale } = await params;
     return <div>{slug}</div>;
   }
   ```
2. **i18n Translation Hooks**:
   - Di Client Component (`'use client'`), gunakan `useTranslations()` dari `next-intl`.
   - Di Server Component (RSC), gunakan `getTranslations()` dari `next-intl/server`.

---

## 8. QA Verification Matrix & Automated Checks

- **TypeScript Strict Validation**: `npx tsc --noEmit` (Must pass with 0 errors).
- **ESLint Code Quality**: `npm run lint` (Must pass with 0 warnings/errors).
- **Production Build Check**: `npm run build` (Static and dynamic route generation must succeed).
