import { Check } from "lucide-react";
import type { ProjectFeature } from "@/types/content";

export function FeatureGrid({ features }: { features: ProjectFeature[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <div key={feature.title} className="flex gap-3 rounded-xl border border-border bg-surface-elevated p-4">
          <Check size={16} className="text-gold shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-fg mb-1">{feature.title}</p>
            <p className="text-xs text-fg-muted leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
