const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/nebiyu-portfolio";

const heroImages: Record<string, string> = {
  degissnap: `${basePath}/assets/projects/Visual-Tizita-events-poster.png`,
  naep: `${basePath}/assets/projects/NAEP-hero.svg`,
  "nehas-digital-signage": `${basePath}/assets/projects/Nehas-Digital-Signage-hero.svg`,
  "fsss-limat-pos": `${basePath}/assets/projects/FSSS-Limat-POS-hero.svg`,
  aradacart: `${basePath}/assets/projects/AradaCart-hero.svg`,
};

export function projectHeroImage(slug: string, fallback: string) {
  return heroImages[slug] ?? fallback;
}

export function preserveFullProjectArtwork(slug: string) {
  return slug === "degissnap";
}
