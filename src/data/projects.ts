export type ProjectStatus = 'live' | 'in-progress' | 'maintenance'

export type Project = {
  name: string
  tagline: string
  description: string
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
    tags: ['Android', 'Java', 'TensorFlow Lite', 'Firebase'],
    repo: 'https://github.com/AvishkarKedar/CottonCure',
    status: 'in-progress',
    year: '2026',
  },
  {
    name: 'QRData',
    tagline: 'File transfer over animated QR',
    description:
      'Offline file transfer over camera using animated QR frames — no internet, Bluetooth, cable, or local network. Chunked, checksummed, optionally AES-256 encrypted. Android and Windows from one Flutter codebase.',
    tags: ['Flutter', 'Dart', 'Android', 'Windows'],
    repo: 'https://github.com/AvishkarKedar/qrdata',
    status: 'in-progress',
    year: '2026',
  },
  {
    name: 'Website',
    tagline: 'Earlier personal site',
    description:
      'An earlier personal webpage project — kept here for history while newer work lives on the Portfolio and this index.',
    tags: ['JavaScript'],
    repo: 'https://github.com/AvishkarKedar/website',
    status: 'maintenance',
    year: '2026',
  },
]
