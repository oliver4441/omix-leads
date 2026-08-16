export const articles = [
  {
    slug: 'modular-software-systems',
    title: 'What We Mean by Modular Software Systems',
    category: 'Engineering',
    excerpt: 'Why we design software as connected modules instead of isolated features.',
    readTime: '4 min read',
    date: '2026-08-16',
    sections: [
      ['The idea', 'Modular software separates responsibilities into focused components with clear interfaces. This makes systems easier to evolve without forcing every change through the entire application.'],
      ['Integration first', 'At OMIX, integration is part of architecture from the beginning. APIs, data, authentication, payments and deployment boundaries should be explicit rather than patched in later.'],
      ['Why it matters', 'A modular system can replace or extend one part without redesigning everything around it. That is particularly useful for products that need to grow from an MVP into a production platform.']
    ]
  },
  {
    slug: 'building-veyra',
    title: 'Building Veyra as a Product Platform',
    category: 'Products',
    excerpt: 'A product note on building a cinematic streaming experience as a scalable web platform.',
    readTime: '5 min read',
    date: '2026-08-16',
    sections: [
      ['Product direction', 'Veyra is designed around discovery, rich media presentation and a focused viewing experience rather than treating the interface as a generic content catalogue.'],
      ['Architecture', 'The platform separates presentation, application services, data and external integrations so individual layers can evolve independently.'],
      ['Next', 'The product continues to evolve through incremental releases, performance work and integrations rather than a single large rewrite.']
    ]
  },
  {
    slug: 'school-management-platforms',
    title: 'Why School Management Platforms Need Better Workflows',
    category: 'Business Technology',
    excerpt: 'A look at the workflow problem behind modern school management software.',
    readTime: '4 min read',
    date: '2026-08-16',
    sections: [
      ['The problem', 'Schools manage interconnected data across learners, staff, classes, timetables, finance, communication and reporting. Fragmented tools create duplicated work and inconsistent information.'],
      ['The platform approach', 'Phikila approaches school management as one connected system, allowing operational workflows to share the same underlying data and permissions.'],
      ['The goal', 'The objective is not simply to digitise forms. It is to reduce administrative friction while giving schools reliable information for daily decisions.']
    ]
  }
]

export const categories = [...new Set(articles.map(article => article.category))]
