import { articles } from '../src/data/articles.js'

const minimumWords = 450
const published = articles.filter(article => article.indexable !== false)
const issues = []

for (const article of published) {
  const body = article.sections.flatMap(([heading, content]) => [
    heading,
    ...(Array.isArray(content) ? content : [content]),
  ]).join(' ')
  const words = [article.title, article.excerpt, body]
    .join(' ')
    .match(/[A-Za-z0-9][A-Za-z0-9'’\\-]*/g) || []

  if (words.length < minimumWords) issues.push(`${article.slug}: ${words.length} words (minimum ${minimumWords})`)
  if (!article.author) issues.push(`${article.slug}: missing author attribution`)
  if (!article.updatedAt) issues.push(`${article.slug}: missing updatedAt date`)
  if (!Array.isArray(article.references) || article.references.length < 2) {
    issues.push(`${article.slug}: add at least two useful references`)
  }
  if (!article.category || !article.date || !article.readTime) {
    issues.push(`${article.slug}: missing category, publication date or reading-time estimate`)
  }
}

if (issues.length) {
  console.error('Editorial quality checks failed:')
  for (const issue of issues) console.error(`- ${issue}`)
  process.exitCode = 1
} else {
  console.log(`Editorial quality checks passed for ${published.length} indexable articles (minimum ${minimumWords} words each).`)
}
