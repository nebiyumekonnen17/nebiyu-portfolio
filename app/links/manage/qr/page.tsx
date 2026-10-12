import type { Metadata } from "next";
import { QRManager } from "@/components/link-hub/QRManager";
import "./qr.css";
import "../studio.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dynamic QR Manager | Links Studio", robots: { index: false, follow: false } };
export default function QRManagerPage() { return <QRManager />; }
