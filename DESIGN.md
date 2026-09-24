# Minimalist Modern — SK shieldus Sungsan Agency Site

<!-- design-md:section experience -->
## 1. Experience

<!-- design-md:claim scope kind=product-surface lang=en -->
### Scope

This DESIGN.md governs the SK shieldus (ADT Caps) Sungsan agency website:
a public marketing and lead-generation site introducing unmanned security, kiosk,
table order, clean care, and cyber guard services to small-business owners, plus
the future admin page built on the same tokens. The style is "Minimalist Modern":
clarity through structure, character through bold detail. Restraint in element count,
confidence in execution. Never invent business facts (statistics, prices, reviews,
certifications) to fill a layout slot.
<!-- design-md:claim-end -->

<!-- design-md:claim primary-tasks kind=user-outcomes count=2 lang=en -->
### Primary tasks

- Understand which security or store-operation service fits my business.
- Request a consultation by phone, KakaoTalk, or the consultation booking form.
<!-- design-md:claim-end -->

### Principles

1. **One electric accent.** Color is concentrated into the Electric Blue gradient; everything else is near-monochrome slate.
2. **Whitespace is a tool.** Generous section spacing, dense components.
3. **Motion communicates.** Entrance fades, gentle floating, hover lifts. Never flashing, always reducible.
4. **Inverted rhythm.** At least one dark slate section per page breaks monotony (stats, CTA).
5. **Conversion is always one step away.** Phone, KakaoTalk, and booking actions stay visible and use the primary button.

<!-- design-md:section foundations -->
## 2. Foundations

<!-- design-md:claim foundations kind=rules-or-constraints lang=en -->
Tokens live in `src/index.css` (`@theme`) and are consumed as Tailwind utilities.

| Token | Value | Role |
|:--|:--|:--|
| `background` | `#FAFAFA` | Page canvas |
| `foreground` | `#0F172A` | Primary text; inverted section background |
| `muted` | `#F1F5F9` | Secondary surfaces |
| `muted-foreground` | `#64748B` | Secondary text |
| `accent` | `#0052FF` | Primary action, links, highlights, focus ring |
| `accent-secondary` | `#4D7CFF` | Gradient endpoint only |
| `border` | `#E2E8F0` | Card and divider strokes |
| `card` | `#FFFFFF` | Elevated surfaces |
| `logo` | `#195A99` | "성산대리점" wordmark next to the header logo (sampled from the logo image) |

Signature gradient: `linear-gradient(to right, #0052FF, #4D7CFF)` (135deg for tiles).
Accent text is used only on light surfaces (`#0052FF` on white ≥ 4.5:1). On the dark
`foreground` surface, accent appears as fills and glows; display-size gradient text there uses
`text-gradient-light` (`#4D7CFF` → `#A5BEFF`) because `#0052FF` on `#0F172A` is only ~2.4:1.
Small text on dark uses white at 60–90% opacity.

