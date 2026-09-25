"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All Projects", match: () => true },
  { label: "AWS", match: (p: Project) => p.category.includes("AWS") },
  { label: "AI", match: (p: Project) => p.category.includes("AI") },
  { label: "SaaS", match: (p: Project) => p.category.includes("SaaS") || p.category.includes("Enterprise SaaS") },
  {
    label: "Business Software",
    match: (p: Project) => p.category.includes("Business Software") || p.category.includes("POS"),
  },
  { label: "Marketplace", match: (p: Project) => p.category.includes("Marketplace") || p.category.includes("Ecommerce") },
  { label: "Architecture", match: (p: Project) => p.status === "Architecture" || p.status === "Concept" },
];

const featuredSlugs = ["degissnap", "naep", "nehas-digital-signage"];

function FeaturedProject({ project, primary = false }: { project: Project; primary?: boolean }) {
  const evidence = project.evidence.slice(0, primary ? 3 : 2);

  return (
    <article className={cn("featured-work-card", primary && "is-primary")}>
      <div className={cn("featured-work-media", project.slug === "degissnap" && "preserve-artwork")}>
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          sizes={primary ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 38vw, 100vw"}
          className={project.slug === "degissnap" ? "object-contain object-center" : "object-cover object-top"}
          priority={primary}
        />
        <div className="featured-work-image-shade" aria-hidden="true" />
        <div className="featured-work-status">
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="featured-work-copy">
        <div className="featured-work-label">
          <span>{primary ? "Featured case study" : "Selected work"}</span>
          <span>{project.category.slice(0, 2).join(" / ")}</span>
        </div>
        <h2>{project.name}</h2>
        <p className="featured-work-tagline">{project.tagline}</p>
        <p className="featured-work-summary">{project.summary}</p>

        {evidence.length > 0 && (
          <div className="featured-work-evidence" aria-label={`${project.name} evidence`}>
            {evidence.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}

        <div className="featured-work-actions">
          <Link href={`/projects/${project.slug}`}>
            Explore case study <ArrowUpRight size={15} />
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live product <ArrowUpRight size={14} />
            </a>
          )}
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              Source <ArrowUpRight size={14} />
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
    const filterFn = filters.find((f) => f.label === active)?.match ?? (() => true);
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (!filterFn(p)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
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
        <section className="featured-work" aria-labelledby="featured-work-title">
          <div className="work-section-heading">
            <div>
              <p>Featured work</p>
              <h2 id="featured-work-title">Three systems. Three different engineering problems.</h2>
            </div>
            <span>Selected for product depth, cloud work, and engineering range.</span>
          </div>

          <div className="featured-work-grid">
            {featured[0] && <FeaturedProject project={featured[0]} primary />}
            <div className="featured-work-side">
              {featured.slice(1).map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="project-archive" aria-labelledby="project-archive-title">
        <div className="work-section-heading archive-heading">
          <div>
            <p>{isDefaultView ? "Project archive" : "Filtered work"}</p>
            <h2 id="project-archive-title">
              {isDefaultView ? "More systems, experiments, and architecture work." : `${visible.length} matching project${visible.length === 1 ? "" : "s"}.`}
            </h2>
          </div>
          <span>
            {isDefaultView
              ? `${projects.length} documented projects across product, AWS, AI, and operations.`
              : "Adjust the filters or search to explore a different slice of the portfolio."}
          </span>
        </div>

        <div className="work-filter-bar">
          <div className="work-filter-buttons" role="group" aria-label="Filter projects by category">
            {filters.map((f) => (
              <button
                key={f.label}
                onClick={() => setActive(f.label)}
                aria-pressed={active === f.label}
                className={cn("work-filter-button", active === f.label && "is-active")}
              >
                {f.label}
              </button>
            ))}
          </div>

          <label className="work-project-search">
            <span className="sr-only">Search projects</span>
            <Search size={16} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
