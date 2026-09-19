# Profesia Design System — Career Atlas

Revisi arah desain: 18 September 2026. Status: spesifikasi desain untuk implementasi berikutnya; UI belum dinyatakan sesuai atau terverifikasi visual.

Target kualitas: art direction editorial yang khas, interaksi presisi, konten berguna, dan performa yang terukur. Istilah “selevel Awwwards” adalah aspirasi kualitas, bukan klaim penghargaan atau hasil audit.

Rencana eksekusi per paket: [DESIGN_EXECUTION_PLAN.md](DESIGN_EXECUTION_PLAN.md). Roadmap production tetap berada di [SPRINT_PLAN.md](SPRINT_PLAN.md).

## 1. Product Identity

Profesia adalah platform eksplorasi karier untuk siswa dan young professionals.

Pengalaman Profesia harus terasa:

- intelligent
- trustworthy
- calm
- human
- professional
- approachable
- data-informed
- editorial

Profesia bukan:

- generic AI startup
- platform MBTI semata
- produk diagnosis atau medis
- dashboard-heavy SaaS
- produk yang memakai klaim absolut tanpa bukti

MBTI, RIASEC, minat, kemampuan, dan data profesi merupakan bahan pertimbangan untuk eksplorasi. Tidak satu pun boleh diposisikan sebagai jawaban karier mutlak atau jaminan hasil.

## 2. Theme Policy

Profesia menggunakan light-first editorial experience. Warm neutral dan deep teal tetap menjadi identitas yang sudah ada. Komponen baru harus mendukung dark mode sesuai `AGENTS.md`; tidak perlu menambah theme switcher dalam redesign ini.

Aturan utama:

- body background menggunakan warm neutral `#F6F7F3`
- surface utama menggunakan `#FFFFFF`
- tinted surface digunakan secara terbatas
- komposisi utama dirancang light-first, dengan semantic token alternatif untuk dark mode
- OLED-dark, dark-first, dan dark gradient identity tidak digunakan

Optional tinted surface:

- `#F0FDFA` untuk area pendukung yang memerlukan pembeda lembut
- `#F1F5F9` untuk surface subtle dan grouped metadata

## 3. Color Tokens

### Core semantic tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#F6F7F3` | Warm page canvas |
| Surface | `#FFFFFF` | Cards, panels, inputs, navigation |
| Surface subtle | `#F1F5F9` | Secondary grouped content |
| Primary | `#0F766E` | Primary actions, important links, focus |
| Primary hover | `#115E59` | Hover and pressed primary state |
| Primary soft | `#F0FDFA` | Limited accent surface |
| Foreground | `#0F172A` | Headings and primary text |
| Muted foreground | `#475569` | Body and supporting text |
| Subtle foreground | `#64748B` | Non-essential metadata |
| Border | `#E2E8F0` | Dividers, inputs, quiet boundaries |
| Success | `#059669` | Successful state with text or icon |
| Destructive | `#DC2626` | Error and destructive state with text or icon |
| Focus ring | `#0F766E` | Keyboard focus indicator |

Dark-mode mapping untuk implementasi baru: canvas `#101B1A`, surface `#172623`, foreground `#F6F7F3`, muted `#B6C5C1`, border `#526A64`, primary/focus `#5EEAD4`, primary label `#102421`, primary hover `#99F6E4`. Uji kontras setiap pasangan aktual; jangan menganggap semua warna aman pada semua surface. Warna role MBTI tetap semantik pada kedua mode.

### Color rules

- Deep teal is the primary brand accent.
- Blue is not the primary brand color.
- Teal should be used deliberately, not as a page-wide surface.
- Gradients are not part of the color system.
- Purple, emerald, sky, amber, and orange are reserved for contextual MBTI/RIASEC data.
- Functional meaning must never rely on color alone.
- Large surfaces should remain neutral.
- Text and icon colors must be selected as semantic tokens, not arbitrary screen-level colors.

### Contrast requirements

