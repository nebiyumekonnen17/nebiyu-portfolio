import Link from "next/link";
import { ShieldCheck, Network, Database, Image as ImageIcon, Rocket, Settings2, ArrowRight, type LucideIcon } from "lucide-react";
import type { AwsServiceEntry } from "@/data/aws";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ProjectStatus } from "@/types/content";

const iconMap: Record<AwsServiceEntry["icon"], LucideIcon> = {
  "shield-check": ShieldCheck,
  network: Network,
  database: Database,
  image: ImageIcon,
  rocket: Rocket,
  settings: Settings2,
};

export function AwsServiceCard({ service }: { service: AwsServiceEntry }) {
  const Icon = iconMap[service.icon];

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-aws/15 text-aws">
          <Icon size={18} />
        </span>
        <StatusBadge status={service.usedIn.status as ProjectStatus} />
      </div>

      <h3 className="text-base font-semibold text-fg mb-1">{service.name}</h3>
      <p className="text-sm text-fg-muted leading-relaxed mb-3">{service.purpose}</p>
      <p className="text-xs text-fg-subtle leading-relaxed mb-4">{service.problemSolved}</p>

      <Link
        href={`/projects/${service.usedIn.projectSlug}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-hover transition-colors"
      >
        Used in {service.usedIn.projectName} <ArrowRight size={13} />
      </Link>
    </div>
  );
}
