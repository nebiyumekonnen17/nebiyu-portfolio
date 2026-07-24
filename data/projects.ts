import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "degissnap",
    name: "DegisSnap",
    tagline: "Event photo sharing with QR guest uploads and a live host dashboard",
    status: "Production",
    category: ["AWS", "SaaS", "Full Stack"],
    summary:
      "Event photo sharing platform with QR guest uploads, private galleries, moderation, slideshow, guestbook, engagement, analytics, and host management.",
    thumbnail: "/assets/projects/DegisSnap-thumbnail.png",
    thumbnailAlt: "DegisSnap event photo sharing app interface showing a photo gallery and guestbook",
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
      "GraphQL",
    ],
    technologyGroups: [
      { label: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
      { label: "AWS", items: ["AWS Amplify Gen 2", "Amazon Cognito", "AWS AppSync", "Amazon DynamoDB", "Amazon S3"] },
      { label: "API", items: ["GraphQL"] },
    ],
    liveUrl: "https://oregon-production.dul3f7qusupwk.amplifyapp.com",
    repositoryUrl: "https://github.com/nebiyumekonnen17/DegisSnap",
    role: "Product, full stack development, and AWS architecture",
    platformType: "Web application, guest access through a shared link or QR code",
    servesWho: "Event hosts who want a shared photo gallery for their guests, and guests who want to upload and enjoy photos without creating an account",
    problem: [
      "Sharing photos from an event usually means chasing people down after the fact, or relying on a group chat that gets crowded fast and buries the good photos.",
      "Hosts wanted a way for every guest to contribute photos in real time, without asking anyone to install an app or make an account, while still keeping some control over what gets shown.",
    ],
    solution: [
      "DegisSnap gives every event a private gallery that guests reach through a QR code or link. Guests can upload photos immediately, no account required, and see everyone else's photos, a live slideshow, and a guestbook in the same place.",
      "Hosts sign in separately to a dashboard where they manage the event, moderate uploads, control the cover photo, and watch engagement come in through comments, loves, and analytics.",
    ],
    contribution: [
      { label: "Product planning", description: "Defined the guest and host experience, including what should require an account and what should not." },
      { label: "Frontend development", description: "Built the React and Vite application, including the guest gallery, slideshow, guestbook, and the host dashboard." },
      { label: "AWS architecture", description: "Designed the Amplify Gen 2 backend: Cognito for host identity, AppSync for the GraphQL API, DynamoDB for application data, and S3 for photo storage." },
      { label: "Authentication and authorization", description: "Implemented host authentication with Cognito and ownership rules so hosts only manage their own events while guest uploads stay scoped to the right gallery." },
      { label: "Deployment", description: "Configured and manage the production Amplify deployment, including the regional environment now running in Oregon (us-west-2)." },
      { label: "Testing", description: "Built out the automated test suite that reached a reported 164 passing tests as a project milestone." },
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
    ],
    architecture: [
      { label: "Client", service: "React + Vite", description: "Guest and host experiences share one frontend, with routes and permissions split by role.", icon: "layout" },
      { label: "Authentication", service: "Amazon Cognito", description: "Handles host sign in, identity, and session management. Guest access does not require an account.", icon: "shield-check" },
      { label: "API", service: "AWS AppSync", description: "GraphQL API in front of the application data, enforcing ownership rules between hosts, events, and guest uploads.", icon: "network" },
      { label: "Data", service: "Amazon DynamoDB", description: "Stores events, guest metadata, guestbook entries, comments, and love reactions.", icon: "database" },
      { label: "Media", service: "Amazon S3", description: "Stores uploaded photos and event cover images.", icon: "image" },
      { label: "Deployment", service: "AWS Amplify", description: "Builds, hosts, and deploys the application, including the production environment in Oregon (us-west-2).", icon: "rocket" },
    ],
    architectureNote:
      "Guests interact with the React frontend and, for uploads, with S3 directly through scoped access; they never touch host authentication. Hosts authenticate through Cognito, and AppSync uses that identity to enforce ownership rules before reading or writing to DynamoDB or S3. Amplify builds and deploys the whole stack together, which is how a solo developer keeps a production AWS application manageable.",
    aws: {
      productionRegion: "us-west-2",
      regionLabel: "Oregon",
      services: ["AWS Amplify", "Amazon Cognito", "AWS AppSync", "Amazon DynamoDB", "Amazon S3"],
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
    ],
    results: [
      "Deployed and running in production on AWS in us-west-2 (Oregon).",
      "Reported project milestone of 164 passing automated tests.",
    ],
    learnings: [
      "Building the guest side taught me how much authorization design changes when half your users never log in. I had to think about permissions in terms of what a link can do, not just what a signed in user can do.",
      "Running a real Amplify production deployment, including retiring an older region, gave me a much better sense of what operating an AWS application actually involves beyond just building the features.",
    ],
    relatedCredentialNames: ["AWS re/Start Graduate", "AWS Skills Center Cloud Practitioner Foundations", "Introduction to Cybersecurity"],
    evidence: ["Production AWS deployment", "Reported milestone of 164 passing tests"],
  },
  {
    slug: "naep",
    name: "NAEP",
    tagline: "A provider agnostic, local first platform for building and running AI systems",
    status: "Active Build",
    category: ["AI", "Engineering Platform"],
    summary:
      "Provider agnostic, local first AI engineering platform for working across local and cloud model providers, workflows, knowledge, tools, and engineering automation.",
    thumbnail: "/assets/projects/NAEP-thumbnail.png",
    thumbnailAlt: "NAEP AI engineering platform dashboard showing agents, workflows, and models",
    accent: "blue",
    technologies: ["TypeScript", "Python", "Ollama", "AI orchestration"],
    technologyGroups: [
      { label: "Core", items: ["TypeScript", "Python"] },
      { label: "AI", items: ["Ollama", "Local models", "AI orchestration"] },
    ],
    liveUrl: null,
    repositoryUrl: null,
    role: "Product design, architecture, and full stack engineering",
    platformType: "Local first engineering platform, self hosted",
    servesWho: "Developers and teams who want to build with AI models without being locked into a single provider",
    problem: [
      "Most AI tooling assumes one provider and one workflow. NAEP (Nebiyu AI Engineering Platform) exists because switching between local models and cloud providers, or building anything more structured than a single prompt, usually means gluing together several disconnected tools.",
    ],
    solution: [
      "NAEP is built to be provider agnostic and local first: it works with Ollama and local models as a starting point, and is designed to extend to multiple model providers, so the workflows, knowledge, and agents built on top do not depend on any single vendor.",
      "On top of that model layer, NAEP adds the structure engineering work actually needs: workflows, knowledge management, tool access, and governance over how AI systems are allowed to act.",
    ],
    contribution: [
      { label: "Product planning", description: "Defined the provider agnostic, local first direction and the core feature set." },
      { label: "System architecture", description: "Designed how model providers, workflows, knowledge, and tools plug into a shared platform." },
      { label: "Backend integration", description: "Built the integration layer with Ollama and local models." },
      { label: "Testing", description: "Built out the automated test suite that reached a reported 121 passing tests." },
    ],
    features: [
      { title: "Provider agnostic model layer", description: "Built to work across local and cloud model providers rather than locking into one." },
      { title: "Local first with Ollama", description: "Runs against local models through Ollama as a first class path, not an afterthought." },
      { title: "AI orchestration", description: "Coordinates multiple models and steps rather than treating AI as a single call." },
      { title: "Knowledge systems", description: "Structured storage and retrieval for the context AI workflows need." },
      { title: "Workflows and agents", description: "Composable workflows and agents for engineering automation tasks." },
      { title: "Developer tooling", description: "Tooling aimed at developers building and debugging AI backed features." },
      { title: "Governance", description: "Controls over how engineering workflows are allowed to act, rather than open ended automation." },
    ],
    challenges: [
      {
        title: "Designing for more than one model provider",
        description: "Building an abstraction that works cleanly with local models through Ollama, while staying open to cloud providers, meant avoiding assumptions that only hold for one type of provider.",
      },
      {
        title: "Making automation controllable",
        description: "Engineering automation is only useful if it is governed. Building workflow and agent controls that keep the system predictable, rather than fully autonomous, shaped a lot of the architecture.",
      },
    ],
    results: ["Reported milestone of 121 passing tests."],
    learnings: [
      "Working local first changed how I think about AI architecture: it forces you to design real interfaces between components instead of assuming a single hosted API is always there.",
    ],
    relatedCredentialNames: ["Python Essentials 1", "Explore Emerging Tech"],
    evidence: ["Reported milestone of 121 passing tests"],
    notes: "Active development. No public deployment or repository link yet.",
  },
  {
    slug: "nehas-digital-signage",
    name: "Nehas Digital Signage",
    tagline: "A new AWS native platform for managing screens, content, and campaigns at scale",
    status: "Active Build",
    category: ["AWS", "Enterprise SaaS", "Digital Signage"],
    summary:
      "New AWS native digital signage platform for screen fleets, content, scheduling, publishing, monitoring, device operations, and configurable enterprise workflows.",
    thumbnail: "/assets/projects/Nehas-Digital-Signage-thumbnail.png",
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
    thumbnail: "/assets/projects/FSSS-Limat-POS-thumbnail.png",
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
    thumbnail: "/assets/projects/Tibeb-Market-thumbnail.png",
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
    thumbnail: "/assets/projects/AradaCart-thumbnail.png",
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
