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
      <section className="work-page-hero">
        <Container>
          <div className="work-page-hero-copy">
            <p className="work-page-kicker">Work / Product Engineering</p>
            <h1>I build software around the way people actually work.</h1>
            <p className="work-page-intro">
              Full-stack products shaped around real workflows — from the interface and permissions
              to the backend, cloud architecture, security, and deployment.
            </p>
            <div className="work-page-focus" aria-label="Work focus">
              <span>Product engineering</span>
              <span>AWS systems</span>
              <span>Operational UX</span>
              <span>Security & permissions</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="work-page-content">
        <Container>
          <ProjectFilterGrid projects={projects} />
        </Container>
      </section>
    </main>
  );
}
