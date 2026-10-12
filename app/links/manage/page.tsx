import type { Metadata } from "next";
import { StudioDashboard } from "@/components/link-hub/StudioDashboard";
import "./studio.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Links Studio | Dashboard", robots: { index: false, follow: false } };
export default function ManagePage() { return <StudioDashboard />; }
