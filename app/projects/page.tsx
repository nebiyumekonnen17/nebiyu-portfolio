import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectFilterGrid } from "@/components/projects/ProjectFilterGrid";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real products, real impact. Explore the full stack, AWS, and AI projects Nebiyu Mekonnen has designed and built.",
  alternates: { canonical: absoluteUrl("/projects") },
};

export default function ProjectsPage() {
  return (
    <div className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <h1 className="text-[32px] md:text-[40px] font-bold text-fg mb-3">Projects</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Real products. Real impact. Explore a selection of applications I&apos;ve designed,
            built, and shipped.
          </p>
        </Reveal>

        <ProjectFilterGrid projects={projects} />
      </Container>
    </div>
  );
}
