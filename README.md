# Nebiyu Mekonnen Portfolio

Personal portfolio for Nebiyu Mekonnen, a full stack software engineer and AWS cloud builder. Built
with Next.js (App Router), TypeScript, and Tailwind CSS.

## Stack

- Next.js 16 (App Router, React 19, Turbopack)
- TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Lucide icons
- Framer Motion (available, used sparingly and only where motion adds clarity)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
npx tsc --noEmit  # type check only
```

## Project structure

```
app/                    routes (App Router)
  projects/[slug]/       dynamic project case study pages
  aws/ skills/ credentials/ about/ contact/
  sitemap.ts robots.ts opengraph-image.tsx
components/
  ui/                    Button, Container, StatusBadge, TechChip, SectionHeading, StatCard, BrandIcons
  layout/                Header, MobileNav, Footer, Logo
  home/                  homepage sections (Hero, BuildingOnAws, FeaturedProjects, AwsInPractice, ...)
  projects/               ProjectCard, ProjectHero, CaseStudySection, ScreenshotGallery, ProjectNav, FeatureGrid
  aws/                   ArchitectureDiagram, AwsServiceCard
  credentials/           CredentialCard
data/                    typed content: profile.ts, projects.ts, credentials.ts, skills.ts, aws.ts, nav.ts
types/content.ts         shared content types
lib/                     utils (cn), config (contact/resume switchboard), accent (per-project color classes)
public/assets/           real portrait, project thumbnails, credential badge screenshots
public/credentials/      credential certificate PDFs
public/resume/           drop the real resume PDF here (see below)
design-system/           UI UX Pro Max generated + finalized design tokens (MASTER.md)
```

## Content model

All site copy and project data lives in `data/*.ts`, typed against `types/content.ts`. Nothing is
hardcoded into page components beyond layout and copy that is not project specific. This keeps every
route consistent and makes it straightforward to add a project, credential, or skill without touching
page markup.

### Adding a new project

1. Add a thumbnail image to `public/assets/projects/`.
2. Add an entry to the `projects` array in `data/projects.ts` following the existing shape (`Project`
   type in `types/content.ts`). Only set `liveUrl` / `repositoryUrl` when a real, verified URL exists;
   leaving them `null` hides the corresponding button automatically.
3. Add the slug to the required routes list if you keep a static route list anywhere external to this
   repo. The detail page itself is fully dynamic (`app/projects/[slug]/page.tsx`) and needs no new file.
4. If the project should appear in `/aws`, add relevant entries to `data/aws.ts`.

### Adding more screenshots to a project

Push additional objects into that project's `screenshots` array in `data/projects.ts`
(`{ src, alt, caption }`). `ScreenshotGallery` and the layout already support any number of screenshots.

### Adding the real resume

Drop the PDF at `public/resume/Nebiyu_Mekonnen_Resume.pdf` (or any path) and set `resumeUrl` in
`lib/config.ts` to that path. The header, mobile nav, hero, and contact page all pick it up
automatically; until it's set, the resume affordances stay hidden or disabled rather than linking to
nothing.

### Adding email or LinkedIn

Set `email` and/or `linkedin` in `lib/config.ts`. The contact page and footer render them automatically
once present; until then they show a short explanatory note instead of a dead link.

### Adding or updating credentials

Edit `data/credentials.ts`. Dates and badge names should only ever reflect what is verifiable (the
current set is sourced directly from the Credly badge wallet screenshot and the supplied certificate
PDFs in `04_CREDENTIALS/`, not estimated).

## Design system

The visual system (colors, type scale, spacing, component specs) was generated with the UI UX Pro Max
skill and finalized in [`design-system/nebiyu-mekonnen-portfolio/MASTER.md`](design-system/nebiyu-mekonnen-portfolio/MASTER.md),
which documents why the generic tool output was adjusted to match the approved dark navy and gold
direction. Tailwind tokens implementing that system live in `app/globals.css`.

## Honesty rules baked into the content

- Project status labels (`Production`, `Active Build`, `Built`, `Development`, `Architecture`) are set
  per project in `data/projects.ts` and never inferred or upgraded automatically.
- `Live Project` and `Repository` buttons only render when `liveUrl` / `repositoryUrl` is set.
- AWS service usage on the `/aws` page and homepage strip is tagged with which project it's used in and
  that project's status, so planned services (e.g. AWS AppConfig for Nehas Digital Signage) are never
  presented as production.

## Deployment

The app is a standard Next.js App Router project with no external services or environment variables
required to build. It deploys as-is to Vercel, or any Node/Next-compatible host:

```bash
npm run build
npm run start
```

## SEO

Per-route metadata, Open Graph/Twitter cards, a dynamic OG image (`app/opengraph-image.tsx`),
`sitemap.xml`, `robots.txt`, and Person/WebSite JSON-LD are all wired up. Update `siteConfig.siteUrl` in
`lib/config.ts` before deploying to a real domain.
