import type { Metadata } from "next";
import { QRManager } from "@/components/link-hub/QRManager";
import "./qr.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Dynamic QR Manager | Nebiyu Links",
  robots: { index: false, follow: false },
};
export default function QRManagerPage() { return <QRManager />; }
