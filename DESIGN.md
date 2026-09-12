# Profesia Design System

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

Profesia menggunakan light-only experience untuk versi saat ini.

Aturan utama:

- body background menggunakan `#F8FAFC`
- surface utama menggunakan `#FFFFFF`
- tinted surface digunakan secara terbatas
- dark theme tidak menjadi arah visual v1
- OLED-dark, dark-first, dan dark gradient identity tidak digunakan

Optional tinted surface:

- `#F0FDFA` untuk area pendukung yang memerlukan pembeda lembut
- `#F1F5F9` untuk surface subtle dan grouped metadata

## 3. Color Tokens

### Core semantic tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#F8FAFC` | Page background |
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

Use **Plus Jakarta Sans** as the single product font family.

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
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
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
Pills: tags, filters, statuses, and compact metadata only
```

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

- Use Lucide or one equivalent consistent SVG icon family.
- Decorative icons must use `aria-hidden="true"`.
- Icon-only controls must have an accessible name.
- Keep icon size and stroke treatment consistent.
- Do not use emoji as structural interface icons.

## 8. Landing Page Composition

The landing page follows a modified **Product Demo + Features** pattern:

1. Navbar
2. Hero
3. Product Preview
4. How Profesia Works
5. Explainable Career Recommendation
6. Assessment & Discovery
7. Skill Mapping / Major Exploration
8. Career Exploration Preview
9. Final CTA
10. Footer

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

Motion is functional only.

Allowed purposes:

- hover state
- focus or selection
- expansion and collapse
- navigation
- loading
- progress
- state transition

Motion tokens:

```text
Fast: 150ms
Standard: 200ms
Complex: 250ms
```

Rules:

- Prefer opacity and small transforms.
- Use faster exits than entrances when appropriate.
- Avoid large scale transforms.
- Avoid decorative pulse.
- Avoid glow animation.
- Avoid floating animation.
- Avoid parallax.
- Respect `prefers-reduced-motion`.
- Never block input during animation.
- Motion must communicate cause and effect.

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

## 12. Responsive Standards

All major screens must be checked at 375px, 768px, 1024px, 1440px, and mobile landscape.

Responsive implementations must:

- start mobile-first
- prioritize core content on small screens
- allow natural copy wrapping
- avoid fixed widths that create horizontal scrolling
- adapt composition, not only scale sizes down
- preserve readable line lengths
- keep touch targets comfortable
- maintain focus visibility at every breakpoint

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

The current implementation contains legacy patterns that should be migrated incrementally:

- blue and indigo still appear as legacy accents
- shared utilities still use the names `glass-card` and `glass-panel`
- role groups still use purple, emerald, sky, and amber
- several components still contain dark-mode utilities
- some pages still use gradients and oversized rounded cards
- `PRD.md` and `AGENTS.md` still contain references to the previous palette

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
