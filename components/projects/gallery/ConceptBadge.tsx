import { Sparkles, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryAssetType } from "@/types/content";

export function ConceptBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold",
        className
      )}
    >
      <Sparkles size={12} aria-hidden="true" />
      Concept UI
    </span>
  );
}

export function RealScreenshotBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-status-production/30 bg-status-production/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-status-production",
        className
      )}
    >
      <ImageIcon size={12} aria-hidden="true" />
      Real Screenshot
    </span>
  );
}

export function GalleryTypeBadge({ type, className }: { type: GalleryAssetType; className?: string }) {
  if (type === "Real Screenshot") return <RealScreenshotBadge className={className} />;
  return <ConceptBadge className={className} />;
}
