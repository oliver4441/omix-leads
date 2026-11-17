import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react'
import { SITE_NAME, SITE_URL, setCanonical, upsertMeta } from '../lib/seo'

const pages = {
  '/about': {
    eyebrow: 'THE PUBLICATION',
    title: 'About the OMIX Journal',
    intro: 'A technical publication documenting the reasoning, patterns and trade-offs behind software, infrastructure and digital products.',
    sections: [
      ['Who publishes this journal', [
        'The OMIX Journal is published by OMIX Digital Solutions, a software and technology company based in Kericho, Kenya. It is part of the company’s public knowledge resources and is connected to the engineering work and product development taking place across the OMIX ecosystem.',
        'Because the publisher also builds and operates products, articles about OMIX products and engineering decisions are company-published material. We identify that relationship rather than presenting company commentary as independent third-party reporting.'
      ]],
      ['What readers will find', [
        'The publication focuses on practical software engineering, architecture, AI and automation, cloud operations, payments and integrations, business technology, and product development. Articles aim to explain a problem, outline the relevant design choices, describe trade-offs, and provide references that readers can use to verify or explore the subject further.',
        'Tutorials and technical explainers are written for developers, technical founders, students and people responsible for operating digital systems. The level of detail varies by topic; an introductory note is labelled as such and is not presented as a complete implementation guide.'
      ]],
      ['How to use the material', [
        'Use the Journal as an educational resource and starting point for further investigation. Check linked primary documentation before applying provider-specific instructions, especially for payments, security, authentication and infrastructure. Software versions and external service contracts change, so an article may need updating as its subject evolves.'
      ]],
      ['Contact and corrections', [
        'If you find an error, broken reference or unclear explanation, contact the editorial team at omixsystems@gmail.com. Include the article URL and the relevant heading so the issue can be reviewed.'
      ]]
    ]
  },
  '/editorial-policy': {
    eyebrow: 'PUBLISHING STANDARDS',
    title: 'Editorial Policy',
    intro: 'The standards used to research, write, review, update and correct material published by the OMIX Journal.',
    sections: [
      ['Editorial purpose', [
        'The Journal exists to explain useful technical ideas and document product-engineering decisions. We prefer specific explanations, tested examples and clear limitations over generic summaries, keyword-led pages or promotional copy. Every article should have a reader problem it is trying to solve.'
      ]],
      ['Authorship and accountability', [
        'Articles may be attributed to a named contributor or to the OMIX Engineering Desk when the work is produced by the company’s editorial team. A team byline identifies the publishing group; it does not imply an individual author credential. We do not invent author biographies, certifications, client experience or professional qualifications.',
        'Where an article describes a specific OMIX product, the relationship is disclosed in the text. Product status is described as live, in development or experimental only when that status is verified at publication time.'
      ]],
      ['Research and sources', [
        'Technical claims should be checked against primary documentation, standards, source code or reproducible tests where possible. Articles should link to useful references and distinguish observed behavior from interpretation or recommendation. When an external provider controls the API contract, its current documentation takes precedence over examples copied from older articles.',
        'Comparisons should state the criteria and limitations. We do not publish invented benchmarks, customer counts, transaction volumes, testimonials or performance outcomes.'
      ]],
      ['Technical verification', [
        'Code and configuration examples should be reviewed for syntax, security implications and version assumptions before publication. Where an example is illustrative rather than executed in a production environment, the article should say so. Readers should not assume that a conceptual architecture is a deployed OMIX system.'
      ]],
      ['Use of AI-assisted tools', [
        'AI-assisted tools may be used for research organization, outlining, editing or drafting. They do not replace editorial responsibility. A human editor must verify factual claims, test technical instructions where feasible, check references and remove unsupported statements before publication. We do not publish bulk-generated pages whose primary purpose is to manipulate search rankings.'
      ]],
      ['Corrections and updates', [
        'When a material error is confirmed, we correct the article and update its revision date. Where the correction changes the meaning of a technical recommendation, we explain the change in the article. Minor spelling or formatting fixes may not require a separate correction note.'
      ]],
      ['Commercial transparency', [
        'The OMIX Journal is owned by OMIX Digital Solutions. Some articles discuss the company’s own products, services or engineering approach. Those relationships are stated in the content. If sponsored or affiliate material is introduced, it will be clearly labelled and kept distinct from ordinary editorial recommendations. Advertising does not determine technical conclusions.'
      ]],
      ['Feedback', [
        'Readers can suggest corrections, request clarification or raise a concern by emailing omixsystems@gmail.com. We review substantive reports and update content when the evidence supports a change.'
      ]]
    ]
  },
  '/privacy': {
    eyebrow: 'LEGAL / PRIVACY',
    title: 'Privacy Policy',
    intro: 'How the OMIX Journal handles information when you read articles, use the publication website or contact the editorial team.',
    sections: [
      ['Who operates the Journal', [
        'The OMIX Journal is operated by OMIX Digital Solutions in Kenya. This policy applies to blog.omixsystems.store. Other OMIX products and services may have separate privacy notices.'
      ]],
      ['Information you provide', [
        'If you contact the editorial team, you may provide your name, email address, article URL and the contents of your message. We use those details to respond to the request and maintain a record of the editorial conversation. Do not send passwords, payment details or sensitive personal information through general email.'
      ]],
      ['Technical information and hosting', [
        'When the website is requested, hosting and security providers may process technical information such as IP address, browser and device details, requested URL, referring page, timestamps and diagnostic logs. This information is used to deliver, secure and troubleshoot the website.'
      ]],
      ['Browser storage and offline support', [
        'The Journal stores your selected light or dark theme preference in browser local storage. The site also uses a service worker to cache the application shell and static assets for installation and offline access. Article content is included in the published application bundle. You can clear site data through your browser settings.'
      ]],
      ['Advertising and optional technologies', [
        'If advertising is enabled, Google and other advertising partners may use cookies or similar technologies to serve, measure and personalize advertisements, subject to their policies and your settings. Google explains its use of data from partner sites at policies.google.com/technologies/partner-sites. You can review Google ad personalization controls at adssettings.google.com. Advertising will not be described as active unless it has actually been enabled.',
        'Any optional analytics or non-essential tracking introduced in the future should be disclosed here and accompanied by any consent controls required by applicable law before activation.'
      ]],
      ['Sharing, retention and security', [
        'Information may be processed by providers needed to host, secure or operate the website and respond to messages. We do not sell personal information. We retain correspondence and technical records for only as long as reasonably necessary for the purpose collected, security, dispute resolution and legal obligations. Reasonable safeguards are used, but no internet system can guarantee absolute security.'
      ]],
      ['Your requests', [
        'You may contact omixsystems@gmail.com to request access to, correction of or deletion of information you have sent to the editorial team, subject to applicable legal requirements. You can manage browser storage and cookies through your browser and use the advertising settings linked above.'
      ]],
      ['Policy changes', [
        'This policy may change when website features, service providers or legal requirements change. The published revision date should be checked when relying on it.'
      ]]
    ]
  },
  '/terms': {
    eyebrow: 'LEGAL / TERMS',
    title: 'Terms of Use',
    intro: 'Conditions for reading, referencing and using the educational material published by the OMIX Journal.',
    sections: [
      ['Educational information', [
        'Journal articles are provided for general educational and informational purposes. They are not legal, financial, tax, medical, security or other professional advice, and they do not create a client relationship with OMIX Digital Solutions.'
      ]],
      ['Technical examples', [
        'Code, commands, architecture diagrams and configuration examples are provided as explanatory material. They may require adaptation for your environment and may become outdated as software and third-party services change. Review current documentation, test in a safe environment and apply appropriate security controls before production use.'
      ]],
      ['External services and links', [
        'Articles may link to third-party websites, documentation and products. OMIX does not control those sites and is not responsible for their availability, content, terms or privacy practices. A link is provided for reference and does not necessarily imply endorsement.'
      ]],
      ['Intellectual property and permitted use', [
        'Unless an article states otherwise, the Journal’s original text, graphics and design are owned by or licensed to OMIX Digital Solutions. You may link to an article and quote a reasonable excerpt with clear attribution and a link to the original. Do not republish complete articles or remove attribution without written permission. Third-party trademarks and referenced materials remain the property of their respective owners.'
      ]],
      ['Availability and changes', [
        'We may correct, update, move or remove material when necessary. We do not guarantee uninterrupted access or that every article will remain current. Where a technical recommendation changes materially, we aim to update the article and its revision date.'
      ]],
      ['Contact', [
        'Questions about these terms can be sent to omixsystems@gmail.com.'
      ]]
    ]
  }
}

