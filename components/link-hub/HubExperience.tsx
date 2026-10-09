"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight, ArrowUpRight, Award, Camera, Check, Cloud, Copy, FileText, Globe2,
  Link2, Mail, Moon, Send, Share2, Sun, ExternalLink,
} from "lucide-react";
import type { HubContent } from "@/lib/link-hub";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";
const icons = { globe: Globe2, file: FileText, github: GithubIcon, linkedin: LinkedinIcon, instagram: InstagramIcon, mail: Mail, award: Award, send: Send, camera: Camera, cloud: Cloud, link: Link2 };
function Icon({ name }: { name: string }) {
  const Chosen = icons[name as keyof typeof icons] || Link2;
  return <Chosen size={19} aria-hidden="true" />;
}
function linkAttrs(url: string) { return /^https?:\/\//.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {}; }
export function HubExperience({ content, compact = false }: { content: HubContent; compact?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem("nebiyu-link-theme");
    setTheme(stored === "light" || stored === "dark" ? stored : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem("nebiyu-link-theme", next);
  }
  async function share() {
    const url = "https://nebiyumekonnen.com/links";
    try {
      if (navigator.share && !compact) await navigator.share({ title: content.profile.name + " | Links", url });
      else { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }
    } catch { /* User canceled sharing */ }
  }
  const socials = content.links.filter((x) => x.visible && x.section === "social");
  const buttons = content.links.filter((x) => x.visible && x.section === "primary");
  const extras = content.links.filter((x) => x.visible && x.section === "extra");
  return <div className={"link-hub-shell hub-" + theme + (compact ? " hub-compact" : "")} style={{ "--hub-accent": theme === "dark" ? content.design.darkAccent : content.design.lightAccent } as React.CSSProperties}>
    <div className="hub-glow" aria-hidden="true" />
    <div className="hub-page">
      <div className="hub-top">
        <a href="/" className="hub-wordmark" aria-label="Back to portfolio"><span className="hub-mark">NM</span><span>NEBIYU<span className="hub-brand-muted"> / LINKS</span></span></a>
        <div className="hub-actions">
          <button type="button" onClick={toggleTheme} className="hub-icon-button" aria-label={"Switch to " + (theme === "dark" ? "light" : "dark") + " theme"} title="Switch theme">{theme === "dark" ? <Sun size={19}/> : <Moon size={19}/>}</button>
          <button type="button" onClick={share} className="hub-icon-button" aria-label="Share this page" title="Share">{copied ? <Check size={19}/> : <Share2 size={19}/>}</button>
        </div>
      </div>
      <section className="hub-identity" aria-label="Profile">
        <div className="hub-avatar"><Image src={content.profile.portrait} fill sizes="(max-width: 640px) 100px, 110px" alt={content.profile.name} unoptimized /></div>
        <div className="hub-available"><span /> OPEN TO NEW OPPORTUNITIES</div>
        <h1>{content.profile.name}</h1>
        <p className="hub-headline">{content.profile.headline}</p>
        <p className="hub-bio">{content.profile.bio}</p>
        <div className="hub-social-icons" aria-label="Social profiles">
          {socials.map((l) => <a key={l.id} href={l.url} {...linkAttrs(l.url)} title={l.label} aria-label={l.label}><Icon name={l.icon} /></a>)}
        </div>
      </section>
      <section className="hub-main-links" aria-label="Main links">
        {buttons.map((l, i) => <a href={l.id === "resume" ? content.profile.resume : l.url} {...linkAttrs(l.id === "resume" ? content.profile.resume : l.url)} key={l.id} className={"hub-link-card " + (i === 0 ? "hub-link-featured" : "")}>
          <span className="hub-link-icon"><Icon name={l.icon}/></span>
          <span className="hub-link-text"><strong>{l.label}</strong>{l.description && <small>{l.description}</small>}</span>
          <ArrowUpRight size={19} aria-hidden="true"/>
        </a>)}
      </section>
      <section className="hub-projects" aria-label="Featured work">
        <div className="hub-section-header"><span className="hub-eyebrow">SELECTED WORK <span className="hub-eyebrow-line"/></span><h2>Things I&apos;ve built<span className="hub-dot">.</span></h2><p>Selected projects, built from real problems.</p></div>
        <div className="hub-project-grid">
          {content.projects.filter((p)=>p.visible).slice(0,3).map((p) => <a className="hub-project" key={p.id} href={p.url} {...linkAttrs(p.url)}>
            <div className="hub-project-art">{p.image ? <Image unoptimized src={p.image} fill sizes="(max-width: 480px) 44vw, 220px" alt="" /> : <Cloud size={33}/>}</div>
            <div className="hub-project-meta"><strong>{p.name}</strong><span>{p.description}</span></div><ArrowUpRight className="hub-project-arrow" size={17} aria-hidden="true"/>
          </a>)}
          <a className="hub-all-projects" href="/projects/"><span>VIEW ALL PROJECTS</span><ArrowRight size={17}/></a>
        </div>
      </section>
      {extras.length > 0 && <section className="hub-extra-links" aria-label="More links">
        <span className="hub-eyebrow">MORE WAYS TO CONNECT</span>
        {extras.map((l) => <a key={l.id} href={l.url} {...linkAttrs(l.url)} className="hub-extra-item"><span><Icon name={l.icon}/>{l.label}</span><ArrowUpRight size={18}/></a>)}
      </section>}
      <div className="hub-bottom"><span>© {new Date().getFullYear()} NEBIYU MEKONNEN</span><span>BUILT WITH PURPOSE <span className="hub-dot">✳</span></span></div>
    </div>
  </div>;
}
