import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Real projects. Real impact."
            description="Production software, active builds, and architecture work spanning AWS, AI, and business systems."
            action={
              <Button href="/projects" variant="secondary" size="sm" className="shrink-0">
                View all projects <ArrowRight size={15} />
              </Button>
            }
          />
        </Reveal>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} priority={i < 3} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
