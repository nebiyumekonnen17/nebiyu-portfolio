import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid2x2 } from "lucide-react";
import type { Project } from "@/types/content";
import { Container } from "@/components/ui/Container";

export function ProjectNav({ previous, next }: { previous: Project; next: Project }) {
  return (
    <nav className="py-10" aria-label="Project navigation">
      <Container>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href={`/projects/${previous.slug}`}
            className="flex flex-col justify-center rounded-2xl border border-border bg-surface-elevated p-5 hover:border-border-strong transition-colors"
          >
            <span className="flex items-center gap-1.5 text-xs text-fg-subtle mb-1">
              <ArrowLeft size={13} /> Previous
            </span>
            <span className="text-sm font-semibold text-fg">{previous.name}</span>
          </Link>

          <Link
            href="/projects"
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-surface p-5 hover:border-border-strong transition-colors text-center"
          >
            <Grid2x2 size={16} className="text-gold" />
            <span className="text-sm font-semibold text-fg">All Projects</span>
          </Link>

          <Link
            href={`/projects/${next.slug}`}
            className="flex flex-col justify-center items-end text-right rounded-2xl border border-border bg-surface-elevated p-5 hover:border-border-strong transition-colors"
          >
            <span className="flex items-center gap-1.5 text-xs text-fg-subtle mb-1">
              Next <ArrowRight size={13} />
            </span>
            <span className="text-sm font-semibold text-fg">{next.name}</span>
          </Link>
        </div>
      </Container>
    </nav>
  );
}
