// Single source of truth for per-route <head> metadata.
//
// This module is PURE — it must not touch `document`, `window` or `localStorage`.
// Both the browser (via applyMeta) and the build-time prerenderer consume it, so the
// HTML a crawler reads and the metadata a visitor's tab shows can never drift apart.

import { BRAND_URL, SITE_URL, SITE_NAME, categorySlug } from './seo.js'
import { articles, categories } from '../data/articles.js'

const ORGANISATION = { '@type': 'Organization', name: 'OMIX Systems', url: `${BRAND_URL}/` }

const noindex = (title, description, url) => ({
  title,
  description,
  url,
  robots: 'noindex,follow',
  ogType: 'website',
  jsonLd: [],
})

/**
 * Resolve a request path to its metadata.
 * Returns null for paths we deliberately do not prerender.
 */
export function getMeta(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/') return homeMeta()
  if (path === '/wiki') return wikiMeta(null)
  if (path.startsWith('/category/')) {
    const slug = decodeURIComponent(path.slice('/category/'.length))
    const name = categories.find(c => categorySlug(c) === slug)
    return wikiMeta(name || null, path)
  }
  if (path.startsWith('/wiki/') || path.startsWith('/articles/')) {
    const slug = decodeURIComponent(path.split('/').filter(Boolean).pop())
    return articleMeta(slug) || notFoundMeta()
  }
  if (path.startsWith('/admin')) {
    return noindex(
      'Admin — OMIX Journal',
      'Private administrative area.',
      `${SITE_URL}${path}`
    )
  }
  return notFoundMeta()
}

function notFoundMeta() {
  return noindex(
    `Page not found — ${SITE_NAME}`,
    'The page you requested does not exist or may have moved.',
    `${SITE_URL}/`
  )
}

function homeMeta() {
  const url = `${SITE_URL}/`
  const title = 'OMIX Journal — Engineering, Architecture & Product Notes'
  const description =
    'The OMIX Journal is a knowledge base covering software engineering, architecture, cloud systems, product development and business technology.'
  return {
    title,
    description,
    url,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1',
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description,
        publisher: ORGANISATION,
      },
    ],
  }
}

function wikiMeta(categoryName, explicitPath) {
  const title = categoryName ? `${categoryName} — ${SITE_NAME}` : `Knowledge Base — ${SITE_NAME}`
  const description = categoryName
    ? `OMIX Journal articles about ${categoryName.toLowerCase()}, software engineering and digital products.`
    : 'Engineering notes, product thinking, business technology and practical software architecture from OMIX.'
  const url = explicitPath
    ? `${SITE_URL}${explicitPath}`
    : categoryName
      ? `${SITE_URL}/category/${categorySlug(categoryName)}`
      : `${SITE_URL}/wiki`
  const visible = categoryName ? articles.filter(a => a.category === categoryName) : articles
  return {
    title,
    description,
    url,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1',
    ogType: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: visible.map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/wiki/${a.slug}`,
            name: a.title,
          })),
        },
      },
    ],
  }
}

function articleMeta(slug) {
  const article = articles.find(a => a.slug === slug)
  if (!article) return null

  const url = `${SITE_URL}/wiki/${article.slug}`
  return {
    title: `${article.title} — ${SITE_NAME}`,
    description: article.excerpt,
    url,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1',
    ogType: 'article',
    publishedTime: article.date,
    section: article.category,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: 'en',
        author: ORGANISATION,
        publisher: ORGANISATION,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: article.category,
        keywords: [article.category, 'OMIX', 'software engineering', 'digital products'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Knowledge Base', item: `${SITE_URL}/wiki` },
          { '@type': 'ListItem', position: 2, name: article.category, item: `${SITE_URL}/category/${categorySlug(article.category)}` },
          { '@type': 'ListItem', position: 3, name: article.title, item: url },
        ],
      },
    ],
  }
}

/** Every path the prerenderer should emit as a static file. */
export function getPrerenderPaths() {
  const paths = ['/', '/wiki']
  for (const c of categories) paths.push(`/category/${categorySlug(c)}`)
  for (const a of articles) paths.push(`/wiki/${a.slug}`)
  return paths
}