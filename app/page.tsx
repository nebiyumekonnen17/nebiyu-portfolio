import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BuildingOnAws } from "@/components/home/BuildingOnAws";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AwsInPractice } from "@/components/home/AwsInPractice";
import { SkillsInPractice } from "@/components/home/SkillsInPractice";
import { CredentialsPreview } from "@/components/home/CredentialsPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactBanner } from "@/components/ContactCTA";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl() },
};

export default function Home() {
  return (
    <>
      <Hero />
      <BuildingOnAws />
      <FeaturedProjects />
      <AwsInPractice />
      <SkillsInPractice />
      <CredentialsPreview />
      <AboutPreview />
      <ContactBanner />
    </>
  );
}
