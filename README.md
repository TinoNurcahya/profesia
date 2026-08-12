# Profesia

**Platform Informasi Karir, Psikometri MBTI (16Personalities Style) & Navigasi Zodiak**

Profesia adalah platform web bilingual (Indonesia/English) yang menyediakan informasi lengkap tentang ratusan profesi, fitur tes kepribadian MBTI interaktif gaya **16Personalities**, dan navigasi karir berbasis Zodiak.

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

### 2. Kuis MBTI Interaktif Gaya 16Personalities (50 Pernyataan Likert Scale)
Kuis psikometri kepribadian dengan 50 pernyataan berbasis **Skala Likert 5-Poin** (*Sangat Setuju* hingga *Sangat Tidak Setuju*) yang mengukur 5 dimensi kepribadian:
- **Mind ($E / I$)** — *Extraverted vs Introverted* (Sifat pikiran & energi sosial)
- **Energy ($S / N$)** — *Observant/Sensing vs Intuitive* (Cara mengolah informasi & realitas)
- **Nature ($T / F$)** — *Thinking vs Feeling* (Pengambilan keputusan & evaluasi emosional)
- **Tactics ($J / P$)** — *Judging vs Prospecting/Perceiving* (Pendekatan kerja & perencanaan)
- **Identity ($-A / -T$)** — *Assertive vs Turbulent* (Tingkat kepercayaan diri & toleransi stres)

### 3. 4 Rumpun Kepribadian (Role Groups) & Visual Styling
Menyajikan 16 tipe MBTI dalam 4 kelompok resmi bergaya 16Personalities:
- 💜 **Analis (Analysts)** — INTJ, INTP, ENTJ, ENTP *(Warna Ungu/Purple)*
- 💚 **Diplomat (Diplomats)** — INFJ, INFP, ENFJ, ENFP *(Warna Hijau/Emerald)*
- 💙 **Sentinel (Sentinels)** — ISTJ, ISFJ, ESTJ, ESFJ *(Warna Biru/Sky)*
- 💛 **Penjelajah (Explorers)** — ISTP, ISFP, ESTP, ESFP *(Warna Kuning/Amber)*

### 4. Engine Rekomendasi Karir Berbasis MBTI & Varian Identitas (-A / -T)
Setelah menyelesaikan kuis, pengguna akan mendapatkan:
- Kode hasil 5 huruf (contoh: `INTJ-A`, `ENFP-T`).
- Grafik persentase breakdown 5 dimensi kepribadian.
- Penjelasan gaya kerja, kekuatan (*strengths*), dan kelemahan (*weaknesses*).
- Daftar profesi yang cocok beserta skor kecocokan (%) dan alasan psikologisnya.

### 5. Search, Multi-Filter & Quick-Filter Rumpun MBTI
Pencarian dan penyaringan cepat di halaman katalog berdasarkan:
- Kata kunci nama profesi atau deskripsi.
- Kategori industri (Kesehatan, Teknologi, Pendidikan, Seni & Desain, Pemasaran, dll).
- **Quick-Filter Rumpun & Tipe MBTI**: Menampilkan profesi yang cocok untuk Rumpun atau Tipe khusus (`?mbti=INTJ`).
- Range gaji (slider min-max).
- Tingkat pendidikan & prospek karir.
- Sorting (Gaji Tertinggi/Terendah, A-Z, Work-Life Balance).

### 6. Tool Komparasi Profesi Side-by-Side
Fitur untuk membandingkan 2 profesi secara berdampingan dalam tabel komparatif lengkap dengan visualisasi *Radar Chart* dan link yang dapat dibagikan (*shareable URL*).

### 7. Bookmark Profesi & Dashboard Pengguna
- **Bookmark**: Pengguna dapat menyimpan profesi favorit ke daftar bookmark pribadi.
- **Profil User**: Menampilkan tipe MBTI aktif, zodiak pilihan, riwayat tes MBTI sebelumnya, daftar bookmark, dan pengaturan profil.

### 8. Dual Bahasa (Bilingual ID / EN)
Dukungan penuh dua bahasa (Bahasa Indonesia & English) pada seluruh interface UI dan database konten profesi dengan toggle switcher yang mulus tanpa *full page reload*.

### 9. Shareable MBTI Result Card (Viral Story Card)
Kartu visual ringkasan hasil MBTI dan profesi rekomendasi yang dirancang estetik bergaya 16Personalities (*Instagram Story & LinkedIn ready*), memungkinkan pengguna mengunduh atau membagikan hasil tes ke media sosial.

### 10. Auto-Save Progress Kuis MBTI (Draf Kuis Persistent)
Sistem penyimpanan otomatis draf jawaban kuis 50 soal di *Local Storage*. Pengguna tidak perlu khawatir kehilangan progres kuis jika terjadi gangguan koneksi atau refresh halaman secara tidak sengaja.

### 11. Navigasi Karir Berdasarkan Zodiak (Zodiac Career Explorer)
Halaman modul khusus (`/zodiac`) yang menampilkan 12 tanda Zodiak (Aries hingga Pisces) lengkap dengan elemen (Api, Tanah, Udara, Air), karakter dominan, dan daftar profesi rekomendasi yang cocok dengan energi zodiak tersebut.

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

---

## 📁 Struktur Direktori Proyek

```text
profesia/
├── app/
│   └── [locale]/                  # Dynamic Locale Routing (/id, /en)
│       ├── (auth)/                # Route Group: Auth (login, register)
│       ├── professions/           # Katalog, detail [slug], & compare
│       ├── mbti/                  # Landing MBTI, kuis /test, & hasil /result/[type]
│       ├── zodiac/                # Landing Zodiak & detail /zodiac/[slug]
│       ├── profile/               # Dashboard profil user & bookmark
│       ├── admin/                 # Admin Panel CMS (protected)
│       ├── globals.css            # Tailwind v4 theme & global styles
│       ├── layout.tsx             # Root layout with fonts & providers
│       └── page.tsx               # Landing Page utama
├── components/
│   ├── layout/                    # Navbar, Footer, LanguageSwitcher, Sidebar
│   ├── profession/                # ProfessionCard, FilterBar, SalaryChart, CareerPath
│   ├── mbti/                      # QuizCard (Likert Scale), ProgressBar, ResultCard, DimensionChart, ShareCard
│   ├── zodiac/                    # ZodiacCard, ZodiacGrid, ZodiacDetail
│   └── ui/                        # Button, Modal, Skeleton, Toast, Badge primitives
├── services/                      # Supabase Data Fetching Layer (Client & Server)
├── data/                          # Static seed JSON (professions, mbti-questions, mbti-types, zodiacs)
├── messages/                      # Translation files (id.json, en.json)
├── supabase/                      # Database Schema DDL & RLS Policies (schema.sql)
├── PRD.md                         # Spesifikasi Teknis & Kode Lengkap (Technical PRD)
└── README.md                      # Panduan Pengembang & Informasi Fitur (File ini)
```

---

## 📝 Lisensi

MIT License © 2026 Profesia Team