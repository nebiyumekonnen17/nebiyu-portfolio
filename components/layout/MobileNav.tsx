"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowRight, ArrowUpRight } from "lucide-react";
import { primaryNav } from "@/data/nav";
import { siteConfig } from "@/lib/config";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  // Rendered into document.body: an ancestor header using backdrop-blur would
  // otherwise become the containing block for this fixed-position overlay
  // and trap it inside the header's own box instead of the viewport.
  return createPortal(
    <div id="mobile-navigation" className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-black/70 cursor-pointer"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-surface border-l border-border p-6 flex flex-col animate-[reveal_220ms_ease]"
      >
        <div className="flex items-center justify-between mb-8">
          <span className="font-semibold text-fg">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-fg-muted hover:text-fg hover:bg-surface-elevated cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-[48px] flex items-center rounded-lg px-3 text-lg font-medium transition-colors ${
                  active ? "text-gold bg-surface-elevated" : "text-fg hover:bg-surface-elevated"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {siteConfig.resumeUrl && (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] flex items-center gap-2 rounded-lg px-3 text-lg font-medium text-fg hover:bg-surface-elevated"
            >
              Resume <ArrowUpRight size={16} />
            </a>
          )}
          <Link
            href="/contact"
            className={`min-h-[48px] flex items-center rounded-lg px-3 text-lg font-medium transition-colors ${
              pathname === "/contact" ? "text-gold bg-surface-elevated" : "text-fg hover:bg-surface-elevated"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <Link
            href="/contact"
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gold text-on-gold font-semibold w-full"
          >
            Let&apos;s Connect <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
