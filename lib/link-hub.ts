export const DARK_HUB_TEMPLATES = [
  { id: "midnight", name: "Midnight + Ice Blue", detail: "Topographic midnight blue", accent: "#84B6FF", bg: "#0B1424", surface: "#142338", ink: "#F1F6FF" },
  { id: "deep-blue", name: "Deep Blue Gradient", detail: "Soft atmospheric electric blue", accent: "#2288FF", bg: "#080F24", surface: "#13213C", ink: "#F4F7FF" },
  { id: "charcoal", name: "Minimal Charcoal", detail: "Quiet texture and cool slate", accent: "#879EBE", bg: "#10151C", surface: "#1C2530", ink: "#F4F5F6" },
  { id: "waves", name: "Abstract Waves", detail: "Layered flowing blue shapes", accent: "#287AFF", bg: "#091426", surface: "#122036", ink: "#F4F7FF" },
  { id: "purple-slate", name: "Purple Slate", detail: "Creative, refined violet", accent: "#9478F8", bg: "#16132A", surface: "#231F3C", ink: "#F6F2FF" },
  { id: "futuristic-tech", name: "Futuristic Tech", detail: "Precision cyan circuit geometry", accent: "#00C9E8", bg: "#081524", surface: "#112536", ink: "#EAF8FF" },
  { id: "aurora", name: "Aurora", detail: "Cyan, indigo and violet light bands", accent: "#997CFF", bg: "#0A1127", surface: "#18203B", ink: "#F6F3FF" },
  // Approved Coder board — concepts 1–4.
  { id: "coder-blueprint", name: "Coder Blueprint", detail: "Electric blue grid, precise connected nodes", accent: "#2389FF", bg: "#071A3A", surface: "#10284B", ink: "#F4F9FF" },
  { id: "coder-editor", name: "Code Editor", detail: "Developer terminal texture and cobalt accents", accent: "#337CFF", bg: "#081421", surface: "#102238", ink: "#EDF6FF" },
  { id: "coder-circuit", name: "Cyan Circuit", detail: "Cyan engineering circuitry on deep teal", accent: "#26D5DE", bg: "#071B27", surface: "#102B3B", ink: "#EFFBFC" },
  { id: "coder-violet", name: "Violet Code Waves", detail: "Violet gradients, flowing technical contours", accent: "#9655F7", bg: "#16112D", surface: "#241B40", ink: "#F8F4FF" },
  // Approved AWS board — concepts 7–8.
  { id: "aws-console", name: "AWS Dark Console", detail: "Cloud topology, console grids and blue signals", accent: "#219EFA", bg: "#071426", surface: "#0E2740", ink: "#EFF8FF" },
  { id: "aws-aurora-cloud", name: "AWS Aurora Cloud", detail: "Cloud architecture, global arcs and warm orange", accent: "#FFA344", bg: "#08172C", surface: "#14283F", ink: "#F5F9FF" },
] as const;
export const LIGHT_HUB_TEMPLATES = [
  { id: "minimal", name: "Light Minimal", detail: "Ivory with delicate contour lines", accent: "#286EF1", bg: "#F7F7F4", surface: "#FFFFFF", ink: "#172235" },
  { id: "soft-blue", name: "Soft Blue Gradient", detail: "Calm, airy blue atmosphere", accent: "#207CFA", bg: "#EFF5FF", surface: "#FFFFFF", ink: "#15253A" },
  { id: "clean-white", name: "Clean White", detail: "Distraction-free white canvas", accent: "#176EF2", bg: "#FFFFFF", surface: "#F9FAFC", ink: "#111C30" },
  { id: "soft-waves", name: "Soft Waves", detail: "Minimalist flowing shapes", accent: "#2077F5", bg: "#EEF6FF", surface: "#FFFFFF", ink: "#16273B" },
  { id: "warm-neutral", name: "Warm Neutral", detail: "Natural off-white and navy", accent: "#1A355D", bg: "#F5F0E8", surface: "#FFFCF6", ink: "#18243A" },
  { id: "futuristic-light", name: "Futuristic Light", detail: "Airy blueprint geometry in light blue", accent: "#286FAB", bg: "#EBF7FF", surface: "#FFFFFF", ink: "#173A59" },
  { id: "aurora-light", name: "Aurora Light", detail: "Soft violet and aqua atmosphere", accent: "#6752B4", bg: "#F5F3FF", surface: "#FFFFFF", ink: "#27345A" },
  // Approved white/Coder + AWS board — concepts 5–6.
  { id: "coder-white-grid", name: "White Coder Grid", detail: "Bright blueprint grid and subtle blue nodes", accent: "#176DF3", bg: "#F7FAFF", surface: "#FFFFFF", ink: "#15243D" },
  // Additional approved white coder collection: precise, developer-focused, no gold.
  { id: "coder-white-blueprint", name: "White Coder Blueprint", detail: "Architectural blueprints and numbered wireframes", accent: "#2364C9", bg: "#FAFCFF", surface: "#FFFFFF", ink: "#19314D" },
  { id: "coder-white-editor", name: "White Code Editor", detail: "Clean editor typography on frosted white", accent: "#3761D7", bg: "#F5F8FD", surface: "#FFFFFF", ink: "#1F2A42" },
  { id: "coder-white-circuit", name: "White Circuit", detail: "Cyan circuit traces on bright white", accent: "#008EAA", bg: "#F3FCFD", surface: "#FFFFFF", ink: "#183B46" },
  { id: "coder-white-violet", name: "White Violet Flow", detail: "Soft lavender, flowing code contours", accent: "#7452C4", bg: "#F9F6FF", surface: "#FFFFFF", ink: "#30294A" },
  { id: "aws-cloud-builder", name: "AWS Light Cloud Builder", detail: "Cloud architecture lines and airy soft whites", accent: "#F7931A", bg: "#F7FBFF", surface: "#FFFFFF", ink: "#172942" },
] as const;
export type DarkHubTemplate = typeof DARK_HUB_TEMPLATES[number]["id"];
export type LightHubTemplate = typeof LIGHT_HUB_TEMPLATES[number]["id"];
/** One publicly published template, regardless of the visitor's device theme. */
export const HUB_TEMPLATES = [...DARK_HUB_TEMPLATES, ...LIGHT_HUB_TEMPLATES] as const;
export type HubThemeTemplate = DarkHubTemplate | LightHubTemplate;
export const isLightHubTemplate = (id: HubThemeTemplate) => LIGHT_HUB_TEMPLATES.some(t => t.id === id);
export const getSelectedHubTemplate = (design: Pick<HubContent["design"], "activeTemplate" | "darkTemplate">) =>
  HUB_TEMPLATES.find(t => t.id === design.activeTemplate) ?? DARK_HUB_TEMPLATES.find(t => t.id === design.darkTemplate) ?? DARK_HUB_TEMPLATES[0];

