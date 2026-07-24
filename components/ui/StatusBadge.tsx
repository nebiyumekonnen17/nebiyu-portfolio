import type { ProjectStatus } from "@/types/content";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProjectStatus, { color: string; dot: string }> = {
  Production: { color: "text-status-production border-status-production/30 bg-status-production/15", dot: "bg-status-production" },
  "Active Build": { color: "text-status-active border-status-active/30 bg-status-active/15", dot: "bg-status-active" },
  Built: { color: "text-status-built border-status-built/30 bg-status-built/15", dot: "bg-status-built" },
  Development: { color: "text-status-development border-status-development/30 bg-status-development/15", dot: "bg-status-development" },
  Architecture: { color: "text-status-architecture border-status-architecture/30 bg-status-architecture/15", dot: "bg-status-architecture" },
  Concept: { color: "text-status-concept border-status-concept/30 bg-status-concept/15", dot: "bg-status-concept" },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const style = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        style.color,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} aria-hidden="true" />
      {status}
    </span>
  );
}
