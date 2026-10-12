import type { Metadata } from "next";
import { HubManager } from "@/components/link-hub/HubManager";
import "../../links.css";
import "../studio.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Link Manager | Links Studio", robots: { index: false, follow: false } };
export default function LinkManagerPage() { return <HubManager />; }
