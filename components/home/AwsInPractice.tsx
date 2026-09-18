import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArchitectureDiagram } from "@/components/aws/ArchitectureDiagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getProjectBySlug } from "@/data/projects";

const degissnap = getProjectBySlug("degissnap")!;
const nehas = getProjectBySlug("nehas-digital-signage")!;

const degissnapPoints = [
  "Authentication with Amazon Cognito",
  "GraphQL APIs with AWS AppSync",
  "Application data with DynamoDB",
  "Media storage with Amazon S3",
  "Hosted and deployed with AWS Amplify",
  "164 automated tests passing (reported milestone)",
];

const nehasPoints = [
  "Screen fleet management",
  "Content delivery and scheduling",
  "Remote device operations",
  "Configuration with AWS AppConfig patterns",
  "Proof of play and health monitoring",
  "Emergency broadcast and alerts",
];

export function AwsInPractice() {
  return (
    <section className="border-y border-border bg-surface py-16 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="AWS in Practice" title="Production experience on AWS" />
        </Reveal>

        <RevealGroup className="grid gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
          <RevealItem className="rounded-2xl border border-border bg-surface-elevated p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <StatusBadge status={degissnap.status} />
            </div>
            <h3 className="text-xl font-bold text-fg mb-1">Visual Tizita</h3>
            <p className="text-sm text-fg-muted mb-4">
              Live in production on AWS ({degissnap.aws?.productionRegion}, {degissnap.aws?.regionLabel})
            </p>
            <ul className="space-y-2.5 mb-5">
              {degissnapPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-fg-muted">
                  <Check size={15} className="text-status-production shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/aws#degissnap"
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-hover transition-colors"
            >
              View AWS architecture <ArrowRight size={15} />
            </Link>
          </RevealItem>

          <RevealItem className="rounded-2xl border border-border bg-surface-elevated p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <StatusBadge status={nehas.status} />
            </div>
            <h3 className="text-xl font-bold text-fg mb-1">Nehas Digital Signage</h3>
            <p className="text-sm text-fg-muted mb-4">Building a new AWS native platform</p>
            <ul className="space-y-2.5 mb-5">
              {nehasPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-fg-muted">
                  <Check size={15} className="text-status-active shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/projects/nehas-digital-signage"
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-hover transition-colors"
            >
              View project <ArrowRight size={15} />
            </Link>
          </RevealItem>

          <RevealItem>
            <ArchitectureDiagram compact />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
