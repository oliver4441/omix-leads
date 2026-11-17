// Editorial catalogue for OMIX Journal.
// Legacy short notes remain reachable for existing links but are excluded from
// discovery feeds and carry noindex until they are rewritten to this standard.
const legacy = { indexable: false }

const author = 'OMIX Engineering Desk'

export const articles = [
  {
    slug: 'modular-software-systems',
    title: 'Designing Modular Software Systems: Boundaries, Contracts, and Change',
    category: 'Engineering',
    excerpt: 'A practical guide to defining module boundaries, choosing integration contracts, and keeping a growing application changeable.',
    readTime: '7 min read',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    author,
    indexable: true,
    sections: [
      ['Start with responsibilities, not folders', [
        'Modularity is not a directory structure. It is a way of assigning responsibility so that a change in one part of a system does not force unrelated parts to change with it. A codebase can have hundreds of folders and still be tightly coupled if every feature reads the same tables, imports internal helpers from everywhere, or relies on undocumented side effects.',
        'Begin by listing the capabilities the system provides: identity, catalogue, orders, payments, notifications, reporting, and so on. For each capability, write down the decisions it owns, the data it is authoritative for, and the operations other parts of the system are allowed to request. These statements are more useful than drawing boxes before the responsibilities are understood.'
      ]],
      ['Choose boundaries around change', [
        'A useful boundary usually appears where the reasons for change differ. Pricing rules may change because the business changes its commercial model; authentication may change because security requirements or identity providers change. Those concerns should not be coupled simply because they appear on the same screen.',
        'Do not split every noun into a service. A modular monolith is often a better starting point than a distributed system: modules can share a deployment and transaction boundary while still enforcing ownership through public interfaces. Extract a separate service only when there is a concrete need such as independent scaling, isolation, release cadence, or team ownership.'
      ]],
      ['Make contracts explicit', [
        'A module should expose a small interface that describes what callers can ask it to do. Callers should not reach into another module’s internal tables or import its private implementation files. In a TypeScript application, this can be enforced with package exports, dependency rules, and tests that prevent forbidden imports.',
        'For an HTTP API, a contract includes request validation, response shape, authentication requirements, error codes, and compatibility expectations. For an internal module, it may be a typed function or command handler. The transport can differ; the important property is that the contract is stable and owned by the module that implements it.'
      ]],
      ['Keep data ownership clear', [
        'Shared databases do not require shared ownership. A module can own a set of tables while other modules interact with that data through an application interface. This reduces the temptation to make cross-feature updates that silently bypass validation, permissions, or business rules.',
        'When a workflow genuinely spans modules, make the coordination visible. A checkout process might ask the order module to create a pending order, the payment module to initiate a payment, and the notification module to send a status update. Each module remains responsible for its own state transitions. For multi-step operations, define what happens when a later step fails rather than assuming every step succeeds.'
      ]],
      ['Design for failure and observability', [
        'Boundaries become especially important when a dependency is unavailable. A module should return errors that callers can classify: invalid input, forbidden operation, missing resource, temporary dependency failure, or conflict. Avoid swallowing errors or returning a generic success response that hides incomplete work.',
        'Include a correlation identifier in logs and pass it across module boundaries. Record meaningful events such as payment initiation, order confirmation, and notification delivery. Metrics should measure operational outcomes—failure rate, queue age, latency, and retry count—not just whether a function was called.'
      ]],
      ['Test the boundary, not only the implementation', [
        'Unit tests are useful for local rules, but module boundaries need contract tests. Verify that callers can use the public interface, that validation rejects invalid requests, that error cases are stable, and that a module does not depend on another module’s private implementation. These tests make refactoring safer because they protect the promises other parts of the system rely on.',
        'A practical sequence is to start with one module, define its owner and public interface, move its rules behind that interface, and add tests before migrating callers. Repeat only when a boundary provides a real benefit. If a proposed module creates more coordination than it removes, keep it together and revisit the split when the system’s needs change.'
      ]],
      ['A decision checklist', [
        'Before creating a module or service, ask: Does it own a distinct business capability? Does it have a clear data authority? Can callers use it without depending on implementation details? Can it be tested independently? Is the operational cost of separating it justified? A “no” is not a failure; it is evidence that the boundary needs more thought.',
        'The goal is not maximum separation. The goal is a system where responsibilities are understandable, changes remain local where possible, and the cost of operating the architecture stays proportionate to the product.'
      ]]
    ],
    references: [
      ['Martin Fowler — Bounded Context', 'https://martinfowler.com/bliki/BoundedContext.html'],
      ['Martin Fowler — Monolith First', 'https://martinfowler.com/bliki/MonolithFirst.html'],
      ['Microsoft — Domain analysis for microservices', 'https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis']
    ]
  },
  {
    slug: 'building-veyra',
    title: 'Building Veyra as a Product Platform',
    category: 'Products',
    excerpt: 'A product note on discovery, metadata, provider boundaries and the difference between a catalogue and a viewing experience.',
    readTime: '2 min read',
    date: '2026-08-16',
    ...legacy,
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
    excerpt: 'A short product note on the connected workflows behind school management software.',
    readTime: '2 min read',
    date: '2026-08-16',
    ...legacy,
    sections: [
      ['The problem', 'Schools manage interconnected data across learners, staff, classes, timetables, finance, communication and reporting. Fragmented tools create duplicated work and inconsistent information.'],
      ['The platform approach', 'Decimal approaches school management as one connected system, allowing operational workflows to share the same underlying data and permissions.'],
      ['The goal', 'The objective is not simply to digitise forms. It is to reduce administrative friction while giving schools reliable information for daily decisions.']
    ]
  },
  {
    slug: 'why-choose-omix',
    title: 'Why Choose OMIX for Your Digital Product?',
    category: 'Why OMIX',
    excerpt: 'A company note about OMIX’s product engineering approach.',
    readTime: '2 min read',
    date: '2026-08-16',
    ...legacy,
    sections: [
      ['Beyond the interface', 'A useful product is more than a polished frontend. Data models, APIs, authentication, integrations, deployment and operations all contribute to whether a product works.'],
      ['Integration as a design concern', 'External services, payments and business workflows should be treated as architecture concerns rather than last-minute add-ons.'],
      ['A practical choice', 'OMIX is a fit for projects that need technical planning, implementation, integration and deployment under one delivery process.']
    ]
  },
  {
    slug: 'omix-vs-generic-agency',
    title: 'OMIX vs. a Generic Web Agency: What Is the Difference?',
    category: 'Why OMIX',
    excerpt: 'A company note about choosing between a brochure website and a software system.',
    readTime: '2 min read',
    date: '2026-08-16',
    ...legacy,
    sections: [
      ['Website delivery vs. system delivery', 'A conventional agency may optimise for pages and visual presentation. A software engagement also considers data, roles, APIs, payments and automation.'],
      ['One architecture across the project', 'Frontend, backend, database and third-party services should have explicit boundaries.'],
      ['When an agency is enough', 'A specialised design agency may be the right choice for a simple brochure website. More complex workflows require a broader engineering approach.']
    ]
  },
  {
    slug: 'built-to-integrate',
    title: 'Built to Integrate: Why Integration Is a First-Class Requirement',
    category: 'Why OMIX',
    excerpt: 'A company note on designing software around connected services.',
    readTime: '2 min read',
    date: '2026-08-16',
    ...legacy,
    sections: [
      ['The connected stack', 'Payments, messaging, identity, analytics, storage and business tools rarely live in one system. Integration boundaries are part of normal product architecture.'],
      ['Designing clear contracts', 'Stable APIs, validation, authentication and predictable error handling make integrations easier to test and replace.'],
      ['Reducing lock-in', 'A modular integration layer can isolate external providers and make it easier to change a service when requirements change.']
    ]
  },
  {
    slug: 'transparent-software-delivery',
    title: 'What a Transparent Software Delivery Process Looks Like',
    category: 'Why OMIX',
    excerpt: 'A company note on scope, milestones and production validation.',
    readTime: '2 min read',
    date: '2026-08-16',
    ...legacy,
    sections: [
      ['Start with the problem', 'Define users, workflows, constraints, integrations and intended outcomes before implementation.'],
      ['Make progress visible', 'Divide work into meaningful milestones so stakeholders can evaluate direction before the project is complete.'],
      ['Validate the live system', 'A project is not complete when code compiles. Domains, authentication, data flows, integrations and production behavior need validation.']
    ]
  },
  {
    slug: 'introducing-bifrost',
    title: 'AI Model Routing: Designing a Gateway Between Applications and Providers',
    category: 'AI & Automation',
    excerpt: 'How a model gateway can centralize provider adapters, routing policy, timeouts, fallback behavior, and usage visibility.',
    readTime: '7 min read',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    author,
    indexable: true,
    sections: [
      ['Why applications outgrow a single provider integration', [
        'A first AI feature often starts with one provider and one model. The application sends a prompt, receives a response, and moves on. As the product grows, different workloads may need different models: a low-latency model for classification, a stronger model for complex reasoning, and a vision-capable model for image input. Separate provider integrations spread credentials, request formats, retry rules, and usage tracking across the codebase.',
        'A model gateway places a controlled boundary between the application and the provider network. The application asks for a capability or an approved model alias; the gateway applies routing policy and communicates with the selected provider. This is an architectural pattern, not a guarantee that every provider or model behaves identically.'
      ]],
      ['Separate the public contract from provider adapters', [
        'The gateway should expose a stable request contract to internal applications while each provider adapter handles its own authentication, endpoint, request mapping, response mapping, and error translation. Keep provider-specific fields available where they matter, but avoid forcing every application to understand every provider’s API.',
        'Normalize the parts that are genuinely common: model identifier, input messages, output limits, timeout, usage metadata, and a structured error category. Preserve provider request IDs and raw diagnostic context for support. Over-normalization can hide useful capabilities, so the gateway should make provider-specific extensions explicit rather than silently dropping them.'
      ]],
      ['Make routing policy explicit and inspectable', [
        'Routing can be based on a configured alias, task type, data sensitivity, latency target, budget, or provider availability. A deterministic policy is easier to debug than a hidden “best model” heuristic. Start with a small allowlist of routes and document why each route exists.',
        'For example, a product might route short text classification to a lower-cost model and route a long-form synthesis task to a model selected for stronger reasoning. The gateway should record the policy decision, the model actually used, and the reason a fallback was selected. Do not route sensitive data to a provider unless the product’s data handling terms permit it.'
      ]],
      ['Handle timeouts, retries, and fallback carefully', [
        'A timeout means the gateway did not receive a usable response within the configured window; it does not always mean the provider did not process the request. Retrying a generation can incur duplicate cost or produce a different answer. Define retry rules by error class, use bounded attempts with jitter, and do not retry invalid requests or authentication failures as if they were transient.',
        'Fallback should be a policy decision, not an automatic loop through every provider. A fallback model may have different capabilities, context limits, safety behavior, or output format. If the application requires JSON or tool calling, verify that the fallback supports the required contract before sending the request. Surface a clear failure when no compatible route remains.'
      ]],
      ['Protect credentials and customer data', [
        'Provider credentials belong in server-side secret storage, never in browser bundles or mobile applications. Use separate credentials for environments, rotate them when access changes, and scope them to the smallest permissions available. The gateway should authenticate its callers and enforce per-application or per-user quotas before it forwards work.',
        'Log operational metadata without copying full prompts and completions by default. If content logging is required for debugging, define retention, access controls, redaction, and user disclosure. Treat provider responses as untrusted input: validate structured output, escape rendered text, and keep tool execution behind explicit authorization.'
      ]],
      ['Measure quality, latency, and cost together', [
        'A routing decision cannot be evaluated from token price alone. Track request success rate, end-to-end latency, time to first token for streaming workloads, input and output usage, retry count, fallback rate, and application-level quality signals. Compare like-for-like workloads and keep a record of model versions because provider behavior changes over time.',
        'Use sampled evaluations and representative prompts before moving traffic to a new route. A cheaper model that causes more retries or requires expensive downstream correction may not reduce total cost. Likewise, a faster model that regularly fails a required output schema can increase operational work.'
      ]],
      ['A staged implementation sequence', [
        'Start by listing the models and capabilities the application actually needs. Define a small internal interface, implement one provider adapter, and add tests for request mapping, response mapping, timeouts, and normalized errors. Add a second adapter only when there is a real use case for routing or fallback.',
        'Next, add explicit model aliases and a policy configuration that can be reviewed in version control. Introduce quotas, usage accounting, and structured logs before exposing the gateway to multiple applications. Finally, add controlled evaluation and fallback rules. This sequence avoids building a complex control plane before the basic request path is reliable.'
      ]]
    ],
    references: [
      ['OpenAI API documentation', 'https://platform.openai.com/docs/'],
      ['Anthropic API documentation', 'https://docs.anthropic.com/'],
      ['Google Gemini API documentation', 'https://ai.google.dev/gemini-api/docs'],
      ['OWASP — Secrets Management Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html']
    ]
  },
  {
    slug: 'reliable-webhook-consumers',
    title: 'Designing Reliable Webhook Consumers: Idempotency, Retries, and Reconciliation',
    category: 'Engineering',
    excerpt: 'A practical architecture for receiving duplicate or delayed webhook events without corrupting application state.',
    readTime: '8 min read',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    author,
    indexable: true,
    sections: [
      ['Assume delivery is at least once', [
        'A webhook is an HTTP request sent by one system to notify another that an event occurred. Providers commonly retry when they do not receive a successful response, and networks can fail after the receiver has committed work but before the sender receives the response. The same event can therefore arrive more than once. Events can also be delayed or delivered out of order.',
        'The receiver should be designed around these realities rather than assuming one request equals one business action. A duplicate “payment succeeded” notification must not create a second order, credit a wallet twice, or send repeated fulfilment instructions. The key property is idempotency: processing the same event more than once should have the same business effect as processing it once.'
      ]],
      ['Verify the sender before trusting the payload', [
        'Before changing business state, verify that the request came from the expected provider. Use the provider’s documented signature or authentication mechanism, compare signatures in constant time where applicable, and reject invalid or missing credentials. Validate the timestamp or replay window if the provider supplies one. Do not invent a signature format; implement the exact scheme documented by the sender.',
        'Treat the request body as untrusted input even after authentication. Enforce a reasonable body-size limit, parse JSON safely, validate required fields, and reject malformed identifiers. Keep secrets on the server and rotate them through a controlled process. Never log authorization headers, signing secrets, or complete payment credentials.'
      ]],
      ['Persist the event before doing expensive work', [
        'A robust receiver separates acknowledging the webhook from completing the full business workflow. After authentication and validation, write an event record to durable storage with a unique provider event ID, event type, received timestamp, payload reference or carefully minimized payload, and processing status. Enforce a unique constraint on the provider plus event ID so concurrent duplicate deliveries cannot both create new work.',
        'If the event is new, enqueue or schedule the business operation and return the success response the provider expects. A worker can then process the event with bounded retries. This keeps the HTTP handler short and reduces the chance that a slow downstream API causes the provider to time out and redeliver the same notification.'
      ]],
      ['Use a transaction for deduplication and state changes', [
        'The event record and the business state transition should be coordinated. If both live in the same database, use a transaction to claim the event and apply the state change atomically. If a worker crashes before commit, the transaction rolls back and the event can be retried. If it crashes after commit, the event is already marked complete and a duplicate attempt can safely exit.',
        'For work that crosses systems, use an outbox or durable job record. Commit the local state and the intent to publish together, then let a separate worker deliver the message. This avoids the gap where the database says an order is paid but the notification or fulfilment message was never sent. The downstream consumer should also be idempotent because queues and brokers can redeliver messages.'
      ]],
      ['Model retries by failure class', [
        'Not every failure should be retried. A temporary network error, provider rate limit, or service-unavailable response may be transient. Invalid data, failed signature verification, missing permissions, or an impossible state transition usually require investigation rather than repeated attempts. Store the error category, attempt count, next retry time, and last failure summary.',
        'Use exponential backoff with jitter and a maximum attempt count. After that limit, move the event to a dead-letter or review state with enough context for an operator to investigate. Provide a safe replay operation that reuses the original event identity and records who initiated the replay. Avoid manual database edits as the normal recovery mechanism.'
      ]],
      ['Handle ordering and conflicting events', [
        'A provider may deliver “payment completed” before a delayed “payment pending” event. Do not assume arrival order is business order. Where available, use the provider’s event creation timestamp, sequence number, or authoritative resource lookup to decide whether an event is newer. Prefer monotonic state transitions and reject transitions that would move a record backwards.',
        'If two valid events conflict, preserve both event records and make the resolution observable. For high-value operations, query the provider’s current resource state through its authenticated API rather than guessing which notification is correct. The exact source of truth depends on the provider and the contract it offers.'
      ]],
      ['Reconcile because webhooks are not a ledger', [
        'Even a well-designed receiver can miss events because of misconfiguration, prolonged outages, expired credentials, or provider-side delivery limits. A reconciliation job compares local records with the provider’s authoritative records over a defined time window. It should identify missing events, mismatched statuses, duplicate local effects, and operations stuck in pending states.',
        'Reconciliation must be safe to run repeatedly. It should create an auditable correction or reprocessing task rather than silently overwriting history. For payment systems, preserve the original transaction reference, the provider’s status, the local ledger entries, and the reason for any adjustment.'
      ]],
      ['Operational checks to keep', [
        'Monitor webhook request volume, authentication failures, duplicate rate, processing latency, retry count, dead-letter count, and the age of the oldest pending event. Alert on sustained backlog and reconciliation mismatches. Include a correlation ID in logs so support staff can trace a provider event through the HTTP handler, database, worker, and downstream API.',
        'Test duplicate delivery, concurrent duplicate requests, invalid signatures, slow downstream dependencies, worker crashes, out-of-order events, and replay after a dead-letter. A webhook integration is not production-ready merely because one successful test request changes a row in the database.'
      ]]
    ],
    references: [
      ['Stripe — Webhooks and delivery behavior', 'https://docs.stripe.com/webhooks'],
      ['AWS Prescriptive Guidance — Transactional outbox pattern', 'https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html'],
      ['OWASP — Web Service Security Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Web_Service_Security_Cheat_Sheet.html']
    ]
  },
  {
    slug: 'mpesa-stk-push-payment-lifecycle',
    title: 'M-PESA STK Push: Designing the Payment Lifecycle Around Asynchronous Callbacks',
    category: 'Payments & Integrations',
    excerpt: 'How to model an STK Push request, customer authorization, callback processing, ledger posting and reconciliation as separate payment states.',
    readTime: '8 min read',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    author,
    indexable: true,
    sections: [
      ['An STK Push is a workflow, not a synchronous charge', [
        'An STK Push asks a customer’s handset to approve a payment. The application initiates a request through the provider integration, the customer receives a prompt, and the provider later reports the outcome through an asynchronous callback or status mechanism. The initial API response confirms that the request was accepted for processing; it does not, by itself, prove that money was received.',
        'This distinction should shape the user interface and database model. Show a pending state while the customer is responding. Do not mark an order paid merely because the initiation endpoint returned a success code. A reliable payment system records the initiation request, waits for an authoritative outcome, and only then posts the corresponding financial effect.'
      ]],
      ['Separate orders, payment attempts, and ledger entries', [
        'An order describes what the customer intends to buy. A payment attempt describes one attempt to collect the amount for that order. A ledger entry records the financial effect after the payment outcome has been verified. Keeping these concepts separate allows a customer to retry a failed or expired payment without creating a second order or overwriting the history of the first attempt.',
        'A payment-attempt record should retain an internal identifier, order reference, amount, currency, customer reference, provider request identifiers, current status, timestamps, and a minimal callback audit trail. Do not store secrets or unnecessary personal data in the record. Use database constraints to prevent one provider transaction reference from being posted more than once.'
      ]],
      ['Model explicit states and allowed transitions', [
        'A practical lifecycle may include created, initiating, awaiting_customer, succeeded, failed, cancelled, timed_out, and reconciliation_required. The exact states should match the provider’s documented outcomes and the application’s needs. Keep the original provider response and the normalized application status separate so that future changes to mapping rules do not destroy evidence.',
        'Define allowed transitions centrally. For example, an attempt may move from awaiting_customer to succeeded after a verified success callback, or to failed after a verified terminal failure. A late callback should not blindly move a refunded or manually reconciled record backwards. Where a status is ambiguous, keep the attempt pending or mark it for reconciliation rather than guessing.'
      ]],
      ['Process callbacks as untrusted, repeatable events', [
        'The callback endpoint should validate the request shape, correlate it to a known payment attempt, and verify authenticity using the mechanism supported by the current provider contract. Do not rely only on a customer phone number or a user-supplied order ID to establish that a payment succeeded. If the provider does not sign callbacks, use its documented verification or transaction-status procedure and record the limitation in the threat model.',
        'Store each callback or status response with a unique event or transaction reference and enforce deduplication at the database layer. Apply the payment state transition and create the ledger posting in one transaction where possible. If the callback arrives twice, the second delivery should be acknowledged without creating a second credit, receipt, or fulfilment action.'
      ]],
      ['Post to a ledger only after verification', [
        'The payment attempt and the financial ledger answer different questions. The attempt records what happened during collection; the ledger records how money changes the account balance. When a verified success is received, create a balanced, immutable ledger transaction using the provider reference as an external identifier. If the same reference is received again, the unique constraint should prevent a duplicate posting.',
        'Avoid treating an editable “balance” column as the financial source of truth. A ledger should preserve the debit and credit entries that explain each movement. A displayed balance can be derived or maintained as a projection, but it must be recoverable from the underlying entries. Refunds, reversals, fees and marketplace splits should be represented as new transactions rather than edits to historical entries.'
      ]],
      ['Design for timeout, retry, and late success', [
        'A customer may close the prompt, lose connectivity, or wait longer than the user interface expects. A local timeout is not proof that the provider rejected the payment. Keep the attempt in a state that can be checked again, and avoid starting another collection attempt until the previous one has been resolved or safely superseded.',
        'If a new attempt is allowed, give it a distinct internal attempt ID and keep it linked to the same order. When an older attempt later succeeds, the application needs a defined policy: accept the payment and cancel the newer attempt if possible, or flag the order for manual review. The correct policy depends on whether multiple successful collections can be reversed and what the provider supports.'
      ]],
      ['Reconcile with provider records', [
        'Run a scheduled reconciliation process for attempts that remain pending, callbacks that were not received, and records whose local state conflicts with provider status. Reconciliation should use the official provider query or statement mechanism, compare transaction references and amounts, and produce an auditable result. Do not silently mark an attempt successful based on a customer screenshot or a front-end redirect.',
        'Track pending age, callback delivery failures, duplicate callbacks, amount mismatches, missing ledger postings and reconciliation exceptions. These are operational signals, not merely developer logs. A finance or support operator should be able to see why a payment is pending and what evidence is required to resolve it.'
      ]],
      ['Implementation checklist', [
        'Before production, verify the current Daraja API contract, credentials and environment configuration; validate the callback URL; test successful, cancelled, failed, duplicate and delayed outcomes; enforce idempotency in the database; verify that ledger entries cannot be duplicated; and test reconciliation after a simulated callback outage.',
        'Keep test and production credentials separate. Restrict who can inspect payment payloads, redact phone numbers and tokens in logs where practical, and document how to rotate credentials. Provider behavior and API versions can change, so use the official documentation for exact request fields, response codes, authentication and callback schemas rather than copying an old example from a blog post.'
      ]]
    ],
    references: [
      ['Safaricom Daraja Developer Portal', 'https://developer.safaricom.co.ke/'],
      ['Safaricom Developer Portal — API documentation', 'https://developer.safaricom.co.ke/APIs'],
      ['OWASP — Logging Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html']
    ]
  },
  {
    slug: 'offline-first-business-software',
    title: 'Offline-First Business Software: Local Writes, Sync Queues, and Conflict Resolution',
    category: 'Business Technology',
    excerpt: 'A practical design for business applications that must keep working through intermittent connectivity without losing or duplicating work.',
    readTime: '8 min read',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    author,
    indexable: true,
    sections: [
      ['Offline support starts with a workflow decision', [
        '“Offline-first” does not mean every feature must work without a network. It means the application identifies which user actions can safely happen locally, which require a server decision, and how the interface explains the difference. Recording a draft, adding an item to a local checklist, or capturing a stock count may be possible offline. Charging a payment card, checking a live account balance, or confirming a unique booking may require the server.',
        'Start by mapping the workflows users need during a connectivity interruption. For each action, define whether it can be created locally, what validation can run on the device, whether it can be edited before sync, and what happens if the server rejects it later. This avoids the false promise that every screen will behave exactly as it does online.'
      ]],
      ['Persist local work before showing success', [
        'A local-first interface should write a user action to durable device storage before it reports that the work is saved. Browser applications commonly use IndexedDB for structured records and larger datasets; mobile applications can use an appropriate local database. In-memory state is not sufficient because a tab can close, a device can restart, or the operating system can reclaim resources.',
        'Give locally saved records a stable client-generated identifier. Store the payload, creation time, last local edit time, sync status, and the server version or revision it was based on. The interface should distinguish “saved on this device” from “synced to the account” so users understand where the record currently exists.'
      ]],
      ['Use an explicit outbox for synchronization', [
        'An outbox is a durable queue of changes waiting to be sent to the server. Each operation has an operation ID, entity ID, operation type, payload, creation time, attempt count, and current status. When connectivity returns, a sync worker sends queued operations in a controlled order and marks them complete only after the server acknowledges them.',
        'The server should treat operation IDs as idempotency keys. If the device retries because the response was lost, the server can recognize the same operation and return its previous result instead of applying it twice. This is essential for actions that affect stock, invoices, attendance, orders or balances.'
      ]],
      ['Make conflict resolution a product rule', [
        'A conflict occurs when the server record changes after the device downloaded it but before the device’s offline edit is synchronized. A simple last-write-wins rule can be acceptable for low-risk preferences, but it can silently erase work in shared operational records. Choose a strategy based on the meaning of the data, not convenience.',
        'For a note field, merging or showing both versions may be enough. For a stock quantity, the system may need to store separate adjustment events rather than overwrite a total. For a timetable or booking, a server-side rule may reject a conflicting change and ask the user to review the latest state. The application should explain the conflict and provide a safe recovery path.'
      ]],
      ['Keep server authority and permissions intact', [
        'Local validation improves usability but is not a security boundary. A device can be modified, data can be replayed, and users can lose permissions while offline. The server must re-check identity, authorization, business constraints and current state when queued work arrives. If the user no longer has permission, the operation should be rejected with a clear status rather than silently applied.',
        'Avoid storing more data on a shared device than the workflow requires. Protect local records using platform security features where available, clear sensitive caches on sign-out, and consider how lost devices are revoked. Offline support increases the amount of data that may exist outside the server, so retention and device access are part of the threat model.'
      ]],
      ['Design sync for unreliable networks', [
        'Connectivity indicators are imperfect. A device can appear online while DNS, TLS, authentication or the application server is unavailable. Sync should use bounded retries with backoff, distinguish permanent validation errors from temporary failures, and avoid sending the same large batch repeatedly when only one operation failed.',
        'Expose sync status at the level users care about: how many changes are waiting, whether the last sync succeeded, and which items need attention. Keep a manual retry action for support situations. If the product supports multiple devices, define how updates from one device become visible to another and how stale local data is refreshed.'
      ]],
      ['Test the conditions users actually experience', [
        'Test airplane mode, intermittent connectivity, a device restart during sync, duplicate operation delivery, an expired login session, a permission change, conflicting edits from two devices, low storage, and a server validation error. Test with realistic record volumes; a design that works with five records may become unusable with thousands.',
        'Measure queue age, sync success rate, retry volume, conflict frequency, storage usage and the time required to recover after reconnecting. These measurements reveal whether offline support is genuinely helping users or simply moving failures from the server to the device.'
      ]],
      ['A sensible rollout sequence', [
        'Choose one low-risk workflow and make its local persistence reliable before adding background synchronization. Add the outbox and server idempotency next, then implement conflict handling for that workflow. Only after the first path is observable and tested should the pattern be extended to more sensitive records.',
        'Offline-first engineering is a trade-off between availability, consistency, security and complexity. The right design is not the one that queues every action; it is the one that clearly communicates what can be done offline, preserves user work, and reconciles changes safely when the server becomes reachable again.'
      ]]
    ],
    references: [
      ['MDN — IndexedDB API', 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'],
      ['MDN — Background Synchronization API', 'https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API'],
      ['Google web.dev — Offline data', 'https://web.dev/learn/pwa/offline-data/']
    ]
  }
  ,
  {
    slug: 'sms-commerce-feature-phone-architecture',
    title: 'Designing SMS Commerce for Feature Phones: Sessions, State Machines, and Payment Events',
    category: 'Payments & Integrations',
    excerpt: 'A reference architecture for letting customers browse a marketplace, place an order and track delivery through ordinary SMS messages.',
    readTime: '8 min read',
    date: '2026-11-17',
    updatedAt: '2026-11-17',
    author,
    noteType: 'Architecture proposal',
    indexable: true,
    sections: [
      ['Treat SMS as a constrained interface', [
        'A feature-phone shopping flow has no persistent app screen, rich product cards or reliable data connection. Each customer action arrives as a separate message, and the reply must fit the limits and cost expectations of SMS. The interaction therefore needs to be designed as a short conversation with explicit steps, not as a web checkout copied into text messages.',
        'A useful first version keeps the command vocabulary small: a welcome or help command, category selection, product search, item details, a buy command, confirmation, order status and an opt-out command. Every reply should tell the customer what happened and what they can do next. If a command is invalid, return a short example rather than silently dropping the message.'
      ]],
      ['Persist a session state machine', [
        'SMS is stateless at the transport layer, but the shopping journey is not. The application needs to remember whether a sender is browsing categories, viewing an item, confirming an order or checking delivery. A session record can store the sender identifier, current state, a small context object, creation time and last activity time.',
        'The state machine should define allowed transitions. For example, menu can move to browsing after a category selection; browsing can move to item_detail after a product selection; item_detail can move to confirm_order after a valid buy command. A BACK command returns to a known prior state. A HELP command explains the current state without changing it. Expired sessions should return to a safe menu rather than applying an old confirmation to a new order.',
        'Persist the transition before sending the next SMS. If the gateway retries an inbound webhook, the same message must not advance the session twice or create duplicate orders. Store an inbound message identifier when the provider supplies one; otherwise derive a carefully scoped deduplication key from the sender, message body and provider timestamp.'
      ]],
      ['Separate parsing from business operations', [
        'The inbound webhook should authenticate the gateway request, validate the sender and message fields, normalize the text, and pass a structured command to the session handler. Keep parsing separate from order creation and payment logic. This makes it possible to test commands without sending real messages or initiating real transactions.',
        'The parser should reject ambiguous commands and validate numeric product identifiers, quantities and order references. A message such as BUY 42 QTY 2 should resolve to a product that is still available and a quantity within the business rules. Never trust a price, total or product description supplied by the handset; retrieve those values from the server-side catalogue.'
      ]],
      ['Keep search concise and predictable', [
        'SMS search results need to be short. A practical design returns a small number of matches with an item number, abbreviated title and current price, then asks the customer to request details for one item. Full-text search can handle normal words while trigram similarity can help with minor spelling errors. The result limit should be small enough that the message remains readable and affordable.',
        'The application should make it clear when a result is unavailable or when a price has changed. A product selected from an old session must be revalidated before order creation. Search ranking should be deterministic enough that a customer can refer to the displayed item number in the next message.'
      ]],
      ['Model the order and payment as separate steps', [
        'An order records the items, quantity, price snapshot, delivery choice and customer intent. A payment attempt records one effort to collect the order total. These records should have separate identifiers and states. Creating an order does not mean it has been paid, and sending a payment prompt does not mean the provider has collected money.',
        'A proposed flow is: validate the order, create it in a pending-payment state, initiate the supported payment request, and send the customer a short instruction. The system should only confirm the order after it receives and verifies an authoritative payment result. If the payment response is delayed, keep the order pending and provide a status command rather than telling the customer that payment succeeded.',
        'Payment callbacks can be duplicated or arrive late. Store provider references, enforce uniqueness for successful transaction references, and make the order transition idempotent. Reconcile unresolved attempts through the provider’s documented status or statement mechanism. The exact M-PESA request fields, callback schema and verification process must follow the current Safaricom Daraja contract.'
      ]],
      ['Make delivery updates useful, not noisy', [
        'The order status command should return only information the customer needs: a human-readable order reference, current status, and the next expected step. Delivery notifications should be sent when the state changes in a way that matters to the customer, such as confirmation, dispatch or an exception requiring action. Avoid sending repeated messages for internal status updates.',
        'Do not expose a seller’s or rider’s private contact details unless the business process and privacy notice explicitly permit it. Use short-lived tracking links when a web view is useful, and avoid putting sensitive personal data into a URL or a message that can be seen on a shared handset.'
      ]],
      ['Design opt-out, rate limits and privacy from the start', [
        'A messaging channel needs a clear opt-out path. A STOP command should be recognized even when the user is in the middle of another state, recorded against the recipient, and respected by future promotional messages. Distinguish transactional order updates from marketing messages and apply the relevant consent and regulatory requirements to each category.',
        'Rate-limit outbound messages per sender and per workflow to prevent loops and unexpected cost. Keep message templates short, redact phone numbers in routine logs, restrict access to session and order records, and define retention for message content. A phone number is personal information; it should not be treated as a harmless session key.'
      ]],
      ['Test the failure paths before a pilot', [
        'Test duplicate inbound webhooks, out-of-order messages, expired sessions, misspelled commands, unavailable products, changed prices, delayed payment callbacks, duplicate payment notifications, STOP during an active order and temporary SMS-provider outages. Include a feature-phone test because message length, encoding and handset behavior can differ from a smartphone emulator.',
        'Measure successful command completion, abandoned sessions, invalid-command rate, message delivery failures, average messages per completed order, pending-payment age and reconciliation exceptions. These measurements help determine whether SMS reduces friction or simply moves complexity into customer support.',
        'This article describes a reference architecture proposal being explored for the OMIX marketplace. It is not a statement that an SMS shopping channel or every workflow described here is currently live. A production release would require provider onboarding, shortcode approval where applicable, compliance review, end-to-end testing and operational support.'
      ]]
    ],
    references: [
      ['OMIX Store — SMS commerce architecture proposal', 'https://github.com/oliver4441/stor1/blob/main/docs/architecture-sms-commerce.md'],
      ["Africa's Talking — SMS API documentation", 'https://developers.africastalking.com/docs/sms/overview'],
      ['Safaricom Daraja Developer Portal', 'https://developer.safaricom.co.ke/'],
      ['PostgreSQL — Full Text Search', 'https://www.postgresql.org/docs/current/textsearch.html']
    ]
  }
]

export const publicArticles = articles.filter(article => article.indexable !== false)
export const categories = [...new Set(publicArticles.map(article => article.category))]
