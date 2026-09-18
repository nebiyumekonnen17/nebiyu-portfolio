import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbulb, Wrench, GraduationCap, Award } from "lucide-react";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { credentials } from "@/data/credentials";
import { getProjectGallery } from "@/data/galleries";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { FeatureGrid } from "@/components/projects/FeatureGrid";
import { ArchitectureLayerCards } from "@/components/projects/ArchitectureLayerCards";
import { ArchitectureDiagram } from "@/components/aws/ArchitectureDiagram";
import { ProjectGallery } from "@/components/projects/gallery/ProjectGallery";
import { ProjectNav } from "@/components/projects/ProjectNav";
import { TechChip } from "@/components/ui/TechChip";
import { CredentialCard } from "@/components/credentials/CredentialCard";
import { absoluteUrl } from "@/lib/config";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} | Case Study`,
    description: project.summary,
    alternates: { canonical: absoluteUrl(`/projects/${project.slug}`) },
    openGraph: {
      title: `${project.name} | Nebiyu Mekonnen`,
      description: project.summary,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);
  const relatedCredentials = credentials.filter((c) => project.relatedCredentialNames.includes(c.name));
  const gallery = getProjectGallery(slug);
  const galleryIntro =
    project.status === "Production"
      ? `These are AI generated concept UI images, not screenshots captured from the live production application. They illustrate the product direction alongside the real production evidence above.`
      : `These are AI generated concept UI images showing how the ${project.name} experience is being designed. They are not screenshots of a finished product.`;

  return (
    <>
      <ProjectHero project={project} />

      <CaseStudySection title="Quick Overview">
        <p className="text-fg-muted leading-relaxed mb-4">{project.summary}</p>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-fg-subtle uppercase tracking-wide mb-1">Who it serves</dt>
            <dd className="text-sm text-fg leading-relaxed">{project.servesWho}</dd>
          </div>
          <div>
            <dt className="text-xs text-fg-subtle uppercase tracking-wide mb-1">Current status</dt>
            <dd className="text-sm text-fg leading-relaxed">{project.status}</dd>
          </div>
        </dl>
        {project.notes && (
          <p className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg-muted leading-relaxed">
            {project.notes}
          </p>
        )}
      </CaseStudySection>

      <CaseStudySection title="The Problem" muted>
        {project.problem.map((p, i) => (
          <p key={i} className="text-fg-muted leading-relaxed mb-3 last:mb-0">
            {p}
          </p>
        ))}
      </CaseStudySection>

      <CaseStudySection title="The Solution">
        {project.solution.map((p, i) => (
          <p key={i} className="text-fg-muted leading-relaxed mb-3 last:mb-0">
            {p}
          </p>
        ))}
      </CaseStudySection>

      <CaseStudySection title="My Contribution" muted>
        <div className="grid gap-3 sm:grid-cols-2">
          {project.contribution.map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-surface-elevated p-4">
              <p className="text-sm font-semibold text-fg mb-1">{c.label}</p>
              <p className="text-xs text-fg-muted leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection title="Key Features">
        <FeatureGrid features={project.features} />
      </CaseStudySection>

      <CaseStudySection title="Technology" muted>
        {project.technologyGroups ? (
          <div className="space-y-4">
            {project.technologyGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs text-fg-subtle uppercase tracking-wide mb-2">{group.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <TechChip key={item} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <TechChip key={tech} label={tech} />
            ))}
          </div>
        )}
      </CaseStudySection>

      {(project.architecture || project.architectureNote) && (
        <CaseStudySection title="Architecture">
          <div className="space-y-6">
            {project.slug === "degissnap" && <ArchitectureDiagram />}
            {project.architecture && <ArchitectureLayerCards layers={project.architecture} />}
            {project.architectureNote && (
              <p className="text-sm text-fg-muted leading-relaxed rounded-xl border border-border bg-surface p-4">
                {project.architectureNote}
              </p>
            )}
          </div>
        </CaseStudySection>
      )}

      {gallery.length > 0 && (
        <CaseStudySection title="Product Gallery" muted>
          <p className="text-sm text-fg-muted leading-relaxed mb-6">{galleryIntro}</p>
          <ProjectGallery items={gallery} projectName={project.name} />
        </CaseStudySection>
      )}

      <CaseStudySection title="Engineering Challenges">
        <div className="space-y-4">
          {project.challenges.map((c) => (
            <div key={c.title} className="flex gap-3">
              <Wrench size={16} className="text-gold shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-fg mb-1">{c.title}</p>
                <p className="text-sm text-fg-muted leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {project.results.length > 0 && (
        <CaseStudySection title="Results and Evidence" muted>
          <ul className="space-y-2.5">
            {project.results.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <Award size={15} className="text-status-production shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </CaseStudySection>
      )}

      <CaseStudySection title="What I Learned">
        <div className="space-y-4">
          {project.learnings.map((l, i) => (
            <div key={i} className="flex gap-3">
              <Lightbulb size={16} className="text-gold shrink-0 mt-1" />
              <p className="text-sm text-fg-muted leading-relaxed">{l}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {relatedCredentials.length > 0 && (
        <CaseStudySection title="Related Credentials" muted>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCredentials.map((c) => (
              <CredentialCard key={c.name} credential={c} />
            ))}
          </div>
          <p className="mt-3 text-xs text-fg-subtle flex items-center gap-1.5">
            <GraduationCap size={13} /> See every credential on the Credentials and Learning page.
          </p>
        </CaseStudySection>
      )}

      <ProjectNav previous={previous} next={next} />
    </>
  );
}
