"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export type MoneProjectSummary = {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  status: string;
  tagline: string;
  category: string[];
};

export function MoneProjectRail({ projects }: { projects: MoneProjectSummary[] }) {
  const rail = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const element = rail.current;
    if (!element) return;
    const firstCard = element.querySelector<HTMLElement>(".mone-project-card");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 22 : element.clientWidth * 0.85;
    element.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <div className="mone-rail-shell">
      <div className="mone-rail-controls" aria-label="Project gallery controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous projects">
          <ArrowLeft size={20} />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next projects">
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="mone-project-rail" ref={rail} aria-label="Featured software projects" tabIndex={0}>
        {projects.map((project) => (
          <article className="mone-project-card" key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="mone-project-media" aria-label={`View ${project.name} case study`}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 1100px) 510px, (min-width: 700px) 65vw, 84vw"
                className="mone-project-image"
              />
              <span className="mone-project-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
            </Link>
            <div className="mone-project-meta">
              <span>{project.status}</span>
              <span>{project.category.slice(0, 2).join(" / ")}</span>
            </div>
            <h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
            <p>{project.tagline}</p>
          </article>
        ))}
      </div>
      <p className="mone-rail-hint">Scroll to explore · Select a project for the full case study</p>
    </div>
  );
}
