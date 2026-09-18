import type { ProjectGalleryItem } from "@/types/content";

/**
 * All entries here come from 06_PROJECT_GALLERIES/gallery-manifest.json.
 * They are AI-generated concept UI mockups, not captured screenshots.
 * When a real screenshot is added later, set isRealScreenshot: true and
 * type: "Real Screenshot" on that entry; ProjectGallery sorts real
 * evidence first automatically.
 */
function concept(
  src: string,
  title: string,
  alt: string,
  caption: string
): ProjectGalleryItem {
  return {
    src,
    title,
    alt,
    caption,
    type: "Concept UI",
    isConcept: true,
    isRealScreenshot: false,
  };
}

const degissnapBase = "/images/projects/degissnap/gallery";
const naepBase = "/images/projects/naep/gallery";
const nehasBase = "/images/projects/nehas-digital-signage/gallery";
const fsssBase = "/images/projects/fsss-limat-pos/gallery";
const tibebBase = "/images/projects/tibeb-market/gallery";
const aradaBase = "/images/projects/aradacart/gallery";

export const projectGalleries: Record<string, ProjectGalleryItem[]> = {
  degissnap: [
    concept(
      `${degissnapBase}/01-guest-landing-qr-scan-concept.png`,
      "Guest Landing and QR Scan",
      "Visual Tizita concept UI showing the guest landing screen and QR scan entry point",
      "Guests reach an event gallery by scanning a QR code or opening a shared link, with no account required."
    ),
    concept(
      `${degissnapBase}/02-event-gallery-concept.png`,
      "Event Gallery",
      "Visual Tizita concept UI showing the shared event photo gallery",
      "The shared gallery where every guest photo appears for the event, organized for easy browsing."
    ),
    concept(
      `${degissnapBase}/03-upload-photos-guest-concept.png`,
      "Upload Photos, Guest",
      "Visual Tizita concept UI showing the guest photo upload flow",
      "Guests add photos directly from their phone without signing up or installing an app."
    ),
    concept(
      `${degissnapBase}/04-slideshow-view-concept.png`,
      "Slideshow View",
      "Visual Tizita concept UI showing the event slideshow view",
      "A running slideshow view designed for screens at the event itself."
    ),
    concept(
      `${degissnapBase}/05-guestbook-and-messages-concept.png`,
      "Guestbook and Messages",
      "Visual Tizita concept UI showing the guestbook and message wall",
      "Guests can leave messages and react to photos, giving the gallery a social layer alongside the images."
    ),
    concept(
      `${degissnapBase}/06-host-dashboard-overview-concept.png`,
      "Host Dashboard Overview",
      "Visual Tizita concept UI showing the host dashboard overview",
      "The host dashboard where an event owner manages their gallery, guests, and settings after signing in with Cognito."
    ),
    concept(
      `${degissnapBase}/07-media-management-concept.png`,
      "Media Management",
      "Visual Tizita concept UI showing host media management tools",
      "Hosts review, organize, and moderate uploaded photos from one place."
    ),
    concept(
      `${degissnapBase}/08-analytics-and-insights-concept.png`,
      "Analytics and Insights",
      "Visual Tizita concept UI showing event analytics and insights",
      "Hosts can see engagement across their event, including uploads and guest activity."
    ),
  ],
  naep: [
    concept(
      `${naepBase}/01-dashboard-overview-concept.png`,
      "Dashboard Overview",
      "NAEP concept UI showing the platform dashboard overview",
      "The NAEP dashboard, a starting point for working across models, agents, and workflows."
    ),
    concept(
      `${naepBase}/02-ai-orchestrator-concept.png`,
      "AI Orchestrator",
      "NAEP concept UI showing the AI orchestration view",
      "The orchestration layer that coordinates multiple models and steps rather than treating AI as a single call."
    ),
    concept(
      `${naepBase}/03-chat-with-ai-multi-model-concept.png`,
      "Chat with AI, Multi Model",
      "NAEP concept UI showing a multi model chat interface",
      "A chat interface designed to work across local and cloud model providers rather than locking into one."
    ),
    concept(
      `${naepBase}/04-workflows-concept.png`,
      "Workflows",
      "NAEP concept UI showing the workflows view",
      "Composable workflows for engineering automation tasks."
    ),
    concept(
      `${naepBase}/05-knowledge-base-concept.png`,
      "Knowledge Base",
      "NAEP concept UI showing the knowledge base view",
      "Structured storage and retrieval for the context AI workflows need."
    ),
    concept(
      `${naepBase}/06-agents-concept.png`,
      "Agents",
      "NAEP concept UI showing the agents view",
      "Agents built on top of the model layer for specific engineering tasks."
    ),
    concept(
      `${naepBase}/07-model-providers-concept.png`,
      "Model Providers",
      "NAEP concept UI showing model provider configuration",
      "Where model providers, including local models through Ollama, are configured and managed."
    ),
    concept(
      `${naepBase}/08-settings-and-preferences-concept.png`,
      "Settings and Preferences",
      "NAEP concept UI showing settings and preferences",
      "Platform level settings for how the engineering workflows are allowed to run."
    ),
  ],
  "nehas-digital-signage": [
    concept(
      `${nehasBase}/01-overview-dashboard-concept.png`,
      "Overview Dashboard",
      "Nehas Digital Signage concept UI showing the fleet overview dashboard",
      "A fleet level view of screens, campaigns, and alerts across the network."
    ),
    concept(
      `${nehasBase}/02-screen-map-and-floor-plan-concept.png`,
      "Screen Map and Floor Plan",
      "Nehas Digital Signage concept UI showing a screen map and floor plan",
      "A visual layout of where screens are physically located, part of the planned fleet management tools."
    ),
    concept(
      `${nehasBase}/03-screen-details-concept.png`,
      "Screen Details",
      "Nehas Digital Signage concept UI showing a single screen detail view",
      "A single screen view showing status, health, and configuration."
    ),
    concept(
      `${nehasBase}/04-media-library-concept.png`,
      "Media Library",
      "Nehas Digital Signage concept UI showing the media library",
      "Where content is organized before it goes into a playlist or campaign."
    ),
    concept(
      `${nehasBase}/05-playlists-concept.png`,
      "Playlists",
      "Nehas Digital Signage concept UI showing playlist management",
      "Playlists group content together for scheduling across screens."
    ),
    concept(
      `${nehasBase}/06-campaigns-concept.png`,
      "Campaigns",
      "Nehas Digital Signage concept UI showing campaign management",
      "Time bound campaigns that control what plays where and when."
    ),
    concept(
      `${nehasBase}/07-schedules-concept.png`,
      "Schedules",
      "Nehas Digital Signage concept UI showing the scheduling view",
      "The planned scheduling view for coordinating content across the fleet."
    ),
    concept(
      `${nehasBase}/08-publishing-and-monitoring-concept.png`,
      "Publishing and Monitoring",
      "Nehas Digital Signage concept UI showing publishing and monitoring",
      "Publishing simulation and monitoring, designed to confirm a rollout before it goes live."
    ),
  ],
  "fsss-limat-pos": [
    concept(
      `${fsssBase}/01-pos-checkout-concept.png`,
      "POS Checkout",
      "FSSS Limat POS concept UI showing the checkout screen",
      "The core register flow: build a cart and take payment."
    ),
    concept(
      `${fsssBase}/02-product-search-and-scan-concept.png`,
      "Product Search and Scan",
      "FSSS Limat POS concept UI showing product search and barcode scan",
      "Barcode scanning speeds up adding products during checkout."
    ),
    concept(
      `${fsssBase}/03-inventory-management-concept.png`,
      "Inventory Management",
      "FSSS Limat POS concept UI showing inventory management",
      "Stock levels tracked as sales happen, with a movement history behind them."
    ),
    concept(
      `${fsssBase}/04-sales-history-concept.png`,
      "Sales History",
      "FSSS Limat POS concept UI showing sales history",
      "A record of past sales for reporting and reconciliation."
    ),
    concept(
      `${fsssBase}/05-reports-and-analytics-concept.png`,
      "Reports and Analytics",
      "FSSS Limat POS concept UI showing reports and analytics",
      "Reporting built on top of sales and inventory data."
    ),
    concept(
      `${fsssBase}/06-customers-and-loyalty-concept.png`,
      "Customers and Loyalty",
      "FSSS Limat POS concept UI showing customer and loyalty management",
      "Customer records and loyalty points for repeat shoppers."
    ),
    concept(
      `${fsssBase}/07-held-sales-concept.png`,
      "Held Sales",
      "FSSS Limat POS concept UI showing held sales",
      "A transaction can be paused and resumed later without losing the cart."
    ),
    concept(
      `${fsssBase}/08-user-management-concept.png`,
      "User Management",
      "FSSS Limat POS concept UI showing user management",
      "Role based access separating staff and management permissions."
    ),
  ],
  "tibeb-market": [
    concept(
      `${tibebBase}/01-homepage-concept.png`,
      "Homepage",
      "Tibeb Market concept UI showing the marketplace homepage",
      "The marketplace homepage connecting customers with Ethiopian designers, artisans, boutiques, and tailors."
    ),
    concept(
      `${tibebBase}/02-product-listing-concept.png`,
      "Product Listing",
      "Tibeb Market concept UI showing product listings",
      "Browsing the shared catalog across multiple independent sellers."
    ),
    concept(
      `${tibebBase}/03-product-details-concept.png`,
      "Product Details",
      "Tibeb Market concept UI showing a product detail page",
      "A single product page, planned to support sizing through saved measurement profiles."
    ),
    concept(
      `${tibebBase}/04-seller-dashboard-concept.png`,
      "Seller Dashboard",
      "Tibeb Market concept UI showing the seller dashboard",
      "Where a designer, artisan, boutique, or tailor manages their storefront."
    ),
    concept(
      `${tibebBase}/05-orders-and-tracking-concept.png`,
      "Orders and Tracking",
      "Tibeb Market concept UI showing order tracking",
      "The order lifecycle a customer follows after checkout."
    ),
    concept(
      `${tibebBase}/06-returns-and-refunds-concept.png`,
      "Returns and Refunds",
      "Tibeb Market concept UI showing returns and refunds",
      "The planned process for resolving problems between customers and sellers."
    ),
    concept(
      `${tibebBase}/07-measurements-family-concept.png`,
      "Measurements, Family",
      "Tibeb Market concept UI showing family measurement profiles",
      "Universal and family measurement profiles, so a customer can order for themselves or people they shop for."
    ),
    concept(
      `${tibebBase}/08-account-settings-concept.png`,
      "Account Settings",
      "Tibeb Market concept UI showing account settings",
      "Account level settings, including language and theme."
    ),
  ],
  aradacart: [
    concept(
      `${aradaBase}/01-telegram-mini-app-shop-concept.png`,
      "Telegram Mini App Shop",
      "AradaCart concept UI showing the Telegram Mini App storefront",
      "The buyer storefront, designed to run inside Telegram as a Mini App."
    ),
    concept(
      `${aradaBase}/02-product-catalog-concept.png`,
      "Product Catalog",
      "AradaCart concept UI showing the product catalog",
      "Product browsing shared across the buyer and merchant experiences."
    ),
    concept(
      `${aradaBase}/03-cart-and-checkout-concept.png`,
      "Cart and Checkout",
      "AradaCart concept UI showing cart and checkout",
      "The buyer checkout flow inside the Telegram Mini App."
    ),
    concept(
      `${aradaBase}/04-merchant-dashboard-concept.png`,
      "Merchant Dashboard",
      "AradaCart concept UI showing the merchant dashboard",
      "The web dashboard where a merchant manages their store."
    ),
    concept(
      `${aradaBase}/05-orders-management-concept.png`,
      "Orders Management",
      "AradaCart concept UI showing orders management",
      "Where merchants track and manage incoming orders."
    ),
    concept(
      `${aradaBase}/06-inventory-management-concept.png`,
      "Inventory Management",
      "AradaCart concept UI showing inventory management",
      "Stock and product management from the merchant side."
    ),
    concept(
      `${aradaBase}/07-subscriptions-and-plans-concept.png`,
      "Subscriptions and Plans",
      "AradaCart concept UI showing subscriptions and plans",
      "Merchant access to the platform is planned as subscription based."
    ),
    concept(
      `${aradaBase}/08-analytics-and-reports-concept.png`,
      "Analytics and Reports",
      "AradaCart concept UI showing analytics and reports",
      "Gives merchants visibility into how their store is performing."
    ),
  ],
};

export function getProjectGallery(slug: string): ProjectGalleryItem[] {
  const items = projectGalleries[slug] ?? [];
  // Real screenshots first when both exist, so recruiters see verified
  // evidence before concept material.
  return [...items].sort((a, b) => Number(b.isRealScreenshot) - Number(a.isRealScreenshot));
}
