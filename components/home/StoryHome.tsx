import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CredentialCard } from "@/components/credentials/CredentialCard";
import { projects, getProjectBySlug } from "@/data/projects";
import { credentials } from "@/data/credentials";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/config";
import { StoryProgress } from "./StoryProgress";
import "./story.css";

const stories = [
  { slug: "degissnap", lead: "Memories belong together.", problem: "After an event, photos are scattered across phones and group chats. Collecting them should not require another account.", decision: "Make guest entry effortless. Give hosts the controls they need.", solution: "A private event companion with QR entry, no-account uploads, galleries, moderation, downloads, and a separate host dashboard.", proof: "Production on AWS · Verified event-companion milestone", stack: "React / Amplify / Cognito / AppSync / DynamoDB / S3" },
  { slug: "nehas-digital-signage", lead: "Many screens. One control room.", problem: "Managing a fleet of screens becomes an operational problem: what is playing, which devices are healthy, and how do changes reach them?", decision: "Design the console, player, and operational controls as one system.", solution: "A cloud-managed signage platform for tenant-scoped media, playlists, scheduling, device operations, and playback visibility.", proof: "Active build · Development environment deployed in us-west-2", stack: "TypeScript / React / Vite / AWS Amplify / AppConfig" },
  { slug: "fsss-limat-pos", lead: "Keep the counter moving.", problem: "A store needs fast checkout, dependable inventory, and clear staff permissions—without abandoning its existing records.", decision: "Build around real register workflows and preserve the existing database.", solution: "A React register and Express API with barcode scanning, held carts, receipts, inventory history, and role-protected management tools.", proof: "Built · Local web/PWA and Electron delivery paths", stack: "React / Vite / Node.js / Express / MySQL / Electron" },
];
const credentialNames = ["AWS re/Start Graduate", "AWS Skills Center Cloud Practitioner Foundations", "Introduction to Cybersecurity"];
const capabilities = [
  { title: "Build", detail: "Responsive interfaces, APIs, and business data that work together.", skills: "React · TypeScript · Node.js · GraphQL · MySQL", slugs: ["degissnap", "nehas-digital-signage", "fsss-limat-pos", "naep"] },
  { title: "Cloud", detail: "Identity, application data, media storage, and deployment on AWS.", skills: "Amplify · Cognito · AppSync · DynamoDB · S3", slugs: ["degissnap", "nehas-digital-signage"] },
  { title: "Design & operate", detail: "Product workflows, access boundaries, testing, and environment management.", skills: "System design · Permissions · Testing · Operations", slugs: ["degissnap", "nehas-digital-signage", "fsss-limat-pos", "naep", "aradacart"] },
];

