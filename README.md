# Profesia

**Platform Eksplorasi Karir, Psikometri MBTI (16Personalities Style), RIASEC Holland Code & Navigasi Kosmis Zodiak**

[![Live Demo](https://img.shields.io/badge/Live_Demo-profesia--app.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://profesia-app.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

🌐 **URL Produksi Resmi:** [https://profesia-app.vercel.app](https://profesia-app.vercel.app)

Profesia adalah platform web bilingual (Indonesia/English) mutakhir yang memadukan penemuan karir berbasis sains psikometri (**MBTI 16Personalities** & **RIASEC Holland Code**) dengan eksplorasi arketipe kosmis (**Astrolabe 12 Zodiak & Observatorium Konstelasi Langit**), ditenagai rekomendasi cerdas AI Google Gemini.

---

## 🌟 Informasi Fitur Unggulan

### 1. Katalog Eksplorasi Profesi & Informasi Detail (Terstandarisasi O*NET)
Katalog pekerjaan modern dengan pendekatan eksplorasi bersih (*distraction-free exploration*):
- **Kartu Eksplorasi Bersih (`/professions`)**: Menampilkan nama profesi, rumpun industri, deskripsi esensial, dan badge MBTI dengan kode warna resmi 4 rumpun peran. Indikator gaji dan prospek disembunyikan di halaman depan agar pengguna fokus mengenali ragam karir baru tanpa bias materi.
- **Halaman Detail Komprehensif (`/professions/[slug]`)**: Menyajikan metrik mendalam:
  - **Practitioner Spotlight Card**: Kartu visual foto praktisi pekerja nyata dari Unsplash di hero section yang menampilkan lingkungan kerja dan profesi yang sedang dijalankan.
  - **Estimasi Gaji Realistis**: Rentang estimasi gaji minimum & maksimum (IDR/bulan).
  - **Syarat Pendidikan & Skill**: Kualifikasi akademik dan daftar *hard skills* & *soft skills* utama.
  - **Jalur Karir (Career Path)**: Visual timeline jenjang karir dari entry-level hingga executive.
  - **Lingkungan Kerja & Work-Life Balance**: Fleksibilitas kerja (Remote/Hybrid/WFO) dan rating WLB bintang 1-5.
  - **Matriks Kecocokan MBTI**: Alasan psikologis mengapa kepribadian tertentu unggul dalam profesi tersebut.

### 2. Standarisasi Data Karir Berbasis Taksonomi O*NET-SOC
Seluruh 50+ profesi dalam sistem Profesia distandarisasi menggunakan taksonomi ketenagakerjaan resmi **O*NET (Occupational Information Network)** dari U.S. Department of Labor:
- **O*NET-SOC Code**: Setiap profesi memiliki kode klasifikasi baku (misal `15-1252.00` untuk Software Engineer, `29-1216.00` untuk Dokter Umum, `27-1024.00` untuk Graphic Designer).
- **Pemetaan Holland Code (RIASEC)**: Kode orientasi minat vokasional 3 huruf (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) yang terhubung langsung dengan engine rekomendasi psikometri.
- **Bilingual Taxonomy**: Nama, deskripsi, skill, dan jalur karir tersedia lengkap dalam Bahasa Indonesia dan English.
- **Script Otomasi Importer**: Dilengkapi script fleksibel (`scripts/import-onet-professions.mjs`) untuk validasi, auto-backup, dan sinkronisasi instan ke JSON dan Supabase SQL.

### 3. Kuis MBTI Interaktif Gaya 16Personalities (50 Pernyataan Likert Scale)
Kuis psikometri kepribadian dengan 50 pernyataan berbasis **Skala Likert 5-Poin** (*Sangat Setuju* hingga *Sangat Tidak Setuju*) yang mengukur 5 dimensi kepribadian:
- **Mind ($E / I$)** — *Extraverted vs Introverted* (Fokus sosial & sumber energi)
- **Energy ($S / N$)** — *Observant/Sensing vs Intuitive* (Cara mengolah informasi & realitas)
- **Nature ($T / F$)** — *Thinking vs Feeling* (Dasar pengambilan keputusan & evaluasi emosional)
- **Tactics ($J / P$)** — *Judging vs Prospecting/Perceiving* (Gaya kerja & pendekatan perencanaan)
- **Identity ($-A / -T$)** — *Assertive vs Turbulent* (Ketahanan diri & toleransi terhadap stres)

### 4. 4 Rumpun Kepribadian (Role Groups) & Visual Styling
Menyajikan 16 tipe MBTI dalam 4 kelompok resmi bergaya 16Personalities:
- 💜 **Analis (Analysts)** — INTJ, INTP, ENTJ, ENTP *(Warna Ungu/Purple)*
- 💚 **Diplomat (Diplomats)** — INFJ, INFP, ENFJ, ENFP *(Warna Hijau/Emerald)*
- 💙 **Sentinel (Sentinels)** — ISTJ, ISFJ, ESTJ, ESFJ *(Warna Biru/Sky)*
- 💛 **Penjelajah (Explorers)** — ISTP, ISFP, ESTP, ESFP *(Warna Kuning/Amber)*

### 5. Engine Rekomendasi Karir Berbasis MBTI & Varian Identitas (-A / -T)
Setelah menyelesaikan kuis, pengguna akan mendapatkan:
- Kode hasil 5 huruf (contoh: `INTJ-A`, `ENFP-T`).
- Grafik persentase breakdown 5 dimensi kepribadian.
- Penjelasan gaya kerja, kekuatan (*strengths*), dan kelemahan (*weaknesses*).
- Daftar profesi yang cocok beserta skor kecocokan (%) dan alasan psikologisnya.

### 6. Search & 4-Column Multi-Filter Terintegrasi
Pencarian dan penyaringan cepat di halaman katalog `/professions` berbasis 4 dimensi eksplorasi:
- **Pencarian Bebas**: Kata kunci nama profesi, deskripsi, atau keahlian (skills) dalam ID/EN.
- **Kategori Industri**: Pilihan 5 rumpun (Teknologi, Kesehatan, Seni & Desain, Pemasaran, Pendidikan).
- **Dimensi Minat RIASEC**: Filter langsung tipe Holland (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).
- **Rumpun & 16 Tipe MBTI**: Filter cepat kepribadian dengan warna tema kelompok peran.
- **Tingkat Pendidikan**: Filter kualifikasi akademik (SMA/SMK, D3, S1, S2, Profesi).
- **Sorting Presisi**: Urutan Nama (A-Z) dan Keseimbangan Hidup-Kerja (Work-Life Balance).

### 7. Tool Komparasi Profesi Side-by-Side
Fitur untuk membandingkan 2 profesi secara berdampingan dalam tabel komparatif lengkap dengan visualisasi *Radar Chart* dan link yang dapat dibagikan (*shareable URL*).

### 8. Bookmark Profesi & Dashboard Pengguna
- **Bookmark**: Pengguna dapat menyimpan profesi favorit ke daftar bookmark pribadi.
- **Profil User**: Menampilkan tipe MBTI aktif, zodiak pilihan, riwayat tes MBTI sebelumnya, daftar bookmark, dan pengaturan profil.

### 9. Dual Bahasa (Bilingual ID / EN)
Dukungan penuh dua bahasa (Bahasa Indonesia & English) pada seluruh interface UI dan database konten profesi dengan toggle switcher yang mulus tanpa *full page reload*.

### 10. Shareable MBTI Result Card (Viral Story Card)
Kartu visual ringkasan hasil MBTI dan profesi rekomendasi yang dirancang estetik dengan identitas visual modern khas Profesia (*Instagram Story & LinkedIn ready*), memungkinkan pengguna mengunduh atau membagikan hasil tes ke media sosial.

### 11. Auto-Save Progress Kuis MBTI (Draf Kuis Persistent)
Sistem penyimpanan otomatis draf jawaban kuis 50 soal di *Local Storage*. Pengguna tidak perlu khawatir kehilangan progres kuis jika terjadi gangguan koneksi atau refresh halaman secara tidak sengaja.

### 12. Cosmic Career Astrolabe & Observatorium Konstelasi Langit
Modul astrologi karir mutakhir (`/zodiac`) yang dilengkapi:
- **Interactive Pinned Astrolabe**: Roda orbit 12 zodiak interaktif yang berputar halus saat di-scroll atau diklik, bertengger di atas citra tangan emas kosmis (*Golden Hand in the Shadows*) dan dihiasi medallion talisman 3D celestial custom.
- **Constellation Sky Canvas**: Visualisasi garis rasi bintang astronomis resmi IAU yang presisi dengan filter glow elemental.
- **Constellation Observatory Modal**: Modal planetarium layar penuh untuk mengamati rasi bintang dalam skala besar, dilengkapi toggle siluet arketipe mitologis, cincin koordinat kubah langit, serta inspektur bintang interaktif untuk melihat peran anatomis setiap bintang.
- **Dossier Blueprint Karir**: Rekomendasi profesi terpilih yang selaras dengan kecenderungan alami dan energi masing-masing zodiak.

### 13. Modul Jurusan Kuliah (O*NET CIP Majors & Study Programs Explorer)
Halaman katalog jurusan kuliah (`/majors`) berstandar global dengan klasifikasi resmi **O*NET CIP (*Classification of Instructional Programs*)** dari U.S. National Center for Education Statistics (NCES):
- **Katalog 64 Program Studi Komprehensif**: Terbagi rapi ke dalam 3 rumpun keilmuan perguruan tinggi Indonesia:
  - **Saintek (Sains & Teknologi)**: Informatika, Rekayasa AI, Sains Data, Keamanan Siber, Blockchain, Teknik Sipil, Mesin, Elektro, Biomedis, Kedokteran, Farmasi, Keperawatan, Gizi, Bioteknologi, Aktuaria, dll.
  - **Soshum (Sosial & Humaniora)**: Bisnis Internasional, Manajemen, Akuntansi, Keuangan, Pemasaran Digital, SDM, Psikologi, Hukum, Komunikasi, Hubungan Internasional, Hubungan Masyarakat (PR), Pendidikan Guru, dll.
  - **Seni & Desain**: Desain Komunikasi Visual (DKV), Desain Produk, Desain Interior, Animasi 3D & VFX, Sinematografi, Fotografi Komersial, Desain Mode, Desain Game UI/UX, Seni Musik, dll.
- **Paginasi Kompak 12 Kartu per Halaman**: Navigasi halaman ringan dan cepat dengan penomoran elipsis (`1, 2, 3 ... 6`), sinkronisasi URL (`?page=2`), status bar jumlah hasil (*"Menampilkan 1–12 dari 64 jurusan"*), serta auto-scroll kembali ke atas grid.
- **Provenance Akademik & Minat Vokasional**: Setiap kartu jurusan menampilkan badge kode resmi **CIP Code** (misal `CIP 11.0701`) dan badge **Holland RIASEC Code** (misal `IRC`).
- **Penyelarasan Warna Identitas MBTI**: Chip MBTI pada kartu dan halaman detail secara dinamis mengikuti palet resmi 4 kelompok peran (Analis ungu, Diplomat hijau zamrud, Sentinel biru langit, Penjelajah kuning amber) sesuai standar `DESIGN.md`.
- **Relasi Dua Arah (Bidirectional Cross-link)**: Setiap jurusan terhubung langsung dengan profesi O*NET yang relevan (`matched_professions_slugs`) dan sebaliknya.
- **Halaman Detail Jurusan (`/majors/[slug]`)**: Menampilkan silabus 5 mata kuliah inti bilingual (ID/EN), jenjang pendidikan (S1/D4/Profesi), estimasi durasi studi, dan kartu profesi terkait yang dapat langsung dieksplorasi.

### 14. Integrasi Psikometri RIASEC (Holland Code 6 Dimensions)
Modul tes psikometri vokasional terpisah (36 pernyataan Likert) yang mengukur 6 dimensi Holland (*Realistic, Investigative, Artistic, Social, Enterprising, Conventional*) untuk kalkulasi rekomendasi karir yang presisi.

### 15. Engine Rekomendasi Karir Berbasis AI (2-Layer Hybrid Gemini Free Tier)
Engine rekomendasi 2-layer yang menggabungkan kalkulasi deterministik ($\text{RIASEC} \times 0.6 + \text{MBTI} \times 0.4$) dengan personalisasi AI terintegrasi **Google Gemini Flash Free Tier** untuk menghasilkan penalaran psikologis terpersonalisasi, dilengkapi validasi skema JSON dan *zero-cost fallback engine* otomatis jika API key tidak tersedia.

---

## 🛠️ Tech Stack & Alat Pengembangan

| Layer | Teknologi | Versi / Keterangan |
|---|---|---|
| **Deployment** | Vercel | [Live Production](https://profesia-app.vercel.app) |
| **Framework** | Next.js (App Router) | `16.x` (Turbopack) |
| **UI Library** | React / React DOM | `19.x` |
| **Styling** | Tailwind CSS (PostCSS) | `v4` |
| **Bahasa** | TypeScript | `^5` (strict mode) |
| **Motion & Animation** | GSAP & @gsap/react | `3.15.x` (ScrollTrigger, Pinning, Scrubbing) |
| **3D Graphics** | Three.js & React Three Fiber | `three`, `@react-three/fiber`, `@react-three/drei` |
| **Smooth Scrolling** | Lenis | `^1.3.x` |
| **AI Intelligence** | Google Gemini Flash | Gemini API (Layer 2 Personalizer) |
| **Database & Auth** | Supabase PostgreSQL + Supabase Auth | `@supabase/ssr` / `@supabase/supabase-js` |
| **Internationalization** | `next-intl` | `^4.x` (Bilingual ID / EN) |
| **Icons** | Lucide React | Latest |
| **Charts** | Recharts | Latest |
| **Toast Notification** | Sonner | Latest |

---

## 🚀 Panduan Pengembang (Developer Setup)

### 1. Prasyarat
- **Node.js**: versi `20.x` atau lebih baru
- **npm** (atau `pnpm` / `bun`)
- Project Supabase aktif dengan URL, anon key, dan service role key server-only

### 2. Instalasi & Setup Lokal

```bash
# 1. Clone repository
git clone https://github.com/TinoNurcahya/profesia.git
cd profesia

# 2. Install dependencies
npm install

# 3. Buat file lingkungan (.env.local)
cp .env.example .env.local

# 4. Jalankan supabase/schema.sql melalui Supabase SQL Editor atau migration workflow
```

### 3. Menjalankan Perintah Utama

```bash
# Menjalankan Development Server (http://localhost:3000)
npm run dev

# Memeriksa Type Safety (TypeScript Check)
npx tsc --noEmit

# Memeriksa Linter (ESLint)
npm run lint

# Kompilasi Production Build
npm run build

# Menjalankan Server Production
npm run start
```

### 4. Manajemen Data & Pipeline Otomasi O*NET

Profesia dilengkapi pipeline CLI otomatis untuk memvalidasi, menstandarisasi, dan memperbarui data profesi O*NET serta program studi perguruan tinggi O*NET CIP:

```bash
# 1. Menjalankan standarisasi & update data/professions-seed.json + migrasi SQL profesi
node scripts/import-onet-professions.mjs

# 2. Menjalankan standarisasi & update 64 jurusan data/majors.json + migrasi SQL 0009_majors_schema.sql
node scripts/import-onet-majors.mjs

# 3. Mengimpor dataset kustom dari file eksternal
node scripts/import-onet-professions.mjs --input=path/to/custom-professions.json

# 4. Dry-run untuk simulasi validasi tanpa menulis file
node scripts/import-onet-professions.mjs --dry-run

# 5. Menjalankan uji integritas domain & skema data
node scripts/domain-tests.mjs

# 6. Memeriksa keselarasan kamus i18n bilingual (ID / EN)
node scripts/check-i18n.mjs
```

**Alur Kerja Otomasi:**
1. **Validasi Skema**: Memastikan setiap profesi dan jurusan memiliki kode klasifikasi baku (O*NET-SOC & O*NET-CIP), kode Holland RIASEC valid (R/I/A/S/E/C), serta relasi MBTI yang presisi.
2. **Auto-Backup**: Membuat salinan cadangan instan ke `data/professions-seed.json.backup.json`.
3. **Pembaruan JSON Lokal**: Menyimpan dataset terverifikasi ke `data/professions-seed.json` dan `data/majors.json` untuk rendering offline/lokal (*zero-cost resilience*).
4. **Auto-Generate SQL Migration**: Menghasilkan script SQL `supabase/migrations/0008_onet_seed.sql` dan `supabase/migrations/0009_majors_schema.sql` lengkap dengan Row-Level Security (RLS) dan query upsert yang siap disinkronkan ke Supabase PostgreSQL.

---

## 📁 Struktur Direktori Proyek

```text
profesia/
├── app/
│   ├── api/
│   │   └── recommendations/
│   │       └── generate/
│   │           └── route.ts          # API Route: 2-Layer AI Recommendation Handler
│   └── [locale]/                     # Dynamic Locale Routing (/id, /en)
│       ├── (auth)/                   # Route Group: Auth (login, register)
│       ├── professions/              # Katalog Eksplorasi Bersih & Multi-Filter
│       │   ├── compare/              # Tool Komparasi Side-by-Side
│       │   └── [slug]/               # Detail Profesi & Hero Practitioner Spotlight
│       ├── mbti/                     # Landing MBTI & Grid 4 Rumpun
│       │   ├── test/                 # Kuis Likert Scale 50 Soal
│       │   └── result/[type]/        # Halaman Hasil & Dimensi MBTI
│       ├── riasec/                   # Landing RIASEC Holland Code
│       │   ├── test/                 # Kuis Likert Scale 36 Soal
│       │   └── result/               # Halaman Hasil & Kode Holland
│       ├── zodiac/                   # Landing 12 Zodiak
│       │   └── [slug]/               # Detail Zodiak & Profesi Cocok
│       ├── majors/                   # Katalog 64 Jurusan Kuliah O*NET CIP (Paginasi 12 kartu)
│       │   └── [slug]/               # Detail Jurusan & Cross-Link Profesi
│       ├── profile/                  # Dashboard Profil User & Bookmark
│       ├── admin/                    # Admin Panel CMS (protected is_admin())
│       ├── globals.css               # Tailwind v4 theme & global styles
│       ├── layout.tsx                # Root layout with fonts & providers
│       └── page.tsx                  # Landing Page utama
├── components/
│   ├── layout/                       # Navbar, Footer, LanguageSwitcher, ThemeScript
│   ├── motion/                       # DimensionCanvas3D, KineticSplitText, ScrollProgressBar, TextReveal
│   ├── major/                        # MajorCard (glassmorphic, CIP badge, RIASEC & MBTI role colors)
│   ├── profession/                   # ProfessionCard, FilterBar, PractitionerSpotlightCard, SalaryChart, CareerPathTimeline
│   ├── mbti/                         # ShareCard, DimensionChart, QuizCard, ProgressBar, ResultCard, StoryChapters
│   ├── riasec/                       # HollandHexagonRadar, HollandHexagonStoryboard, HollandSynergyExplorer
│   ├── zodiac/                       # ZodiacAstrolabePinned, ZodiacConstellationSvg, ConstellationObservatoryModal
│   └── ui/                           # Button, Modal, Skeleton, Toast, Badge primitives
├── scripts/                          # Otomasi & Pipeline Data
│   ├── import-onet-professions.mjs   # O*NET taxonomy importer, validator & SQL migration generator
│   ├── import-onet-majors.mjs        # O*NET CIP 64 majors importer & SQL migration generator
│   ├── generate-profession-seed.mjs  # SQL seed generator fallback
│   ├── domain-tests.mjs              # Integrity & domain test runner
│   └── check-i18n.mjs                # Bilingual dictionary parity validator
├── services/                         # Data access and business logic
│   ├── professions.ts                # Profession queries, hybrid Supabase/Seed & filters
│   ├── riasecService.ts              # RIASEC scoring & Holland Code
│   ├── majorService.ts               # Majors catalog queries (Supabase + fallback)
│   ├── majorFilter.ts                # Client-safe pure major filtering logic
│   ├── recommendationService.ts      # Layer 1 deterministic scoring
│   └── aiService.ts                  # Layer 2 Gemini LLM personalizer
├── data/                             # Static seed JSON & Constellations (fallback & dev)
│   ├── constellationsData.ts         # 12 Zodiac IAU stars, coordinates & mythology
│   ├── professions-seed.json         # Master 54 O*NET standardized professions
│   ├── professions-seed.json.backup.json
│   ├── mbti-questions.json
│   ├── mbti-types.json
│   ├── riasec-questions.json
│   ├── zodiacs.json
│   └── majors.json                   # Master 64 O*NET CIP standardized majors
├── messages/                         # Translation files (id.json, en.json)
├── lib/
│   ├── mbti.ts                       # Unified MBTI role group palettes & badge helpers
│   └── supabase/                     # Supabase server and middleware clients
├── app/api/auth/                     # Login, register, logout API routes
├── supabase/
│   ├── schema.sql                    # PostgreSQL schema, RLS, dan auth trigger
│   └── migrations/                   # Database migrations (0001 - 0009_majors_schema.sql)
├── i18n/                             # next-intl request handler
├── PRD.md                            # Technical PRD & SQL Schema Spec
└── README.md                         # Developer Guide & Feature Info (file ini)
```

---

## 📝 Lisensi

MIT License © 2026 Profesia Team
