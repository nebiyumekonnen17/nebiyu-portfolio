"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectGalleryItem } from "@/types/content";
import { GalleryTypeBadge } from "./ConceptBadge";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  items: ProjectGalleryItem[];
  index: number;
  projectName: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({ items, index, projectName, onClose, onNavigate }: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const item = items[index];

  const goPrev = () => onNavigate((index - 1 + items.length) % items.length);
  const goNext = () => onNavigate((index + 1) % items.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length]);

  if (!item) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-bg/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} gallery, image ${index + 1} of ${items.length}`}
    >
      <button
        aria-label="Close gallery"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        tabIndex={-1}
      />

      <div className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <GalleryTypeBadge type={item.type} />
          <span className="text-sm text-fg-muted">
            {index + 1} of {items.length}
          </span>
        </div>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-fg hover:bg-surface-elevated cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
        >
          <X size={22} />
        </button>
      </div>

      <div
        className="relative z-10 flex flex-1 items-center justify-center px-4 pb-4 sm:px-8 min-h-0"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) > 50) {
            if (delta > 0) goPrev();
            else goNext();
          }
          touchStartX.current = null;
        }}
      >
        <button
          onClick={goPrev}
          aria-label="Previous image"
          className="hidden sm:flex absolute left-2 lg:left-6 h-12 w-12 items-center justify-center rounded-full bg-surface-elevated border border-border text-fg hover:border-gold/50 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
        >
          <ChevronLeft size={22} />
        </button>

        <figure className="relative flex max-h-full max-w-4xl flex-col items-center gap-4">
          <div className="relative max-h-[62vh] w-[min(88vw,880px)] aspect-[4/3] rounded-2xl overflow-hidden border border-border-strong bg-surface">
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 880px, 88vw"
              className="object-contain"
              priority
            />
          </div>
          <figcaption className="text-center max-w-xl px-4">
            <p className="text-base font-semibold text-fg">{item.title}</p>
            <p className="mt-1 text-sm text-fg-muted leading-relaxed">{item.caption}</p>
          </figcaption>
        </figure>

        <button
          onClick={goNext}
          aria-label="Next image"
          className="hidden sm:flex absolute right-2 lg:right-6 h-12 w-12 items-center justify-center rounded-full bg-surface-elevated border border-border text-fg hover:border-gold/50 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 sm:hidden pb-4 px-4">
        <button
          onClick={goPrev}
          aria-label="Previous image"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated border border-border text-fg cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goNext}
          aria-label="Next image"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-elevated border border-border text-fg cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="relative z-10 border-t border-border bg-surface/80 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 justify-center min-w-min mx-auto w-fit">
          {items.map((thumb, i) => (
            <button
              key={thumb.src}
              onClick={() => onNavigate(i)}
              aria-label={`View ${thumb.title}`}
              aria-current={i === index}
              className={cn(
                "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors cursor-pointer",
                i === index ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={thumb.src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
