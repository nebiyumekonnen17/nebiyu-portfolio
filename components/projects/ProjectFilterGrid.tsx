"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
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

export function ProjectFilterGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(filters[0].label);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const filterFn = filters.find((f) => f.label === active)?.match ?? (() => true);
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (!filterFn(p)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, active, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setActive(f.label)}
              aria-pressed={active === f.label}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                active === f.label
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-fg-muted hover:border-border-strong hover:text-fg"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="relative w-full md:w-64">
          <span className="sr-only">Search projects</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-border bg-surface-elevated py-2.5 pl-9 pr-3 text-sm text-fg placeholder:text-fg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
          />
        </label>
      </div>

      {visible.length > 0 ? (
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <p className="text-center text-fg-muted py-16">No projects match that search or filter.</p>
      )}
    </div>
  );
}
