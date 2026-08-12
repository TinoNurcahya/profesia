# Sprint & Execution Plan - Profesia (16Personalities & Zodiac Model)

**Dokumen Rencana Sprint, Milestone, User Stories, & Definition of Done (DoD)**

---

## 📅 Rangkuman Milestone & Jadwal Sprint

Platform Profesia dikembangkan dalam **5 Sprint Eksekusi** yang merangkum fitur utama MBTI 16Personalities serta modul pengayaan **Zodiac Career Navigation** di tahap akhir.

```text
[ Sprint 1: Foundation & Landing Page ] ──► [ Sprint 2: Auth & Katalog Profesi ]
                                                          │
[ Sprint 5: Admin CMS, Zodiac & Deploy ] ◄── [ Sprint 4: Profil & Komparasi ] ◄── [ Sprint 3: Kuis MBTI 16Personalities & Share Card ]
```

| Sprint | Fokus Utama | Target Deliverables | Est. Durasi |
|---|---|---|---|
| **Sprint 1** | Foundation, i18n & Landing Page | App Router Scaffold, Tailwind v4, Schema SQL, i18n ID/EN, Supabase Proxy, Navbar/Footer, Landing Page | Sprint 1 |
| **Sprint 2** | Auth & Katalog Profesi | Supabase Auth, Catalogue Grid, Search, Multi-Filter, Filter MBTI, Detail Profesi, Salary Chart, Career Timeline | Sprint 2 |
| **Sprint 3** | Kuis MBTI 16Personalities & Viral Share Card | 50 Pernyataan Likert Scale, Auto-Save Draft, Engine Scoring 5 Dimensi ($E/I, S/N, T/F, J/P, A/T$), Result Analytics 4 Rumpun, Shareable Story Card | Sprint 3 |
| **Sprint 4** | Profil User, Bookmarks & Tool Komparasi | Bookmark RLS, Dashboard User (Active MBTI `-A/-T`, History & Saved), Comparison Side-by-Side Table & Radar Chart | Sprint 4 |
| **Sprint 5** | Admin Panel CMS, Zodiac Explorer & Deploy | Admin Layout (`is_admin()`), **Modul Navigasi Zodiak (`/zodiac`)**, CRUD Profesi/Zodiak/MBTI, Dynamic SEO Hreflang, Open Graph, QA Audit & Vercel Deploy | Sprint 5 |

---

## 🏃 Detail Tugas & User Stories Per Sprint

### 🔵 Sprint 1: Foundation, Infrastructure & Landing Page
Scaffolding Next.js 16, i18n ID/EN, Supabase proxy, schema DDL `supabase/schema.sql` (termasuk tabel `zodiacs`), komponen UI dasar, dan Landing Page.

### 🟢 Sprint 2: Authentication & Katalog Profesi
Supabase Auth (login/register), Katalog profesi UI (`/professions`) dengan search, multi-filter, detail profesi, `SalaryChart`, dan `CareerPathTimeline`.

### 🟣 Sprint 3: Kuis MBTI 16Personalities & Social Share Card
50 Pernyataan Likert Scale, Auto-Save Draft `localStorage`, engine kalkulasi 5 dimensi ($E/I, S/N, T/F, J/P, A/T$), halaman hasil 4 Rumpun (`-A / -T`), dan generator `ShareCard` visual.

### 🟡 Sprint 4: Profil User, Bookmarks & Tool Komparasi
Fitur bookmark RLS, dashboard profil pengguna (dengan pilihan Zodiak & MBTI card), dan tool komparasi profesi side-by-side dengan Radar Chart.

### 🔴 Sprint 5: Admin Panel CMS, Zodiac Explorer & Production Deployment
- **[S5-01] Admin Panel Layout & Security**: Proteksi role via `is_admin()`.
- **[S5-02] Admin CMS Management**: CRUD Profesi, Kategori, MBTI, dan Zodiak.
- **[S5-03] Zodiac Career Module (`/zodiac` & `/zodiac/[slug]`)**:
  - Halaman landing 12 Zodiak dengan visualisasi elemen (Api, Tanah, Udara, Air).
  - Halaman detail Zodiak menampilkan rekomendasi profesi yang cocok dengan energi zodiak tersebut.
- **[S5-04] SEO & QA Verification**: Dynamic Metadata, Hreflang, Open Graph images `og-image.png`, `npx tsc --noEmit` (0 errors), `npm run lint`, dan `npm run build`.
- **[S5-05] Deployment**: Deploy ke Vercel Production.

---

## 🛡️ Risk Management & Mitigation Matrix

| Potensial Risiko | Dampak | Strategi Mitigasi |
|---|---|---|
| **Penambahan Modul Zodiak Mengganggu Core MBTI** | Rendah | Modul Zodiak diisolasi di Sprint 5 sebagai *value-add page* (`/zodiac`), data master tersimpan independen di `data/zodiacs.json` tanpa mengubah alur kuis MBTI utama. |
| **Keterlambatan Loading Data Profesi** | Tinggi | Menggunakan Next.js Server Components (RSC) & Skeleton Loaders pada semua bagian fetch data. |
