"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { primaryNav } from "@/data/nav";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-[1280px] items-center justify-between px-6 py-4 md:px-8 lg:px-12">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  active ? "text-gold" : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-[13px] h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            );
          })}
          {siteConfig.resumeUrl && (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors"
            >
              Resume <ArrowUpRight size={14} />
            </a>
          )}
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
              pathname === "/contact" ? "text-gold" : "text-fg-muted hover:text-fg"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" size="sm" className="hidden lg:inline-flex">
            Let&apos;s Connect <ArrowRight size={15} />
          </Button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-fg lg:hidden cursor-pointer hover:bg-surface-elevated"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
