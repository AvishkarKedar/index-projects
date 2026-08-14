export type ProjectStatus = 'live' | 'in-progress' | 'maintenance'

export type ProjectDetails = {
  overview: string
  features: string[]
  architecture: string
  highlights?: string[]
}

export type Project = {
  name: string
  tagline: string
  description: string
  longDescription?: string
  image?: string
  details: ProjectDetails
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
    tags: ['CRDT (Yjs)', 'CodeMirror 6', 'Cloudflare Workers', 'E2E Encryption', 'Vite'],
    repo: 'https://github.com/AvishkarKedar/textshare',
    live: 'https://code.avishkark.in',
    status: 'live',
    year: '2026',
    details: {
      overview:
        'A mature, security-documented project that lets multiple people co-edit the same text or code room in real time, addressed only by a short six-character code — no accounts, nothing to configure.',
      features: [
        'Real-time multi-user co-editing powered by Yjs CRDTs',
        'AES-GCM client-side encryption before any data leaves the browser',
        'CodeMirror 6 syntax highlighting across a dozen languages',
        'Six-character room codes — no accounts required',
        'Rooms vanish the moment everyone leaves; nothing is stored',
      ],
      architecture:
        'Built on Vite, with edits synced through y-indexeddb and a Cloudflare Worker relay that only ever sees ciphertext. Ships with its own Vitest test suite, a published whitepaper, and a documented security policy.',
      highlights: ['MIT licensed', 'Security policy & compliance notes published'],
    },
  },
  {
    name: 'Portfolio',
    tagline: 'Dark, cinematic landing page',
    description:
      'A dark marketing homepage built with Next.js — oversized type, hairline rules, scale-comparison graphics. Static-exported and ready to deploy, not currently live on a domain.',
    tags: ['Next.js 14', 'TypeScript', 'React 18', 'Cloudflare Pages'],
    repo: 'https://github.com/AvishkarKedar/portfolio',
    status: 'in-progress',
    year: '2026',
    details: {
      overview:
        'A lean marketing homepage styled after reliability-focused AI brands like terafab.ai and scale.com — oversized type, hairline dividers, and scale-comparison graphics on a near-black canvas.',
      features: [
        'Oversized type and hairline rules for a cinematic, high-contrast look',
        'Scale-comparison graphics inspired by reliability-focused AI brands',
        'Fully static export — no server runtime required',
      ],
      architecture:
        'Next.js 14 with React 18 and TypeScript, almost no external dependencies beyond the framework itself. Builds to a static export, ready to deploy to Cloudflare Pages.',
      highlights: ['Not yet on a live domain — deploy pending'],
    },
  },
  {
    name: 'CottonCure',
    tagline: 'On-device ML disease detection',
    description:
      'An Android app that uses an on-device machine learning model to detect cotton plant diseases — no API keys, works fully offline — backed by Firebase for auth and data.',
    tags: ['Machine Learning', 'TensorFlow Lite', 'Android', 'Firebase'],
    repo: 'https://github.com/AvishkarKedar/CottonCure',
    status: 'in-progress',
    year: '2026',
    details: {
      overview:
        'A machine-learning-first Android app built to diagnose cotton plant diseases in the field, in places where a network connection can\'t be relied on.',
      features: [
        'On-device TensorFlow Lite model classifies cotton plant diseases from a photo',
        'Works fully offline — no API key, no network call for inference',
        'Firebase-backed auth and cloud history sync when a connection is available',
      ],
      architecture:
        'The trained TensorFlow Lite model is bundled into the app and runs entirely on-device, keeping diagnosis instant and usable in low-connectivity rural settings. Firebase only ever handles auth and diagnosis history — never the inference path itself.',
      highlights: ['Machine-learning-first design', 'Built for offline-first rural use'],
    },
  },
  {
    name: 'QRData',
    tagline: 'File transfer over animated QR',
    description:
      'Offline file transfer over camera using animated QR frames — no internet, Bluetooth, cable, or local network. Chunked, checksummed, optionally AES-256 encrypted. Android and Windows from one Flutter codebase.',
    tags: ['Flutter', 'Dart', 'Android', 'Windows', 'AES-256-GCM'],
    repo: 'https://github.com/AvishkarKedar/qrdata',
    status: 'in-progress',
    year: '2026',
    details: {
      overview:
        'A file-transfer protocol that needs nothing but a camera on each end — files are zipped, chunked, and streamed as a sequence of animated QR codes that a second device decodes live.',
      features: [
        'Chunked, CRC32-checksummed, SHA-256-verified file transfer',
        'Optional AES-256-GCM end-to-end encryption',
        'Streamed as animated QR frames — no Wi-Fi, Bluetooth, cable, or internet',
        'Wakelock, haptic feedback, and desktop drag-and-drop',
      ],
      architecture:
        'A single Flutter codebase cleanly split into transfer, screens, diagnostics, and widget modules, shipping native builds for both Android and Windows. GitHub Actions CI builds APK and EXE artifacts on every push.',
      highlights: ['Cross-platform from one codebase', 'Fully offline transfer protocol'],
    },
  },
  {
    name: 'Avik Games',
    tagline: '15-world browser platformer',
    description:
      'A free, install-free browser platformer with 15 hand-built worlds that ramp up in difficulty — wider pits, faster enemies, and spike traps from World 6 onward.',
    tags: ['JavaScript', 'Canvas', 'PWA', 'Game'],
    repo: 'https://github.com/AvishkarKedar/website',
    live: 'https://avishkarkedar.github.io/website/',
    status: 'live',
    year: '2026',
    details: {
      overview:
        'A vanilla JavaScript + Canvas platformer with no engine or framework underneath, now on its fifth shipped version per its own in-game changelog.',
      features: [
        '15 hand-built worlds with escalating difficulty',
        'Tap-to-jump physics, stomp-chain combos, unlockable achievements',
        'Best-times leaderboard with multi-slot autosave/resume',
        'Installable, offline-capable PWA',
      ],
      architecture:
        'Built in plain JavaScript and Canvas with no game engine. Recent releases added full SEO metadata, an accessibility pass (ARIA labels, reduced-motion support), a Content-Security-Policy, automated CI that verifies the game on every push, and a mobile-landscape UI rebuild with auto-fullscreen on rotation.',
      highlights: ['No install required — runs in the browser', 'Auto-fullscreen mobile UI'],
    },
  },
]
