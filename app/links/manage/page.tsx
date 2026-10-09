import type { Metadata } from "next";
import { HubManager } from "@/components/link-hub/HubManager";
import "../links.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Link Hub Manager | Private", robots: { index: false, follow: false } };
export default function ManagePage() { return <HubManager/>; }
