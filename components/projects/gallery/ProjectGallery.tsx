"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { ProjectGalleryItem } from "@/types/content";
import { GalleryTypeBadge } from "./ConceptBadge";
import { GalleryLightbox } from "./GalleryLightbox";

export function ProjectGallery({
  items,
  projectName,
}: {
  items: ProjectGalleryItem[];
  projectName: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  const [featured, ...rest] = items;

  return (
    <div>
      <button
        onClick={() => setOpenIndex(0)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface-elevated text-left cursor-pointer transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)] mb-4"
        aria-label={`Enlarge ${featured.title}`}
      >
        <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-surface">
          <Image
            src={featured.src}
            alt={featured.alt}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute top-3 left-3">
            <GalleryTypeBadge type={featured.type} />
          </span>
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-bg/70 text-fg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
            <Maximize2 size={16} />
          </span>
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold text-fg">{featured.title}</p>
          <p className="mt-1 text-xs text-fg-muted leading-relaxed">{featured.caption}</p>
        </div>
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {rest.map((item, i) => {
          const realIndex = i + 1;
          return (
            <button
              key={item.src}
              onClick={() => setOpenIndex(realIndex)}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface-elevated text-left cursor-pointer transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
              aria-label={`Enlarge ${item.title}`}
            >
              <div className="relative aspect-square bg-surface">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-md bg-bg/70 text-fg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                  <Maximize2 size={13} />
                </span>
              </div>
              <p className="px-3 py-2.5 text-xs font-medium text-fg-muted leading-snug line-clamp-2">
                {item.title}
              </p>
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          items={items}
          index={openIndex}
          projectName={projectName}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
