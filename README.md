# Profesia

**Platform Informasi Karir & Kecocokan Kepribadian MBTI**

Profesia adalah platform web bilingual (Indonesia/English) yang menyediakan informasi lengkap tentang ratusan profesi dan fitur tes kepribadian MBTI interaktif untuk mencocokkan pengguna dengan karir yang sesuai.

---

## 🌟 Informasi Fitur Lengkap

### 1. Katalog Profesi & Informasi Detail
Daftar ~50+ jenis pekerjaan (dokter, programmer, desainer, data scientist, dll) lengkap dengan metrik:
- **Deskripsi Pekerjaan**: Gambaran umum dan tanggung jawab harian.
- **Range Gaji Rata-rata**: Estimasi gaji minimum dan maksimum dalam IDR/bulan.
- **Pendidikan Minimum**: Syarat latar belakang pendidikan (SMA, D3, S1, S2, Sertifikasi).
- **Keahlian Utama (Skills)**: Daftar *hard skill* & *soft skill* yang diperlukan.
- **Lingkungan Kerja**: Kondisi kerja (Remote/Hybrid/WFO, startup vs korporat).
- **Jalur Karir (Career Path)**: Visual timeline kenaikan jenjang dari entry-level hingga executive.
- **Prospek Masa Depan**: Indicator prospek industri (*High*, *Medium*, *Low*).
- **Rating Work-Life Balance**: Penilaian keseimbangan hidup-kerja (skala 1-5 bintang).

### 2. Kuis MBTI Interaktif (40 Pertanyaan)
Kuis psikometri kepribadian dengan 40 pertanyaan (10 soal per dimensi) yang menghasilkan salah satu dari 16 tipe MBTI:
- **E / I** — *Extraversion vs Introversion* (Sumber energi & cara berinteraksi)
- **S / N** — *Sensing vs Intuition* (Cara mengolah informasi & realitas)
- **T / F** — *Thinking vs Feeling* (Cara mengambil keputusan & evaluasi)
- **J / P** — *Judging vs Perceiving* (Cara menghadapi dunia luar & struktur)

### 3. Engine Rekomendasi Karir Berbasis MBTI
Setelah menyelesaikan tes, pengguna akan mendapatkan:
- Grafik persentase kecenderungan di 4 dimensi MBTI.
- Penjelasan gaya kerja, kekuatan (*strengths*), dan kelemahan (*weaknesses*).
- Daftar profesi yang cocok beserta skor kecocokan (%) dan alasan psikologisnya.

### 4. Search, Multi-Filter & Sorting Profesi (Termasuk Filter MBTI)
Pencarian dan penyaringan cepat di halaman katalog berdasarkan:
- Kata kunci nama profesi atau deskripsi.
- Kategori industri (Kesehatan, Teknologi, Pendidikan, Seni & Desain, Pemasaran, dll).
- **Filter Khusus Tipe MBTI**: Menampilkan profesi yang paling cocok untuk tipe MBTI tertentu (contoh: *"Fit for INTJ"*).
- Range gaji (slider min-max).
- Tingkat pendidikan & prospek karir.
- Sorting (Gaji Tertinggi/Terendah, A-Z, Work-Life Balance).

### 5. Tool Komparasi Profesi Side-by-Side
Fitur untuk membandingkan 2 profesi secara berdampingan dalam tabel komparatif lengkap dengan visualisasi *Radar Chart* dan link yang dapat dibagikan (*shareable URL*).

### 6. Bookmark Profesi & Dashboard Pengguna
- **Bookmark**: Pengguna dapat menyimpan profesi favorit ke daftar bookmark pribadi.
- **Profil User**: Menampilkan tipe MBTI aktif, riwayat tes MBTI sebelumnya, daftar bookmark, dan pengaturan profil.

### 7. Dual Bahasa (Bilingual ID / EN)
Dukungan penuh dua bahasa (Bahasa Indonesia & English) pada seluruh interface UI dan database konten profesi dengan toggle switcher yang mulus tanpa *full page reload*.

### 8. Admin Panel (CMS)
Panel manajemen untuk pengelola platform:
- Overview statistik platform (total profesi, user, dan tes MBTI).
- Form CRUD (Create, Read, Update, Delete) Data Profesi & Kategori.
- Pengelolaan Bank Soal MBTI & Penyesuaian Skor Kecocokan Karir.