- Normal text: minimum 4.5:1.
- Large text: minimum 3:1.
- Meaningful icons and control boundaries: minimum 3:1.
- Focus indicators: minimum 3:1 against adjacent colors.
- Contrast must be checked independently for every supported surface.

## 4. Typography

### Font family

Use **Outfit** for headings, body, controls, and data, with the system sans stack as its resilient fallback. **Playfair Display Italic**, already referenced in the current stylesheet, may emphasize one short phrase in a landing/chapter headline. Use at most two such accents on the homepage; never use serif for forms, numbers, or whole paragraphs. Do not add a third font.

The font must be loaded with a visible fallback strategy and must not create invisible text during loading.

### Weight tokens

```text
Body: 400
Labels: 500
Buttons: 600
Section headings: 700
Hero/display headings: 700–800
```

### Typography rules

- Build hierarchy through size, weight, spacing, and alignment before color or decoration.
- Body text must be at least 16px on mobile.
- Body line-height should generally be 1.5–1.75.
- Long-form desktop text should remain approximately 60–75 characters per line.
- Avoid excessive uppercase labels.
- Avoid extremely large headings without a clear information hierarchy.
- Never use gradient text.
- Test Indonesian and English copy for natural wrapping.
- Do not force awkward word wrapping with blanket non-breaking spaces.

## 5. Spacing and Layout

Use a 4px base scale:

```text
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160
```

Layout rules:

- Desktop content container: 1200–1280px.
- Readable copy measure: approximately 560–720px.
- Use mobile-first breakpoints.
- Increase gutters on larger viewports.
- Keep alignment predictable across sections.
- Use whitespace to separate content chapters.
- Do not fill every available area with UI.
- Avoid fixed widths that cause overflow.
- Use `min-h-dvh` when viewport-based height is genuinely required.
- Do not hide essential information only because of a breakpoint.

Required viewport checks:

- 375px
- 768px
- 1024px
- 1440px
- mobile landscape

## 6. Border Radius and Elevation

### Radius

```text
Controls: 8–10px
Inputs: 8–10px
Normal surfaces: 12–16px
Feature containers: maximum 20px
Metadata tags and chips: 4–6px (rounded-md, NOT rounded-full)
```

- **Strictly Prohibited**: Do NOT use floating pill/capsule badges (`rounded-full` container + border + pastel background + dot/pulsing dot) as section eyebrows or hero tags. This styling (often called "SaaS capsule pill" or "template eyebrow pill") looks like generic AI-generated template slop.
- **Pure Editorial Eyebrow Standard**: All section eyebrows, categories, and hero tags must use unboxed editorial typography:
  - Clean text without capsule container or background pill.
  - Styling: `text-xs font-semibold uppercase tracking-[0.16em] text-teal-700` or `font-mono text-[11px] tracking-wider`.
  - No decorative status dots or pulsing indicators next to title eyebrows.
  - Metadata chips (MBTI, RIASEC, skills) must use structured rectangles (`rounded-md` 4–6px), never rounded-full pills.

### Elevation

- Prefer borders and surface contrast over shadows.
- Use subtle shadows only when they clarify interaction or grouping.
- Do not use glow shadows.
- Do not create a floating dashboard appearance.
- Interactive surfaces may use a small hover shadow.
- Static information surfaces must not use hover lift.
- Do not animate layout bounds on hover.

## 7. Component Rules

### Buttons

Primary buttons:

- solid `#0F766E`
- white text
- hover `#115E59`
- radius 8–10px
- minimum hit area 44px
- no gradient
- no large scale transform

Secondary buttons:

- white or transparent background
- foreground text
- `#E2E8F0` border
- `#F1F5F9` hover surface
- remain visibly subordinate to the primary action

Every screen should have one clearly dominant primary CTA.

### Cards and surfaces

Use cards only when content represents:

- an independent object
- a selectable object
- an actionable object
- a grouped result
- a recommendation preview

Prefer the following before adding another card:

