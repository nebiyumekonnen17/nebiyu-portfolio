"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { projectHeroImage, preserveFullProjectArtwork } from "@/lib/project-images";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All Projects", match: () => true },
  { label: "AWS", match: (p: Project) => p.category.includes("AWS") },
  { label: "AI", match: (p: Project) => p.category.includes("AI") },
  {
    label: "SaaS",
    match: (p: Project) =>
      p.category.includes("SaaS") || p.category.includes("Enterprise SaaS"),
  },
  {
    label: "Business Software",
    match: (p: Project) =>
      p.category.includes("Business Software") || p.category.includes("POS"),
  },
  {
    label: "Marketplace",
    match: (p: Project) =>
      p.category.includes("Marketplace") || p.category.includes("Ecommerce"),
  },
  {
    label: "Architecture",
    match: (p: Project) => projectIsArchitecture(p),
  },
];

const featuredSlugs = ["degissnap", "naep", "nehas-digital-signage"];

function projectIsArchitecture(project: Project) {
  return project.status === "Architecture" || project.status === "Concept";
}

function evidenceFor(project: Project) {
  return project.evidence.slice(0, 3);
}

function FeaturedProjectRow({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const evidence = evidenceFor(project);
  const preserveArtwork = preserveFullProjectArtwork(project.slug);
  const displayImage = projectHeroImage(project.slug, project.thumbnail);

  return (
    <article className={cn("featured-project-row", reverse && "is-reversed")}>
      <div className={cn("featured-project-visual", preserveArtwork && "preserve-artwork")}>
        <div className="featured-project-frame">
          <Image
            src={displayImage}
            alt={project.thumbnailAlt}
            fill
            sizes="(min-width: 1100px) 58vw, 100vw"
            className={cn(
              "featured-project-image",
              preserveArtwork ? "object-contain object-center" : "object-cover object-center",
            )}
            priority={index === 0}
          />
        </div>
      </div>

      <div className="featured-project-copy">
        <p className="featured-project-number">
          {String(index + 1).padStart(2, "0")} — {project.status}
        </p>
        <h2>{project.name}</h2>
        <p className="featured-project-tagline">{project.tagline}</p>
        <p className="featured-project-summary">{project.summary}</p>

        {evidence.length > 0 && (
          <ul className="featured-project-proof" aria-label={`${project.name} evidence`}>
            {evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <div className="featured-project-actions">
          <Link href={`/projects/${project.slug}`}>
            View case study <ArrowUpRight size={16} />
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit product <ArrowUpRight size={15} />
            </a>
          )}
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              View source <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectFilterGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(filters[0].label);
  const [query, setQuery] = useState("");

  const featured = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  const visible = useMemo(() => {
    const filterFn = filters.find((filter) => filter.label === active)?.match ?? (() => true);
    const q = query.trim().toLowerCase();

    return projects.filter((project) => {
      if (!filterFn(project)) return false;
      if (!q) return true;
      return (
        project.name.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.technologies.some((technology) => technology.toLowerCase().includes(q))
      );
    });
  }, [projects, active, query]);

  const isDefaultView = active === filters[0].label && query.trim() === "";
  const archiveProjects = isDefaultView
    ? visible.filter((project) => !featuredSlugs.includes(project.slug))
    : visible;

  return (
    <div className="work-browser">
      {isDefaultView && featured.length > 0 && (
        <section className="featured-projects" aria-labelledby="featured-projects-title">
          <div className="work-section-heading">
            <p>Featured work</p>
            <h2 id="featured-projects-title">Three systems. Three different engineering problems.</h2>
            <span>
              Production event software, an AI engineering platform, and cloud-based signage —
              shown as complete product stories instead of squeezed cards.
            </span>
          </div>

          <div className="featured-project-list">
            {featured.map((project, index) => (
              <FeaturedProjectRow key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      )}

      <section className="project-archive" aria-labelledby="project-archive-title">
        <div className="work-section-heading archive-heading">
          <p>{isDefaultView ? "More work" : "Filtered work"}</p>
          <h2 id="project-archive-title">
            {isDefaultView
              ? "More systems, experiments, and architecture work."
              : `${visible.length} matching project${visible.length === 1 ? "" : "s"}.`}
          </h2>
          <span>
            {isDefaultView
              ? "Browse the rest of the portfolio or filter by the kind of engineering you want to see."
              : "Adjust the filters or search to explore a different part of the portfolio."}
          </span>
        </div>

        <div className="work-filter-row">
          <div className="work-filter-buttons" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActive(filter.label)}
                aria-pressed={active === filter.label}
                className={cn("work-filter-button", active === filter.label && "is-active")}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <label className="work-project-search">
            <span className="sr-only">Search projects</span>
            <Search size={16} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
            />
          </label>
        </div>

        {archiveProjects.length > 0 ? (
          <RevealGroup className="project-archive-grid">
            {archiveProjects.map((project) => (
              <RevealItem key={project.slug}>
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : isDefaultView ? (
          <div className="project-archive-empty">
            <p>The featured case studies above are the full portfolio currently documented here.</p>
          </div>
        ) : (
          <div className="project-archive-empty">
            <p>No projects match that search or filter.</p>
            <button
              type="button"
              onClick={() => {
                setActive(filters[0].label);
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
