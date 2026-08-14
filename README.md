# Avishkar Kedar — Index

A Palantir-inspired, pure-black project index for every site and app I've shipped — built with React, Tailwind CSS, and Framer Motion.

## Live

Deploy this to a domain or subdomain of your choice (e.g. `avishkark.in` or `index.avishkark.in`).

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Framer Motion (scroll/entry animations)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Structure

```
src/
  data/projects.ts     project data — edit this to add/update projects
  components/          Nav, Hero, Projects, About, Contact, Footer
```

## Deploy

Static output in `dist/` — deploy to Cloudflare Pages, Vercel, or GitHub Pages.
