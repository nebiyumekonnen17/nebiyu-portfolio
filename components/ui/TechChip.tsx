import { cn } from "@/lib/utils";

export function TechChip({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-fg-muted",
        className
      )}
    >
      {label}
    </span>
  );
}