export type HubBackgroundSettings = {
  intensity: number;
  placement: "profile" | "top" | "full";
  motion: boolean;
  texture: boolean;
  cardOpacity: number;
};
export const DEFAULT_HUB_BACKGROUND: HubBackgroundSettings = {
  intensity: 60,
  placement: "top",
  motion: false,
  texture: true,
  cardOpacity: 100,
};

export type HubLink = {
  id: string;
  label: string;
  url: string;
  description?: string;
  icon: string;
  section: "primary" | "social" | "extra";
  visible: boolean;
};
export type HubProject = { id: string; name: string; description: string; url: string; image: string; visible: boolean };
export type HubContent = {
  profile: { name: string; headline: string; bio: string; portrait: string; resume: string };
  design: { activeTemplate: HubThemeTemplate; darkAccent: string; lightAccent: string; darkTemplate: DarkHubTemplate; lightTemplate: LightHubTemplate; background?: HubBackgroundSettings };
  links: HubLink[];
  projects: HubProject[];
  updatedAt?: string;
};
export const initialHub: HubContent = {
  profile: {
    name: "Nebiyu Mekonnen",
    headline: "Full-Stack Developer · AWS Cloud Builder",
    bio: "Building software that solves real-world problems.",
    portrait: "/assets/profile/nebiyu_primary_portrait.webp",
    resume: "/resume/Nebiyu_Mekonnen_Resume.pdf",
  },
  design: { darkAccent: "#84B6FF", lightAccent: "#286EF1", darkTemplate: "midnight", lightTemplate: "minimal", activeTemplate: "midnight", background: { ...DEFAULT_HUB_BACKGROUND } },
  links: [
    { id: "portfolio", label: "Explore My Portfolio", url: "/", icon: "globe", section: "primary", visible: true },
    { id: "resume", label: "Download My Resume", url: "/resume/Nebiyu_Mekonnen_Resume.pdf", icon: "file", section: "primary", visible: true },
    { id: "github", label: "GitHub", url: "https://github.com/nebiyumekonnen17", icon: "github", section: "social", visible: true },
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/nebiyumekonnen/", icon: "linkedin", section: "social", visible: true },
    { id: "instagram", label: "Visual Tizita Instagram", url: "https://www.instagram.com/visualtizita/", icon: "instagram", section: "social", visible: true },
    { id: "email", label: "Email Me", url: "mailto:nebiyumekonnen10@gmail.com", icon: "mail", section: "social", visible: true },
    { id: "credentials", label: "Certifications & Badges", url: "https://www.credly.com/users/nebiyu-mekonnen", icon: "award", section: "extra", visible: true },
    { id: "contact", label: "Let's Connect", url: "/contact/", icon: "send", section: "extra", visible: true },
  ],
  projects: [
    { id: "visual-tizita", name: "Visual Tizita", description: "Event experiences", url: "/projects/degissnap/", image: "/assets/projects/Visual-Tizita-events-poster.png", visible: true },
    { id: "naep", name: "NAEP", description: "AI engineering", url: "/projects/naep/", image: "/assets/projects/NAEP-thumbnail.png", visible: true },
    { id: "nehas", name: "Nehas Digital Signage", description: "Cloud operations", url: "/projects/nehas-digital-signage/", image: "/assets/projects/Nehas-Digital-Signage-thumbnail.png", visible: true },
  ],
};
const saneText = (v: unknown, length: number) => typeof v === "string" ? v.trim().slice(0, length) : "";
const validDestination = (s: string) => {
  if (s.startsWith("/") && !s.startsWith("//") && !s.includes("\\")) return true;
  if (s.startsWith("mailto:")) return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  try { const u = new URL(s); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; }
};
const validImage = (s: string) => s.startsWith("/") && !s.startsWith("//") && !s.includes("\\");
const safeColor = (v: unknown, fallback: string) => typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback;
const limitedNumber = (value: unknown, fallback: number, min: number, max: number) =>
  typeof value === "number" && Number.isFinite(value) ? Math.max(min, Math.min(max, Math.round(value))) : fallback;
