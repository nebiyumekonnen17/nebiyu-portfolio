export type ProjectStatus =
  | "Production"
  | "Active Build"
  | "Built"
  | "Development"
  | "Architecture"
  | "Concept";

export type ProjectCategory =
  | "AWS"
  | "AI"
  | "SaaS"
  | "Full Stack"
  | "Business Software"
  | "Marketplace"
  | "Enterprise SaaS"
  | "Digital Signage"
  | "Engineering Platform"
  | "POS"
  | "Inventory"
  | "Ecommerce"
  | "Product Architecture"
  | "Telegram"
  | "Commerce";

export type ProjectAccent =
  | "violet"
  | "blue"
  | "teal"
  | "green"
  | "amber"
  | "telegram";

export interface ContributionArea {
  label: string;
  description: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ArchitectureLayer {
  label: string;
  service: string;
  description: string;
  icon: string;
}

export interface ProjectAws {
  productionRegion?: string;
  regionLabel?: string;
  services: string[];
}

export interface ScreenshotItem {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  category: ProjectCategory[];
  summary: string;
  thumbnail: string;
  thumbnailAlt: string;
  accent: ProjectAccent;
  technologies: string[];
  technologyGroups?: { label: string; items: string[] }[];
  liveUrl: string | null;
  repositoryUrl: string | null;
  role: string;
  platformType: string;
  servesWho: string;
  problem: string[];
  solution: string[];
  contribution: ContributionArea[];
  features: ProjectFeature[];
  architecture?: ArchitectureLayer[];
  architectureNote?: string;
  aws?: ProjectAws;
  screenshots: ScreenshotItem[];
  challenges: ProjectChallenge[];
  results: string[];
  learnings: string[];
  relatedCredentialNames: string[];
  evidence: string[];
  notes?: string;
}

export type CredentialCategory =
  | "AWS"
  | "Cloud"
  | "Security"
  | "Programming"
  | "IT Fundamentals"
  | "Career & Project Management";

export interface Credential {
  name: string;
  issuer: string;
  featured: boolean;
  category: CredentialCategory;
  dateEarned: string;
  badgeImage?: string;
  certificateFile?: string;
  connectedProjectSlugs?: string[];
  connectionNote?: string;
}

export interface TrainingCertificate {
  name: string;
  issuer: string;
  file: string;
}

export interface SkillItem {
  name: string;
  usedIn: { projectSlug: string; projectName: string }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface NavItem {
  label: string;
  href: string;
}
