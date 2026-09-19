import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CredentialCard } from "@/components/credentials/CredentialCard";
import { getProjectBySlug, projects } from "@/data/projects";
import { credentials } from "@/data/credentials";
import { profile } from "@/data/profile";
import { assetUrl, siteConfig } from "@/lib/config";
import {
  ProjectStory,
  type StoryProject,
  type StoryVisual,
} from "./ProjectStory";
import { ArchitectureWalkthrough } from "./ArchitectureWalkthrough";
import { EvidenceReveal } from "./EvidenceReveal";
import { WorkflowMap } from "./WorkflowMap";
import "./story.css";
import "./story-interactions.css";
import "./story-autoplay.css";
import "./story-film.css";

const projectStoryInputs: Array<
  [string, string, string, string, string, StoryVisual[]]
> = [
  [
    "degissnap",
    "Event memories are scattered across phones and group chats.",
    "I built a private event companion where guests enter through a QR code, contribute without an account, and hosts keep control of the experience.",
    "Production AWS deployment · Event-companion milestone verified on phone and desktop",
    "React · Amplify · Cognito · AppSync · DynamoDB · S3",
    [
      {
        label: "Guest entry",
        image: assetUrl(
          "/images/projects/degissnap/gallery/01-guest-landing-qr-scan-concept.png",
        ),
        alt: "Visual Tizita guest QR entry experience",
        note: "A guest-first entry point",
      },
      {
        label: "Host view",
        image: assetUrl(
          "/images/projects/degissnap/gallery/06-host-dashboard-overview-concept.png",
        ),
        alt: "Visual Tizita host dashboard",
        note: "Host controls and activity",
      },
      {
        label: "Gallery",
        image: assetUrl(
          "/images/projects/degissnap/gallery/02-event-gallery-concept.png",
        ),
        alt: "Visual Tizita private event gallery",
        note: "A shared event memory",
      },
    ],
  ],
  [
    "nehas-digital-signage",
    "A screen fleet needs more than content—it needs control.",
    "I designed one system for tenant-scoped media, scheduling, device operations, and playback visibility, with operational controls for the fleet.",
    "Active build · Development environment deployed in us-west-2",
    "TypeScript · React · Vite · AWS Amplify",
    [
      {
        label: "Control room",
        image: assetUrl(
          "/images/projects/nehas-digital-signage/gallery/01-overview-dashboard-concept.png",
        ),
        alt: "Nehas digital signage dashboard",
        note: "One view of the fleet",
      },
      {
        label: "Schedules",
        image: assetUrl(
          "/images/projects/nehas-digital-signage/gallery/07-schedules-concept.png",
        ),
        alt: "Nehas digital signage schedules",
        note: "Content at the right time",
      },
      {
        label: "Monitoring",
        image: assetUrl(
          "/images/projects/nehas-digital-signage/gallery/08-publishing-and-monitoring-concept.png",
        ),
        alt: "Nehas publishing and monitoring",
        note: "Operational visibility",
      },
    ],
  ],
  [
    "fsss-limat-pos",
    "A busy counter cannot depend on disconnected tools.",
    "I built a register and management system around real workflows: scanning, held carts, receipts, inventory history, and staff permissions—while retaining legacy data compatibility.",
    "Built · Local web/PWA and Electron delivery paths",
    "React · Node.js · Express · MySQL · Electron",
    [
      {
        label: "Checkout",
        image: assetUrl(
          "/images/projects/fsss-limat-pos/gallery/01-pos-checkout-concept.png",
        ),
        alt: "FSSS Limat POS checkout screen",
        note: "The counter workflow",
      },
      {
        label: "Scan & search",
        image: assetUrl(
          "/images/projects/fsss-limat-pos/gallery/02-product-search-and-scan-concept.png",
        ),
        alt: "FSSS Limat POS product search and scan",
        note: "Fast product discovery",
      },
      {
        label: "Held sales",
        image: assetUrl(
          "/images/projects/fsss-limat-pos/gallery/07-held-sales-concept.png",
        ),
        alt: "FSSS Limat POS held sales",
        note: "Pick up where you left off",
      },
    ],
  ],
];

const projectStories: StoryProject[] = projectStoryInputs.map(
  ([slug, problem, outcome, proof, stack, visuals]) => {
  const project = getProjectBySlug(slug)!;
  return {
    slug,
    problem,
    outcome,
    proof,
    stack,
    visuals,
    name: project.name,
    status: project.status,
    thumbnail: project.thumbnail,
    thumbnailAlt: project.thumbnailAlt,
  };
  },
);
const selectedCredentials = [
  "AWS re/Start Graduate",
  "AWS Skills Center Cloud Practitioner Foundations",
  "Introduction to Cybersecurity",
]
  .map((name) => credentials.find((credential) => credential.name === name))
  .filter((credential): credential is NonNullable<typeof credential> =>
    Boolean(credential),
  );

