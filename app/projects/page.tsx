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
  const shipped = projects.filter((project) =>
    ["Production", "Built"].includes(project.status),
  ).length;
  const activeBuilds = projects.filter((project) =>
    ["Active Build", "Development"].includes(project.status),
  ).length;

  return (
    <main className="work-page">
      <section className="work-page-hero">
        <Container>
          <div className="work-page-hero-grid">
            <div className="work-page-hero-copy">
              <p className="work-page-kicker">Work / Product Engineering</p>
              <h1>
                Systems built to solve <em>real operational problems.</em>
              </h1>
              <p>
                I design and build full-stack products from the workflow up — shaping the
                interface, backend, cloud architecture, permissions, and deployment around how
                people actually need to use the system.
              </p>
            </div>

            <div className="work-page-proof-panel" aria-label="Portfolio summary">
              <div>
                <strong>{shipped}</strong>
                <span>shipped or production systems</span>
              </div>
              <div>
                <strong>{activeBuilds}</strong>
                <span>active development builds</span>
              </div>
              <div>
                <strong>{projects.length}</strong>
                <span>documented case studies</span>
              </div>
            </div>
          </div>

          <div className="work-page-scope" aria-label="Work focus">
            <span>Full-stack product development</span>
            <span>AWS cloud systems</span>
            <span>Operations-first UX</span>
            <span>Security & permissions</span>
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
