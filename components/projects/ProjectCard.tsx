import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/content";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechChip } from "@/components/ui/TechChip";
import { accentClasses } from "@/lib/accent";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const accent = accentClasses[project.accent];
  const visibleTech = project.technologies.slice(0, 4);

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-all duration-200 hover:bg-surface-elevated-hover hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]",
        accent.hoverBorder
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.025]"
          priority={priority}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-elevated via-surface-elevated/65 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-fg mb-1.5">{project.name}</h3>
        <p className="text-sm text-fg-muted leading-relaxed line-clamp-3 mb-4">{project.summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 mb-4">
          {visibleTech.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>

        <span className={cn("inline-flex items-center gap-1.5 text-sm font-semibold", accent.text)}>
          View Project
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-gold)] rounded-2xl"
        aria-label={`View ${project.name} project details`}
      >
        <span className="sr-only">View {project.name}</span>
      </Link>
    </article>
  );
}
