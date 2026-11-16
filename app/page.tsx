import type { Metadata } from "next";
import { MoneOriginal } from "@/components/home/MoneOriginal";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = { alternates: { canonical: absoluteUrl() } };

export default function Home() {
  return <MoneOriginal />;
}
