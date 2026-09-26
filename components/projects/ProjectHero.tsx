import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project } from "@/types/content";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechChip } from "@/components/ui/TechChip";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { accentClasses } from "@/lib/accent";
import { projectHeroImage, preserveFullProjectArtwork } from "@/lib/project-images";

export function ProjectHero({ project }: { project: Project }) {
  const accent = accentClasses[project.accent];
  const heroImage = projectHeroImage(project.slug, project.thumbnail);
  const preserveArtwork = preserveFullProjectArtwork(project.slug);

  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-10 md:py-14">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors mb-6"
        >
          <ArrowLeft size={15} /> Back to Projects
        </Link>

        <Reveal className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={project.status} />
              <span className={`text-xs font-semibold uppercase tracking-wide ${accent.text}`}>
                {project.category.join(" · ")}
              </span>
            </div>

            <h1 className="text-[32px] md:text-[42px] font-bold text-fg leading-tight text-balance mb-3">
              {project.name}
            </h1>
            <p className="text-lg text-fg-muted leading-relaxed max-w-xl mb-6">{project.tagline}</p>

            <dl className="grid grid-cols-2 gap-4 mb-7 max-w-md">
              <div>
                <dt className="text-xs text-fg-subtle uppercase tracking-wide mb-1">My Role</dt>
                <dd className="text-sm text-fg">{project.role}</dd>
              </div>
              <div>
                <dt className="text-xs text-fg-subtle uppercase tracking-wide mb-1">Platform</dt>
                <dd className="text-sm text-fg">{project.platformType}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-2 mb-7">
              {project.technologies.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button href={project.liveUrl}>
                  Live Project <ArrowUpRight size={16} />
                </Button>
              )}
              {project.repositoryUrl && (
                <Button href={project.repositoryUrl} variant="secondary">
                  <GithubIcon size={16} /> Repository
                </Button>
              )}
              {!project.liveUrl && !project.repositoryUrl && (
                <p className="flex items-center gap-2 text-sm text-fg-subtle">
                  <ExternalLink size={14} />
                  {project.status === "Built"
                    ? "Private local application; no public link."
                    : `No public link yet. This project is in ${project.status.toLowerCase()}.`}
                </p>
              )}
            </div>
          </div>

          <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border ${accent.borderSoft} bg-surface-elevated shadow-[0_18px_45px_rgba(0,0,0,0.24)]`}>
            <Image
              src={heroImage}
              alt={project.thumbnailAlt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className={preserveArtwork ? "object-contain object-center" : "object-cover object-center"}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
