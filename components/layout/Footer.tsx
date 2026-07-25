import Link from "next/link";
import { ArrowUp, ExternalLink, Mail, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/data/nav";
import { siteConfig } from "@/lib/config";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-24">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-on-gold font-bold text-base">
                NM
              </span>
              <span className="font-semibold text-fg">{profile.name}</span>
            </div>
            <p className="text-sm text-fg-muted max-w-sm leading-relaxed">
              {profile.subheadline}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle mb-4">
              Site
            </h3>
            <ul className="space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-fg-muted hover:text-fg transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors break-all"
                  >
                    <Mail size={15} className="shrink-0" /> {siteConfig.email}
                  </a>
                </li>
              )}
              {siteConfig.linkedin && (
                <li>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    <ExternalLink size={15} className="shrink-0" /> LinkedIn
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2 text-sm text-fg-subtle">
                <MapPin size={15} className="shrink-0" /> {profile.location}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle mb-4">
              Elsewhere
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  <GithubIcon size={15} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  <ExternalLink size={15} /> Credly
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col-reverse gap-4 sm:flex-row items-center justify-between">
          <p className="text-xs text-fg-subtle">
            © {year} {profile.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="flex items-center gap-2 text-xs text-fg-muted hover:text-fg transition-colors"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
