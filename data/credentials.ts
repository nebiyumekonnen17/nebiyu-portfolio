import type { Credential, TrainingCertificate } from "@/types/content";

export const credlyProfileUrl = "https://www.credly.com/users/nebiyu-mekonnen";

// Dates and badge names are taken directly from the Credly badge wallet
// screenshot and the supplied certificate PDFs. Nothing here is estimated.
export const credentials: Credential[] = [
  {
    name: "AWS re/Start Graduate",
    issuer: "Amazon Web Services",
    featured: true,
    category: "AWS",
    dateEarned: "2026-07-24",
    connectedProjectSlugs: ["degissnap", "nehas-digital-signage"],
    connectionNote:
      "Foundational AWS training that led into building and deploying DegisSnap, and now informs the Nehas Digital Signage architecture.",
  },
  {
    name: "AWS Skills Center Cloud Practitioner Foundations",
    issuer: "Amazon Web Services",
    featured: true,
    category: "AWS",
    dateEarned: "2026-06-12",
    connectedProjectSlugs: ["degissnap"],
    connectionNote:
      "Cloud fundamentals practiced directly in DegisSnap's Amplify, Cognito, AppSync, DynamoDB, and S3 architecture.",
  },
  {
    name: "Career Management Essentials",
    issuer: "IBM SkillsBuild",
    featured: false,
    category: "Career & Project Management",
    dateEarned: "2026-04-25",
    certificateFile: "/nebiyu-portfolio/credentials/ibm-skillsbuild-career-management-essentials-completion.pdf",
    connectionNote: "Supports how I plan and communicate my own career direction alongside the engineering work.",
  },
  {
    name: "Computer Hardware Basics",
    issuer: "Cisco",
    featured: false,
    category: "IT Fundamentals",
    dateEarned: "2026-04-02",
    connectionNote: "Early foundation in how computing systems work below the application layer.",
  },
  {
    name: "Explore Emerging Tech",
    issuer: "IBM SkillsBuild",
    featured: false,
    category: "IT Fundamentals",
    dateEarned: "2026-04-25",
    connectedProjectSlugs: ["naep"],
    connectionNote: "Broad exposure to emerging technology areas, including the AI concepts behind NAEP.",
  },
  {
    name: "IBM Cloud Essentials",
    issuer: "IBM SkillsBuild",
    featured: true,
    category: "Cloud",
    dateEarned: "2026-04-24",
    certificateFile: "/nebiyu-portfolio/credentials/ibm-cloud-essentials-certificate.pdf",
    connectedProjectSlugs: ["degissnap"],
    connectionNote: "General cloud computing concepts that carry over directly into AWS architecture work.",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    featured: true,
    category: "Security",
    dateEarned: "2026-04-03",
    connectedProjectSlugs: ["degissnap"],
    connectionNote: "Security fundamentals applied to authentication and access control design in DegisSnap.",
  },
  {
    name: "Operating Systems Basics",
    issuer: "Cisco",
    featured: false,
    category: "IT Fundamentals",
    dateEarned: "2026-04-01",
    connectionNote: "Core systems knowledge that underlies backend and infrastructure work.",
  },
  {
    name: "Project Management Fundamentals",
    issuer: "IBM SkillsBuild",
    featured: true,
    category: "Career & Project Management",
    dateEarned: "2026-04-25",
    connectedProjectSlugs: ["nehas-digital-signage", "tibeb-market"],
    connectionNote: "Applied to planning multi feature platforms like Nehas Digital Signage and Tibeb Market.",
  },
  {
    name: "Python Essentials 1",
    issuer: "Cisco",
    featured: true,
    category: "Programming",
    dateEarned: "2026-04-02",
    connectedProjectSlugs: ["naep"],
    connectionNote: "Python fundamentals used directly in NAEP's engineering and AI work.",
  },
];

export const awsTrainingCertificates: TrainingCertificate[] = [
  {
    name: "Becoming a Cloud Practitioner, Part 2: Compute, Networking, and Account Strategies",
    issuer: "AWS Skills Centers",
    file: "/nebiyu-portfolio/credentials/aws-cloud-practitioner-part-2-compute-networking-account-strategies.pdf",
  },
  {
    name: "Becoming a Cloud Practitioner, Part 3: Identities, Security, and Monitoring the AWS Cloud",
    issuer: "AWS Skills Centers",
    file: "/nebiyu-portfolio/credentials/aws-cloud-practitioner-part-3-identities-security-monitoring.pdf",
  },
  {
    name: "Becoming a Cloud Practitioner, Part 4: Advanced Cloud Services",
    issuer: "AWS Skills Centers",
    file: "/nebiyu-portfolio/credentials/aws-cloud-practitioner-part-4-advanced-cloud-services.pdf",
  },
];

export const featuredCredentials = credentials.filter((c) => c.featured);

