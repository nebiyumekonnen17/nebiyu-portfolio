import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Real projects. Real impact."
          description="A selection of applications I've designed, built, and shipped, spanning AWS, AI, and business software."
          action={
            <Button href="/projects" variant="secondary" size="sm" className="shrink-0">
              View all projects <ArrowRight size={15} />
            </Button>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 3} />
          ))}
        </div>
      </Container>
    </section>
  );
}
