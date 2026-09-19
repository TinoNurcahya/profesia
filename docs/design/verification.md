# Profesia — Career Atlas Design Verification

## Verifikasi Final Selesai — 19 September 2026

Pengujian visual, interaksi browser, dan technical quality gates telah diselesaikan secara penuh dan tervalidasi menggunakan `browser_subagent` serta seluruh suite pemeriksaan otomatis. Seluruh bukti visual dan interaksi dicatat dan tersimpan sebagai artifact rekaman dan screenshot.

### 1. Bukti Visual & Spacing (D5)
- **Viewport Desktop (1440×900)**:
  - Homepage Hero (`/id` & `/en`): Judul `atlas-display` ("Kenali dirimu. Buka kemungkinanmu." / "Know yourself. Explore your possibilities.") ter-render seimbang dalam 2 baris tanpa text clipping. Indeks profesi 3 baris terisi data nyata seed.
  - Spacing kumulatif: Mengikuti [DESIGN.md](../../DESIGN.md) secara presisi dengan padding 80px per sisi (160px kumulatif antarchapter).
  - MBTI Hero (`/id/mbti` & `/en/mbti`): Judul `atlas-heading` ("Pahami pola dirimu...") ter-wrap rapi 3 baris. Badge `01 / 16`, kategori `Analis`, avatar karakter INTJ terposisi stabil tanpa shift.
  - Horizontal Overflow: `document.documentElement.scrollWidth === window.innerWidth` (0px horizontal overflow).
- **Viewport Mobile (375×812)**:
  - Homepage Hero: Judul wrap 2 baris natural, tombol "Jelajahi profesi" dan "Kenali dirimu" membungkus fleksibel tanpa pemotongan teks atau overflow.
  - HowItWorks: Transisi ke vertical stack 3 langkah normal tanpa pin spacer yang rusak.
  - MBTI Exploration: Kartu 16 tipe tersusun single-column bersih dengan avatar, tags kekuatan kunci, link profil, dan karier terkait yang mudah ditekan (touch target >= 44px).
  - Horizontal Overflow: `scrollWidth === innerWidth` (0px horizontal overflow).
- **Artifact Visual**:
  - WebP Session Recording: `d5_visual_audit_1789785251547.webp`
  - Screenshot Desktop HP Hero: `desktop_hp_hero_1789785276011.png`
  - Screenshot Mobile HP Hero: `mobile_hp_hero_1789785474186.png`
  - Screenshot Desktop MBTI Hero: `desktop_mbti_hero_1789785410151.png`
  - Screenshot Mobile MBTI Hero: `mobile_mbti_hero_1789785520726.png`
  - Screenshot Desktop Role Groups: `desktop_hp_role_groups_1789785331002.png`
  - Screenshot Desktop Final CTA & Footer: `desktop_hp_footer_1789785367771.png`

### 2. Bukti Interaksi & Alur Pengguna (D4, D6, D7a–D7h)
- **D4 (Scroll & Motion Lifecycle)**:
  - Scrubbing pada pinned story `HowItWorks` di desktop berjalan mulus (scrub 0.5, 3 fase).
  - Navigasi bolak-balik: `/id` → `/id/mbti` → `/id/professions` → Browser Back 2x. Seluruh elemen halaman, state aktif, dan scroll lifecycle terpulihkan bersih tanpa orphan pin atau layar kosong.
- **Navbar & Menu Responsif**:
  - Menu mobile drawer (375px): Tombol hamburger membuka overlay navigasi, tombol close dan tombol keyboard `Escape` menutup drawer dengan pengembalian fokus yang benar.
  - Dropdown "Eksplorasi" (1440px): Menampilkan sub-link (Jurusan, RIASEC, Zodiak, Perbandingan) dan merespons tombol `Escape`.
- **D6 (MBTI Exploration & Finder)**:
  - Input pencarian: Mengetik "INTJ" memfilter katalog secara instan menjadi "1 tipe ditemukan" (INTJ / Arsitek).
  - Aksesibilitas asesmen: Tombol CTA "Mulai Asesmen MBTI" langsung membawa pengguna ke kuis tanpa mengharuskan scroll penuh.
- **D7c (Assessment Flow) & Draft Persistence**:
  - Kuis MBTI (`/id/mbti/test`): Pemilihan opsi Likert otomatis memajukan nomor soal (`Soal 1` → `Soal 2` → `Soal 3` → `Soal 4`).
  - Navigasi mundur soal: Tombol "Sebelumnya" berhasil kembali ke Soal 3 dengan jawaban sebelumnya tetap terpilih.
  - Draft Recovery: Reload browser pada Soal 3 membuktikan pemulihan draft dari `localStorage` bekerja sempurna (`Soal 3 dari 50`, `6% Selesai`).
