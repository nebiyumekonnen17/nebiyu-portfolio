import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectFilterGrid } from "@/components/projects/ProjectFilterGrid";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Nebiyu Mekonnen's production software, active builds, and architecture work across full stack development, AWS, and AI.",
  alternates: { canonical: absoluteUrl("/projects") },
};

export default function ProjectsPage() {
  return (
    <div className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <h1 className="text-[32px] md:text-[40px] font-bold text-fg mb-3">Projects</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Production software, active builds, and architecture concepts—each labeled clearly so
            you can see what is live, what is implemented, and what is still being designed.
          </p>
        </Reveal>

        <ProjectFilterGrid projects={projects} />
      </Container>
    </div>
  );
}