- editorial rows
- dividers
- whitespace
- typography
- background changes
- clear alignment

Do not wrap every section in a card.

### Navigation

- Use a light background with a subtle bottom border.
- Use dark foreground text.
- Use deep teal for active and important states.
- Keep primary navigation to approximately 3–5 destinations.
- Move secondary destinations into a menu or footer.
- Mobile menus must expose `aria-expanded` and `aria-controls`.
- Focus must remain visible and predictable.

### Icons

- **Zero-Emoji Policy**: Never use emojis (such as 🔮, 🌿, 🛡️, ⚡, 🚀, etc.) in the user interface, cards, data structures, or code. Emojis look amateurish and violate the editorial typography standard.
- Use **Lucide** as the sole, consistent SVG icon family across the entire application.
- Decorative icons must use `aria-hidden="true"`.
- Icon-only controls must have an accessible name (`aria-label`).
- Keep icon size and stroke treatment consistent (typically `w-4 h-4` or `w-5 h-5`, stroke width 1.75–2px).
- **MBTI Role Group Standard Icons**:
  - **Analysts**: `Sparkles` or `BrainCircuit` (Purple semantic accent)
  - **Diplomats**: `Users` or `HeartHandshake` (Emerald semantic accent)
  - **Sentinels**: `ShieldCheck` (Sky semantic accent)
  - **Explorers**: `Compass` (Amber semantic accent)

## 8. Landing Page Composition

The landing page follows **Career Atlas: recognize yourself, inspect possibilities, choose a next step**.

| Chapter | Composition and purpose | Existing implementation boundary |
|---|---|---|
| Navigation | Quiet full-width navigation, brand left, 3–5 destinations, dominant career CTA | `components/layout/Navbar.tsx` |
| 01 — Open possibilities | Oversized editorial heading over 7 columns; an open, numbered career index over 5 columns; no dashboard frame | `components/landing/LandingHero.tsx` |
| 02 — Understand the connection | One three-beat story: interests → working preferences → career evidence; explanation left, changing example right | `components/landing/HowItWorks.tsx` |
| 03 — Explore the atlas | One featured profession plus two compact rows, real catalog links, salary/source only when available | `components/landing/LandingProfessions.tsx` |
| 04 — Understand your perspective | Four role groups as an editorial index with existing character art; MBTI is one exploration input | `components/landing/LandingRoleGroups.tsx` |
| 05 — Know the limits | Compact methodology strip: available assessments, explanation, data limitations; no invented counters | `components/landing/LandingStats.tsx` |
| 06 — Take a next step | Large closing statement, one career CTA, secondary assessment link | `components/landing/FinalCTA.tsx`, `components/layout/Footer.tsx` |

`app/[locale]/page.tsx` composes this order. Reuse these components before introducing replacements. Chapter 02 owns the homepage's single pinned scene; the hero never pins. The readable static composition is the baseline for every chapter.

Landing priorities:

- The hero explains career discovery, not MBTI or AI.
- The product preview shows assessment, recommendation, and explanation.
- The top recommendation visually dominates alternatives.
- Explainability is more credible than unverified social proof.
- There is one dominant CTA per major screen.
- Repeated CTAs must have a consistent purpose.
- Avoid generic SaaS feature grids.
- Use alternating editorial layouts, product UI previews, and whitespace.

### Trust rules

Do not invent or display without a verifiable source:

- No. 1 claims
- user counts
- accuracy percentages
- success percentages
- testimonials
- ratings
- partner logos
- university affiliations
- guaranteed career outcomes

## 9. MBTI and RIASEC Color Policy

MBTI and RIASEC colors are semantic data accents only. They must not define the Profesia brand.

Allowed uses:

- tiny dot
- thin border
- small label accent
- chart series
- result metadata

Disallowed uses:

- primary CTA
- major page background
- hero identity
- large card surface
- full-page theme
- decorative gradient

MBTI and RIASEC should be presented as inputs that help users explore possible directions, not as deterministic answers.

## 10. Motion

