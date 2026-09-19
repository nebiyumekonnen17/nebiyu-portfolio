import type { SkillCategory } from "@/types/content";

const p = (slug: string, name: string) => ({ projectSlug: slug, projectName: name });

const visualTizita = p("degissnap", "Visual Tizita");
const naep = p("naep", "NAEP");
const nehas = p("nehas-digital-signage", "Nehas Digital Signage");
const fsss = p("fsss-limat-pos", "FSSS Limat POS");
const aradaCart = p("aradacart", "AradaCart");

export const skillCategories: SkillCategory[] = [
  {
    title: "Cloud and AWS",
    description: "Hands-on AWS work, from production deployment to the services and operational controls underneath it.",
    skills: [
      { name: "AWS Amplify", usedIn: [visualTizita, nehas] },
      { name: "Amazon Cognito", usedIn: [visualTizita] },
      { name: "AWS AppSync", usedIn: [visualTizita] },
      { name: "Amazon DynamoDB", usedIn: [visualTizita] },
      { name: "Amazon S3", usedIn: [visualTizita, nehas] },
      { name: "AWS AppConfig operational controls", usedIn: [nehas] },
      { name: "Regional deployment and environment management", usedIn: [visualTizita, nehas] },
      { name: "AWS-hosted architecture planning", usedIn: [visualTizita, nehas, aradaCart] },
    ],
  },
  {
    title: "Software Engineering",
    description: "Full-stack application development across modern frontends, backend services, developer tooling, and databases.",
    skills: [
      { name: "React", usedIn: [visualTizita, nehas, fsss] },
      { name: "Vite", usedIn: [visualTizita, nehas, fsss] },
      { name: "TypeScript", usedIn: [naep, nehas] },
      { name: "Node.js", usedIn: [naep, fsss] },
      { name: "Command-line tool development", usedIn: [naep] },
      { name: "Monorepo package architecture", usedIn: [naep] },
      { name: "GraphQL API design", usedIn: [visualTizita] },
      { name: "Relational database design", usedIn: [fsss] },
      { name: "Progressive web app delivery", usedIn: [fsss] },
      { name: "Local-first application delivery", usedIn: [fsss] },
    ],
  },
  {
    title: "AI and Data",
    description: "Designing the foundations for reusable, provider-independent AI-assisted engineering.",
    skills: [
      { name: "Provider-agnostic platform architecture", usedIn: [naep] },
      { name: "Engineering knowledge-system design", usedIn: [naep] },
      { name: "AI workflow governance planning", usedIn: [naep] },
    ],
  },
  {
    title: "Cybersecurity and Infrastructure",
    description: "Identity, permissions, tenant boundaries, and system fundamentals underneath the applications I build.",
    skills: [
      { name: "Authentication and identity design", usedIn: [visualTizita, fsss] },
      { name: "Authorization and ownership rules", usedIn: [visualTizita, nehas, fsss] },
      { name: "Role-based access control", usedIn: [nehas, fsss] },
      { name: "Security fundamentals", usedIn: [visualTizita, nehas, fsss] },
    ],
  },
  {
    title: "Product and Project Management",
    description: "Turning an idea into a scoped, buildable system, then keeping the product organized as it grows.",
    skills: [
      { name: "Product architecture and system design", usedIn: [visualTizita, naep, nehas, fsss, aradaCart] },
      { name: "Point-of-sale and inventory workflow design", usedIn: [fsss] },
      { name: "Multi-role platform planning", usedIn: [visualTizita, nehas, fsss, aradaCart] },
      { name: "Configuration-driven architecture", usedIn: [nehas, fsss] },
    ],
  },
];
