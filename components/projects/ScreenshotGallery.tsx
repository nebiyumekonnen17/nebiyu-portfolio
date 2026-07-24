import Image from "next/image";
import type { ScreenshotItem } from "@/types/content";

export function ScreenshotGallery({ screenshots }: { screenshots: ScreenshotItem[] }) {
  if (screenshots.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {screenshots.map((shot) => (
        <figure key={shot.src + shot.caption} className="rounded-xl border border-border overflow-hidden bg-surface">
          <div className="relative aspect-[16/10]">
            <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="px-4 py-3 text-xs text-fg-muted leading-relaxed">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
