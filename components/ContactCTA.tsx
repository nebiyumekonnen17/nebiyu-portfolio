import { ArrowRight, Mail, ExternalLink, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/config";

export function ContactBanner() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Reveal className="rounded-3xl border border-gold/25 bg-gradient-to-br from-surface-elevated to-surface p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-[32px] font-bold text-fg mb-3">
            Let&apos;s build something useful.
          </h2>
          <p className="text-fg-muted max-w-xl mx-auto mb-8 leading-relaxed">
            I&apos;m open to full stack, cloud, and AI engineering roles. If you want to talk about a
            role or a project, reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact">
              Get in touch <ArrowRight size={16} />
            </Button>
            <Button href="/projects" variant="secondary">
              See my work
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function ContactChannels() {
  const channels = [
    siteConfig.email && {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    siteConfig.linkedin && {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: siteConfig.linkedin.replace("https://", ""),
      href: siteConfig.linkedin,
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: siteConfig.github.replace("https://", ""),
      href: siteConfig.github,
    },
    {
      icon: ExternalLink,
      label: "Credly",
      value: siteConfig.credly.replace("https://", ""),
      href: siteConfig.credly,
    },
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string; href: string }[];

  return (
    <RevealGroup className="grid gap-3 sm:grid-cols-2">
      {channels.map((channel) => (
        <RevealItem key={channel.label}>
          <a
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated p-4 hover:border-gold/40 hover:bg-surface-elevated-hover transition-colors"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
              <channel.icon size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-fg-subtle">{channel.label}</p>
              <p className="text-sm font-medium text-fg truncate">{channel.value}</p>
            </div>
          </a>
        </RevealItem>
      ))}
      <RevealItem className="sm:col-span-2">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-fg-muted">
            <MapPin size={18} />
          </span>
          <div>
            <p className="text-xs text-fg-subtle">Location</p>
            <p className="text-sm font-medium text-fg">{profile.location}</p>
          </div>
        </div>
      </RevealItem>
    </RevealGroup>
  );
}

export function ContactNote() {
  if (siteConfig.email || siteConfig.linkedin) return null;
  return (
    <p className="text-sm text-fg-subtle mt-6">
      Email and LinkedIn will appear here once added. In the meantime, GitHub and Credly are the
      fastest ways to find my work.
    </p>
  );
}