Motion has two levels: expressive storytelling on the homepage and MBTI exploration; immediate functional feedback on catalogs, quizzes, results, auth, profile, and admin.

| Technique | Decision and location | Limits and fallback |
|---|---|---|
| GSAP + ScrollTrigger | Core: existing motion wrappers and Chapter 02 | One pinned scene per exploration page; no nested pinning |
| Masked/staggered text | Core: hero and up to two chapter headings | 600ms, `power3.out`, 60ms line stagger, maximum 900ms total; body/CTA visible immediately |
| Pinned storytelling | Core: interests → preferences → evidence | Desktop ≥1024px, height ≥700px, fine pointer, no reduced motion; three static steps otherwise |
| Layered parallax | Core, confined to Chapter 02 illustration | Maximum two noninteractive layers, ±24px translation, no movement of body text or inputs |
| Lenis | Retain but scope to homepage and `/[locale]/mbti` | Eligible desktop only, one ticker; native scrolling everywhere else |
| Clip-path reveal | Optional polish on one existing illustration | 600ms inset reveal, no full-screen wipe, image remains visible if motion is disabled |
| GSAP Flip | Deferred unless an actual layout-switch interaction needs it | Standard state update remains usable; not needed for first release |
| Canvas image sequence | Optional later replacement for Chapter 02 media, never a second scene | Requires actual frame assets and performance validation; static poster remains baseline |
| SplitText | Not required initially; retain/refine `TextReveal.tsx` | Introduce only if measured line splitting cannot be achieved reliably with existing wrapper |
| WebGL/OGL/Spline/R3F/shaders | Deferred | No product need or prepared scene assets for initial implementation |
| Barba/Swup, audio, drag inertia, custom cursor, horizontal scroll, magnetic CTA | Excluded from this release | Preserve Next navigation, native pointer, direct CTA access and vertical reading |

Functional tokens: fast 150ms, standard 200ms, complex 250ms. Story tokens: reveal 600ms, image reveal 600ms, scroll scrub 0.5s. No infinite loops, pulse, floating decoration, or animation-gated input.

Chapter 02 timeline: `start: "top top"`, function-based `end` equal to `+=` plus twice viewport height, `scrub: 0.5`, `invalidateOnRefresh: true`. Stage 1 occupies 0–0.33, stage 2 0.33–0.66, stage 3 0.66–1. Each transition crossfades evidence and translates artwork by at most 24px. The timeline must not make users scroll through empty content.

Every effect needs component-scoped ownership and cleanup. Use `useGSAP` plus responsive `gsap.matchMedia`; revert on unmount and condition changes. Remove listeners, ticker callbacks and observers. Never call a global kill of all ScrollTriggers. Register one animation owner per element so `HeroMotion` and `TextReveal` do not animate the same transform/opacity twice.

SSR content must remain visible without JavaScript. Reduced motion disables smoothing, pinning, parallax and masks; every story step appears in normal document order. Honor preference changes without reload. Hidden visual duplicates are `aria-hidden`; only the currently visible interactive pane can receive focus. Keep a localized skip-story anchor outside the pin that reaches the following chapter with sensible focus placement.

Lenis should use the existing GSAP ticker integration, with `autoRaf` disabled; do not add another RAF driver. Check APIs against the installed version. Make CSS `scroll-behavior` native while Lenis owns scroll and under reduced motion. Preserve anchors, skip links, keyboard scrolling, browser back restoration, and independently scrollable menus. Do not unconditionally scroll to top on every pathname change.

Implementation references: [GSAP responsive setup and cleanup](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) and [Lenis integration](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger). These support the lifecycle rules; the scene durations and limits above are Profesia design decisions.

## 11. Accessibility

Required across the product:

- semantic HTML
- one `h1` per page
- sequential heading hierarchy
- visible keyboard focus
- minimum target size of 44px
- readable text contrast
- meaningful alternative text for meaningful images
- color-independent status communication
- keyboard-operable links, buttons, menus, tabs, and dialogs
- reduced-motion support
- no horizontal overflow at 375px
- labels, hints, and errors near the relevant control
- focused elements must not be obscured by sticky UI
- screen-reader reading order must match visual order

