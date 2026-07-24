export interface AwsServiceEntry {
  name: string;
  icon: "shield-check" | "network" | "database" | "image" | "rocket" | "settings";
  group: "Authentication and Identity" | "APIs and Data" | "Storage" | "Deployment and Environment Management";
  usedIn: { projectSlug: string; projectName: string; status: string };
  purpose: string;
  problemSolved: string;
}

export const awsServiceEntries: AwsServiceEntry[] = [
  {
    name: "Amazon Cognito",
    icon: "shield-check",
    group: "Authentication and Identity",
    usedIn: { projectSlug: "degissnap", projectName: "DegisSnap", status: "Production" },
    purpose: "Secure host authentication, identity, and session management.",
    problemSolved: "Hosts need real accounts and access control, while guests need to contribute without one. Cognito handles the host side so authorization rules have a real identity to check against.",
  },
  {
    name: "AWS AppSync",
    icon: "network",
    group: "APIs and Data",
    usedIn: { projectSlug: "degissnap", projectName: "DegisSnap", status: "Production" },
    purpose: "GraphQL API layer with built in authorization.",
    problemSolved: "Every read and write needs an ownership check between hosts, events, and guest uploads. AppSync resolvers enforce that at the API layer instead of trusting the client.",
  },
  {
    name: "Amazon DynamoDB",
    icon: "database",
    group: "APIs and Data",
    usedIn: { projectSlug: "degissnap", projectName: "DegisSnap", status: "Production" },
    purpose: "NoSQL database for application data.",
    problemSolved: "Events, guest metadata, guestbook entries, comments, and love reactions all need fast, predictable reads and writes at event time.",
  },
  {
    name: "Amazon S3",
    icon: "image",
    group: "Storage",
    usedIn: { projectSlug: "degissnap", projectName: "DegisSnap", status: "Production" },
    purpose: "Object storage for uploaded photos and event cover images.",
    problemSolved: "Guest uploads need durable, scalable storage that can handle bursts of photo uploads during an event.",
  },
  {
    name: "AWS Amplify",
    icon: "rocket",
    group: "Deployment and Environment Management",
    usedIn: { projectSlug: "degissnap", projectName: "DegisSnap", status: "Production" },
    purpose: "Builds, hosts, and deploys the frontend and AWS backend together.",
    problemSolved: "Running a real production AWS application as a solo developer means deployment has to stay manageable. Amplify ties the frontend and backend into one deployable unit, including the production environment in Oregon (us-west-2).",
  },
  {
    name: "AWS AppConfig",
    icon: "settings",
    group: "Deployment and Environment Management",
    usedIn: { projectSlug: "nehas-digital-signage", projectName: "Nehas Digital Signage", status: "Active Build" },
    purpose: "Centralized configuration for rollout rules, feature availability, and content behavior.",
    problemSolved: "A signage fleet needs to change behavior, rollout rules, content rules, feature flags, without redeploying every screen. AppConfig style patterns are the planned mechanism for that.",
  },
];
