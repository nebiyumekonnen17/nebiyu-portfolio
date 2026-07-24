import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  value,
  label,
  className,
}: {
  icon?: LucideIcon;
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-border bg-surface-elevated p-4",
        className
      )}
    >
      {Icon && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
          <Icon size={18} />
        </span>
      )}
      <div>
        <p className="text-lg font-bold text-fg leading-tight">{value}</p>
        <p className="text-xs text-fg-muted leading-snug mt-0.5">{label}</p>
      </div>
    </div>
  );
}