export function StoryHome() {
  return <div className="story-home">
    <StoryProgress />
    <section id="intro" data-story-step className="story-hero story-section"><Container>
      <div className="story-hero-grid"><div>
        <p className="story-eyebrow">Nebiyu Mekonnen / Washington State</p>
        {profile.openToOpportunities && <p className="story-available"><span /> Open to new opportunities</p>}
        <h1>Full-stack engineer building <em>production software</em> on AWS.</h1>
        <p className="story-lead">I turn complicated operational problems into secure, usable software—from the first workflow and interface to backend services and cloud deployment.</p>
        <p className="story-specialties">Full-stack engineering · AWS cloud applications · Product & system design</p>
        <div className="story-actions"><a className="story-button" href="#work">Explore my work <ArrowDown size={16} /></a>{siteConfig.resumeUrl && <a className="story-button secondary" href={siteConfig.resumeUrl}>Download resume <ArrowUpRight size={16} /></a>}</div>
        {siteConfig.linkedin && <a className="story-text-link" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a>}
      </div><div className="story-portrait"><Image src={profile.portrait} alt="Nebiyu Mekonnen" fill priority sizes="(min-width: 1024px) 360px, (min-width: 640px) 340px, 80vw" className="object-cover" /><span>From a real need<br />to a working system.</span></div></div>
      <dl className="story-proof-strip"><div><dt>Production</dt><dd>AWS application deployment</dd></div><div><dt>974 tests</dt><dd>At the NACLASSU milestone</dd></div><div><dt>{projects.length} case studies</dt><dd>Built work and architecture</dd></div><div><dt>{credentials.length} credentials</dt><dd>Badges and course completions</dd></div></dl>
    </Container></section>

    <section id="work" data-story-step className="story-section"><Container><div className="story-work-grid">
      <header className="story-sticky"><p className="story-eyebrow">01 / The starting point</p><h2>Real problems.<br /><em>Purpose-built systems.</em></h2><p>My projects start with people trying to get something done. The technology follows the problem.</p><p className="story-small">Three selected stories: an event, a screen fleet, and a store counter.</p><Link className="story-text-link" href="/projects">View all {projects.length} projects ↗</Link></header>
      <div className="story-projects">{stories.map((story, index) => {
        const project = getProjectBySlug(story.slug)!;
        return <article key={story.slug} data-story-step className="story-project">
          <div className="story-project-image"><Image src={project.thumbnail} alt={project.thumbnailAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" /></div>
          <div className="story-project-copy"><p className="story-eyebrow">0{index + 1} / {project.name} <span className="story-status">{project.status}</span></p><h3>{story.lead}</h3><p>{story.problem}</p><dl className="story-decisions"><div><dt>The decision</dt><dd>{story.decision}</dd></div><div><dt>The system</dt><dd>{story.solution}</dd></div></dl><p className="story-evidence-line">{story.proof}</p><p className="story-small">{story.stack}</p><Link className="story-text-link" href={`/projects/${story.slug}`}>Explore {project.name} ↗</Link></div>
        </article>;
      })}</div>
    </div></Container></section>

    <section id="engineering" data-story-step className="story-section story-tinted"><Container>
      <p className="story-eyebrow">02 / Beneath the interface</p><h2>Useful on the surface.<br /><em>Dependable underneath.</em></h2><p className="story-lead">The interface is only one part of the product. Identity, data boundaries, deployment, and operational safeguards need the same care.</p>
      <ol className="story-pipeline">{[["Understand", "The user need"], ["Design", "The product workflow"], ["Build", "Interfaces and APIs"], ["Deploy", "Cloud architecture"], ["Operate", "Testing and controls"]].map(([title, detail], i) => <li data-story-step key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol>
      <div className="story-aws-grid"><div><h3>Visual Tizita / Production</h3><p>Cognito separates host identity from guest entry. AppSync and ownership rules protect application records. DynamoDB stores state, S3 stores media, and Lambda runs backend workflows.</p><p className="story-small">Amplify deployment · us-west-2 · Isolated staging and production</p><Link href="/aws#degissnap" className="story-text-link">Explore the AWS architecture ↗</Link></div><div><h3>Nehas / Active build</h3><p>A development-deployed backend, console, and player bring screen operations together. Tenant boundaries, playback visibility, and AppConfig operational controls support the fleet.</p><p className="story-small">Development environment · us-west-2 · Not presented as production</p><Link href="/projects/nehas-digital-signage" className="story-text-link">See the system decisions ↗</Link></div></div>
    </Container></section>

    <section id="evidence" data-story-step className="story-section"><Container>
      <p className="story-eyebrow">03 / Evidence, not adjectives</p><h2>Beyond the <em>prototype.</em></h2>
      <div className="story-evidence-grid">{[["974", "Passing tests across 72 files", "Recorded at the NACLASSU milestone in the Visual Tizita repository—not a claim about today’s test count.", "degissnap"], ["Real event", "Verified on phone and desktop", "The NACLASSU Event Companion milestone exercised the shared platform in an event-specific experience.", "degissnap"], ["Existing data", "A practical migration path", "FSSS Limat POS adapts to legacy MySQL schemas while supporting local web/PWA and Electron delivery.", "fsss-limat-pos"]].map(([value, title, detail, slug]) => <article key={value}><strong>{value}</strong><h3>{title}</h3><p>{detail}</p><Link className="story-text-link" href={`/projects/${slug}`}>Read the case study ↗</Link></article>)}</div>
      <div className="story-capability-heading"><p className="story-eyebrow">The range behind the work</p><h2>One builder.<br /><em>Connected capabilities.</em></h2></div>
      <div className="story-capabilities">{capabilities.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p><p className="story-small">{item.skills}</p><div className="story-project-links">{item.slugs.map((slug) => <Link key={slug} href={`/projects/${slug}`}>{getProjectBySlug(slug)!.name}</Link>)}</div></article>)}</div><Link className="story-text-link" href="/skills">Explore all project-backed skills ↗</Link>
    </Container></section>

    <section className="story-section story-tinted"><Container><p className="story-eyebrow">04 / Always learning</p><h2>Experience builds.<br /><em>Learning strengthens.</em></h2><p className="story-lead">The projects put my knowledge into practice. Training in cloud and security strengthens the foundation.</p><div className="story-credentials">{credentialNames.map((name) => credentials.find((credential) => credential.name === name)).filter((credential) => credential !== undefined).map((credential) => <CredentialCard key={credential.name} credential={credential} />)}</div><div className="story-actions"><Link className="story-text-link" href="/credentials">All credentials ↗</Link><a className="story-text-link" href={siteConfig.credly} target="_blank" rel="noopener noreferrer">Verify badges on Credly ↗</a></div></Container></section>

    <section id="connect" data-story-step className="story-section story-close"><Container><p className="story-eyebrow">05 / What comes next</p><h2>Let’s build<br /><em>something useful.</em></h2><p className="story-lead">I like taking ideas that feel complicated and turning them into software people can actually use.</p><p>I’m open to full-stack, AWS cloud, and software engineering opportunities.</p><div className="story-actions"><Link className="story-button" href="/contact">Start a conversation <ArrowUpRight size={16} /></Link>{siteConfig.linkedin && <a className="story-button secondary" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a>}{siteConfig.resumeUrl && <a className="story-text-link" href={siteConfig.resumeUrl}>Download resume ↗</a>}</div><Link className="story-text-link" href="/about">More about how I work ↗</Link></Container></section>
  </div>;
}