---

## 🚀 Fitur Unggulan Tambahan (Value-Add Features)

### 9. Shareable MBTI Result Card (Viral Story Card)
Kartu visual ringkasan hasil MBTI dan profesi rekomendasi yang dirancang estetik (*Instagram Story & LinkedIn ready*), memungkinkan pengguna mengunduh atau membagikan hasil tes mereka secara mudah ke media sosial.

### 10. Auto-Save Progress Kuis MBTI (Draf Kuis Persistent)
Sistem penyimpanan otomatis draf jawaban kuis di *Local Storage*. Pengguna tidak perlu khawatir kehilangan progres kuis jika terjadi gangguan koneksi atau refresh halaman secara tidak sengaja.

---

## 🛠️ Tech Stack & Alat Pengembangan

| Layer | Teknologi | Versi |
|---|---|---|
| **Framework** | Next.js (App Router) | `15.x / 16.x` |
| **UI Library** | React / React DOM | `19.x` |
| **Styling** | Tailwind CSS (PostCSS) | `v4` |
| **Bahasa** | TypeScript | `^5` (strict) |
| **Database & Auth** | Supabase (PostgreSQL + Auth + RLS) | Latest |
| **Internationalization** | `next-intl` | `^3.x` |
| **Icons** | Lucide React | Latest |
| **Charts** | Recharts | Latest |
| **Toast Notification** | Sonner | Latest |

---

## 🚀 Panduan Pengembang (Developer Setup)

### 1. Prasyarat
- **Node.js**: versi `20.x` atau lebih baru
- **npm** (atau `pnpm` / `bun`)
- Project Supabase aktif (URL & Anon Key)

### 2. Instalasi & Setup Lokal

```bash
# 1. Clone repository
git clone https://github.com/TinoNurcahya/profesia.git
cd profesia

# 2. Install dependencies
npm install

# 3. Buat file lingkungan (.env.local)
cp .env.example .env.local
```

### 3. Konfigurasi Environment Variables (`.env.local`)

Isi file `.env.local` dengan kredensial Supabase milik Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Menjalankan Perintah Utama

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

---

## 📁 Struktur Direktori Proyek

```text
profesia/
├── app/
│   └── [locale]/                  # Dynamic Locale Routing (/id, /en)
│       ├── (auth)/                # Route Group: Auth (login, register)
│       ├── professions/           # Katalog, detail [slug], & compare
│       ├── mbti/                  # Landing MBTI, kuis /test, & hasil /result/[type]
│       ├── profile/               # Dashboard profil user & bookmark
│       ├── admin/                 # Admin Panel CMS (protected)
│       ├── globals.css            # Tailwind v4 theme & global styles
│       ├── layout.tsx             # Root layout with fonts & providers
│       └── page.tsx               # Landing Page utama
├── components/
│   ├── layout/                    # Navbar, Footer, LanguageSwitcher, Sidebar
│   ├── profession/                # ProfessionCard, FilterBar, SalaryChart, CareerPath
│   ├── mbti/                      # QuizCard, ProgressBar, ResultCard, DimensionChart, ShareCard
│   └── ui/                        # Button, Modal, Skeleton, Toast, Badge primitives
├── services/                      # Supabase Data Fetching Layer (Client & Server)
├── data/                          # Static seed JSON (professions, mbti-questions, mbti-types)
├── messages/                      # Translation files (id.json, en.json)
├── supabase/                      # Database Schema DDL & RLS Policies (schema.sql)
├── PRD.md                         # Spesifikasi Teknis & Kode Lengkap (Technical PRD)
└── README.md                      # Panduan Pengembang & Informasi Fitur (File ini)
```

---

## 📄 Spesifikasi Teknis & Kode

Untuk dokumentasi teknis mendalam (Skema Database PostgreSQL SQL DDL, Aturan Row Level Security / RLS, Algoritma Matematika Kalkulasi MBTI, dan Arsitektur Kode), silakan merujuk ke berkas **[PRD.md](file:///d:/PORTFOLIO/profesia/PRD.md)**.

---

## 📝 Lisensi

MIT License © 2026 Profesia Team