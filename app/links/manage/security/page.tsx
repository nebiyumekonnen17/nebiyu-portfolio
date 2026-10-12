import type { Metadata } from "next";
import { StudioSecurity } from "@/components/link-hub/StudioSecurity";
import "../studio.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Account Security | Links Studio", robots: { index: false, follow: false } };
export default function SecurityPage() { return <StudioSecurity />; }
