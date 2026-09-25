// Catch-all SPA fallback.
// Pages serves /404.html for unmatched paths before applying _redirects
// splat rules, so client-side routes like /projects never reach the app
// on hard navigation. This Function runs before static-asset 404 handling:
// every request first goes to context.next() (real assets are served
// untouched), and only genuinely missing paths fall back to the SPA shell,
// where the client router renders the right view (home, case study, or
// the branded NotFound).
export async function onRequest(context) {
  const response = await context.next()

  if (response.status === 404) {
    return context.env.ASSETS.fetch(new URL('/index.html', context.request.url))
  }

  return response
}