export default function PublicationInfo() {
  const { pathname } = useLocation()
  const page = pages[pathname] || pages['/about']

  useEffect(() => {
    document.title = `${page.title} — ${SITE_NAME}`
    upsertMeta('description', page.intro)
    setCanonical(`${SITE_URL}${pathname}`)
  }, [page, pathname])

  return (
    <article className="hand-page">
      <header className="page-hero">
        <div className="content-wrap">
          <Link to="/wiki" className="back-link"><ArrowLeft size={16} aria-hidden="true" /> OMIX Journal</Link>
          <p className="kicker mt-7">{page.eyebrow}</p>
          <h1 className="hand-h1 mt-4 max-w-[20ch]">{page.title}</h1>
          <p className="hand-lead mt-6 max-w-[65ch]">{page.intro}</p>
        </div>
      </header>
      <div className="content-wrap hand-section">
        <main className="reading-column">
          {page.sections.map(([heading, paragraphs], index) => (
            <section key={heading} className="reading-section">
              <span className="reading-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="prose-hand">
                <h2 className="hand-h3">{heading}</h2>
                {paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              </div>
            </section>
          ))}
          <div className="card card-pad mt-12">
            <BookOpen size={20} aria-hidden="true" className="mark-accent" />
            <p className="hand-h3 mt-3">Questions or corrections?</p>
            <p className="ink-soft mt-2">Contact the editorial team if you find an issue or want to clarify a published explanation.</p>
            <a className="btn btn-secondary mt-5" href="mailto:omixsystems@gmail.com">Email the editorial team <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </main>
      </div>
    </article>
  )
}
