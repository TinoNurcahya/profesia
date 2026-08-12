# Sprint & Execution Plan - Profesia

**Dokumen Rencana Sprint, Milestone, User Stories, & Definition of Done (DoD)**

---

## 📅 Rangkuman Milestone & Jadwal Sprint

Platform Profesia dikembangkan dalam **5 Sprint Eksekusi** yang saling berurutan berdasarkan spesifikasi [PRD.md](file:///d:/PORTFOLIO/profesia/PRD.md) dan [README.md](file:///d:/PORTFOLIO/profesia/README.md).

```text
[ Sprint 1: Foundation & Landing Page ] ──► [ Sprint 2: Auth & Katalog Profesi ]
                                                          │
[ Sprint 5: Admin CMS & Deploy ] ◄── [ Sprint 4: Profil & Komparasi ] ◄── [ Sprint 3: Kuis MBTI & Share Card ]
```

| Sprint | Fokus Utama | Target Deliverables | Est. Durasi |
|---|---|---|---|
| **Sprint 1** | Foundation, i18n & Landing Page | App Router Scaffold, Tailwind v4, Schema SQL, i18n ID/EN, Supabase Proxy, Navbar/Footer, Landing Page | Sprint 1 |
| **Sprint 2** | Auth & Katalog Profesi (dengan Filter MBTI) | Supabase Auth, Catalogue Grid, Search, Multi-Filter, MBTI Quick-Filter, Detail Profesi, Salary Chart, Career Timeline | Sprint 2 |
| **Sprint 3** | Kuis MBTI Interaktif & Viral Share Card | 40 Soal MBTI, Auto-Save Draft, Engine Scoring 4 Dimensi, Result Analytics, Recommended Professions, Shareable Story Card | Sprint 3 |
| **Sprint 4** | Profil User, Bookmarks & Tool Komparasi | Bookmark RLS, Dashboard User (Riwayat & Saved), Comparison Side-by-Side Table & Radar Chart | Sprint 4 |
| **Sprint 5** | Admin Panel CMS, SEO & Deploy | Admin Layout (`is_admin()`), CRUD Profesi/Kategori/MBTI, Dynamic SEO Hreflang, Open Graph, QA Audit & Vercel Deploy | Sprint 5 |

---

## 🏃 Detail Tugas & User Stories Per Sprint

### 🔵 Sprint 1: Foundation, Infrastructure & Landing Page

#### Goals & Scope
Membangun fondasi proyek Next.js 16, mengonfigurasi skema database PostgreSQL Supabase, sistem lokalisasi dua bahasa (`next-intl`), serta komponen UI dasar dan Landing Page.

#### User Stories & Task Breakdown
- **[S1-01] Project Scaffolding & Design System**:
  - Konfigurasi TypeScript strict mode, PostCSS, dan Tailwind CSS v4 `@theme inline` di `app/[locale]/globals.css`.
  - Atur warna tema: Primary Indigo-Blue (`#4F46E5`), Accent Amber (`#F59E0B`), dan Dark Mode Slate.
- **[S1-02] i18n Localization Engine**:
  - Buat `i18n/request.ts` untuk menangani locale `/id` dan `/en`.
  - Buat file translasi UI `messages/id.json` dan `messages/en.json`.
- **[S1-03] Supabase Database DDL Script**:
  - Buat dan eksekusi `supabase/schema.sql` untuk 9 tabel (`profiles`, `private_profiles`, `profession_categories`, `professions`, `mbti_types`, `mbti_profession_matches`, `mbti_questions`, `mbti_results`, `bookmarks`).
  - Pasang indeks query, trigger `handle_new_user()`, dan SECURITY DEFINER function `is_admin()`.
- **[S1-04] Supabase Client & Proxy**:
  - Buat helper `utils/supabase/client.ts`, `server.ts`, dan Next.js 16 session proxy `proxy.ts`.
- **[S1-05] Layout & Landing Page Components**:
  - Buat `Navbar.tsx` (dengan `LanguageSwitcher` & mobile menu), `Footer.tsx`.
  - Buat `app/[locale]/page.tsx` (Hero, Stats Bar, Steps "3 Langkah Karir", Featured Professions Grid, dan MBTI CTA).

#### Definition of Done (DoD) Sprint 1
- [x] Website dapat diakses bersih di `localhost:3000/id` dan `localhost:3000/en`.
- [x] Toggle switcher bahasa mengubah teks UI secara instan.
- [x] Script DDL SQL berhasil dijalankan tanpa error di Supabase.

---

### 🟢 Sprint 2: Authentication & Katalog Profesi (dengan Filter MBTI)

#### Goals & Scope
Implementasi autentikasi user, halaman katalog profesi lengkap dengan pencarian, penyaringan multi-kriteria, filter khusus tipe MBTI, dan halaman detail profesi interaktif.

#### User Stories & Task Breakdown
- **[S2-01] Supabase Authentication**:
  - Buat `services/auth.ts` untuk fungsi login, register, dan logout.
  - Buat halaman `app/[locale]/(auth)/login/page.tsx` dan `register/page.tsx` dengan penanganan pesan error via Toast.
- **[S2-02] Data Layer & Seed Ingestion**:
  - Buat definisi interface di `types/index.ts`.
  - Buat `data/professions-seed.json` (~50 profesi awal bilingual) dan service data `services/professions.ts` & `services/professions-server.ts`.
- **[S2-03] Profession Catalog & MBTI Quick-Filter**:
  - Buat halaman `app/[locale]/professions/page.tsx`.
  - Buat `FilterBar.tsx` (Search realtime, Filter Kategori, Slider Range Gaji, Pendidikan, Prospek, dan **MBTI Quick-Filter** `?mbti=INTJ`).
  - Buat `ProfessionCard.tsx` dengan badge prospek dan indicator gaji.
- **[S2-04] Profession Detail Page**:
  - Buat `app/[locale]/professions/[slug]/page.tsx` (Next.js 15+ `await params`).
  - Buat `SalaryChart.tsx` (Visualisasi Bar Chart Gaji Min vs Max dengan Recharts).
  - Buat `CareerPathTimeline.tsx` (Visual timeline jenjang karir).
  - Tampilkan kartu MBTI yang cocok untuk profesi tersebut.

#### Definition of Done (DoD) Sprint 2
- [ ] User bisa mendaftar akun baru dan login.
- [ ] Pengguna dapat mencari profesi dan memfilter berdasarkan gaji, kategori, serta tipe MBTI.
- [ ] Halaman detail profesi menampilkan grafik gaji dan timeline karir secara responsif.

---

### 🟣 Sprint 3: Kuis MBTI Interaktif & Social Share Card

#### Goals & Scope
Membangun modul kuis psikometri MBTI 40 pertanyaan, sistem auto-save draf, algoritma kalkulasi 4 dimensi, halaman hasil analitis, dan generator kartu visual untuk dibagikan ke media sosial.

#### User Stories & Task Breakdown
- **[S3-01] MBTI Master Data**:
  - Buat `data/mbti-questions.json` (40 soal bilingual) dan `data/mbti-types.json` (16 tipe MBTI lengkap).
- **[S3-02] MBTI Intro Page**:
  - Buat `app/[locale]/mbti/page.tsx` dengan `MbtiTypeGrid.tsx` (Grid 4x4 warna & ikon tipe MBTI).
- **[S3-03] Interactive Quiz Engine & Auto-Save**:
  - Buat `app/[locale]/mbti/test/page.tsx` (Interface 1 soal per layar dengan `QuizCard.tsx` & `ProgressBar.tsx`).
  - Pasang **Auto-Save Draft** ke `localStorage` (`profesia_quiz_draft`) agar jawaban tidak hilang saat refresh.
- **[S3-04] Mathematical Scoring Algorithm**:
  - Buat fungsi kalkulasi skor di `services/mbti.ts` sesuai formula matematika PRD ($E/I, S/N, T/F, J/P$).
- **[S3-05] Result Analytics & Recommendations**:
  - Buat `app/[locale]/mbti/result/[type]/page.tsx` dengan `DimensionChart.tsx` (Bar Chart persentase 4 dimensi).
  - Tampilkan gaya kerja, kekuatan, kelemahan, dan rekomendasi profesi cocok dari database relasi.
- **[S3-06] Shareable MBTI Result Card Generator**:
  - Buat komponen `ShareCard.tsx` (Format visual rasio 9:16 untuk Instagram Story / LinkedIn) dengan tombol unduh gambar/bagikan link.

#### Definition of Done (DoD) Sprint 3
- [ ] User dapat menyelesaikan 40 pertanyaan kuis MBTI tanpa bug.
- [ ] Jawaban tersimpan otomatis di draf `localStorage`.
- [ ] Hasil kalkulasi tipe MBTI 100% akurat sesuai norma psikometri.
- [ ] Kartu hasil MBTI dapat diunduh/dibagikan secara estetik.

---

### 🟡 Sprint 4: Profil User, Bookmarks & Tool Komparasi

#### Goals & Scope
Integrasi fitur simpan profesi favorit (bookmark persistent via RLS), dashboard profil pengguna, dan tool perbandingan dua profesi berdampingan dengan Radar Chart.

#### User Stories & Task Breakdown
- **[S4-01] Bookmark Management**:
  - Buat `services/bookmarks.ts` (Toggle Bookmark, Fetch Bookmarks, Check Status).
  - Pasang tombol Heart/Bookmark interaktif pada `ProfessionCard` dan Detail Page.
- **[S4-02] User Profile Dashboard**:
  - Buat `app/[locale]/profile/page.tsx` dengan 3 Tab:
    1. *Active MBTI Result & Dimension Chart*
    2. *Test History List* (`mbti_results`)
    3. *Bookmarked Professions Grid* (`bookmarks`)
- **[S4-03] Profession Side-by-Side Comparison Tool**:
  - Buat `app/[locale]/professions/compare/page.tsx` untuk memilih 2 profesi.
  - Buat `CompareTable.tsx` membandingkan gaji, pendidikan, WLB, prospek, dan skills.
  - Buat visualisasi *Radar Chart* (Recharts) membandingkan variabel kualitatif Profesi A vs Profesi B.
  - Dukung shareable URL params: `?a=dokter-umum&b=programmer`.

#### Definition of Done (DoD) Sprint 4
- [ ] Pengguna login dapat menyimpan dan menghapus bookmark profesi.
- [ ] Profil pengguna menampilkan riwayat tes MBTI dan daftar bookmark secara akurat.
- [ ] Tool komparasi membandingkan 2 profesi secara visual dengan Radar Chart.

---

### 🔴 Sprint 5: Admin Panel CMS, SEO Optimization & Production Deployment

#### Goals & Scope
Membangun panel admin CMS terproteksi, mengoptimalkan SEO dinamis bilingual, menyelesaikan audit QA, dan melakukan *deployment* ke server Vercel.

#### User Stories & Task Breakdown
- **[S5-01] Admin Panel Layout & Security**:
  - Buat `app/[locale]/admin/layout.tsx` dengan sidebar navigasi khusus admin dan proteksi role via `is_admin()`.
- **[S5-02] Admin CMS Management**:
  - `app/[locale]/admin/page.tsx`: Overview statistik platform (Total Profesi, User, Tes Taken).
  - `app/[locale]/admin/professions/page.tsx`: Form CRUD Data Profesi.
  - `app/[locale]/admin/categories/page.tsx`: CRUD Kategori.
  - `app/[locale]/admin/mbti/page.tsx`: Pengelolaan Soal MBTI.
- **[S5-03] SEO, Open Graph & Accessibility Audit**:
  - Tambahkan `generateMetadata()` bilingual dengan `alternates.languages` (Hreflang `id` & `en`).
  - Buat gambar Open Graph `public/og-image.png` (1200x630px).
  - Tambahkan Schema.org JSON-LD (`Occupation` / `JobPosting`).
- **[S5-04] Automated Quality Assurance**:
  - Jalankan `npx tsc --noEmit` (0 errors).
  - Jalankan `npm run lint` (0 errors).
  - Jalankan `npm run build` (Production compilation test).
- **[S5-05] Deployment**:
  - Hubungkan repository GitHub ke Vercel.
  - Set environment variables Supabase di Vercel Dashboard dan luncurkan versi *Live Production*.

#### Definition of Done (DoD) Sprint 5
- [ ] Admin Panel dapat diakses oleh user ber-role admin untuk mengelola data.
- [ ] Seluruh rute memiliki metadata SEO bilingual dan sosial preview gambar.
- [ ] `npm run build` berhasil 100% dan aplikasi berjalan lancar di lingkungan Vercel Production.

---

## 🛡️ Risk Management & Mitigation Matrix

| Potensial Risiko | Dampak | Strategi Mitigasi |
|---|---|---|
| **Stres User Mengisi 40 Soal** | Sedang | UI dibuat 1 soal per layar dengan animasi halus, progress bar transparan, dan fitur Auto-Save draf. |
| **Keterlambatan Loading Data Profesi** | Tinggi | Menggunakan Next.js Server Components (RSC) & Skeleton Loaders pada semua bagian fetch data. |
| **Kerentanan Akses Admin Panel** | Sangat Tinggi | Pengecekan status admin menggunakan fungsi PostgreSQL `is_admin()` dengan *SECURITY DEFINER*, bukan sekadar JWT lokal. |
| **Masalah Routing Locale i18n** | Sedang | Penggunaan proxy Next.js 16 (`proxy.ts`) yang menggabungkan `next-intl` dan Supabase session refresh secara atomik. |

---
*Dokumen Sprint Plan ini menjadi panduan eksekusi bertahap pengembangan platform Profesia.*
