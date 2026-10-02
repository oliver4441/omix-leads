export const SITE_URL = 'https://blog.omixsystems.store'
export const BRAND_URL = 'https://omixsystems.store'
export const SITE_NAME = 'OMIX Journal'

export function upsertMeta(name, content) {
  if (!content) return
  let node = document.querySelector(`meta[name="${name}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute('name', name)
    document.head.appendChild(node)
  }
  node.setAttribute('content', content)
}

export function upsertProperty(property, content) {
  if (!content) return
  let node = document.querySelector(`meta[property="${property}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute('property', property)
    document.head.appendChild(node)
  }
  node.setAttribute('content', content)
}

/**
 * Point the share-card tags at a generated OG image. Mirrors what the
 * prerenderer writes into the static HTML, so a client-side navigation keeps
 * the head consistent with the route.
 */
export function setOgImage(path, alt) {
  if (!path) return
  const url = path.startsWith('http') ? path : `${SITE_URL}${path}`
  upsertProperty('og:image', url)
  upsertProperty('og:image:type', 'image/png')
  upsertProperty('og:image:width', '1200')
  upsertProperty('og:image:height', '630')
  upsertProperty('og:image:alt', alt)
  upsertMeta('twitter:card', 'summary_large_image')
  upsertMeta('twitter:image', url)
  upsertMeta('twitter:image:alt', alt)
}

export function setCanonical(url) {
  let node = document.querySelector('link[rel="canonical"]')
  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', 'canonical')
    document.head.appendChild(node)
  }
  node.setAttribute('href', url)
}

export function setJsonLd(id, data) {
  let node = document.getElementById(id)
  if (!node) {
    node = document.createElement('script')
    node.id = id
    node.type = 'application/ld+json'
    document.head.appendChild(node)
  }
  node.textContent = JSON.stringify(data)
}

export function clearJsonLd(id) {
  document.getElementById(id)?.remove()
}

export function categorySlug(category) {
  return category.toLowerCase().trim().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
