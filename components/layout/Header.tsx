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
    <header className="portfolio-site-header sticky top-0 z-40 border-b border-border bg-[#080d17] backdrop-blur-sm">
      <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between gap-6 px-6 min-[900px]:px-12 xl:px-16">
        <div className="min-[900px]:hidden"><Logo /></div>
        <nav className="hidden min-[900px]:flex items-center gap-5 xl:gap-6" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}
              className="whitespace-nowrap text-sm font-semibold text-[#96a3b9] transition-colors hover:text-white focus-visible:text-white">
              {item.label}
            </Link>
          ))}
          {siteConfig.resumeUrl && (
            <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="flex whitespace-nowrap items-center gap-1 text-sm font-semibold text-[#96a3b9] transition-colors hover:text-white">
              Resume <ArrowUpRight size={14} />
            </a>
          )}
          <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}
            className="whitespace-nowrap text-sm font-semibold text-[#96a3b9] transition-colors hover:text-white">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/contact" size="sm" className="hidden min-[900px]:inline-flex whitespace-nowrap rounded-[14px] bg-[#e3a83b] px-[18px] py-[10px] text-[#141008] hover:bg-[#f0b854]">
            Let&apos;s Connect <ArrowRight size={15} />
          </Button>
          <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-fg min-[900px]:hidden cursor-pointer hover:bg-surface-elevated">
            <Menu size={22} />
          </button>
        </div>
      </div>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