## 12. Responsive and Mobile-First Standards

Profesia didesain dengan filosofi **mobile-first**. Pengalaman pada layar ponsel (viewport 375px–430px) bukan sekadar versi desktop yang diperkecil, melainkan layout yang diadaptasi secara ergonomis untuk interaksi sentuh, area jangkauan satu tangan (thumb zone), dan keterbacaan cepat.

### 12.1 Viewport Breakpoints and Target Devices

| Breakpoint | Prefix Tailwind | Min Width | Target Device Utama |
|---|---|---|---|
| Compact Mobile | (default) | 320px–375px | iPhone SE, small Android |
| Standard Mobile | `sm:` | 640px | Large phone, phablet |
| Tablet / Foldable | `md:` | 768px | iPad Mini, standard tablet portrait |
| Small Desktop / Laptop | `lg:` | 1024px | iPad Pro landscape, MacBook Air |
| Large Desktop | `xl:` | 1280px | Widescreen monitor, iMac |

Wajib divalidasi pada:
- **375px** (baseline mobile minimum)
- **768px** (tablet portrait)
- **1024px** (tablet landscape / laptop)
- **1440px** (desktop monitor)
- **Mobile landscape** (tinggi viewport sempit < 500px)

### 12.2 Touch Ergonomics and Thumb Zone

- **Minimum Hit Area**: Semua kontrol interaktif (tombol, link, toggle, chip filter, opsi kuis) harus memiliki area sentuh minimal **44×44px** (sesuai standar WCAG 2.5.5 dan iOS Human Interface Guidelines).
- **Touch Target Spacing**: Berikan jarak minimal 8px antar elemen interaktif yang berdekatan untuk mencegah salah tekan (accidental tap).
- **Thumb Zone Placement**: Tempatkan tombol tindakan utama (seperti CTA kuis "Lanjutkan", "Lihat Hasil", "Simpan") di area yang mudah dijangkau ibu jari, preferensial di bagian bawah layar (sticky bottom bar pada mobile).
- **Active State Feedback**: Berikan feedback visual instan saat disentuh (`active:scale-[0.98]` atau `active:bg-teal-800`), bukan hanya bergantung pada `hover:` yang tidak ada di layar sentuh.

### 12.3 Viewport Budget and Zero Horizontal Overflow

- **No Horizontal Scroll**: Layar pada 375px tidak boleh memiliki horizontal scrolling yang tidak disengaja. Selalu gunakan `w-full max-w-full` dan hindari lebar piksel statis (`w-[400px]`).
- **Gutter Margins**:
  - Mobile (`< 640px`): padding horizontal `px-4` (16px) atau `px-5` (20px).
  - Tablet (`md:`): padding horizontal `px-6` (24px).
  - Desktop (`lg:`): padding horizontal `px-8` (32px).
- **Table and Matrix Reflow**: Tabel data atau matriks yang lebar harus diubah menjadi kartu vertikal terpisah pada mobile, atau dibungkus dalam container horizontal scroll yang eksplisit dengan indikator visual fade.

### 12.4 Layout and Bento Grid Reflow

- **Linear Stacking**: Semua layout multi-kolom desktop (split hero, bento 7/5 kolom, grid 3/4 kolom) harus melipat menjadi 1 kolom (`grid-cols-1`) secara linear pada mobile.
- **Hero Composition**:
  - Desktop: Teks intro di sebelah kiri (7 kolom), indeks profesi editorial terbuka di sebelah kanan (5 kolom).
  - Mobile: Headline dan deskripsi tampil pertama, diikuti CTA utama, lalu indeks profesi satu kolom tanpa terpotong.
