import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectFilterGrid } from "@/components/projects/ProjectFilterGrid";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/config";
import "./work-page.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Nebiyu Mekonnen's production software, active builds, and architecture work across full stack development, AWS, and AI.",
  alternates: { canonical: absoluteUrl("/projects") },
};

export default function ProjectsPage() {
  return (
    <main className="work-page">
      <header className="work-page-header">
        <Container>
          <div className="work-page-header-inner">
            <h1>Work</h1>
            <p>
              Selected production systems, active builds, and case studies across product
              engineering, AWS, and AI.
            </p>
          </div>
        </Container>
      </header>

      <section className="work-page-content">
        <Container>
          <ProjectFilterGrid projects={projects} />
        </Container>
      </section>
    </main>
  );
}
