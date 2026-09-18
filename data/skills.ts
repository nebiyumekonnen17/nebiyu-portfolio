import type { SkillCategory } from "@/types/content";

const p = (slug: string, name: string) => ({ projectSlug: slug, projectName: name });

export const skillCategories: SkillCategory[] = [
  {
    title: "Cloud and AWS",
    description: "Hands on AWS work, from a production deployment down to the services underneath it.",
    skills: [
      { name: "AWS Amplify", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "Amazon Cognito", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "AWS AppSync", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "Amazon DynamoDB", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "Amazon S3", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "AWS AppConfig patterns", usedIn: [p("nehas-digital-signage", "Nehas Digital Signage")] },
      { name: "Regional deployment and environment management", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "AWS hosted architecture planning", usedIn: [p("aradacart", "AradaCart")] },
    ],
  },
  {
    title: "Software Engineering",
    description: "Full stack application development across React, backend services, and databases.",
    skills: [
      { name: "React", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "Vite", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "TypeScript", usedIn: [p("naep", "NAEP")] },
      { name: "Node.js", usedIn: [p("fsss-limat-pos", "FSSS Limat POS")] },
      { name: "GraphQL API design", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "Relational database design", usedIn: [p("fsss-limat-pos", "FSSS Limat POS")] },
      { name: "Progressive web app delivery", usedIn: [p("fsss-limat-pos", "FSSS Limat POS")] },
      { name: "Offline first application design", usedIn: [p("fsss-limat-pos", "FSSS Limat POS")] },
    ],
  },
  {
    title: "AI and Data",
    description: "Building AI systems that stay usable across providers instead of locking into one.",
    skills: [
      { name: "AI orchestration", usedIn: [p("naep", "NAEP")] },
      { name: "Local model integration with Ollama", usedIn: [p("naep", "NAEP")] },
      { name: "Provider agnostic system design", usedIn: [p("naep", "NAEP")] },
      { name: "Python", usedIn: [p("naep", "NAEP")] },
      { name: "Workflow and agent architecture", usedIn: [p("naep", "NAEP")] },
    ],
  },
  {
    title: "Cybersecurity and Infrastructure",
    description: "Access control, identity, and system fundamentals underneath the applications I build.",
    skills: [
      { name: "Authentication and identity design", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "Authorization and ownership rules", usedIn: [p("degissnap", "Visual Tizita")] },
      { name: "Role based access control", usedIn: [p("fsss-limat-pos", "FSSS Limat POS")] },
      { name: "Security fundamentals", usedIn: [p("degissnap", "Visual Tizita")] },
    ],
  },
  {
    title: "Product and Project Management",
    description: "Turning an idea into a scoped, buildable system, then keeping it organized as it grows.",
    skills: [
      { name: "Product architecture and system design", usedIn: [p("nehas-digital-signage", "Nehas Digital Signage")] },
      { name: "Marketplace and multi vendor system design", usedIn: [p("tibeb-market", "Tibeb Market")] },
      { name: "Point of sale and inventory workflow design", usedIn: [p("fsss-limat-pos", "FSSS Limat POS")] },
      { name: "Multi role platform planning", usedIn: [p("aradacart", "AradaCart")] },
      { name: "Configuration driven architecture", usedIn: [p("nehas-digital-signage", "Nehas Digital Signage")] },
    ],
  },
];