- **Bento Hierarchy on Small Screens**: Elemen terpenting pada bento grid harus berada di urutan DOM pertama, bukan tersembunyi atau terdorong terlalu jauh ke bawah.
- **Timeline and Steppers**: Komponen alur horisontal (seperti career progression timeline atau How It Works) harus otomatis berubah menjadi vertikal step line pada layar di bawah `md:`.

### 12.5 Mobile Typography and Fluid Scaling

- **Headline Hierarchy**: Jangan gunakan ukuran font desktop raksasa di mobile yang menyebabkan satu kata terpotong ke baris baru sendirian (orphan words).
  - Landing hero `h1`: `clamp(2.75rem, 6.5vw, 6rem)`, line-height 1.02–1.08, tracking -0.035em; target 2–3 lines desktop and 3–4 mobile, subject to real ID/EN wrapping.
  - Editorial section `h2`: `clamp(2rem, 4vw, 3.75rem)`, line-height 1.1; functional pages retain compact headings.
  - Card `h3`: `text-lg sm:text-xl font-semibold`
- **Body Text Minimum**: Teks paragraf utama minimal **16px** (`text-base`) pada mobile untuk mencegah browser iOS Safari melakukan auto-zoom yang mengganggu saat pengguna fokus pada input form.
- **Line Length**: Pertahankan panjang baris baca nyaman (sekitar 45–60 karakter per baris pada mobile, 60–75 pada desktop).

### 12.6 Assessment, Quiz and Form UX on Mobile

- **Likert Scale Optimization**:
  - Pada layar sempit (< 640px), jangan menjejalkan 5 atau 7 bulatan opsi skala secara horisontal jika label teksnya menjadi tidak terbaca atau target sentuh terlalu kecil.
  - Opsi kuis harus memiliki area sentuh lebar dan jelas dengan label teks yang dapat dibaca tanpa terpotong.
- **Sticky Progress and Floating Actions**:
  - Indikator progres kuis (misal: "Pertanyaan 4 dari 20") ditempatkan di header atau top bar ringkas yang tidak memakan lebih dari 48px tinggi layar.
  - Tombol aksi navigasi ("Kembali", "Selanjutnya") disematkan secara sticky di bagian bawah (`fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200`) dengan memperhatikan `safe-area-inset-bottom`.
- **Virtual Keyboard Adaptation**: Form input harus menyisakan ruang yang cukup saat keyboard virtual muncul. Hindari meletakkan input penting di bawah elemen sticky yang menutupi pandangan pengguna.

### 12.7 Mobile Navigation and Sheets

- **Compact Header**: Tinggi navbar mobile dibatasi antara 56px–64px untuk memaksimalkan area konten.
- **Full-Bleed Mobile Menu**: Menu navigasi mobile harus menggunakan drawer/modal slide-over yang bersih dengan:
  - Accessible attributes (`aria-expanded`, `aria-controls`, `aria-label`).
  - Lock scroll pada `document.body` saat menu terbuka.
  - Tombol close yang jelas dengan target sentuh minimal 44×44px.
  - Tautan navigasi dengan jarak vertikal yang lapang (`py-3` hingga `py-4`).

### 12.8 Safe Areas and Mobile Browser Chrome

- **Safe Area Insets**: Selalu perhitungkan notch, home indicator pill, dan dynamic island pada perangkat modern:
  - Gunakan `pb-[calc(1rem+env(safe-area-inset-bottom))]` untuk sticky footer atau bottom bar.
  - Gunakan `pt-[calc(1rem+env(safe-area-inset-top))]` untuk modal full-screen.
- **Dynamic Viewport Units**: Gunakan `dvh` (`min-h-dvh` atau `h-dvh`) daripada `vh` murni untuk menghindari layout jump saat baris URL browser mobile muncul atau tersembunyi saat di-scroll.

## 13. Content and Trust Language

Use exploratory and evidence-informed language:

- salah satu petunjuk
- membantu memahami
- dapat menjadi bahan pertimbangan
- bagian dari proses eksplorasi
- bukan jawaban mutlak

Avoid diagnostic, deterministic, or absolute language such as:

