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
    tagline: "A new AWS native platform for managing screens, content, and campaigns at scale",
    status: "Active Build",
    category: ["AWS", "Enterprise SaaS", "Digital Signage"],
    summary:
      "New AWS native digital signage platform for screen fleets, content, scheduling, publishing, monitoring, device operations, and configurable enterprise workflows.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio"}/assets/projects/Nehas-Digital-Signage-thumbnail.png`,
    thumbnailAlt: "Nehas Digital Signage dashboard showing screen status, a world map, and alerts",
    accent: "teal",
    technologies: ["AWS", "AWS AppConfig", "Digital signage architecture"],
    technologyGroups: [
      { label: "AWS", items: ["AWS AppConfig", "AWS native architecture"] },
      { label: "Domain", items: ["Digital signage", "Fleet management"] },
    ],
    liveUrl: null,
    repositoryUrl: null,
    role: "Product architecture and system design",
    platformType: "Enterprise SaaS, screen fleet management",
    servesWho: "Organizations that operate networks of digital signage screens and need central control over content, scheduling, and device health",
    problem: [
      "Running digital signage at any real scale means more than pushing an image to a screen. Someone has to know which screens are online, roll out content on schedule, react when a screen goes offline, and keep everything consistent across a growing fleet.",
      "An earlier version of this idea existed as a read only reference build on Supabase. It showed which workflows mattered, but it was not the system this platform is being built as. Nehas is a new AWS native build, not a migration of that earlier project.",
    ],
    solution: [
      "Nehas is being designed as an AWS native enterprise signage platform: screen fleet management, pairing, health monitoring, and remote operations on one side, and content, playlists, campaigns, and scheduling on the other, tied together by a configuration driven architecture.",
      "The plan uses AWS AppConfig style configuration patterns so behavior like rollout rules, feature availability, and content rules can be controlled centrally instead of hardcoded per screen.",
    ],
    contribution: [
      { label: "Product planning", description: "Defined the platform scope: fleet management, content operations, monitoring, and enterprise configuration." },
      { label: "System architecture", description: "Designed the AWS native architecture, including how AWS AppConfig based configuration patterns drive screen and campaign behavior." },
      { label: "UI and UX direction", description: "Directed the dashboard experience for fleet health, screen maps, and alerts shown in the reference mockups." },
    ],
    features: [
      { title: "Screen fleet management", description: "Central view and control over every registered screen." },
      { title: "Screen pairing", description: "Onboarding flow for connecting a new screen to the platform." },
      { title: "Health monitoring", description: "Live status for screens, including alerts when something goes offline." },
      { title: "Remote commands and screenshots", description: "Operate and verify screens remotely without site visits." },
      { title: "Media, playlists, and campaigns", description: "Organize content into playlists and time bound campaigns." },
      { title: "Scheduling and publishing simulation", description: "Plan what plays where and when, with a way to check a rollout before it goes live." },
      { title: "Proof of play", description: "Confirmation that scheduled content actually played as intended." },
      { title: "Player release management", description: "Controlled rollout and rollback of the software running on screens." },
      { title: "Emergency broadcast and alerts", description: "Override normal content to push urgent messages across the fleet." },
      { title: "Maintenance and version history", description: "Track changes over time with the ability to roll back." },
      { title: "Staging and test screens", description: "Validate content and configuration before it reaches production screens." },
      { title: "Content rules, variants, and expiration", description: "Control what content is allowed to play, in what variant, and for how long." },
      { title: "Maps and floor plans", description: "Visual layout of where screens are physically located." },
      { title: "Configuration drift and capability profiles", description: "Detect when a screen's configuration has drifted from what it should be." },
      { title: "Public API, webhooks, and integration center", description: "Let other systems connect into the platform." },
      { title: "Dynamic widgets and QR campaigns", description: "Interactive content elements beyond static media." },
      { title: "Synchronized takeovers", description: "Coordinate content across multiple screens at once." },
      { title: "Global search and saved views", description: "Find screens, content, or campaigns quickly across a large fleet." },
      { title: "White label readiness", description: "Architecture designed to support being offered under different branding." },
    ],
    architectureNote:
      "The system is being designed around AWS AppConfig style configuration patterns: rollout rules, feature availability, and content behavior are controlled centrally rather than hardcoded per screen, which matters once a fleet grows past a handful of devices.",
    aws: {
      productionRegion: "us-west-2",
      regionLabel: "Oregon",
      services: ["AWS AppConfig"],
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
    ],
    results: [],
    learnings: [
      "Planning a configuration driven architecture up front, instead of hardcoding behavior per screen, has already changed how I think about designing systems that need to operate at scale.",
    ],
    relatedCredentialNames: ["AWS re/Start Graduate", "AWS Skills Center Cloud Practitioner Foundations"],
    evidence: [],
    notes: "New AWS native build in us-west-2 (Oregon). The earlier Supabase system is a read only feature and workflow reference only, not a production predecessor.",
  },
  {
    slug: "fsss-limat-pos",
    name: "FSSS Limat POS",
    tagline: "A point of sale and inventory system built for real store operations",
    status: "Built",
    category: ["Business Software", "POS", "Inventory"],
    summary:
      "Point of sale and inventory system with barcode scanning, loyalty, receipts, reporting, roles, inventory history, hold sales, and offline POS queue support.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio"}/assets/projects/FSSS-Limat-POS-thumbnail.png`,
    thumbnailAlt: "FSSS Limat POS interface showing a new sale screen with cart and payment",
    accent: "green",
    technologies: ["Node.js", "MariaDB", "PWA"],
    technologyGroups: [
      { label: "Backend", items: ["Node.js", "MariaDB"] },
      { label: "Delivery", items: ["PWA"] },
    ],
    liveUrl: null,
    repositoryUrl: null,
    role: "Product design, full stack development, and database design",
    platformType: "Point of sale application, progressive web app",
    servesWho: "Retail staff who run the register and managers who track inventory, sales, and loyalty",
    problem: [
      "Point of sale software often assumes a stable internet connection and a simple product catalog. Real stores deal with spotty connectivity, inventory that needs regular reconciliation, and staff with different levels of access.",
    ],
    solution: [
      "FSSS Limat POS handles the full register workflow: barcode scanning, cart management, receipts, and payment, backed by inventory tracking, customer records, and loyalty points.",
      "Because connectivity is not guaranteed, the system supports an offline POS queue so sales can continue and sync once the connection returns, along with a hold sales feature so a transaction can be paused and resumed.",
    ],
    contribution: [
      { label: "Product planning", description: "Defined the POS and inventory workflow based on real store operations." },
      { label: "Frontend development", description: "Built the point of sale interface as a progressive web app." },
      { label: "Backend integration", description: "Built the Node.js backend handling sales, inventory, and reporting." },
      { label: "Database design", description: "Designed the MariaDB schema for products, inventory movement, customers, and loyalty." },
      { label: "UI and UX direction", description: "Designed the register flow for speed, including hold sales and barcode scanning." },
    ],
    features: [
      { title: "Point of sale", description: "Core register flow: search or scan a product, build a cart, and take payment." },
      { title: "Barcode scanning", description: "Speeds up adding products during checkout." },
      { title: "Inventory management", description: "Tracks stock levels as sales happen." },
      { title: "Inventory movement history", description: "Records changes to stock over time for accountability." },
      { title: "Quarterly inventory workflow", description: "Supports periodic stock counts to reconcile recorded and actual inventory." },
      { title: "Customers and loyalty points", description: "Tracks repeat customers and rewards them for purchases." },
      { title: "Receipts and reports", description: "Generates receipts at checkout and reporting for sales history." },
      { title: "Role based access", description: "Different permissions for staff versus management." },
      { title: "Held sales", description: "Pause a transaction and resume it later without losing the cart." },
      { title: "Offline POS queue", description: "Sales continue during a connection drop and sync once it is back." },
    ],
    challenges: [
      {
        title: "Keeping the register usable without internet",
        description: "Designing an offline POS queue meant deciding what a cashier can safely do while offline, and how sales reconcile once the connection returns, without risking double charges or lost transactions.",
      },
      {
        title: "Reconciling inventory accurately",
        description: "Barcode driven sales and manual quarterly counts both change inventory numbers. Building a movement history that keeps both sources honest was central to making the reports trustworthy.",
      },
    ],
    results: [],
    learnings: [
      "Building for a real register taught me to design for interruptions, a dropped connection, a paused sale, a miscount, as first class cases rather than edge cases.",
    ],
    relatedCredentialNames: ["Project Management Fundamentals"],
    evidence: [],
  },
  {
    slug: "tibeb-market",
    name: "Tibeb Market",
    tagline: "A global marketplace for Ethiopian fashion, designers, and artisans",
    status: "Development",
    category: ["Marketplace", "Ecommerce", "Product Architecture"],
    summary:
      "Global multi vendor marketplace connecting Ethiopian designers, artisans, boutiques, and tailors with customers worldwide.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio"}/assets/projects/Tibeb-Market-thumbnail.png`,
    thumbnailAlt: "Tibeb Market storefront showing traditional Ethiopian clothing for sale",
    accent: "amber",
    technologies: ["Marketplace architecture", "Multilingual product design"],
    technologyGroups: [
      { label: "Architecture", items: ["Marketplace architecture", "Multi vendor systems"] },
      { label: "Product", items: ["Multilingual product design"] },
    ],
    liveUrl: null,
    repositoryUrl: null,
    role: "Product design and marketplace architecture",
    platformType: "Multi vendor ecommerce marketplace",
    servesWho: "Customers looking for authentic Ethiopian fashion, and the designers, artisans, boutiques, and tailors who sell it",
    problem: [
      "Ethiopian designers, artisans, boutiques, and tailors mostly sell locally or through informal channels, which limits their reach to customers outside the country who want authentic, well made pieces.",
      "Clothing also needs accurate measurements, and traditional wear in particular does not fit neatly into standard international sizing.",
    ],
    solution: [
      "Tibeb Market is being designed as a multi vendor marketplace where sellers, designers, artisans, boutiques, and tailors, run their own storefronts, and customers browse a shared catalog.",
      "To handle sizing honestly, the plan includes universal measurement profiles and family measurement profiles, so a customer can order for themselves or people they shop for without guessing at sizes.",
      "The initial MVP is planned in English and Amharic, with room for further Ethiopian language localization later, and both dark and light modes.",
    ],
    contribution: [
      { label: "Product planning", description: "Defined the marketplace model connecting multiple seller types with international customers." },
      { label: "System architecture", description: "Designed the multi vendor structure: seller onboarding, subscriptions, commission, and payouts." },
      { label: "UI and UX direction", description: "Designed the measurement profile system and the bilingual English and Amharic experience." },
    ],
    features: [
      { title: "Customer and seller accounts", description: "Separate account types for shoppers and the designers, artisans, boutiques, and tailors selling to them." },
      { title: "Product catalog", description: "A shared catalog spanning multiple independent sellers." },
      { title: "Universal and family measurement profiles", description: "Saved measurements for the customer and for family members they shop for." },
      { title: "Orders, tracking, returns, and refunds", description: "Standard ecommerce order lifecycle across international shipping." },
      { title: "Dispute protection", description: "A process for resolving problems between customers and sellers." },
      { title: "Seller onboarding, subscriptions, and commission", description: "How sellers join the platform and how the platform earns from sales." },
      { title: "Payouts and shipping", description: "Getting sellers paid and getting products to customers internationally." },
      { title: "English and Amharic MVP", description: "Bilingual from the first release, with room for more Ethiopian languages later." },
      { title: "Dark mode and light mode", description: "Both themes supported from the start." },
    ],
    challenges: [
      {
        title: "Designing sizing that actually works for traditional wear",
        description: "Standard international sizing does not map cleanly onto traditional Ethiopian clothing. Universal and family measurement profiles are an attempt to solve that at the account level instead of leaving it to guesswork at checkout.",
      },
      {
        title: "Supporting many kinds of sellers in one system",
        description: "Designers, artisans, boutiques, and tailors do not all sell the same way. The seller and catalog architecture has to be flexible enough to support all of them without becoming four different products.",
      },
    ],
    results: [],
    learnings: [
      "Designing for two languages and multiple seller types from the start, rather than bolting it on later, has meant thinking about the data model differently from a typical single seller store.",
    ],
    relatedCredentialNames: ["Project Management Fundamentals"],
    evidence: [],
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
