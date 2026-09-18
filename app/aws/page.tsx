import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { ArchitectureDiagram } from "@/components/aws/ArchitectureDiagram";
import { ArchitectureLayerCards } from "@/components/projects/ArchitectureLayerCards";
import { AwsServiceCard } from "@/components/aws/AwsServiceCard";
import { CredentialCard } from "@/components/credentials/CredentialCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getProjectBySlug } from "@/data/projects";
import { awsServiceEntries } from "@/data/aws";
import { credentials } from "@/data/credentials";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "AWS Experience",
  description:
    "How Nebiyu Mekonnen uses AWS in real projects: Visual Tizita in production and the Nehas Digital Signage development platform deployed in us-west-2.",
  alternates: { canonical: absoluteUrl("/aws") },
};

const degissnap = getProjectBySlug("degissnap")!;
const nehas = getProjectBySlug("nehas-digital-signage")!;
const aradacart = getProjectBySlug("aradacart")!;

const groups = [
  "Authentication and Identity",
  "APIs and Data",
  "Storage",
  "Deployment and Environment Management",
] as const;

const awsRelatedCredentialNames = [
  "AWS re/Start Graduate",
  "AWS Skills Center Cloud Practitioner Foundations",
  "IBM Cloud Essentials",
];

export default function AwsPage() {
  const awsCredentials = credentials.filter((c) => awsRelatedCredentialNames.includes(c.name));

  return (
    <>
      <section className="border-b border-border bg-surface py-14 md:py-18">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-aws mb-3">
              AWS Experience
            </p>
            <h1 className="text-[32px] md:text-[44px] font-bold text-fg max-w-3xl leading-tight text-balance mb-4">
              I did not just study AWS. I used it to ship a production application.
            </h1>
            <p className="text-lg text-fg-muted max-w-2xl leading-relaxed">
              Visual Tizita runs in production on Amazon Cognito, AWS AppSync, Amazon DynamoDB, Amazon S3,
              and AWS Amplify. That hands on experience is what I am now applying to a larger AWS
              native platform, Nehas Digital Signage.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="degissnap" className="py-14 md:py-16 border-b border-border scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Production AWS Experience" title="Visual Tizita: the deep dive" />
          </Reveal>

          <RevealGroup className="grid gap-6 lg:grid-cols-[1fr_1.1fr] items-start">
            <RevealItem className="rounded-2xl border border-border bg-surface-elevated p-6">
              <div className="flex items-center justify-between mb-3">
                <StatusBadge status={degissnap.status} />
                <span className="text-xs text-fg-subtle">
                  {degissnap.aws?.productionRegion} · {degissnap.aws?.regionLabel}
                </span>
              </div>
              <h3 className="text-xl font-bold text-fg mb-3">{degissnap.name}</h3>
              <p className="text-sm text-fg-muted leading-relaxed mb-5">{degissnap.summary}</p>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Host authentication and identity with Amazon Cognito",
                  "GraphQL APIs and authorization with AWS AppSync",
                  "Application data in Amazon DynamoDB",
                  "Media storage in Amazon S3",
                  "Hosted and deployed with AWS Amplify",
                  "974 automated tests across 72 files at the NACLASSU milestone",
                  "Production deployment and regional environment management",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-fg-muted">
                    <Check size={15} className="text-status-production shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>

              <Button href="/projects/degissnap" variant="secondary" size="sm">
                Read the full case study <ArrowRight size={15} />
              </Button>
            </RevealItem>

            <RevealItem>
              <ArchitectureDiagram />
            </RevealItem>
          </RevealGroup>

          {degissnap.architecture && (
            <Reveal className="mt-8">
              <ArchitectureLayerCards layers={degissnap.architecture} />
            </Reveal>
          )}
        </Container>
      </section>

      <section className="py-14 md:py-16 border-b border-border bg-surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="AWS Projects"
              title="Where AWS shows up across my work"
              description="Production, deployed development, and planned architecture are kept clearly separate."
            />
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[degissnap, nehas, aradacart].map((project) => (
              <RevealItem key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block rounded-2xl border border-border bg-surface-elevated p-5 hover:border-border-strong transition-colors"
                >
                  <StatusBadge status={project.status} className="mb-3" />
                  <h3 className="text-base font-semibold text-fg mb-1.5">{project.name}</h3>
                  <p className="text-xs text-fg-muted leading-relaxed">{project.summary}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-14 md:py-16 border-b border-border">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="AWS Services" title="AWS services I have worked with" />
          </Reveal>

          {groups.map((group) => {
            const items = awsServiceEntries.filter((s) => s.group === group);
            if (items.length === 0) return null;
            return (
              <Reveal key={group} className="mb-10 last:mb-0">
                <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wide mb-4">{group}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((service) => (
                    <AwsServiceCard key={service.name} service={service} />
                  ))}
                </div>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <section className="py-14 md:py-16 border-b border-border bg-surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="AWS Native Systems in Development"
              title="Applying that experience to Nehas Digital Signage"
              description="Nehas is a new AWS-native platform with its development backend, console, and player deployed in us-west-2. Production remains behind explicit acceptance gates."
            />

            <div className="rounded-2xl border border-border bg-surface-elevated p-6 md:p-8">
              <StatusBadge status={nehas.status} className="mb-4" />
              <h3 className="text-xl font-bold text-fg mb-3">{nehas.name}</h3>
              <p className="text-sm text-fg-muted leading-relaxed max-w-2xl mb-5">{nehas.notes}</p>
              <div className="grid gap-2.5 sm:grid-cols-2 mb-6">
                {[
                  "Screen fleet management and health monitoring",
                  "Content, playlists, campaigns, and scheduling",
                  "Private media delivery and deterministic publishing",
                  "Proof of play, observability, and controlled releases",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-sm text-fg-muted">
                    <Check size={15} className="text-status-active shrink-0 mt-0.5" />
                    {point}
                  </div>
                ))}
              </div>
              <Button href="/projects/nehas-digital-signage" variant="secondary" size="sm">
                View project details <ArrowRight size={15} />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 md:py-16">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Related Credentials" title="AWS credentials and learning" />
          </Reveal>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {awsCredentials.map((c) => (
              <RevealItem key={c.name}>
                <CredentialCard credential={c} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Button href="/credentials" variant="ghost" size="sm" className="mt-6">
            View all credentials <ArrowRight size={15} />
          </Button>
        </Container>
      </section>
    </>
  );
}