- pasti cocok
- profesi terbaik untukmu
- dijamin sukses
- personality determines your career
- hasil diagnosis kepribadian

All user-facing strings, including labels, headings, CTA text, aria labels, and errors, must remain in `messages/id.json` and `messages/en.json`.

## 14. Engineering Integration

This document defines visual and UX rules. It does not replace the engineering constraints in `AGENTS.md`.

The product implementation uses:

- Next.js App Router
- Tailwind CSS v4
- Lucide React
- next-intl
- server and client component boundaries
- reusable components under `components/`
- translation dictionaries under `messages/id.json` and `messages/en.json`

The design system must not require changes to:

- routes
- business logic
- API behavior
- database access
- recommendation algorithms
- authentication
- assessment scoring

## 15. Migration Notes

Source inspection on 18 September 2026 found the following migration inputs (not a screenshot-based visual audit):

- `package.json` already declares GSAP, `@gsap/react`, and Lenis; reuse them.
- `globals.css` already references Outfit and Playfair Display; unify their usage with section 4 and optimize loading during implementation.
- `SmoothScrollProvider.tsx` currently wraps all routes and resets scroll on pathname changes; implement the narrower scope in section 10.
- `LandingHero.tsx` contains a hardcoded `96% Match`, salary example and untranslated promotional copy. Replace unsupported proof with real catalog content or a clearly labeled example; do not fabricate evidence.
- `MbtiCharacterGrid.tsx` and `components/mbti/story/` already implement exploration motion. Refine them while retaining routes, search and image fallback.
- `public/images/mbti/` contains 16 character PNGs; the referenced `/videos/mbti-archetypes.*` media is absent in this checkout. Do not make those missing files a loading dependency.
- Existing changes to warm canvas and Outfit are intentional baseline work. Retain them. Existing dark utilities must be supported under `AGENTS.md`, not removed wholesale.

These conflicts do not justify unrelated broad refactors. Migrate one page or component boundary at a time, preserving behavior and verifying each visual change.

## 16. Documentation Validation

Before treating an implementation as compliant:

- verify tokens match this document
- verify deep teal, not blue, is the primary brand accent
- verify the experience is light-first
- verify MBTI colors are semantic-only
- verify no fake proof or absolute personality claims are displayed
- verify accessibility and responsive rules
- verify reduced-motion behavior
- verify Indonesian and English wrapping
- review `PRD.md`, `AGENTS.md`, and the affected components for known legacy conflicts

This document is a design source of truth. Implementation changes must remain scoped, reversible, and behavior-preserving.

## 17. Career Atlas Art Direction and Page Families

### Composition contract

The recognizable motif is a numbered editorial atlas: large headings, thin rules, aligned indexes, a single emphasized career, and images that belong to the topic. Use 01–06 chapter labels as plain text, never floating pills. These are section numbers, not invented metrics.

Keep the existing warm canvas `#F6F7F3` and teal `#0F766E`. Aim for mostly neutral surface area; role colors identify the four MBTI groups and chart data. Maintain the no-gradient, no-glow, Lucide-only and no-emoji rules.

Desktop uses a 12-column, max-1280px content grid, 32px gutters and 24–32px gaps. A 1440px screenshot should show consistent alignment between the hero title, chapter labels and footer. Alternate 7/5 hero, 5/7 explanation, and full-width profession rows. Use 128–160px chapter spacing on desktop and 64–80px mobile; no rigid viewport height for ordinary sections. Remove conflicting outer `space-y-*` when sections own their own padding.

Use thin dividers and whitespace for storytelling. Reserve bordered cards for actual selectable objects and grouped results. Hero art is an open index of real career records, not a simulated dashboard. Existing MBTI illustrations may appear in the role-group chapter; keep their proportions and avoid using a single personality character as the brand mascot.

### Proposed bilingual copy for implementation

Store these proposals under the existing `Landing` namespaces after checking current keys. Functional labels elsewhere retain their meaning. Do not render markdown emphasis delimiters as visible text.

