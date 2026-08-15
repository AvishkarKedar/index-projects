export type ProjectStatus = 'live' | 'in-progress' | 'maintenance'

export type ProjectDetails = {
  overview: string
  features: string[]
  architecture: string
  highlights?: string[]
  story?: string
  challenges?: string
}

export type Project = {
  slug: string
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
    slug: 'anonshare',
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
      story:
        'anonshare started from a simple annoyance: sharing a snippet of code or a quick note with someone nearby should not require an account, a link that outlives the conversation, or trusting a third party with the contents. The result is a scratchpad that exists only as long as a room is open — a six-character code is the entire access model.',
      challenges:
        'The hardest part was not the CRDT sync itself — Yjs handles that well — it was making sure the server relay never sees plaintext. Every payload is encrypted with AES-GCM in the browser before it ever reaches the Cloudflare Worker, so the relay only ever moves ciphertext between peers. Getting IndexedDB persistence, encryption, and CRDT merge logic to cooperate without racing each other took several rewrites of the sync layer.',
    },
  },
  {
    slug: 'portfolio',
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
      story:
        'Before the current dark, cinematic hub existed, this project was the testbed for a different visual language — big type, hairline rules, and the kind of scale-comparison graphics you see on reliability-obsessed AI company sites. It is a fully static Next.js export, built to be dropped onto Cloudflare Pages the moment a home is picked for it.',
      challenges:
        'The open question here is not technical, it is about home: this build is intentionally decoupled from any domain until a final direction is chosen, so the real challenge has been resisting the urge to wire it up prematurely and keeping it deploy-ready and unopinionated about where it eventually lives.',
    },
  },
  {
    slug: 'cottoncure',
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
      story:
        'CottonCure exists because disease detection tools for cotton farming are usually either desktop-only, subscription-gated, or assume a stable internet connection — none of which hold up in the fields where this is actually needed. The goal from day one was an app that behaves the same in a connected office as it does in a rural field with no signal.',
      challenges:
        'Getting a TensorFlow Lite model small and fast enough to run inference directly on mid-range Android hardware, without an API call, meant trading off model size against accuracy repeatedly during training. Firebase was scoped deliberately narrow — auth and history sync only — so a dropped connection never blocks a diagnosis.',
    },
  },
  {
    slug: 'qrdata',
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
      story:
        'QRData is built around a constraint most file-transfer tools do not take seriously: sometimes there is no Wi-Fi, no Bluetooth pairing, no cable, and no shared network — just two screens and two cameras. Turning a file into a stream of animated QR frames was the most reliable way to move data with nothing but that.',
      challenges:
        'The real engineering problem was throughput and reliability over a channel that is fundamentally just ‘a camera reading a screen’ — every chunk needed CRC32 checksums and a SHA-256 verification pass at the end so a single missed frame does not silently corrupt the file. Getting one Flutter codebase to feel native on both Android touch input and Windows drag-and-drop took real platform-specific tuning.',
    },
  },
  {
    slug: 'avik-games',
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
      story:
        'What started as a single test level became a full 15-world browser platformer, built without any game engine — plain JavaScript and Canvas, shipped as an installable PWA. Each world was tuned by hand, and difficulty escalates deliberately from World 6 onward with wider pits, faster enemies, and spike traps.',
      challenges:
        'Building physics, collision, and stomp-chain combos from scratch in vanilla Canvas meant there was no engine to lean on for edge cases — every bug in jump timing or hitbox overlap had to be tracked down manually. The mobile rebuild, with auto-fullscreen on rotation and a full accessibility pass, took as much work as several of the game worlds combined.',
    },
  },
]
