# Avishkar Kedar — Project Index

An interactive, star-filled project index for [avishkark.in](https://avishkark.in) — pure-black, x.ai-grade typography over a live Grok-style starfield, built with React, TypeScript, Tailwind CSS, Three.js, and Framer Motion.

## Highlights

- **Interactive 3D starfield** — 2,600 twinkling stars (custom GLSL shaders, three depth layers) with a wireframe icosahedron centerpiece. Drag anywhere to spin the sky; the camera parallaxes with your pointer and drifts as you scroll.
- **Constellation dossier art** — every project gets its own deterministic, seeded star-map rendered on canvas.
- **Project dossier modal** — full build notes, architecture, story, and hard parts per project, plus links to the full case-study pages (`/projects/:slug`, with per-project OG meta via Cloudflare Pages Functions).
- **Working contact form** — opens from the contact section or the floating button, posts straight to my inbox (Google Apps Script backend, honeypot-protected).
- **Craft details** — film grain, scramble-text nav, magnetic buttons, custom cursor, scroll-progress hairline, Konami-code easter egg, `prefers-reduced-motion` support throughout.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (pure-black token system)
- Three.js (starfield) · Framer Motion (motion)
- React Router (home / case studies / 404) · Cloudflare Pages Functions (OG meta)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Deploy

Static output in `dist/` — deploy to Cloudflare Pages (includes the `functions/` directory for per-project OG meta), Vercel, or GitHub Pages.

## Structure

```
src/
  data/projects.ts     project data + profile — edit this to add/update projects
  components/          Starfield, Nav, Hero, Projects (index + dossier), About, Contact, ...
  pages/               Home, CaseStudy (/projects/:slug), NotFound
functions/             Cloudflare Pages Function — per-project OG meta injection
```
