# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Nebiyu Mekonnen Portfolio
**Category:** Personal Engineering Portfolio (Recruiter Facing)
**Finalized:** 2026-07-24

## Decision Rationale

The UI UX Pro Max generic `--design-system` match defaulted to a light, blue-accent,
"Motion-Driven" portfolio pattern (parallax, page transitions, animation-heavy). That
does not match this project's explicit source-of-truth direction (master prompt +
`01_REFERENCE_UI/homepage_primary_reference.png`): a dark, navy/charcoal, gold-accent,
restrained-motion, evidence-first recruiter tool. Supplemental `--domain color` and
`--domain style` queries for "dark navy charcoal gold premium technical" surfaced the
Trust Navy + Premium Gold and Modern Dark Cinema results, which were blended with the
approved mockup to produce the palette and type system below. This file is the final,
implementation-ready system: build strictly from it, not from the raw search output.

Style base: Modern Dark (restrained) — deep navy/charcoal surfaces, hairline borders,
no pure black, no glassmorphism/blur stacking, no parallax, no ambient blobs, no glow
except a single soft accent glow reserved for the hero portrait backdrop. Motion is
short (150-300ms), functional, and respects `prefers-reduced-motion`.

---

## Global Rules

### Color Palette (Dark, primary theme)

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Background (deep) | `#0A0E17` | `--color-bg` | Page background |
| Surface | `#10151F` | `--color-surface` | Section bands, header/footer |
| Surface Elevated | `#161C2A` | `--color-surface-elevated` | Cards |
| Surface Elevated Hover | `#1B2333` | `--color-surface-elevated-hover` | Card hover |
| Border | `rgba(255,255,255,0.08)` | `--color-border` | Hairline borders |
| Border Strong | `rgba(255,255,255,0.16)` | `--color-border-strong` | Emphasized borders |
| Foreground | `#F3F5F8` | `--color-fg` | Primary text |
| Foreground Muted | `#94A1B8` | `--color-fg-muted` | Secondary text |
| Foreground Subtle | `#606B80` | `--color-fg-subtle` | Tertiary/meta text |
| Gold (brand primary) | `#E3A83B` | `--color-gold` | Primary CTA, brand accent, active states |
| Gold Hover | `#F0B854` | `--color-gold-hover` | Primary CTA hover |
| Gold On | `#141008` | `--color-on-gold` | Text on gold surfaces |
| AWS Orange | `#FF9900` | `--color-aws` | AWS service badges/section only |
| Success / Production | `#3FB871` | `--color-status-production` | "Production" status badge |
| Info / Active Build | `#4C8DFF` | `--color-status-active` | "Active Build" / "Built" badge |
| Warning / Development | `#C9A227` | `--color-status-development` | "Development" badge |
| Neutral / Architecture | `#8B93A6` | `--color-status-architecture` | "Architecture" / "Concept" badge |
| Destructive | `#E5484D` | `--color-destructive` | Error states only |
| Ring | `#E3A83B` | `--color-ring` | Focus ring |

### Project Accent Colors (thumbnails/card borders only, never full backgrounds)

| Project | Accent | Hex |
|---|---|---|
| DegisSnap | Violet | `#8B5CF6` |
| NAEP | Blue | `#4C8DFF` |
| Nehas Digital Signage | Teal | `#22B8A6` |
| FSSS Limat POS | Green | `#3FB871` |
| Tibeb Market | Amber/Clay | `#C87F3B` |
| AradaCart | Telegram Blue | `#229ED9` |

### Typography

- **Font:** Inter (variable), via `next/font/google`
- **Mood:** technical, precise, premium, high legibility at small sizes
- **Weights used:** 400 (body), 500 (labels/chips), 600 (subheads/buttons), 700 (headings), 800 (hero display only)
- **Scale (desktop / mobile):**
  - Display (hero H1): 56px / 36px, line-height 1.1, tracking -0.02em, weight 700-800
  - H1 (page title): 40px / 30px, line-height 1.15, weight 700
  - H2 (section title): 30px / 24px, line-height 1.2, weight 700
  - H3 (card/subsection title): 20px / 18px, line-height 1.3, weight 600
  - Body large: 18px / 17px, line-height 1.6, weight 400
  - Body: 16px, line-height 1.6, weight 400
  - Small / meta / chips: 13-14px, line-height 1.4, weight 500

### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |
| `--space-4xl` | 96px |

Section vertical rhythm: 96px desktop / 56px mobile between major homepage sections.
Container max width: 1280px, horizontal padding 24px mobile / 32px tablet / 48px desktop.

### Radius & Elevation

- Radius: sm=8px (chips, inputs), md=12px (buttons), lg=16px (cards), xl=20px (hero panels)
- No drop shadows for depth (dark theme reads depth through surface color + border, not shadow).
  Reserve one soft shadow (`0 20px 40px rgba(0,0,0,0.35)`) for the hero portrait only.

---

## Component Specs

### Buttons

- Primary: solid gold `#E3A83B`, text `#141008`, weight 600, radius 12px, padding 12px 22px, hover lightens to `#F0B854` + 1px lift, focus ring 2px gold offset 2px.
- Secondary: transparent, 1px border `--color-border-strong`, text `--color-fg`, hover border brightens + surface tint.
- Ghost/link: text `--color-fg-muted`, hover `--color-fg`, underline offset on focus.
- All interactive elements: `cursor: pointer`, transition 150-200ms ease, visible 2px focus ring (never `outline: none` without replacement).

### Cards (ProjectCard, CredentialCard, generic Card)

- Background `--color-surface-elevated`, 1px border `--color-border`, radius 16px, padding 20-24px.
- Hover: border brightens to project accent or gold at 40% opacity, background to `--color-surface-elevated-hover`, translateY(-2px), 200ms ease. Image inside scales 1.03 max, clipped, 300ms ease.
- Entire card is one clickable region (stretched-link pattern); nested buttons/links use `z-10 relative` and `stopPropagation` only where truly nested interactive controls exist (e.g. external icon links), otherwise avoid nesting interactive elements at all.

### Status Badge

Pill, 12px/13px text weight 600, colored dot + label, background = status color at 14% opacity, text = status color (lightened for AA on dark bg), border 1px status color at 30% opacity. Values: Production, Active Build, Built, Development, Architecture, Concept.

### Tech Chip

Small pill, background `--color-surface`, border `--color-border`, text `--color-fg-muted`, 13px weight 500, radius 8px, padding 6px 10px.

### Navigation

- Sticky header, background `--color-bg` at 85% opacity + backdrop-blur(8px) only on scroll (no blur elsewhere), bottom hairline border.
- Active route: gold text + 2px gold underline offset.
- Mobile: full-screen overlay panel sliding from right, 220ms ease, large tap targets (min 48px), trap focus, close on route change and Escape.

### Motion

- Durations: 150ms (hover/focus), 200-250ms (card lift, menu), 300ms max (page/section reveal).
- Section reveal: fade + 12px translateY on first scroll into view, one-shot, disabled entirely under `prefers-reduced-motion: reduce`.
- No parallax, no continuous/looping motion, no custom cursors, no particle backgrounds.

---

## Anti-Patterns (Do NOT Use)

- Generic template look, default shadcn/Tailwind starter aesthetic with no customization
- Emojis as icons (Lucide only)
- Glassmorphism stacking / heavy blur
- Parallax scrolling, floating ambient blobs, particle backgrounds
- Full-page orange (AWS orange is a service accent, not the brand color)
- Skill-percentage bars or star ratings
- Fake Live Demo / Repository buttons when no verified URL exists
- Hover-only critical information (must also work on touch/focus)

## Pre-Delivery Checklist

- [ ] No emojis as icons (Lucide SVGs only)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover + focus states with 150-300ms transitions
- [ ] Dark theme text contrast 4.5:1 minimum (gold on dark bg, fg-muted on surface, etc. verified)
- [ ] Visible focus ring on every interactive element
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375px, 768px, 1024px, 1440px, 1920px
- [ ] No content hidden behind sticky header
- [ ] No horizontal scroll on mobile
- [ ] Only verified links render Live Project / Repository buttons
