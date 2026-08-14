export type ProjectStatus = 'live' | 'in-progress' | 'maintenance'

export type Project = {
  name: string
  tagline: string
  description: string
  longDescription?: string
  tags: string[]
  repo: string
  live?: string
  status: ProjectStatus
  year: string
}

export const projects: Project[] = [
  {
    name: 'anonshare',
    tagline: 'Encrypted real-time scratchpad',
    description:
      'A live, end-to-end encrypted scratchpad for text and code. Open a room, share six characters, write together — nothing is stored once everyone leaves. AES-GCM in the browser, CRDT sync over a Cloudflare Worker relay.',
    longDescription:
      'A mature, security-documented project (MIT-licensed, with a published whitepaper, security policy, and compliance notes) that lets multiple people co-edit the same text or code room in real time. CodeMirror 6 provides syntax highlighting for a dozen languages; Yjs CRDTs — synced via y-indexeddb and a Cloudflare Worker relay — resolve concurrent edits automatically; and every character is encrypted client-side with AES-GCM before it ever reaches the relay. Rooms are addressed by a short code, have no accounts, and vanish once everyone leaves. Ships as a Vite build with its own Vitest test suite.',
    tags: ['CRDT (Yjs)', 'CodeMirror 6', 'Cloudflare Workers', 'E2E Encryption', 'Vite'],
    repo: 'https://github.com/AvishkarKedar/textshare',
    live: 'https://code.avishkark.in',
    status: 'live',
    year: '2026',
  },
  {
    name: 'Portfolio',
    tagline: 'Dark, cinematic landing page',
    description:
      'A dark marketing homepage built with Next.js — oversized type, hairline rules, scale-comparison graphics, static-exported and deployed on Cloudflare Pages.',
    longDescription:
      'A lean Next.js 14 (React 18, TypeScript) marketing homepage with almost no external dependencies beyond the framework itself — styled after reliability-focused AI brands like terafab.ai and scale.com, with oversized type, hairline dividers, and scale-comparison graphics on a near-black canvas. It builds to a fully static export with no server runtime, and deploys straight to Cloudflare Pages from the main branch on every push.',
    tags: ['Next.js 14', 'TypeScript', 'React 18', 'Cloudflare Pages'],
    repo: 'https://github.com/AvishkarKedar/portfolio',
    live: 'https://avishkark.in',
    status: 'live',
    year: '2026',
  },
  {
    name: 'CottonCure',
    tagline: 'On-device ML disease detection',
    description:
      'An Android app that uses an on-device machine learning model to detect cotton plant diseases — no API keys, works fully offline — backed by Firebase for auth and data.',
    longDescription:
      'A machine-learning-first Android app: a TensorFlow Lite model, trained to classify cotton plant diseases, runs entirely on-device with no network call and no API key, so it keeps working in low-connectivity rural settings. Firebase covers user authentication and stores diagnosis history in the cloud when a connection is available, but the ML inference itself never depends on it.',
    tags: ['Machine Learning', 'TensorFlow Lite', 'Android', 'Firebase'],
    repo: 'https://github.com/AvishkarKedar/CottonCure',
    status: 'in-progress',
    year: '2026',
  },
  {
    name: 'QRData',
    tagline: 'File transfer over animated QR',
    description:
      'Offline file transfer over camera using animated QR frames — no internet, Bluetooth, cable, or local network. Chunked, checksummed, optionally AES-256 encrypted. Android and Windows from one Flutter codebase.',
    longDescription:
      'A single, cleanly separated Flutter codebase (transfer, screens, diagnostics, and widgets modules) that ships native builds for Android and Windows. Files are zipped and chunked, checksummed with CRC32 and verified end-to-end with SHA-256, optionally locked with AES-256-GCM, then streamed as a sequence of animated QR codes that a second device decodes live via its camera — no Wi-Fi, Bluetooth, cable, or internet required. Extras like a wakelock (keeps the screen on mid-transfer), haptic feedback, and desktop drag-and-drop round out the experience. GitHub Actions CI builds APK and EXE artifacts on every push.',
    tags: ['Flutter', 'Dart', 'Android', 'Windows', 'AES-256-GCM'],
    repo: 'https://github.com/AvishkarKedar/qrdata',
    status: 'in-progress',
    year: '2026',
  },
  {
    name: 'Avik Games',
    tagline: '15-world browser platformer',
    description:
      'A free, install-free browser platformer with 15 hand-built worlds that ramp up in difficulty — wider pits, faster enemies, and spike traps from World 6 onward.',
    longDescription:
      'A vanilla JavaScript + Canvas platformer with no engine or framework underneath, now on its fifth shipped version per its own in-game changelog. Tap-to-jump physics, stomp-chain combos, unlockable achievements, a best-times leaderboard, and multi-slot autosave/resume let a run be closed and picked up later. Recent releases added installable offline PWA support, full SEO metadata, an accessibility pass (ARIA labels, reduced-motion support), a Content-Security-Policy, an automated CI check that verifies the game on every push, and a mobile-landscape UI rebuild with auto-fullscreen on rotation.',
    tags: ['JavaScript', 'Canvas', 'PWA', 'Game'],
    repo: 'https://github.com/AvishkarKedar/website',
    live: 'https://avishkarkedar.github.io/website/',
    status: 'live',
    year: '2026',
  },
]