- **D7d (Result Page)**:
  - Halaman `/id/mbti/result/intj` merender visualisasi 5 dimensi kepribadian, daftar kekuatan, kelemahan, dan rekomendasi gaya kerja alami.
- **D7a & D7b (Katalog Profesi & Compare)**:
  - Pencarian profesi ("Engineer") menyaring katalog menjadi 1 hasil.
  - Halaman detail `/id/professions/software-engineer` merender estimasi gaji, pendidikan minimal, lingkungan kerja, skill, dan roadmap 5 jenjang karier.
  - Matriks perbandingan `/id/professions/compare` merender data komparatif dua profesi berdampingan secara terstruktur.
- **D7e–D7h (Auxiliary Surfaces & Auth Safeguards)**:
  - `/id/majors`: Menampilkan katalog jurusan dan detail durasi/korelasi MBTI.
  - `/id/zodiac`: Menampilkan kartu zodiak dan refleksi karier.
  - `/id/login`: Form login lengkap dengan input email dan visibilitas sandi.
  - `/id/profile` & `/id/admin`: Rute terproteksi mengarahkan (*redirect*) ke `/id/login` secara aman saat belum terautentikasi.
- **Bahasa & i18n**:
  - Pengalihan bahasa ID ↔ EN via LanguageSwitcher berjalan mulus dan merender seluruh kamus tanpa kebocoran kunci (*zero key leakage*).

### 3. Bukti Performa & Technical Quality Gates (D9)
- **Response Latency & Payload**:
  - Homepage (`/id`): ~316ms, 138 KB uncompressed HTML.
  - MBTI Exploration (`/id/mbti`): ~313ms, 218 KB uncompressed HTML.
  - MBTI Test (`/id/mbti/test`): ~166ms, 68 KB uncompressed HTML.
  - Zero console runtime errors, zero broken assets, zero unhandled promise rejections.
- **Technical Gates (Sequential)**:
  - `npm.cmd run typecheck`: **LULUS** (0 TypeScript errors)
  - `npm.cmd run lint`: **LULUS** (0 ESLint errors/warnings)
  - `npm.cmd run test`: **LULUS** (514 keys i18n valid, domain validation passed, 4/4 profession unit tests passed)
  - `npm.cmd run build`: **LULUS** (Next.js 16.3.5 Turbopack compilation 3.2s, static generation 469ms)
  - `SMOKE_BASE_URL=http://localhost:3000 npm.cmd run smoke`: **LULUS** (9/9 routes passed: 200 OK, dynamic params, robots, sitemap, API)

### 4. Status Final Paket

| Paket | Status | Catatan Verifikasi |
|---|---|---|
| D0 | [x] | Baseline teknis & visual lengkap dengan screenshot multi-viewport |
| D1 | [x] | Semantic tokens, shell, nav full-width, footer, kontras lolos audit |
| D2 | [x] | Hero Career Atlas data-driven, no fake metrics, responsive wrap |
| D3 | [x] | 6 chapter terstruktur rapi, data seed aktual, ritme editorial stabil |
| D4 | [x] | Smooth scroll route-scoped, pinned story scrub, back navigation lifecycle lolos uji browser |
| D5 | [x] | Spacing 80px/72px teruji ketat sesuai DESIGN.md, 0px horizontal overflow, heading wrap rapi |
| D6 | [x] | MBTI finder search dinamis, 16 tipe, avatar PNG lengkap, direct CTA |
| D7a–h | [x] | 8 permukaan fungsional teruji (katalog, compare, kuis Likert, draft recovery, result, majors, zodiac, auth) |
| D8 | [ ] Deferred | Canvas sequence opsional ditangguhkan sesuai rencana (aset frame belum dikonfigurasi) |
| D9 | [x] | Seluruh quality gates (typecheck, lint, test, build, smoke) & performa lulus 100% |

---

## Riwayat catatan 18 September 2026 - status historis

Tanggal audit: 18 September 2026.
Penyusun: Agent eksekusi D0–D1.

## D0 — Baseline Teknis

### Quality Gates

| Command | Status | Hasil |
|---|---|---|
| `npm run typecheck` | LULUS | 0 error |
| `npm run lint` | LULUS | 0 error |

### Working-Tree Status (18 September 2026)

- Branch: working tree dengan perubahan lokal dari sesi sebelumnya
- File yang teridentifikasi berubah sebelum sesi ini: `globals.css`, `DESIGN.md`, motion wrappers
- Warm canvas (`#F6F7F3`) dan Outfit sudah jadi perubahan lokal yang dipertahankan
