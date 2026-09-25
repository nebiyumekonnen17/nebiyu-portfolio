"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./work-premium.css";

export type StoryVisual = {
  label: string;
  image: string;
  alt: string;
  note: string;
};

export type StoryProject = {
  slug: string;
  name: string;
  status: string;
  thumbnail: string;
  thumbnailAlt: string;
  problem: string;
  outcome: string;
  proof: string;
  stack: string;
  visuals: StoryVisual[];
  liveUrl?: string | null;
  repositoryUrl?: string | null;
};

function proofItems(proof: string) {
  return proof
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);
}

function VisualTabs({
  visuals,
  activeVisual,
  onChange,
}: {
  visuals: StoryVisual[];
  activeVisual: number;
  onChange: (index: number) => void;
}) {
  if (visuals.length < 2) return null;

  return (
    <div className="project-visual-tabs" aria-label="Project views">
      {visuals.map((visual, index) => (
        <button
          key={`${visual.label}-${index}`}
          type="button"
          className={activeVisual === index ? "is-active" : ""}
          aria-pressed={activeVisual === index}
          onClick={() => onChange(index)}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          {visual.label}
        </button>
      ))}
    </div>
  );
}

function ProjectActions({ project }: { project: StoryProject }) {
  return (
    <div className="project-story-actions">
      <Link href={`/projects/${project.slug}`} className="project-story-action primary">
        Case study <ArrowUpRight size={14} />
      </Link>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-story-action"
        >
          View product <ArrowUpRight size={14} />
        </a>
      )}
      {project.repositoryUrl && (
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-story-action"
        >
          GitHub <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}

function ProjectShowcase({
  project,
  activeVisual,
  onVisualChange,
  priority = false,
  compact = false,
}: {
  project: StoryProject;
  activeVisual: number;
  onVisualChange: (index: number) => void;
  priority?: boolean;
  compact?: boolean;
}) {
  const visual = project.visuals[activeVisual] ?? project.visuals[0];

  return (
    <div className={`project-showcase-shell ${compact ? "is-compact" : ""}`}>
      <div className="project-showcase-meta">
        <span>{project.status}</span>
        <span>{project.stack}</span>
      </div>

      <div className="project-showcase-stage">
        <div className="project-showcase-browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{project.name}</span>
        </div>
        <div className="project-showcase-media">
          <Image
            key={visual.image}
            src={visual.image}
            alt={visual.alt}
            fill
            sizes={compact ? "100vw" : "(min-width: 1024px) 48vw, 100vw"}
            className="object-contain"
            priority={priority}
          />
          <div className="project-visual-caption">
            <strong>{visual.label}</strong>
            <span>{visual.note}</span>
          </div>
        </div>
      </div>

      <VisualTabs
        visuals={project.visuals}
        activeVisual={activeVisual}
        onChange={onVisualChange}
      />

      <div className="project-proof-rail" aria-label={`${project.name} evidence`}>
        {proofItems(project.proof).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <ProjectActions project={project} />
    </div>
  );
}

function MobileProjectShowcase({
  project,
  priority = false,
}: {
  project: StoryProject;
  priority?: boolean;
}) {
  const [activeVisual, setActiveVisual] = useState(0);
  const visualCount = project.visuals.length;

  useEffect(() => {
    if (visualCount < 2) return;
    const timer = window.setInterval(() => {
      setActiveVisual((current) => (current + 1) % visualCount);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [visualCount]);

  return (
    <div className="project-story-mobile-showcase">
      <ProjectShowcase
        project={project}
        activeVisual={activeVisual}
        onVisualChange={setActiveVisual}
        priority={priority}
        compact
      />
    </div>
  );
}

export function ProjectStory({ projects }: { projects: StoryProject[] }) {
  const [active, setActive] = useState(0);
  const [activeVisual, setActiveVisual] = useState(0);
  const steps = useRef<Array<HTMLElement | null>>([]);
  const activeProject = projects[active] ?? projects[0];
  const activeVisualCount = activeProject?.visuals.length ?? 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) {
          const nextActive = Number(current.target.getAttribute("data-story-index"));
          setActive(nextActive);
          setActiveVisual(0);
        }
      },
      { rootMargin: "-27% 0px -48% 0px", threshold: 0 },
    );

    steps.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeVisualCount < 2) return;

    const timer = window.setInterval(() => {
      setActiveVisual((current) => (current + 1) % activeVisualCount);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [active, activeVisualCount]);

  return (
    <div className="project-story-grid project-story-premium">
      <div className="project-story-copy">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            ref={(element) => {
              steps.current[index] = element;
            }}
            data-story-index={index}
            className={`project-story-step ${active === index ? "is-active" : ""}`}
          >
            <p className="home-kicker">
              {String(index + 1).padStart(2, "0")} / {project.name}
            </p>
            <h3>{project.problem}</h3>
            <p>{project.outcome}</p>
            <div className="project-story-proof-inline">
              {proofItems(project.proof).slice(0, 3).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <Link href={`/projects/${project.slug}`} className="home-inline-link project-story-case-link">
              Explore the full case study <span aria-hidden="true">↗</span>
            </Link>
            <MobileProjectShowcase project={project} priority={index === 0} />
          </article>
        ))}
      </div>

      <aside className="project-story-visual project-story-desktop-showcase">
        {activeProject && (
          <ProjectShowcase
            project={activeProject}
            activeVisual={activeVisual}
            onVisualChange={setActiveVisual}
            priority={active === 0}
          />
        )}
      </aside>
    </div>
  );
}
