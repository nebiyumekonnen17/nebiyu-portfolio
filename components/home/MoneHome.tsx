import Image from "next/image";
import Link from "next/link";
import { Open_Sans, Outfit } from "next/font/google";
import { ArrowDown, ArrowRight, ArrowUpRight, Cloud, Code2, Layers3, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { credentials } from "@/data/credentials";
import { assetUrl, siteConfig } from "@/lib/config";
import { MoneProjectRail, type MoneProjectSummary } from "./MoneProjectRail";
import "./mone-home.css";

// Typography and composition adapted from the licensed Mone Tailwind Next.js template.
// The portfolio's existing content, routes, project data, and application stack stay intact.
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--mone-outfit" });
const openSans = Open_Sans({ subsets: ["latin"], display: "swap", variable: "--mone-opensans" });

const projectArt: Record<string, string> = {
  degissnap: "/assets/projects/Visual-Tizita-events-poster.png",
  naep: "/assets/projects/NAEP-hero.svg",
  "nehas-digital-signage": "/assets/projects/Nehas-Digital-Signage-hero.svg",
  "fsss-limat-pos": "/assets/projects/FSSS-Limat-POS-hero.svg",
  aradacart: "/assets/projects/AradaCart-hero.svg",
};

const featuredProjects: MoneProjectSummary[] = projects.map((project) => ({
  slug: project.slug,
  name: project.name,
  image: projectArt[project.slug] ? assetUrl(projectArt[project.slug]) : project.thumbnail,
  imageAlt: project.thumbnailAlt,
  status: project.status,
  tagline: project.tagline,
  category: project.category,
}));

const disciplines = [
  {
    number: "01",
    title: "Product & workflow design",
    description: "Designing the flows, roles, and interfaces that turn complicated real-world work into clear digital experiences.",
    icon: Layers3,
    href: "/skills",
  },
  {
    number: "02",
    title: "Full-stack engineering",
    description: "Building responsive frontends, practical APIs, and reliable data-backed systems with TypeScript and React.",
    icon: Code2,
    href: "/projects",
  },
  {
    number: "03",
    title: "Cloud & operations",
    description: "Shipping applications with deliberate authentication, access controls, deployment processes, and observability.",
    icon: Cloud,
    href: "/aws",
  },
];

export function MoneHome() {
  const productionCount = projects.filter((project) => project.status === "Production").length;

  return (
    <div className={`mone-home ${outfit.variable} ${openSans.variable}`}>
      <section id="about" className="mone-intro mone-container">
        <div className="mone-intro-topline">
          <span><i aria-hidden="true" /> Full-stack software engineer / AWS cloud builder</span>
          <span>Based in {profile.location}</span>
        </div>

        <h1 className="mone-display-name" aria-label="Nebiyu Mekonnen">
          <span>NEBIYU</span>
          <span>MEKONNEN</span>
        </h1>

        <div className="mone-intro-columns">
          <div className="mone-bio">
            <h2 className="mone-label">01 / Biography</h2>
            <p>{profile.intro}</p>
            <h2 className="mone-label mone-bio-label">Specialties</h2>
            <p className="mone-specialties">Full-stack engineering <b>·</b> AWS cloud <b>·</b> Product architecture <b>·</b> AI engineering</p>
            <div className="mone-socials">
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a>
              {siteConfig.linkedin && (
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
              )}
            </div>
          </div>

          <div className="mone-portrait-panel">
            <div className="mone-portrait-ring">
              <Image
                src={assetUrl("/assets/profile/nebiyu_primary_portrait.png")}
                alt="Portrait of Nebiyu Mekonnen"
                fill
                priority
                sizes="(min-width: 1050px) 350px, (min-width: 680px) 310px, 80vw"
                className="mone-portrait-img"
              />
            </div>
            <span className="mone-portrait-caption">Engineer. Designer. Builder.</span>
          </div>

          <div className="mone-figures">
            <div><span className="mone-label">Documented projects</span><strong>{String(projects.length).padStart(2, "0")}</strong></div>
            <div><span className="mone-label">Production case studies</span><strong>{String(productionCount).padStart(2, "0")}</strong></div>
            <div><span className="mone-label">Credentials & certificates</span><strong>{credentials.length}</strong></div>
            <Link href="/about" className="mone-text-link">More about me <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <div className="mone-intro-bottom">
          <p>I design, build, and ship real software for people and organizations.</p>
          <a href="#portfolio" className="mone-circle-link" aria-label="Scroll to selected projects"><ArrowDown size={23} /></a>
        </div>
      </section>

      <section id="services" className="mone-services mone-container">
        <div className="mone-section-title">
          <div>
            <p className="mone-eyebrow">02 / What I do</p>
            <h2>From concept <span>to production.</span></h2>
          </div>
          <p className="mone-section-aside">One engineering process, from understanding the problem to launching something useful.</p>
        </div>
        <div className="mone-service-rows">
          {disciplines.map(({ number, title, description, icon: Icon, href }) => (
            <Link key={number} href={href} className="mone-service-row">
              <span className="mone-service-number">{number} /</span>
              <div className="mone-service-name"><Icon size={28} strokeWidth={1.6} /><h3>{title}</h3></div>
              <p>{description}</p>
              <ArrowUpRight className="mone-service-arrow" size={21} />
            </Link>
          ))}
        </div>
      </section>

      <section id="portfolio" className="mone-portfolio-section">
        <div className="mone-container">
          <div className="mone-section-title">
            <div>
              <p className="mone-eyebrow">03 / Selected work</p>
              <h2>Work that <span>speaks for itself.</span></h2>
            </div>
            <p className="mone-section-aside">Explore real builds, documented engineering decisions, and architecture work—not generic demo projects.</p>
          </div>
          <MoneProjectRail projects={featuredProjects} />
          <Link href="/projects" className="mone-all-work">Explore all case studies <ArrowRight size={18}/></Link>
        </div>
      </section>

      <section className="mone-credentials mone-container">
        <div className="mone-section-title">
          <div>
            <p className="mone-eyebrow">04 / Continued learning</p>
            <h2>Learning with <span>practical purpose.</span></h2>
          </div>
          <Link href="/credentials" className="mone-text-link">All credentials <ArrowUpRight size={17}/></Link>
        </div>
        <div className="mone-credential-list">
          {credentials.filter((credential) => credential.featured).slice(0, 3).map((credential, index) => (
            <div className="mone-credential-row" key={credential.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{credential.name}</h3><p>{credential.issuer}</p></div>
              <span className="mone-credential-category">{credential.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mone-contact-section">
        <div className="mone-container mone-contact-layout">
          <p className="mone-eyebrow">05 / Let's connect</p>
          <h2>Have a challenge?<br/><span>Let's build something useful.</span></h2>
          <p>Open to full-stack, cloud engineering, and software development opportunities.</p>
          <div className="mone-contact-actions">
            <Link href="/contact" className="mone-contact-primary">Start a conversation <ArrowUpRight size={19}/></Link>
            {siteConfig.email && <a href={`mailto:${siteConfig.email}`} className="mone-contact-secondary"><Mail size={17}/> Send an email</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
