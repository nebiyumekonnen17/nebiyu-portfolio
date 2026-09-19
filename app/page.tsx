import type { Metadata } from "next";
import { StoryHome } from "@/components/home/StoryHome";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl() },
};

export default function Home() {
  return <StoryHome />;
}
