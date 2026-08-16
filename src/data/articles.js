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
  },
  {
    slug: 'why-choose-omix',
    title: 'Why Choose OMIX for Your Digital Product?',
    category: 'Why OMIX',
    excerpt: 'What separates an integrated product engineering partner from a company that simply delivers a website.',
    readTime: '6 min read',
    date: '2026-08-16',
    sections: [
      ['We think beyond the interface', 'A useful product is more than a polished frontend. We consider the data model, APIs, authentication, integrations, deployment and operational workflow that make the product actually work.'],
      ['Integration is part of the design', 'OMIX is built around Optimal Modular Integration Experts. External services, payments, business workflows and internal systems are treated as architecture concerns rather than last-minute add-ons.'],
      ['You get a path beyond the MVP', 'We prefer modular foundations that can be extended as requirements become clearer. The aim is to avoid rebuilding the entire system every time the business grows.'],
      ['We build products, not just deliverables', 'Our own products such as Veyra and Phikila give us direct experience with the trade-offs involved in shipping and operating software.'],
      ['A practical choice', 'OMIX is a strong fit when you need one technical partner to move from problem definition through architecture, implementation, integration and deployment.']
    ]
  },
  {
    slug: 'omix-vs-generic-agency',
    title: 'OMIX vs. a Generic Web Agency: What Is the Difference?',
    category: 'Why OMIX',
    excerpt: 'When a business needs software infrastructure rather than a brochure site, the delivery model matters.',
    readTime: '5 min read',
    date: '2026-08-16',
    sections: [
      ['Website delivery vs. system delivery', 'A conventional agency may optimise for pages and visual presentation. OMIX approaches a digital engagement as a system when the workflow requires data, roles, APIs, payments or automation.'],
      ['One architecture across the project', 'Frontend, backend, database and third-party services should have explicit boundaries. This reduces duplicated logic and makes future changes safer.'],
      ['Operations after launch', 'Deployment, domains, integrations, monitoring and maintenance are part of the lifecycle. A production system should not become an orphan after the final design review.'],
      ['When an agency is enough', 'If you only need a simple brochure site, a specialised design agency may be the right choice. OMIX becomes more valuable as the software itself becomes part of the business operation.']
    ]
  },
  {
    slug: 'built-to-integrate',
    title: 'Built to Integrate: Why We Make Integration a First-Class Requirement',
    category: 'Why OMIX',
    excerpt: 'Modern businesses depend on connected services. Architecture should acknowledge that from day one.',
    readTime: '5 min read',
    date: '2026-08-16',
    sections: [
      ['The modern stack is connected', 'Payments, messaging, identity, analytics, storage and business tools rarely live in one system. Integration boundaries are therefore part of normal product architecture.'],
      ['Designing clear contracts', 'Stable APIs, validation, authentication and predictable error handling make integrations easier to test and replace.'],
      ['Reducing vendor lock-in', 'A modular integration layer can isolate external providers. That makes it easier to change a service when pricing, capabilities or business requirements change.'],
      ['The OMIX principle', 'We design systems so the pieces can communicate without becoming inseparable. That is the practical meaning behind our integration-first approach.']
    ]
  },
  {
    slug: 'transparent-software-delivery',
    title: 'What a Transparent Software Delivery Process Looks Like',
    category: 'Why OMIX',
    excerpt: 'How clear scope, visible milestones and production validation reduce surprises during a software project.',
    readTime: '4 min read',
    date: '2026-08-16',
    sections: [
      ['Start with the problem', 'Before implementation, define the users, workflow, constraints, integrations and outcome. This creates a reference point for technical decisions.'],
      ['Make progress visible', 'Work should be divided into meaningful milestones so stakeholders can evaluate direction before everything is finished.'],
      ['Validate the live system', 'A project is not complete when code compiles. Domains, authentication, data flows, integrations and the production experience need validation.'],
      ['Keep the system maintainable', 'Documentation, modular code and a clear deployment path reduce the cost of the next change after launch.']
    ]
  }
]

export const categories = [...new Set(articles.map(article => article.category))]
