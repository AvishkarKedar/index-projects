const PROJECTS = {
  anonshare: {
    title: 'anonshare — Avishkar Kedar',
    description:
      'Encrypted real-time scratchpad. AES-GCM in the browser, CRDT sync over a Cloudflare Worker relay.',
  },
  portfolio: {
    title: 'Portfolio — Avishkar Kedar',
    description:
      'A dark, cinematic landing page built with Next.js — oversized type, hairline rules, scale-comparison graphics.',
  },
  cottoncure: {
    title: 'CottonCure — Avishkar Kedar',
    description: 'On-device ML disease detection for cotton plants. Works fully offline on Android.',
  },
  qrdata: {
    title: 'QRData — Avishkar Kedar',
    description:
      'Offline file transfer over animated QR frames — no internet, Bluetooth, cable, or local network.',
  },
  'avik-games': {
    title: 'Avik Games — Avishkar Kedar',
    description: 'A free, install-free browser platformer with 15 hand-built worlds.',
  },
}

export async function onRequest(context) {
  const { params, request } = context
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const meta = PROJECTS[slug]
  const response = await context.next()

  if (!meta) return response

  const url = new URL(request.url)
  const origin = url.origin
  const ogImage = `${origin}/og/${slug}.svg`
  const pageUrl = `${origin}/projects/${slug}`

  return new HTMLRewriter()
    .on('title', {
      element(element) {
        element.setInnerContent(meta.title)
      },
    })
    .on('meta[name="description"]', {
      element(element) {
        element.setAttribute('content', meta.description)
      },
    })
    .on('link[rel="canonical"]', {
      element(element) {
        element.setAttribute('href', pageUrl)
      },
    })
    .on('meta[property="og:title"]', {
      element(element) {
        element.setAttribute('content', meta.title)
      },
    })
    .on('meta[property="og:description"]', {
      element(element) {
        element.setAttribute('content', meta.description)
      },
    })
    .on('meta[property="og:url"]', {
      element(element) {
        element.setAttribute('content', pageUrl)
      },
    })
    .on('meta[property="og:image"]', {
      element(element) {
        element.setAttribute('content', ogImage)
      },
    })
    .on('meta[name="twitter:title"]', {
      element(element) {
        element.setAttribute('content', meta.title)
      },
    })
    .on('meta[name="twitter:description"]', {
      element(element) {
        element.setAttribute('content', meta.description)
      },
    })
    .on('meta[name="twitter:image"]', {
      element(element) {
        element.setAttribute('content', ogImage)
      },
    })
    .transform(response)
}
