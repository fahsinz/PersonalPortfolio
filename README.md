# fahsin.bhuiyan: portfolio

Personal portfolio for Fahsin Bhuiyan, an Electrical Engineering student at Toronto Metropolitan University working on hardware design, verification, and embedded systems.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and lucide-react.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. Use `npm run build` for a production build and `npm run typecheck` for types only.

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts): profile links, projects, pillars, experience, toolbox, and coursework. Components only handle layout. The résumé button serves [`public/resume.pdf`](public/resume.pdf); replace that file to update it.

## Layout

```
app/
  layout.tsx            fonts (Geist Sans + Geist Mono), metadata, providers
  page.tsx              section composition
  globals.css           Tailwind v4 theme: fonts, keyframes, utilities
components/
  site-header.tsx       sticky blurred nav, active-section tracking, mobile menu
  command-palette.tsx   Ctrl/⌘ K palette with keyboard navigation, copy-email toast
  hero.tsx              status badge, headline, CTAs
  hero-terminal.tsx     animated boot sequence plus an interactive prompt
  projects.tsx          featured project cards and the "Also built" list
  project-preview.tsx   code-drawn previews for each card
  capabilities.tsx      three numbered pillars
  experience.tsx        "Currently" banner and work/leadership timelines
  about.tsx             bio, education, toolbox, coursework
  site-footer.tsx       contact CTA, local time, socials
  ui/                   primitives, scroll reveal, cursor-glow card
lib/
  data.ts  utils.ts  hooks.ts
```

## Tailwind configuration

Tailwind v4 has no `tailwind.config.ts`. The equivalent settings live in `app/globals.css`:

- `@theme inline` maps `font-sans` and `font-mono` to the Geist CSS variables from `next/font`.
- `@theme` defines `--color-canvas` (#09090b) and the `rise`, `caret`, `pwm`, and `scan` animations.
- `@utility` adds `shell` (page container), `bg-grid`, and `scrollbar-thin`.

## Deploy

Push to GitHub and import the repo on Vercel. No environment variables are required.
