import { ShieldCheck, Network, Database, Image as ImageIcon, Rocket, Layout, type LucideIcon } from "lucide-react";
import type { ArchitectureLayer } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  network: Network,
  database: Database,
  image: ImageIcon,
  rocket: Rocket,
  layout: Layout,
};

export function ArchitectureLayerCards({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {layers.map((layer) => {
        const Icon = iconMap[layer.icon] ?? Layout;
        return (
          <div key={layer.service} className="rounded-xl border border-border bg-surface-elevated p-4">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15 text-gold">
                <Icon size={16} />
              </span>
              <div>
                <p className="text-xs text-fg-subtle uppercase tracking-wide">{layer.label}</p>
                <p className="text-sm font-semibold text-fg">{layer.service}</p>
              </div>
            </div>
            <p className="text-sm text-fg-muted leading-relaxed">{layer.description}</p>
          </div>
        );
      })}
    </div>
  );
}
