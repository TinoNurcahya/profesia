# Technical Product Requirement Document (PRD) - Profesia

**Spesifikasi Teknis, Arsitektur Sistem, Skema Kode, & Algoritma Database (16Personalities & Zodiac Model)**

---

## 1. Dokumen Kontrol & Ringkasan Arsitektur Sistem

| Parameter Teknis | Spesifikasi Produksi |
|---|---|
| **Nama Proyek** | Profesia (Platform Informasi Karir, Psikometri MBTI & Zodiak) |
| **Document Type** | Technical & Code Specifications PRD |
| **Model Psikometri** | Standard 16Personalities Model (5 Dimensi: E/I, S/N, T/F, J/P, A/T) + Zodiac Explorer |
| **Status** | Production Technical Spec v2.1.0 |
| **Framework Web** | Next.js 16.x / 15.x (App Router, React Server Components / RSC) |
| **UI & Style System** | Tailwind CSS v4 (`@theme inline`), PostCSS, Lucide React, Recharts |
| **Backend & DB** | Supabase (PostgreSQL 15+, Auth Service, Storage, Row Level Security) |
| **Internasionalisasi** | `next-intl` (Locale Prefix Routing `/id` dan `/en`) |
| **Linting & Types** | TypeScript 5.x Strict Mode, ESLint v9 (`eslint-config-next`) |

---

## 2. Model Psikometri & 4 Rumpun Kepribadian (16Personalities Standard)

Platform Profesia menerapkan pengelompokan 16 tipe MBTI ke dalam **4 Rumpun Utama (Role Groups)** sesuai standar populer **16personalities.com**:

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

---

## 4. Spesifikasi Teknis Algoritma Kalkulasi MBTI (Likert Scale + 5th Identity Dimension)

Kuis MBTI Profesia menggunakan **Skala Likert 5-Poin** (50 pernyataan, 10 soal per dimensi) untuk mengukur 5 dimensi kepribadian:
1. **Mind ($E/I$)**: Extraverted vs Introverted
2. **Energy ($S/N$)**: Observant/Sensing vs Intuitive
3. **Nature ($T/F$)**: Thinking vs Feeling
4. **Tactics ($JP$)**: Judging vs Prospecting/Perceiving
5. **Identity ($AT$)**: Assertive ($-A$) vs Turbulent ($-T$)

---

## 5. Database Architecture & Complete SQL DDL Schema

Tabel `zodiacs` dan `zodiac_profession_matches` ditambahkan ke skema PostgreSQL Supabase (`supabase/schema.sql`).

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
```

---

## 6. QA Verification Matrix & Automated Checks

- **TypeScript Strict Validation**: `npx tsc --noEmit` (Must pass with 0 errors).
- **ESLint Code Quality**: `npm run lint` (Must pass with 0 warnings/errors).
- **Production Build Check**: `npm run build` (Static and dynamic route generation must succeed).
