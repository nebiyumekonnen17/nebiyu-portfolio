"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
};

export function ProjectStory({ projects }: { projects: StoryProject[] }) {
  const [active, setActive] = useState(0);
  const steps = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current)
          setActive(Number(current.target.getAttribute("data-story-index")));
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: 0 },
    );
    steps.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="project-story-grid">
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
              0{index + 1} / {project.name}
            </p>
            <h3>{project.problem}</h3>
            <p>{project.outcome}</p>
            <p className="project-story-proof">{project.proof}</p>
            <Link
              href={`/projects/${project.slug}`}
              className="home-inline-link"
            >
              Explore case study <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
      <aside className="project-story-visual" aria-live="polite">
        {projects.map((project, index) => {
          return (
            <div
              key={project.slug}
              className={`project-frame ${active === index ? "is-active" : ""}`}
            >
              <div className="project-frame-top">
                <span>{project.status}</span>
                <span>{project.stack}</span>
              </div>
              <div className="project-frame-image">
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
              <div className="project-frame-bottom">
                <div>
                  <strong>{project.name}</strong>
                  <small>Product overview</small>
                </div>
                <span>
                  {index + 1} / {projects.length}
                </span>
              </div>
            </div>
          );
        })}
      </aside>
    </div>
  );
}
