import type { Metadata } from "next";
import { readHub } from "@/lib/link-hub-store";
import { initialHub } from "@/lib/link-hub";
import { HubExperience } from "@/components/link-hub/HubExperience";
import "./links.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Links | Nebiyu Mekonnen",
  description: "Portfolio, projects, code, resume, and social profiles for Nebiyu Mekonnen.",
  alternates: { canonical: "https://nebiyumekonnen.com/links" },
  openGraph: { title: "Nebiyu Mekonnen — Links & Projects", description: "Explore my work, projects and social profiles.", url: "https://nebiyumekonnen.com/links" },
};
export default async function LinksPage() {
  let content = initialHub;
  try { content = await readHub("live"); } catch { /* Serve safe published defaults if storage is temporarily unavailable */ }
  return <HubExperience content={content}/>;
}
