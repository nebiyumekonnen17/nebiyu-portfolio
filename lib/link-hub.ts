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
  design: { darkAccent: string; lightAccent: string };
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
  design: { darkAccent: "#E9B23E", lightAccent: "#A36A10" },
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
    design: { darkAccent: safeColor(source.design.darkAccent, "#E9B23E"), lightAccent: safeColor(source.design.lightAccent, "#A36A10") },
    links, projects, updatedAt: new Date().toISOString(),
  };
}