Shadows: `sm 0 1px 3px rgba(0,0,0,.06)`, `md 0 4px 6px rgba(0,0,0,.07)`,
`lg 0 10px 15px rgba(0,0,0,.08)`, `xl 0 20px 25px rgba(0,0,0,.1)`,
`glow 0 4px 14px rgba(0,82,255,.25)`, `glow-lg 0 8px 24px rgba(0,82,255,.35)` (named `glow`
because `shadow-accent` is reserved for Tailwind's shadow-color utility).

Radii: controls and cards `12px` (`rounded-xl`), large cards `16px`, pills for labels only.
Spacing: sections `py-20 md:py-28`, container `max-w-6xl`, grid gaps `gap-5`–`gap-8`.

Motion: standard `200ms ease-out`; entrance `700ms` with `cubic-bezier(0.16,1,0.3,1)`,
28px rise, 0.1s stagger; floating 4–5s ±10px; rotating ring 60s linear; pulse 2s.
All continuous motion stops under `prefers-reduced-motion`.
<!-- design-md:claim-end -->

Textures: white dot grid (1px dots, 32px pitch, 3–4% opacity) on dark sections; accent radial
glows (blur 150px, 3–8% opacity) at section corners.

<!-- design-md:section typography-assets -->
## 3. Typography & Assets

- **Display** (h1/h2): `Calistoga` for Latin glyphs; Hangul falls through to `Pretendard Variable`
  at weight 800. `font-synthesis: none` keeps Calistoga at its single 400 weight.
- **UI / body**: `Inter` for Latin, `Pretendard Variable` for Hangul. Body 16–18px, line-height 1.7.
- **Mono**: `JetBrains Mono` for section labels and badges, 12px, uppercase, `0.15em` tracking.
- Card titles: 18–24px, weight 600–700, `-0.01em` tracking.
- Korean line breaking: `word-break: keep-all` on body so headlines wrap between words.
- Key word in a headline may use gradient text (`.text-gradient`).
- Assets: existing product photos and logos in `public/image_file/` are the only imagery.
  Decorative graphics are abstract (rings, dots, gradient tiles), never fake product shots.

<!-- design-md:section components-states -->
## 4. Components & States

Shared components live in `src/components/ui/`.

- **Button** — `primary` (gradient, white text, `shadow-sm` → `shadow-glow-lg`, lift
  `-translate-y-0.5`, `brightness-110`, `active:scale-[0.98]`), `secondary` (white, border,
  hover border `accent/30`), `inverse` (white on dark), `ghost`. Heights 48px / 56px, `rounded-xl`.
  Disabled: 50% opacity, no lift. Loading: spinner + label, non-interactive.
- **SectionLabel** — pill with `accent/30` border, `accent/5` fill, pulsing dot, mono uppercase text.
  `tone="dark"` variant for inverted sections.
- **Card** — white, 1px `border`, `rounded-2xl`, `shadow-md` → `shadow-xl` on hover with lift.
  Featured card uses a 2px gradient stroke.
- **IconTile** — 48px gradient square (`rounded-xl`) with white icon; `tone="soft"` (accent/10 fill,
  accent icon) for secondary items next to gradient ones.
- **Input / Select** — 48px, `rounded-xl`, 1px border on `muted/40`; focus turns the border `accent`,
  fill `card`, plus `ring-2 ring-accent/20`. Labels are visible above each field.
- Focus-visible on every interactive element: `ring-2 ring-accent ring-offset-2`.

<!-- design-md:section layout-platforms -->
## 5. Layout & Platforms

- Hero: asymmetric `1.1fr / 0.9fr` on `lg`, single column below; decorative graphic hidden under `lg`.
- Card grids: 1 → 2 (`md`) → 3 (`lg`) columns.
- Mobile: CTAs stack full width; touch targets ≥ 44px; no horizontal scroll at 320px.
- Fixed opaque white header, 72px from `lg` / 64px below. Inline nav from `lg` (1024px);
  below that a menu button opens a panel with the nav and consult actions.

<!-- design-md:section content-locales -->
## 6. Content & Locales

Korean is the primary locale; English appears only in section labels and brand words.
Copy is direct and benefit-led. Phone numbers, business details, and service facts come
from the repository content and are never rewritten into claims that are not established.

<!-- design-md:section governance -->
## 7. Governance

<!-- design-md:claim authority kind=project-system lang=en -->
### Authority

This document is the project design contract for the declared scope.
<!-- design-md:claim-end -->

<!-- design-md:claim application-priority order=prompt-fact,repository-fact,system-contract,reference-inspiration lang=en -->
### Application priority

1. Direct user instructions for the requested scope.
2. Repository facts.
3. This system contract.
4. Reference inspiration.
<!-- design-md:claim-end -->

<!-- design-md:claim unknowns policy=absent-at-smallest-unresolved-boundary lang=en -->
### Unknowns

Omit only the smallest unresolved value or group. Do not replace it with a plausible default.
<!-- design-md:claim-end -->

<!-- design-md:claim changes policy=review-record-validate-before-adoption lang=en -->
### Changes

Record, review, and validate changes before adoption.
<!-- design-md:claim-end -->
