# BITS Qiskit Fall Fest 2026 — Landing Page

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Publish hackathon problem statements

The `/hackathon` page lists challenges by Beginner and Advanced track. Add entries
to `src/data/problem-statements.ts` using the example in that file. Each entry
needs a unique ID, track ID, title, and description; deliverables and a downloadable
brief are optional. Store brief files in `public/hackathon/` and reference them as
`/hackathon/your-file.pdf`.

A track displays a coming-soon message until it has an entry. Rebuild and deploy
the site after updating the statements or adding files.

## Update the database

With `DATABASE_URL` set in `.env.local`, `.env`, or the environment, run:

```bash
npm run db:init
```

This also migrates existing hackathon teams from Rookie/Novice to Beginner,
deduplicates merged entries, preserves Advanced, and updates the allowed tracks
to Beginner and Advanced. It is safe to run again.

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```text
src/
  app/            Root layout (SEO metadata), page composition, global CSS
  components/
    layout/       Navbar, Footer
    sections/     One component per landing-page section
    ui/           Reusable primitives (cards, icons, scroll-reveal, etc.)
  data/           All placeholder content (edit here, not in components)
  types/          Shared TypeScript types
  lib/            Small utilities
```