export function StoryHome() {
  return (
    <main className="home-story">
      <section className="home-hero" id="top">
        <Container>
          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-kicker">
                Nebiyu Mekonnen / Full-stack & cloud engineer
              </p>
              {profile.openToOpportunities && (
                <p className="home-availability">
                  <span /> Open to new opportunities
                </p>
              )}
              <h1>
                I turn real-world operations into{" "}
                <em>software people can use.</em>
              </h1>
              <p className="home-lead">
                From the first workflow to the AWS deployment, I build
                full-stack systems that help people run events, businesses, and
                digital operations with confidence.
              </p>
              <div className="home-actions">
                <a className="home-primary-action" href="#selected-work">
                  See selected work <ArrowDown size={16} />
                </a>
                {siteConfig.resumeUrl && (
                  <a
                    className="home-secondary-action"
                    href={siteConfig.resumeUrl}
                  >
                    Download resume <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
              {siteConfig.linkedin && (
                <a
                  className="home-inline-link"
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
            <div className="home-hero-portrait">
              <Image
                src={profile.portrait}
                alt="Nebiyu Mekonnen"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 75vw"
                className="object-cover"
              />
              <div>
                <span>Full-stack engineering</span>
                <span>AWS cloud applications</span>
                <span>Product systems</span>
              </div>
            </div>
          </div>
          <dl className="home-proof-strip">
            <div>
              <dt>Production</dt>
              <dd>AWS deployment</dd>
            </div>
            <div>
              <dt>974</dt>
              <dd>Tests at a recorded milestone</dd>
            </div>
            <div>
              <dt>{projects.length}</dt>
              <dd>Documented case studies</dd>
            </div>
            <div>
              <dt>10+</dt>
              <dd>Credentials and certificates</dd>
            </div>
          </dl>
        </Container>
      </section>
      <section id="selected-work" className="home-section home-work">
        <Container>
          <div className="home-section-intro">
            <p className="home-kicker">Selected work</p>
            <h2>
              Every system starts with a <em>real problem.</em>
            </h2>
            <p>
              Scroll through three projects to see the problem, the system I
              built, and the proof behind it.
            </p>
            <Link href="/projects" className="home-inline-link">
              View all {projects.length} projects{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ProjectStory projects={projectStories} />
          <WorkflowMap />
        </Container>
      </section>
      <section className="home-section home-architecture">
        <Container>
          <div className="home-section-intro">
            <p className="home-kicker">How I build</p>
            <h2>
              A polished interface needs a <em>dependable foundation.</em>
            </h2>
            <p>
              Visual Tizita shows the approach underneath the user experience:
              guest access stays simple, while the data, media, and host
              controls stay protected.
            </p>
          </div>
          <div className="architecture-layout">
            <ArchitectureWalkthrough />
            <div className="architecture-copy">
              <p className="home-kicker">Visual Tizita / Production</p>
              <h3>Easy guest entry. Deliberate operational boundaries.</h3>
              <ul>
                <li>
                  <Check size={16} />
                  QR links support no-account guest participation
                </li>
                <li>
                  <Check size={16} />
                  Cognito separates host identity from guest flows
                </li>
                <li>
                  <Check size={16} />
                  AppSync and ownership rules scope application records
                </li>
                <li>
                  <Check size={16} />
                  DynamoDB and S3 hold state and media
                </li>
              </ul>
              <p className="architecture-note">
                Amplify deployment in us-west-2 · staging and production kept
                separate
              </p>
              <Link href="/aws#degissnap" className="home-inline-link">
                Explore the AWS architecture <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section className="home-section home-evidence">
        <Container>
          <div className="home-section-intro">
            <p className="home-kicker">Proof</p>
            <h2>
              Not just an idea on a <em>screen.</em>
            </h2>
          </div>
          <EvidenceReveal />
        </Container>
      </section>
      <section className="home-section home-capabilities">
        <Container>
          <div className="home-section-intro">
            <p className="home-kicker">Connected capabilities</p>
            <h2>
              One builder across product, <em>engineering, and cloud.</em>
            </h2>
          </div>
          <div className="capability-grid">
            <article>
              <span>01</span>
              <h3>Design the workflow</h3>
              <p>
                Product architecture, real roles, operational decisions, and
                interfaces shaped around the people using them.
              </p>
              <Link href="/skills">Product & system skills ↗</Link>
            </article>
            <article>
              <span>02</span>
              <h3>Build the system</h3>
              <p>
                React and TypeScript frontends, backend services, APIs, and the
                data models that make the work real.
              </p>
              <Link href="/skills">Full-stack skills ↗</Link>
            </article>
            <article>
              <span>03</span>
              <h3>Run it responsibly</h3>
              <p>
                Identity, permissions, deployment, testing, and environment
                controls beneath the visible product.
              </p>
              <Link href="/aws">AWS and security work ↗</Link>
            </article>
          </div>
        </Container>
      </section>
      <section className="home-section home-learning">
        <Container>
          <div className="home-section-intro">
            <p className="home-kicker">Learning</p>
            <h2>
              Experience is the evidence. <em>Learning strengthens it.</em>
            </h2>
          </div>
          <div className="home-credentials">
            {selectedCredentials.map((credential) => (
              <CredentialCard key={credential.name} credential={credential} />
            ))}
          </div>
          <div className="home-links-row">
            <Link href="/credentials" className="home-inline-link">
              All credentials <span aria-hidden="true">↗</span>
            </Link>
            <a
              href={siteConfig.credly}
              className="home-inline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify badges on Credly <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Container>
      </section>
      <section className="home-close">
        <Container>
          <p className="home-kicker">Let’s connect</p>
          <h2>
            Let’s build something <em>useful.</em>
          </h2>
          <p>
            I’m open to full-stack, AWS cloud, and software engineering
            opportunities.
          </p>
          <div className="home-actions">
            <Link className="home-primary-action" href="/contact">
              Start a conversation <ArrowUpRight size={16} />
            </Link>
            {siteConfig.linkedin && (
              <a
                className="home-secondary-action"
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn ↗
              </a>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
