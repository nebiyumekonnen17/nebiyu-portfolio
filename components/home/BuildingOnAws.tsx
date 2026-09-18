import Link from "next/link";
import { Rocket, ShieldCheck, Network, Database, Image as ImageIcon, Settings2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const services = [
  {
    icon: Rocket,
    name: "AWS Amplify",
    description: "Hosts and deploys Visual Tizita, including the production environment.",
    tag: "Visual Tizita · Production",
  },
  {
    icon: ShieldCheck,
    name: "Amazon Cognito",
    description: "Authentication and identity management for hosts.",
    tag: "Visual Tizita · Production",
  },
  {
    icon: Network,
    name: "AWS AppSync",
    description: "GraphQL API in front of the application data.",
    tag: "Visual Tizita · Production",
  },
  {
    icon: Database,
    name: "Amazon DynamoDB",
    description: "NoSQL database for application data.",
    tag: "Visual Tizita · Production",
  },
  {
    icon: ImageIcon,
    name: "Amazon S3",
    description: "Object storage for photos and media.",
    tag: "Visual Tizita · Production",
  },
  {
    icon: Settings2,
    name: "AWS AppConfig",
    description: "Configuration patterns planned for fleet and content behavior.",
    tag: "Nehas · Active Build",
  },
];

export function BuildingOnAws() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-14 md:py-16">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-aws mb-2">
              Building on AWS
            </p>
            <h2 className="text-2xl md:text-[28px] font-bold text-fg">
              I use AWS to build secure, scalable, reliable applications.
            </h2>
          </div>
          <Link
            href="/aws"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-hover transition-colors shrink-0"
          >
            Explore my AWS work <ArrowRight size={15} />
          </Link>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((service) => (
            <RevealItem
              key={service.name}
              className="flex flex-col gap-2.5 rounded-xl border border-border bg-surface-elevated p-4 transition-colors hover:border-border-strong"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-aws/15 text-aws">
                <service.icon size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold text-fg leading-tight">{service.name}</p>
                <p className="text-xs text-fg-muted leading-snug mt-1">{service.description}</p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-fg-subtle mt-auto pt-1">
                {service.tag}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