| Slot | Indonesian | English |
|---|---|---|
| Hero eyebrow | ATLAS KARIER | CAREER ATLAS |
| Hero headline | Kenali dirimu. Buka kemungkinanmu. | Know yourself. Explore your possibilities. |
| Hero body | Jelajahi profesi melalui minat, cara berpikir, dan kemampuanmu. Pahami alasannya, lalu tentukan langkah berikutnya. | Explore careers through your interests, thinking preferences, and skills. Understand the reasoning, then choose your next step. |
| Primary CTA | Jelajahi profesi | Explore careers |
| Secondary CTA | Kenali dirimu | Discover yourself |
| Story heading | Dari diri sendiri, menuju kemungkinan baru. | From self-discovery to new possibilities. |
| Evidence/example label | Contoh eksplorasi, bukan hasil pribadimu | Exploration example, not your personal result |
| Closing headline | Satu langkah membuka arah baru. | One step opens a new direction. |

Primary CTA links to `/${locale}/professions`; secondary to `/${locale}/mbti`. The example label is required only where a sample assessment combination is displayed. Never imply the anonymous visitor has already been assessed.

### Page family treatment

| Page family | Visual emphasis | Interaction constraints |
|---|---|---|
| Homepage | Career Atlas composition and one explanatory scene | All primary links available immediately |
| MBTI exploration | Character artwork, four-group editorial navigation, one existing scene refined | Retain all 16 types through search/exploration; direct access to test; mobile normal flow |
| Professions, majors, zodiac catalogs | Strong intro, visible search/filter toolbar, tidy rows or object cards | No pinning; retain query state, links and empty states; zodiac remains optional exploration |
| Detail/result | Clear summary, evidence and next action, readable data/charts | No theatrical score reveal; textual chart equivalent; no changed scoring |
| MBTI/RIASEC tests | Quiet single task focus, clear progress, mobile next/back controls | Native scrolling, safe draft restoration, immediate selection feedback |
| Auth/profile/admin | Consistent type/tokens, compact useful content | Preserve authorization, forms, errors and existing actions |

## 18. Media and Quality Budget

Baseline release must work with existing character images and actual catalog text. No new raster asset is mandatory. If a later art pass adds photography, use licensed imagery of work/activity with documented source and crop; avoid arbitrary stock portraits and generated screenshots as functioning UI.

Canvas upgrade specification (optional, after baseline): one pre-rendered layered atlas sculpture that opens into three perspectives, aligned with Chapter 02. Text stays in HTML. Asset package requires a poster, consistent frame dimensions, ordered filenames, frame count, licensing/provenance and explicit aspect ratio. No runtime video-to-frame extraction and no assumption that a single generated image provides a usable sequence.

Suggested starting budget: at most 48 WebP frames at 960×640, at most 3MB total compressed transfer, DPR cap 1.5, at most 8 decoded frames in a sliding window (about 19MiB of raw RGBA frame storage at those dimensions, excluding canvas/decoder overhead). Prefetch only near the scene after main content; draw on frame change, not React state updates per scroll. Cancel pending work on unmount and close disposable bitmaps. If frames fail or the device cannot sustain the budget, show the poster and normal HTML steps. Touch/mobile, reduced motion and detected data-saving mode receive the static version without frame downloads.

Internal release budgets: hero media ≤250KB if added; no optional sequence in initial page load; additional initial compressed JS ≤30KB per affected route relative to the recorded baseline. These are project targets, not measured results. Record actual transfer size and a performance trace. If a budget is missed, remove optional effects first.

Target LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile in field data, following [Web Vitals](https://web.dev/articles/vitals). Local browser measurements are regression signals, not field-data proof. Capture static and animated states, ID/EN, 375/768/1024/1440px and short landscape, with keyboard and reduced-motion checks. Quality requires evidence for hierarchy, distinct identity, useful interactions, responsive behavior and performance; a successful build alone cannot establish visual quality.
