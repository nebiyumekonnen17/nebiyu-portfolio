export const DARK_HUB_TEMPLATES = [
  { id: "midnight", name: "Midnight + Ice Blue", detail: "Topographic midnight blue", accent: "#84B6FF", bg: "#0B1424", surface: "#142338", ink: "#F1F6FF" },
  { id: "deep-blue", name: "Deep Blue Gradient", detail: "Soft atmospheric electric blue", accent: "#2288FF", bg: "#080F24", surface: "#13213C", ink: "#F4F7FF" },
  { id: "charcoal", name: "Minimal Charcoal", detail: "Quiet texture and cool slate", accent: "#879EBE", bg: "#10151C", surface: "#1C2530", ink: "#F4F5F6" },
  { id: "waves", name: "Abstract Waves", detail: "Layered flowing blue shapes", accent: "#287AFF", bg: "#091426", surface: "#122036", ink: "#F4F7FF" },
  { id: "purple-slate", name: "Purple Slate", detail: "Creative, refined violet", accent: "#9478F8", bg: "#16132A", surface: "#231F3C", ink: "#F6F2FF" },
] as const;
export const LIGHT_HUB_TEMPLATES = [
  { id: "minimal", name: "Light Minimal", detail: "Ivory with delicate contour lines", accent: "#286EF1", bg: "#F7F7F4", surface: "#FFFFFF", ink: "#172235" },
  { id: "soft-blue", name: "Soft Blue Gradient", detail: "Calm, airy blue atmosphere", accent: "#207CFA", bg: "#EFF5FF", surface: "#FFFFFF", ink: "#15253A" },
  { id: "clean-white", name: "Clean White", detail: "Distraction-free white canvas", accent: "#176EF2", bg: "#FFFFFF", surface: "#F9FAFC", ink: "#111C30" },
  { id: "soft-waves", name: "Soft Waves", detail: "Minimalist flowing shapes", accent: "#2077F5", bg: "#EEF6FF", surface: "#FFFFFF", ink: "#16273B" },
  { id: "warm-neutral", name: "Warm Neutral", detail: "Natural off-white and navy", accent: "#1A355D", bg: "#F5F0E8", surface: "#FFFCF6", ink: "#18243A" },
] as const;
export type DarkHubTemplate = typeof DARK_HUB_TEMPLATES[number]["id"];
export type LightHubTemplate = typeof LIGHT_HUB_TEMPLATES[number]["id"];

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
  design: { darkAccent: string; lightAccent: string; darkTemplate: DarkHubTemplate; lightTemplate: LightHubTemplate };
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
  design: { darkAccent: "#84B6FF", lightAccent: "#286EF1", darkTemplate: "midnight", lightTemplate: "minimal" },
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
export function validateHub(value: unknown): HubContent {
  if (!value || typeof value !== "object") throw new Error("Invalid content");
  const source = value as Partial<HubContent>;
  if (!source.profile || !source.design || !Array.isArray(source.links) || !Array.isArray(source.projects)) throw new Error("Content must contain profile, design, links and projects");
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
      darkTemplate: DARK_HUB_TEMPLATES.some((t) => t.id === source.design.darkTemplate)
        ? source.design.darkTemplate as DarkHubTemplate : "midnight",
      lightTemplate: LIGHT_HUB_TEMPLATES.some((t) => t.id === source.design.lightTemplate)
        ? source.design.lightTemplate as LightHubTemplate : "minimal",
      // Upgrade legacy gold presets automatically; preserve other intentional accent overrides.
      darkAccent: source.design.darkTemplate === undefined && source.design.darkAccent?.toLowerCase() === "#e9b23e"
        ? "#84B6FF" : safeColor(source.design.darkAccent, "#84B6FF"),
      lightAccent: source.design.lightTemplate === undefined && source.design.lightAccent?.toLowerCase() === "#a36a10"
        ? "#286EF1" : safeColor(source.design.lightAccent, "#286EF1"),
    },
    links, projects, updatedAt: new Date().toISOString(),
  };
}
