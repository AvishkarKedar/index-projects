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
      'anonshare pairs a Cloudflare Worker relay with Yjs CRDT sync so multiple people can co-edit the same text/code room in real time with automatic conflict resolution — the server only ever relays ciphertext, since every character is encrypted client-side with AES-GCM before it leaves the browser. Rooms are addressed by a short 6-character code, have no accounts, and disappear the moment everyone leaves. Built for quick, throwaway, private collaboration rather than long-term storage.',
    tags: ['WebRTC', 'CRDT', 'Cloudflare Workers', 'E2E Encryption'],
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
      'A Next.js 14 App Router marketing homepage styled after reliability-focused AI brands like terafab.ai and scale.com — oversized type, hairline dividers, and scale-comparison graphics on a near-black canvas. It ships as a fully static export with no server runtime to manage, and deploys straight to Cloudflare Pages from the main branch on every push.',
    tags: ['Next.js', 'TypeScript', 'Cloudflare Pages'],
    repo: 'https://github.com/AvishkarKedar/portfolio',
    live: 'https://avishkark.in',
    status: 'live',
    year: '2026',
  },
  {
    name: 'CottonCure',
    tagline: 'Offline cotton disease detection',
    description:
      'An Android app that detects cotton plant diseases with an on-device TFLite model — no API keys, works fully offline — backed by Firebase for auth and data.',
    longDescription:
      'An Android app (Kotlin/Java, Gradle Kotlin DSL build) that classifies cotton plant diseases from a photo using an on-device TensorFlow Lite model — inference runs fully offline with no API calls or network dependency. Firebase handles user authentication and stores diagnosis history in the cloud when connectivity is available, so the core detection still works without internet access.',
    tags: ['Android', 'Kotlin', 'TensorFlow Lite', 'Firebase'],
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
      'A single Flutter codebase that ships native builds for both Android and Windows. Files are split into chunks, checksummed with CRC32 and verified end-to-end with SHA-256, and can optionally be encrypted with AES-256-GCM before being encoded into a stream of animated QR frames that a second device scans and reassembles — no Wi-Fi, Bluetooth, cable, or internet required. GitHub Actions CI automatically builds APK and EXE artifacts on every push.',
    tags: ['Flutter', 'Dart', 'Android', 'Windows'],
    repo: 'https://github.com/AvishkarKedar/qrdata',
    status: 'in-progress',
    year: '2026',
  },
  {
    name: 'Svik Games',
    tagline: '15-world browser platformer',
    description:
      'A free, install-free browser platformer with 15 hand-built worlds that ramp up in difficulty — wider pits, faster enemies, and spike traps from World 6 onward.',
    longDescription:
      'A vanilla JavaScript + Canvas platformer with no game engine or framework underneath. Tap-to-jump physics, stomp-chain combos for bonus score, unlockable achievements, a best-times leaderboard, and autosave/resume slots let a run be closed and picked up later. It installs as an offline-capable PWA via a service worker, adapts between touch controls on mobile and keyboard controls on desktop, and includes adjustable camera zoom and screen-shake settings.',
    tags: ['JavaScript', 'Canvas', 'PWA', 'Game'],
    repo: 'https://github.com/AvishkarKedar/website',
    live: 'https://avishkarkedar.github.io/website/',
    status: 'live',
    year: '2026',
  },
]
