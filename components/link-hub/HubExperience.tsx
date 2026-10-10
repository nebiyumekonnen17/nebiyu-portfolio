"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ArrowUpRight, Award, Camera, Check, Cloud,
  FileText, Globe2, Link2, Mail, Moon, Send, Share2, Sun,
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile as careerProfile } from "@/data/profile";
import { DEFAULT_HUB_BACKGROUND, type HubContent } from "@/lib/link-hub";

type Theme = "system" | "dark" | "light";

function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener("hub-theme-change", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener("hub-theme-change", onChange);
  };
}
function readTheme(): Theme {
  try {
    const saved = window.localStorage.getItem("nebiyu-link-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Browsers with restricted local storage still follow device settings.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function serverTheme(): Theme { return "system"; }

const icons = {
  globe: Globe2,
  file: FileText,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  mail: Mail,
  award: Award,
  send: Send,
  camera: Camera,
  cloud: Cloud,
  link: Link2,
};

function HubIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Chosen = icons[name as keyof typeof icons] || Link2;
  return <Chosen size={size} aria-hidden="true" />;
}

function externalProps(url: string) {
  return /^https?:\/\//i.test(url)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

function Portrait({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.trim().split(/\s+/).slice(0, 2).map((x) => x[0] || "").join("").toUpperCase();
  return (
    <div className="hub-v2-portrait">
      {failed || !src ? (
        <span className="hub-v2-avatar-fallback" aria-label={name}>{initials}</span>
      ) : (
        <Image
          src={src}
          alt={name}
          fill
          priority
          unoptimized
          sizes="(max-width: 767px) 92px, 112px"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function ProjectArtwork({ src, name, type }: { src: string; name: string; type: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={"hub-v2-project-art" + (type === "visual-tizita" ? " hub-v2-project-art-contain" : "")}>
      {src && !failed ? (
        <Image
          src={src}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 650px) 100px, 126px"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="hub-v2-project-fallback" aria-label={"Artwork unavailable for " + name}>
          <Cloud size={30} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}

export function HubExperience({
  content,
  compact = false,
  previewTheme,
  onPreviewThemeChange,
}: {
  content: HubContent;
  compact?: boolean;
  previewTheme?: "dark" | "light";
  onPreviewThemeChange?: (theme: "dark" | "light") => void;
}) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);
  const [copied, setCopied] = useState(false);
  const [shareFallback, setShareFallback] = useState(false);

  const isLight = (previewTheme ?? theme) === "light";
  const background = { ...DEFAULT_HUB_BACKGROUND, ...content.design.background };
  const visibleSocials = content.links.filter((link) => link.visible && link.section === "social");
  const primaryLinks = content.links.filter((link) => link.visible && link.section === "primary");
  const extraLinks = content.links.filter((link) => link.visible && link.section === "extra");
  const projects = content.projects.filter((project) => project.visible).slice(0, 3);
  const shareUrl = "https://nebiyumekonnen.com/links";

  function toggleTheme() {
    const next = isLight ? "dark" : "light";
    if (onPreviewThemeChange) { onPreviewThemeChange(next); return; }
    try {
      window.localStorage.setItem("nebiyu-link-theme", next);
      window.dispatchEvent(new Event("hub-theme-change"));
    } catch {
      // Device theme still applies if local storage is blocked.
    }
  }

  async function share() {
    setShareFallback(false);
    if (!compact && typeof navigator.share === "function") {
      try {
        await navigator.share({ title: content.profile.name + " | Links", url: shareUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2300);
    } catch {
      setShareFallback(true);
    }
  }

  return (
    <div
      className={"link-hub-shell hub-" + (previewTheme ?? theme) + (compact ? " hub-compact" : "")}
      data-dark-template={content.design.darkTemplate ?? "midnight"}
      data-light-template={content.design.lightTemplate ?? "minimal"}
      data-background-placement={background.placement}
      data-background-motion={String(background.motion)}
      data-background-texture={String(background.texture)}
      style={{
        "--hub-background-strength": String(background.intensity / 100),
        "--hub-card-opacity": background.cardOpacity + "%",
        "--hub-accent-dark": content.design.darkAccent,
        "--hub-accent-light": content.design.lightAccent,
      } as React.CSSProperties}
    >
      <div className="hub-v2-background" aria-hidden="true" />
      <div className="hub-page">
        <header className="hub-v2-topbar">
          <Link className="hub-v2-brand" href="/" aria-label="Nebiyu Mekonnen portfolio homepage" onClick={compact ? (e) => e.preventDefault() : undefined}>
            <span className="hub-v2-mark">NM<span>.</span></span>
            <span>NEBIYU <span className="hub-v2-brand-muted">/ LINKS</span></span>
          </Link>
          <div className="hub-v2-toolbar">
            <button
              className="hub-v2-icon-button"
              type="button"
              onClick={toggleTheme}
              aria-label={"Switch to " + (isLight ? "dark" : "light") + " theme"}
              title={isLight ? "Dark theme" : "Light theme"}
            >
              {isLight ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
            </button>
            <button
              className="hub-v2-icon-button"
              type="button"
              onClick={share}
              aria-label={copied ? "Link copied" : "Share link hub"}
              title="Share this page"
            >
              {copied ? <Check size={18} aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}
            </button>
          </div>
        </header>

        {copied && <div className="hub-v2-feedback" role="status">Link copied to clipboard.</div>}
        {shareFallback && (
          <div className="hub-v2-share-fallback" role="status">
            <label htmlFor="hub-v2-share-url">Copy your shareable link</label>
            <input id="hub-v2-share-url" value={shareUrl} readOnly onFocus={(event) => event.currentTarget.select()} />
            <button type="button" onClick={() => setShareFallback(false)} aria-label="Close share link">Close</button>
          </div>
        )}

        <div className="hub-v2-grid">
          <aside className="hub-v2-profile" aria-label="About Nebiyu">
            <div className="hub-v2-profile-inner">
              <Portrait key={content.profile.portrait} src={content.profile.portrait} name={content.profile.name} />
              {careerProfile.openToOpportunities && (
                <p className="hub-v2-availability"><span aria-hidden="true" /> OPEN TO OPPORTUNITIES</p>
              )}
              <h1>{content.profile.name}</h1>
              <p className="hub-v2-headline">{content.profile.headline}</p>
              <p className="hub-v2-bio">{content.profile.bio}</p>
              {visibleSocials.length > 0 && (
                <nav className="hub-v2-socials" aria-label="Social profiles">
                  {visibleSocials.map((social) => (
                    <a
                      href={social.url}
                      key={social.id}
                      title={social.label}
                      aria-label={social.label}
                      {...externalProps(social.url)}
                      onClick={compact ? (event) => event.preventDefault() : undefined}
                    >
                      <HubIcon name={social.icon} size={19} />
                    </a>
                  ))}
                </nav>
              )}
              <p className="hub-v2-profile-note">DESIGNED & BUILT WITH PURPOSE <span aria-hidden="true">✳</span></p>
            </div>
          </aside>

          <div className="hub-v2-content" id="link-hub-main">
            {primaryLinks.length > 0 && (
              <section className="hub-v2-actions" aria-label="Explore and connect">
                {primaryLinks.map((link, index) => {
                  const destination = link.id === "resume" ? content.profile.resume : link.url;
                  return (
                    <a
                      className={"hub-v2-link" + (index === 0 ? " hub-v2-link-primary" : "")}
                      key={link.id}
                      href={destination}
                      {...externalProps(destination)}
                      onClick={compact ? (event) => event.preventDefault() : undefined}
                    >
                      <span className="hub-v2-link-icon"><HubIcon name={link.icon} size={19} /></span>
                      <span className="hub-v2-link-copy"><strong>{link.label}</strong>{link.description && <small>{link.description}</small>}</span>
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </a>
                  );
                })}
              </section>
            )}

            <section className="hub-v2-work" aria-labelledby="hub-v2-work-title">
              <div className="hub-v2-section-title">
                <span className="hub-v2-eyebrow">01 / SELECTED WORK</span>
                <h2 id="hub-v2-work-title">Things I&apos;ve built<span>.</span></h2>
                <p>Selected projects, built around real problems.</p>
              </div>

              <div className="hub-v2-projects">
                {projects.map((project) => (
                  <a
                    className="hub-v2-project"
                    key={project.id}
                    href={project.url}
                    {...externalProps(project.url)}
                    onClick={compact ? (event) => event.preventDefault() : undefined}
                  >
                    <ProjectArtwork key={project.image} src={project.image} name={project.name} type={project.id} />
                    <span className="hub-v2-project-info">
                      <strong>{project.name}</strong>
                      <span>{project.description}</span>
                      <small>EXPLORE CASE STUDY</small>
                    </span>
                    <ArrowUpRight className="hub-v2-project-arrow" size={18} aria-hidden="true" />
                  </a>
                ))}
                <Link className="hub-v2-view-all" href="/projects/" onClick={compact ? (event) => event.preventDefault() : undefined}>
                  <span>View all projects</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </section>

            {extraLinks.length > 0 && (
              <section className="hub-v2-extras" aria-label="More ways to connect">
                <span className="hub-v2-eyebrow">02 / MORE WAYS TO CONNECT</span>
                <div>
                  {extraLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      {...externalProps(link.url)}
                      onClick={compact ? (event) => event.preventDefault() : undefined}
                    >
                      <span><HubIcon name={link.icon} size={19} />{link.label}</span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <footer className="hub-v2-footer">
          <span>© {new Date().getFullYear()} {content.profile.name.toUpperCase()}</span>
          <Link href="/" onClick={compact ? (event) => event.preventDefault() : undefined}>BACK TO PORTFOLIO <ArrowUpRight size={13} aria-hidden="true" /></Link>
        </footer>
      </div>
    </div>
  );
}