function validateBackground(value: unknown): HubBackgroundSettings {
  const raw = (value && typeof value === "object" && !Array.isArray(value) ? value : {}) as Partial<HubBackgroundSettings>;
  return {
    intensity: limitedNumber(raw.intensity, 60, 0, 100),
    placement: raw.placement === "profile" || raw.placement === "full" ? raw.placement : "top",
    motion: raw.motion === true,
    texture: raw.texture !== false,
    cardOpacity: limitedNumber(raw.cardOpacity, 100, 85, 100),
  };
}
export function validateHub(value: unknown): HubContent {
  if (!value || typeof value !== "object") throw new Error("Invalid content");
  const source = value as Partial<HubContent>;
  if (!source.profile || !source.design || !Array.isArray(source.links) || !Array.isArray(source.projects)) throw new Error("Content must contain profile, design, links and projects");
  const design = source.design;
  if (source.links.length > 60 || source.projects.length > 12) throw new Error("Too many entries");
  const links = source.links.map((l, i) => {
    const url = saneText(l.url, 700);
    if (!validDestination(url)) throw new Error("Invalid URL in link " + (i + 1));
    return {
      id: saneText(l.id, 80) || "link-" + i,
      label: saneText(l.label, 90) || "Untitled",
      description: saneText(l.description, 160),
      icon: saneText(l.icon, 40) || "link",
      section: (["primary", "social", "extra"].includes(l.section) ? l.section : "extra") as HubLink["section"],
      url, visible: l.visible !== false,
    };
  });
  const projects = source.projects.map((p, i) => {
    const url = saneText(p.url, 700);
    if (!validDestination(url)) throw new Error("Invalid project URL");
    const image = saneText(p.image, 700);
    if (image && !validImage(image)) throw new Error("Project images must be local paths");
    return { id: saneText(p.id, 80) || "project-" + i, name: saneText(p.name, 100), description: saneText(p.description, 180), url, image, visible: p.visible !== false };
  });
  const portrait = saneText(source.profile.portrait, 700);
  const resume = saneText(source.profile.resume, 700);
  if (!validImage(portrait) || !validImage(resume)) throw new Error("Profile assets must use local paths");
  return {
    profile: { name: saneText(source.profile.name, 90), headline: saneText(source.profile.headline, 140), bio: saneText(source.profile.bio, 250), portrait, resume },
    design: {
      // Existing published content may predate single-template mode. Adopt its previously
      // configured dark design; never overwrite a valid explicitly published selection.
      activeTemplate: HUB_TEMPLATES.some(t => t.id === design.activeTemplate)
        ? design.activeTemplate as HubThemeTemplate
        : DARK_HUB_TEMPLATES.some(t => t.id === design.darkTemplate) ? design.darkTemplate as DarkHubTemplate : "midnight",
      darkTemplate: DARK_HUB_TEMPLATES.some((t) => t.id === design.darkTemplate)
        ? design.darkTemplate as DarkHubTemplate : "midnight",
      lightTemplate: LIGHT_HUB_TEMPLATES.some((t) => t.id === design.lightTemplate)
        ? design.lightTemplate as LightHubTemplate : "minimal",
      // Upgrade legacy gold presets automatically; preserve other intentional accent overrides.
      darkAccent: design.darkTemplate === undefined && design.darkAccent?.toLowerCase() === "#e9b23e"
        ? "#84B6FF" : safeColor(design.darkAccent, "#84B6FF"),
      lightAccent: design.lightTemplate === undefined && design.lightAccent?.toLowerCase() === "#a36a10"
        ? "#286EF1" : safeColor(design.lightAccent, "#286EF1"),
      background: validateBackground(design.background),
    },
    links, projects, updatedAt: new Date().toISOString(),
  };
}
