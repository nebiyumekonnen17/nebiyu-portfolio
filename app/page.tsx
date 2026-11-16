import type { Metadata } from "next";
import { MoneHome } from "@/components/home/MoneHome";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl() },
};

export default function Home() {
  return <MoneHome />;
}
