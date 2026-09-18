import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "degissnap",
    name: "Visual Tizita",
    tagline: "An AWS-native event companion for sharing, preserving, and reliving memories",
    status: "Production",
    category: ["AWS", "SaaS", "Full Stack"],
    summary:
      "Production event platform with no-account guest uploads, private galleries, moderation, downloads, slideshow, guestbook, analytics, cover artwork, QR sharing, and host operations.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio"}/assets/projects/Visual-Tizita-thumbnail.jpg`,
    thumbnailAlt: "Visual Tizita brand preview for the AWS-native event companion platform",
    accent: "violet",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "AWS Amplify",
      "Amazon Cognito",
      "AWS AppSync",
      "Amazon DynamoDB",
      "Amazon S3",
      "AWS Lambda",
      "Amazon SES",
      "Amazon SNS",
      "GraphQL",
    ],
    technologyGroups: [
      { label: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
      { label: "AWS", items: ["AWS Amplify Gen 2", "Amazon Cognito", "AWS AppSync", "Amazon DynamoDB", "Amazon S3", "AWS Lambda", "Amazon SES", "Amazon SNS"] },
      { label: "API", items: ["GraphQL"] },
    ],
    liveUrl: "https://nymevents.com",
    repositoryUrl: null,
    role: "Founder, product designer, full stack engineer, and AWS architect",
    platformType: "Responsive web application and event companion, with guest access through shared links and QR codes",
    servesWho: "Event hosts who need one place to manage event memories and guests who want to contribute, browse, react to, and download media without creating an account",
    problem: [
      "Event memories are usually split across phones, group chats, social platforms, and cloud folders. Hosts have little control, guests face signup friction, and meaningful photos become difficult to collect after the event.",
      "The platform also needed to work during a real event: fast mobile entry, private access, moderation, live display, downloads, engagement, and operational tools without forcing every guest to install an app.",
    ],
    solution: [
      "Visual Tizita gives each event a private companion page reached through a QR code or shared link. Guests can upload photos and videos without accounts, browse the gallery, leave guestbook messages, react, view a slideshow, and download memories.",
      "Hosts use a separate authenticated dashboard to create and manage events, moderate uploads, control cover artwork, review analytics, generate QR codes, manage media, and preserve completed events through archive workflows.",
      "The platform has also supported a real NACLASSU 2026 Event Companion deployment, proving that the shared foundation can support event-specific public experiences and operational workspaces.",
    ],
    contribution: [
      { label: "Product and brand", description: "Led the rebrand from DegisSnap to Visual Tizita and defined the host, guest, event-companion, and monetization direction." },
      { label: "Frontend engineering", description: "Built the React and Vite experiences for anonymous guest access, gallery, downloads, slideshow, guestbook, event creation, and host operations." },
      { label: "AWS architecture", description: "Designed the Amplify Gen 2 backend using Cognito, AppSync, DynamoDB, S3, and Lambda, with SES and SNS integrations added for operational communication." },
      { label: "Security and privacy", description: "Separated host authentication from guest access, enforced ownership boundaries, protected private event data, and designed moderation and abuse-control paths." },
      { label: "Deployment and operations", description: "Established us-west-2 as the canonical AWS region, isolated staging from production, and managed guarded production promotion and rollback branches." },
      { label: "Quality engineering", description: "Expanded automated coverage through the NACLASSU milestone, where the full repository reached 974 passing tests across 72 files." },
    ],
    features: [
      { title: "QR based guest access", description: "Guests scan a code or open a link to reach the event gallery immediately, with no signup." },
      { title: "Guest uploads without accounts", description: "Anyone with the link can add photos to the shared gallery." },
      { title: "Private event galleries", description: "Each event gets its own gallery, scoped so only people with the link can see it." },
      { title: "Host authentication and dashboard", description: "Hosts sign in with Cognito to manage their events, media, and settings." },
      { title: "Moderation", description: "Hosts can review and remove uploads that should not stay in the gallery." },
      { title: "Live slideshow", description: "Photos can be displayed as a running slideshow, useful for screens at the event itself." },
      { title: "Guestbook, loves, and comments", description: "Guests can leave messages and react to photos, giving the gallery a social layer." },
      { title: "Event analytics", description: "Hosts can see engagement across their event from the dashboard." },
      { title: "Event cover management", description: "Hosts choose and update the cover photo representing the event." },
      { title: "Photo and video downloads", description: "Guests can save event media, with download flows designed for original and optimized formats." },
      { title: "Event archives", description: "A Lambda-backed archive workflow packages completed event media for long-term preservation." },
      { title: "Event Companion deployments", description: "The shared platform can power branded event experiences such as the NACLASSU 2026 companion." },
    ],
    architecture: [
      { label: "Client", service: "React + Vite", description: "Guest and host experiences share one frontend, with routes and permissions split by role.", icon: "layout" },
      { label: "Authentication", service: "Amazon Cognito", description: "Handles host sign in, identity, and session management. Guest access does not require an account.", icon: "shield-check" },
      { label: "API", service: "AWS AppSync", description: "GraphQL API in front of the application data, enforcing ownership rules between hosts, events, and guest uploads.", icon: "network" },
      { label: "Data", service: "Amazon DynamoDB", description: "Stores events, guest metadata, guestbook entries, comments, and love reactions.", icon: "database" },
      { label: "Media", service: "Amazon S3", description: "Stores uploaded photos and event cover images.", icon: "image" },
      { label: "Workflows", service: "AWS Lambda", description: "Runs backend workflows such as event archive generation and operational access paths.", icon: "settings" },
      { label: "Deployment", service: "AWS Amplify", description: "Builds, hosts, and deploys the application, including the production environment in Oregon (us-west-2).", icon: "rocket" },
    ],
    architectureNote:
      "Guests enter through scoped event links and unauthenticated AWS access, while hosts authenticate through Cognito. AppSync and ownership rules separate host-managed records from guest interactions, DynamoDB stores application state, S3 stores media, and Lambda handles workflows such as archives. Amplify builds and deploys the stack in the canonical us-west-2 environment, with staging kept isolated from production.",
    aws: {
      productionRegion: "us-west-2",
      regionLabel: "Oregon",
      services: ["AWS Amplify", "Amazon Cognito", "AWS AppSync", "Amazon DynamoDB", "Amazon S3", "AWS Lambda", "Amazon SES", "Amazon SNS"],
    },
    challenges: [
      {
        title: "Letting guests contribute without an account",
        description: "Guest uploads had to work without authentication while still being scoped to the right event and protected from abuse. That meant designing authorization rules in AppSync that trust a shared event link rather than a signed in identity, while keeping host owned data locked down.",
      },
      {
        title: "Keeping host data properly scoped",
        description: "With Cognito identities and AppSync resolvers, every read and write needed an ownership check so one host could never see or modify another host's event, guests, or media.",
      },
      {
        title: "Running a real production environment",
        description: "Moving from a working build to a deployed AWS application meant dealing with real environment management: setting up the production region in Oregon, retiring earlier environments safely, and keeping Amplify deployments predictable.",
      },
      {
        title: "Growing one product into an event platform",
        description: "The system evolved from photo sharing into a reusable event companion with branded experiences and operational workspaces. That required keeping shared platform capabilities separate from event-specific data and permissions.",
      },
    ],
    results: [
      "Deployed and running in production on AWS in us-west-2 (Oregon).",
      "Delivered and verified a NACLASSU 2026 Event Companion milestone on phone and desktop.",
      "The NACLASSU milestone branch reached 974 passing tests across 72 files.",
      "Staging and production environments are isolated, with guarded production promotion and rollback paths.",
    ],
    learnings: [
      "Building the guest side taught me how much authorization design changes when half your users never log in. I had to think about permissions in terms of what a link can do, not just what a signed in user can do.",
      "Running a real Amplify production deployment, including retiring an older region, gave me a much better sense of what operating an AWS application actually involves beyond just building the features.",
      "Supporting a real event showed me that privacy, moderation, download reliability, event-day speed, and rollback readiness matter as much as the visible gallery experience.",
    ],
    relatedCredentialNames: ["AWS re/Start Graduate", "AWS Skills Center Cloud Practitioner Foundations", "Introduction to Cybersecurity"],
    evidence: ["Production AWS deployment in us-west-2", "Verified NACLASSU event companion milestone", "974 passing tests across 72 files at the NACLASSU milestone"],
  },
  {
    slug: "naep",
    name: "NAEP",
    tagline: "A provider-agnostic engineering foundation for reusable AI-assisted software workflows",
    status: "Active Build",
    category: ["AI", "Engineering Platform"],
    summary:
      "An early-alpha TypeScript platform and CLI for creating, inspecting, and validating structured engineering workspaces, with a roadmap toward reusable knowledge and provider-independent AI runtimes.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio"}/assets/projects/NAEP-thumbnail.png`,
    thumbnailAlt: "Concept design for the future NAEP engineering platform dashboard",
    accent: "blue",
    technologies: ["TypeScript", "Node.js", "Commander.js", "npm workspaces"],
    technologyGroups: [
      { label: "Implementation", items: ["TypeScript", "Node.js", "Commander.js"] },
      { label: "Architecture", items: ["npm workspaces", "ES modules", "Core + CLI packages"] },
    ],
    liveUrl: null,
    repositoryUrl: "https://github.com/nebiyumekonnen17/NAEP",
    role: "Founder, platform architect, and TypeScript engineer",
    platformType: "Open-source TypeScript monorepo and command-line developer platform",
    servesWho: "Developers and teams who want repeatable engineering standards, project structure, and AI-assisted workflows without tying their knowledge to one model provider",
    problem: [
      "AI-assisted projects often accumulate prompts, decisions, standards, and lessons in disconnected places. That makes good engineering practices difficult to reuse and leaves project quality dependent on whichever model or tool happens to be in use.",
      "NAEP starts by standardizing the workspace itself: the files, directories, manifest, validation rules, and command-line operations that give future automation a dependable foundation.",
    ],
    solution: [
      "The implemented alpha separates reusable platform logic into @naep/core and exposes it through @naep/cli. The core package defines workspace structure, creates manifests and required directories, parses configuration, and reports validation issues.",
      "The CLI currently exposes init, doctor, and workspace info commands. Broader knowledge-engine, runtime-provider, project-generation, and multi-agent capabilities are documented architectural direction rather than presented as finished features.",
    ],
    contribution: [
      { label: "Platform direction", description: "Defined the provider-agnostic principle: models are replaceable, while engineering knowledge remains the durable asset." },
      { label: "Monorepo architecture", description: "Separated reusable workspace behavior into @naep/core and the developer interface into @naep/cli." },
      { label: "Workspace engine", description: "Implemented workspace creation, manifest serialization and parsing, required-file checks, and structured validation results." },
      { label: "CLI engineering", description: "Implemented init, doctor, and workspace info commands with Commander.js and distributable Node.js entry points." },
      { label: "Engineering governance", description: "Established ADR, RFC, architecture, release, contribution, security, and platform specification foundations." },
    ],
    features: [
      { title: "Workspace initialization", description: "The init command creates the required engineering workspace structure and a versioned naep.json manifest." },
      { title: "Workspace diagnostics", description: "The doctor command checks required directories, files, and manifest validity and reports actionable issues." },
      { title: "Workspace inspection", description: "The workspace info command validates a workspace before displaying its name, schema version, creation version, and path." },
      { title: "Reusable core package", description: "Workspace behavior lives in @naep/core so other interfaces can reuse it without duplicating CLI logic." },
      { title: "Governance foundation", description: "ADRs, RFC templates, contribution guidance, architecture documentation, and release artifacts make decisions reviewable." },
      { title: "Provider-independent roadmap", description: "Runtime directories and specifications reserve clean boundaries for Ollama, OpenAI, Claude, Gemini, and future providers." },
    ],
    architecture: [
      { label: "Developer interface", service: "@naep/cli", description: "Commander.js commands provide workspace initialization, diagnostics, and inspection.", icon: "layout" },
      { label: "Platform logic", service: "@naep/core", description: "Reusable TypeScript APIs own workspace creation, validation, definitions, and manifest handling.", icon: "settings" },
      { label: "Workspace contract", service: "naep.json + specifications", description: "A versioned manifest and documented directory contract define a valid engineering workspace.", icon: "database" },
      { label: "Future runtimes", service: "Provider adapters", description: "Documented boundaries reserve local and cloud runtime integrations without claiming they are complete.", icon: "network" },
    ],
    architectureNote:
      "The current executable path is intentionally small: CLI commands call @naep/core, which applies a versioned workspace definition and reads or writes naep.json. Knowledge engines, provider runtimes, project generators, and multi-agent systems remain roadmap layers behind those boundaries.",
    challenges: [
      {
        title: "Turning principles into enforceable structure",
        description: "A manifesto alone cannot make projects consistent. The first implementation challenge was translating platform principles into a concrete workspace contract that the CLI can create and validate.",
      },
      {
        title: "Keeping the CLI thin",
        description: "Workspace behavior needed to remain reusable outside the command line, so creation, validation, and manifest logic live in the core package while commands focus on user interaction.",
      },
      {
        title: "Separating implementation from roadmap",
        description: "NAEP has an ambitious multi-stage architecture. Clear versioning and documentation are necessary so future provider and agent plans do not get confused with the smaller alpha that exists today.",
      },
    ],
    results: [
      "Published the NAEP source repository with an Apache 2.0 license and contributor, security, release, ADR, and RFC foundations.",
      "The TypeScript @naep/core and @naep/cli packages compile successfully from the npm workspace build.",
      "Implemented executable init, doctor, and workspace info command paths in the alpha CLI.",
    ],
    learnings: [
      "Starting with workspace contracts made the platform idea testable before building model integrations: the CLI can already enforce whether a project has the structure NAEP expects.",
      "Separating core logic from the CLI creates a cleaner path for future desktop, web, or agent interfaces to reuse the same rules.",
    ],
    relatedCredentialNames: ["Explore Emerging Tech"],
    evidence: ["Public source repository", "Successful TypeScript monorepo build", "Implemented init, doctor, and workspace info commands"],
    notes: "Active early-alpha development. Dashboard, knowledge-engine, provider-runtime, and multi-agent gallery views are product-direction concepts, not shipped interfaces.",
  },
  {
    slug: "nehas-digital-signage",
    name: "Nehas Digital Signage",
    tagline: "An AWS-native platform for operating screen fleets, content, campaigns, and reliable playback",
    status: "Active Build",
    category: ["AWS", "Enterprise SaaS", "Digital Signage"],
    summary:
      "Development-deployed digital signage platform with tenant-scoped operations, secure media delivery, playlist and campaign publishing, web and desktop players, proof of play, observability, and controlled device releases.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio"}/assets/projects/Nehas-Digital-Signage-thumbnail.png`,
    thumbnailAlt: "Nehas Digital Signage dashboard showing screen status, a world map, and alerts",
    accent: "teal",
    technologies: ["TypeScript", "React", "Vite", "AWS Amplify Gen 2", "Amazon Cognito", "AWS Lambda", "Amazon DynamoDB", "Amazon S3", "Amazon CloudFront", "Amazon API Gateway", "AWS AppConfig", "Amazon SQS", "Amazon CloudWatch", "Electron"],
    technologyGroups: [
      { label: "Applications", items: ["TypeScript", "React", "Vite", "Electron"] },
      { label: "AWS platform", items: ["AWS Amplify Gen 2", "Amazon Cognito", "AWS Lambda", "Amazon DynamoDB", "Amazon API Gateway"] },
      { label: "Media and delivery", items: ["Amazon S3", "Amazon CloudFront", "Amazon SQS", "AppSync Events"] },
      { label: "Operations", items: ["AWS AppConfig", "Amazon CloudWatch", "CloudWatch Synthetics", "Amazon SNS"] },
    ],
    liveUrl: null,
    repositoryUrl: null,
    role: "Founder, product architect, full stack engineer, and AWS platform designer",
    platformType: "Multi-tenant enterprise SaaS with web, Windows, and Raspberry Pi player paths",
    servesWho: "Organizations that operate networks of digital signage screens and need central control over content, scheduling, and device health",
    problem: [
      "Running digital signage at any real scale means more than pushing an image to a screen. Someone has to know which screens are online, roll out content on schedule, react when a screen goes offline, and keep everything consistent across a growing fleet.",
      "An earlier version of this idea existed as a read only reference build on Supabase. It showed which workflows mattered, but it was not the system this platform is being built as. Nehas is a new AWS native build, not a migration of that earlier project.",
    ],
    solution: [
      "Nehas now has a deployed AWS development environment that connects fleet management, secure media operations, playlists, publishing, campaigns, reports, integrations, and system health through tenant-scoped APIs and a shared operations console.",
      "A deterministic player core supports web and hardened Windows Electron runtimes, persistent offline manifests, last-known-good playback, preload readiness, telemetry queues, watchdogs, and staged release rollback. A Raspberry Pi systemd installer is implemented but still needs physical-device acceptance.",
      "Production remains intentionally blocked until OIDC deployment, environment secrets, signed Windows distribution, representative hardware testing, notification providers, and deployed acceptance are complete.",
    ],
    contribution: [
      { label: "Product and requirements", description: "Defined and tracked the ten-phase delivery plan, acceptance contract, tenant model, player reliability rules, and production GO gates." },
      { label: "AWS architecture", description: "Designed the Amplify Gen 2 backend across Cognito, Lambda, DynamoDB, S3, CloudFront, API Gateway, AppSync Events, SQS, AppConfig, and CloudWatch." },
      { label: "Console engineering", description: "Built the React operations console for media, playlists, campaigns, publishing, reports, integrations, users, customization, and system health." },
      { label: "Player engineering", description: "Built shared deterministic playback behavior for web and Windows, plus Raspberry Pi installation and controlled release paths." },
      { label: "Security and tenancy", description: "Enforced trusted tenant boundaries, role checks, private media delivery, scoped device credentials, audit records, and fail-closed production behavior." },
      { label: "Quality and operations", description: "Established strict validation, unit/integration/E2E coverage, dependency policy, canaries, alarms, cost controls, recovery runbooks, and honest production blockers." },
    ],
    features: [
      { title: "Screen fleet management", description: "Central view and control over every registered screen." },
      { title: "Screen pairing", description: "Onboarding flow for connecting a new screen to the platform." },
      { title: "Health monitoring", description: "Live status for screens, including alerts when something goes offline." },
      { title: "Remote commands and screenshots", description: "Operate and verify screens remotely without site visits." },
      { title: "Media, playlists, and campaigns", description: "Organize content into playlists and time bound campaigns." },
      { title: "Deterministic scheduling and publishing", description: "Resolves emergency, takeover, campaign, publication, default, and fallback priorities with recurrence and restoration." },
      { title: "Proof of play", description: "Confirmation that scheduled content actually played as intended." },
      { title: "Player release management", description: "Controlled rollout and rollback of the software running on screens." },
      { title: "Emergency broadcast and alerts", description: "Override normal content to push urgent messages across the fleet." },
      { title: "Maintenance and version history", description: "Track changes over time with the ability to roll back." },
      { title: "Staging and test screens", description: "Validate content and configuration before it reaches production screens." },
      { title: "Content rules, variants, and expiration", description: "Control what content is allowed to play, in what variant, and for how long." },
      { title: "Reports and safe export", description: "Tenant-scoped saved reports and formula-safe CSV export support operational review." },
      { title: "Configuration and capability controls", description: "Versioned overrides, feature modules, terminology, navigation, brand settings, and player capability reporting are centrally managed." },
      { title: "Service credentials, webhooks, and integrations", description: "Scoped credentials, signed webhook delivery, retry queues, dead-letter handling, health status, and kill switches support external systems." },
      { title: "Dynamic widgets and QR campaigns", description: "Interactive content elements beyond static media." },
      { title: "Offline-resilient players", description: "Persistent manifests, preload packages, last-known-good playback, bounded telemetry, watchdogs, and staged rollback protect screen uptime." },
      { title: "White-label customization", description: "Versioned configuration controls branding, themes, terminology, navigation, dashboard ordering, and feature modules." },
    ],
    architecture: [
      { label: "Operations console", service: "React + Vite", description: "Tenant-scoped web workspace for fleet, content, publishing, campaigns, reports, integrations, and administration.", icon: "layout" },
      { label: "Identity and APIs", service: "Cognito + Lambda + API Gateway", description: "User identity, role boundaries, domain services, and device-authenticated player routes.", icon: "shield-check" },
      { label: "Operational data", service: "Amazon DynamoDB", description: "Access-pattern-driven tables store tenant, fleet, publishing, campaign, reporting, and audit state with PITR and deletion protection.", icon: "database" },
      { label: "Private media", service: "S3 + CloudFront", description: "Encrypted versioned storage, immutable variants, OAC, and signed delivery protect media assets.", icon: "image" },
      { label: "Playback delivery", service: "AppSync Events + SQS + Scheduler", description: "Preload notifications, fallback polling, queued telemetry, scheduled evaluation, and immutable manifests coordinate players.", icon: "network" },
      { label: "Operations", service: "AppConfig + CloudWatch", description: "Kill switches, structured logs, dashboards, alarms, canaries, cost thresholds, and recovery controls support the platform.", icon: "settings" },
      { label: "Players", service: "Web + Electron + Raspberry Pi", description: "A shared deterministic playback core drives modern web, hardened Windows, and Linux kiosk paths.", icon: "rocket" },
    ],
    architectureNote:
      "The development environment is live in us-west-2. Operators authenticate through Cognito and use tenant-scoped Lambda APIs backed by protected DynamoDB tables. Private S3 media is processed into immutable variants and delivered through signed CloudFront access. Publishing generates immutable screen manifests, notifies players through AppSync Events, and retains polling and last-known-good fallbacks. AppConfig and CloudWatch provide controlled configuration, kill switches, health visibility, alarms, and canaries.",
    aws: {
      productionRegion: "us-west-2",
      regionLabel: "Oregon",
      services: ["AWS Amplify", "Amazon Cognito", "AWS Lambda", "Amazon DynamoDB", "Amazon S3", "Amazon CloudFront", "Amazon API Gateway", "AWS AppConfig", "Amazon SQS", "Amazon CloudWatch"],
    },
    challenges: [
      {
        title: "Designing for fleet scale from day one",
        description: "A signage platform that only works for five screens does not hold up at fifty. Architecting fleet management, health monitoring, and configuration drift detection early on shapes everything else that gets built on top.",
      },
      {
        title: "Separating the new build from the old reference system",
        description: "The earlier Supabase based version captured useful workflow ideas but was not built for this platform's scale or AWS native direction. Keeping that system strictly as a read only reference, rather than migrating it, meant rebuilding the important workflows correctly from the ground up.",
      },
      {
        title: "Designing reliable unattended playback",
        description: "Screens must continue operating through network loss, bad manifests, failed updates, and partial content errors. Persistent caches, atomic switching, last-known-good recovery, bounded telemetry, and staged rollback were treated as core product behavior.",
      },
      {
        title: "Keeping production gates honest",
        description: "A successful development deployment is not production acceptance. Hardware codec behavior, Windows signing, production secrets, OIDC deployment, and real notification destinations remain explicit external blockers instead of being hidden behind a broad 'done' label.",
      },
    ],
    results: [
      "Completed all ten implementation phases and deployed the development backend, console, and player in us-west-2.",
      "251 requirements pass; 19 externally dependent production or hardware requirements remain blocked.",
      "149 unit, component, integration, and policy tests pass across 28 files.",
      "25 functional E2E checks and six visual captures pass.",
      "All 61 development DynamoDB tables have point-in-time recovery and deletion protection enabled.",
      "Produced a hardened unsigned Windows NSIS player installer; production distribution remains blocked on Authenticode signing and physical acceptance.",
    ],
    learnings: [
      "Planning a configuration driven architecture up front, instead of hardcoding behavior per screen, has already changed how I think about designing systems that need to operate at scale.",
      "Digital signage reliability is a distributed-systems problem: the player must make safe local decisions even when the cloud, network, or new content is unavailable.",
      "Explicit production gates make progress more credible. Development can be complete and demonstrable while production remains a deliberate NO-GO until external evidence exists.",
    ],
    relatedCredentialNames: ["AWS re/Start Graduate", "AWS Skills Center Cloud Practitioner Foundations"],
    evidence: ["Live AWS development environment", "251 passing requirements", "149 passing automated tests across 28 files", "25 passing E2E checks plus six visual captures", "61 protected DynamoDB tables", "Verified unsigned Windows player package"],
    notes: "Development PASS / production NO-GO. The AWS development backend, console, and player are live in us-west-2; production deployment, signed Windows distribution, physical device acceptance, and human-owned provider configuration remain incomplete. The earlier Supabase system is reference-only and was not migrated.",
  },
  {
    slug: "fsss-limat-pos",
    name: "FSSS Limat POS",
    tagline: "A local-first register, inventory, and retail operations system for a real church store",
    status: "Built",
    category: ["Business Software", "POS", "Inventory"],
    summary:
      "React and Express point-of-sale system with hardware and mobile barcode scanning, held carts, inventory history, customers, receipts, reporting, label printing, auditing, exports, and role-based operations.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio"}/assets/projects/FSSS-Limat-POS-thumbnail.png`,
    thumbnailAlt: "FSSS Limat POS interface showing a new sale screen with cart and payment",
    accent: "green",
    technologies: ["React", "Vite", "Node.js", "Express", "MySQL", "Electron", "PWA", "ZXing", "JsBarcode"],
    technologyGroups: [
      { label: "Frontend", items: ["React", "Vite", "PWA"] },
      { label: "Backend", items: ["Node.js", "Express", "MySQL"] },
      { label: "Register tooling", items: ["ZXing", "JsBarcode", "80mm receipt printing"] },
      { label: "Desktop", items: ["Electron"] },
    ],
    liveUrl: null,
    repositoryUrl: null,
    role: "Product design, full stack development, and database design",
    platformType: "Locally hosted web/PWA and Electron desktop point-of-sale application",
    servesWho: "Fenote Selam Sunday School store cashiers, managers, and administrators handling sales, products, customers, reporting, and settings",
    problem: [
      "The store needed one system for the daily register and the work around it: finding products quickly, scanning labels, tracking stock, serving walk-in and repeat customers, printing receipts, and giving managers visibility without exposing every control to every cashier.",
      "The replacement also had to work with an existing MySQL installation whose table and column names differed across earlier versions, rather than forcing the organization to discard its records or immediately rebuild its local environment.",
    ],
    solution: [
      "FSSS Limat POS combines a responsive React cashier workspace with a session-protected Express API and MySQL database. Staff can search or scan products, build and hold carts, attach customers, apply discounts, take several payment types, and generate thermal-friendly receipts.",
      "Managers receive inventory and category tools, movement history, sales reports, product labels, void-and-restock controls, CSV exports, settings, backup records, and audit visibility. Compatibility logic maps common legacy user, customer, sales, and receipt columns so the React conversion can operate against the real local database.",
    ],
    contribution: [
      { label: "Product planning", description: "Defined the POS and inventory workflow based on real store operations." },
      { label: "Frontend development", description: "Built the responsive React/Vite register, dashboard, inventory, customer, sales, reports, users, labels, and settings workspaces." },
      { label: "Backend integration", description: "Built the Express API for sessions, role checks, catalog operations, checkout, reporting, receipts, exports, audit records, and settings." },
      { label: "Database compatibility", description: "Mapped legacy MySQL column variants and added safe inventory migration tooling so the React system can use the organization's existing records." },
      { label: "Register UX", description: "Designed keyboard-first product search, hardware barcode input, secure mobile camera scanning, held carts, customer creation, and responsive cart behavior." },
      { label: "Local delivery", description: "Added production web serving, installable PWA behavior, and an Electron desktop runtime for the local store environment." },
    ],
    features: [
      { title: "Point of sale", description: "Core register flow: search or scan a product, build a cart, and take payment." },
      { title: "Hardware and mobile barcode scanning", description: "Supports keyboard-style barcode readers and secure-context camera scanning on mobile devices." },
      { title: "Inventory management", description: "Tracks stock levels as sales happen." },
      { title: "Inventory movement history", description: "Records changes to stock over time for accountability." },
      { title: "Customers", description: "Creates and searches customer records without losing the current cart." },
      { title: "Receipts and reports", description: "Provides 80mm print-ready receipts, optional SMTP delivery, sales KPIs, filters, history, and receipt review." },
      { title: "Barcode and price labels", description: "Generates the requested quantity of 2-by-1-inch product labels with permanent SKU identity." },
      { title: "Role based access", description: "Different permissions for staff versus management." },
      { title: "Held carts", description: "Pauses and restores up to 20 local carts without completing a sale." },
      { title: "Voids and stock restoration", description: "Manager-authorized sale voids require a reason and return sold quantities to inventory." },
      { title: "Audit, backup, and exports", description: "Records operational actions, tracks backup activity, and exports products, customers, and sales as CSV." },
      { title: "Configurable store behavior", description: "Controls payment defaults, discounts, receipt layout, email, low-stock thresholds, label output, theme, and mobile behavior." },
    ],
    architecture: [
      { label: "Register and management UI", service: "React + Vite", description: "Responsive cashier and manager workspaces run in the browser or installable PWA shell.", icon: "layout" },
      { label: "Application API", service: "Node.js + Express", description: "Session-protected routes own authentication, authorization, sales, inventory, reporting, receipts, and settings.", icon: "network" },
      { label: "Operational data", service: "MySQL", description: "Products, categories, customers, users, sales, line items, inventory movements, settings, and audit records stay in the local database.", icon: "database" },
      { label: "Register peripherals", service: "Scanner + printer workflows", description: "Barcode readers, mobile camera scanning, label generation, and thermal receipt layouts support the physical counter.", icon: "settings" },
      { label: "Desktop delivery", service: "Electron", description: "A desktop wrapper starts the local runtime and presents the POS as an application on the store computer.", icon: "rocket" },
    ],
    architectureNote:
      "The React client never connects directly to MySQL. It calls the local Express API, which manages server-side sessions, role checks, schema compatibility, validation, and database operations. The same application can run as a local web/PWA experience or inside the Electron desktop wrapper.",
    challenges: [
      {
        title: "Converting a working legacy database safely",
        description: "The earlier PHP/MySQL versions used different database names and column conventions. The API detects common user and sales schemas, preserves permanent SKU identity, and includes a migration path that updates matching SKUs instead of duplicating them.",
      },
      {
        title: "Reconciling inventory accurately",
        description: "Checkout, manual stock edits, opening inventory, and voided sales can all change stock. Movement records and automatic restoration on voids keep those changes explainable.",
      },
      {
        title: "Designing for a physical register",
        description: "The workflow has to stay fast with a keyboard scanner, work responsively on touch devices, print specialized labels and receipts, and avoid losing a cart when staff pause to help someone else.",
      },
    ],
    results: [
      "Converted the original modular PHP/MySQL workflow into a React/Vite frontend with an Express API while retaining compatibility with the real store database.",
      "Implemented complete dashboard, POS, inventory, customer, sales, reports, labels, users, and settings workspaces.",
      "Delivered role-protected local web/PWA and Electron desktop paths for the store environment.",
    ],
    learnings: [
      "Building for a real register taught me that hardware, printing, existing data, staff permissions, and interruptions shape the application as much as the checkout screen does.",
      "Compatibility work is product work: adapting safely to the organization's real database made the React conversion more useful than a clean rewrite that ignored existing records.",
    ],
    relatedCredentialNames: ["Project Management Fundamentals"],
    evidence: ["Private implementation repository", "React/Vite register and management workspaces", "Express/MySQL API with session and role enforcement", "Legacy inventory migration tooling", "PWA and Electron desktop delivery paths"],
    notes: "Built for a local church-store environment. The source repository is private and there is no public live deployment. The application depends on its configured local MySQL database and should not be represented as an offline-sync cloud POS.",
  },
  {
    slug: "aradacart",
    name: "AradaCart",
    tagline: "A Telegram first B2B commerce platform built for Ethiopia",
    status: "Architecture",
    category: ["Telegram", "Commerce", "SaaS"],
    summary:
      "Telegram first B2B commerce platform designed around Mini App storefronts, merchant dashboards, catalog, orders, payments, inventory, subscriptions, and analytics.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio"}/assets/projects/AradaCart-thumbnail.png`,
    thumbnailAlt: "AradaCart Telegram Mini App showing a product catalog and categories",
    accent: "telegram",
    technologies: ["Telegram Mini App", "AWS architecture", "Commerce platform"],
    technologyGroups: [
      { label: "Platform", items: ["Telegram Mini App"] },
      { label: "Architecture", items: ["AWS architecture", "Commerce platform"] },
    ],
    liveUrl: null,
    repositoryUrl: null,
    role: "Product design and system architecture",
    platformType: "B2B commerce SaaS, delivered through Telegram Mini Apps and a web dashboard",
    servesWho: "Buyers who shop through Telegram, merchants who sell through a web dashboard, and platform administrators who run the SaaS",
    problem: [
      "In markets where Telegram is already how people communicate and discover businesses, asking buyers to download a separate shopping app is friction that does not need to exist. Merchants still need a real dashboard to manage catalog, orders, and payments.",
    ],
    solution: [
      "AradaCart is designed around three roles: buyers who shop through a Telegram Mini App, merchants who manage their store through a web dashboard, and platform administrators who operate the SaaS itself.",
      "The architecture direction is AWS hosted, covering catalog, orders, payments, inventory, merchant subscriptions, and analytics.",
    ],
    contribution: [
      { label: "Product planning", description: "Defined the three role model: buyer, merchant, and platform administrator." },
      { label: "System architecture", description: "Designed the Telegram Mini App storefront alongside a separate merchant web dashboard, with an AWS hosted architecture direction." },
    ],
    features: [
      { title: "Telegram Mini App storefront", description: "Buyers browse and order without leaving Telegram." },
      { title: "Merchant dashboard", description: "Web based management of catalog, orders, and store settings." },
      { title: "Catalog and inventory", description: "Product management shared across the buyer and merchant experiences." },
      { title: "Orders and payments", description: "Handles the transaction lifecycle for B2B purchases." },
      { title: "Subscriptions", description: "Merchant access to the platform is subscription based." },
      { title: "Analytics", description: "Gives merchants visibility into how their store is performing." },
    ],
    challenges: [
      {
        title: "Splitting one product across two very different surfaces",
        description: "A Telegram Mini App and a merchant web dashboard have different constraints and different users. Keeping catalog, orders, and inventory consistent across both, from a single architecture, is the core design problem.",
      },
    ],
    results: [],
    learnings: [
      "Planning for a chat native storefront alongside a traditional dashboard has been a useful exercise in designing one data model that serves genuinely different interfaces well.",
    ],
    relatedCredentialNames: ["AWS Skills Center Cloud Practitioner Foundations"],
    evidence: [],
    notes: "Architecture and early development stage. AWS hosted deployment is the intended direction, not a confirmed production deployment.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
}

export const featuredProjectSlugs = projects.map((project) => project.slug);
