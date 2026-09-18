import { Users, Layout, ShieldCheck, Network, Database, Image as ImageIcon, Rocket, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Node({
  icon: Icon,
  label,
  sublabel,
  tone = "default",
  className,
}: {
  icon: React.ElementType;
  label: string;
  sublabel: string;
  tone?: "default" | "aws" | "gold";
  className?: string;
}) {
  const toneClasses = {
    default: "border-border bg-surface text-fg",
    aws: "border-aws/30 bg-aws/10 text-fg",
    gold: "border-gold/40 bg-gold/10 text-fg",
  }[tone];

  return (
    <div className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 min-w-0", toneClasses, className)}>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          tone === "aws" ? "bg-aws/20 text-aws" : "bg-gold/15 text-gold"
        )}
      >
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight truncate">{label}</p>
        <p className="text-xs text-fg-muted leading-snug truncate">{sublabel}</p>
      </div>
    </div>
  );
}

export function ArchitectureDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold text-fg">
          Visual Tizita Architecture {compact && <span className="text-fg-muted font-normal">(Simplified)</span>}
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-3">
        <Node icon={Users} label="Guest or Host" sublabel="Reaches the app through a link or QR code" />

        <ArrowDown size={16} className="text-fg-subtle mx-auto" aria-hidden="true" />

        <Node icon={Layout} label="React Application" sublabel="React + Vite frontend, shared by guests and hosts" tone="gold" />

        <ArrowDown size={16} className="text-fg-subtle mx-auto" aria-hidden="true" />

        <div className="rounded-xl border border-aws/25 bg-aws/5 p-3 md:p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-aws mb-3">
            AWS Amplify · Build, Host, Deploy
          </p>

          <div className={cn("grid gap-3", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
            <Node icon={ShieldCheck} label="Amazon Cognito" sublabel="Host authentication" tone="aws" />
            <Node icon={Network} label="AWS AppSync" sublabel="GraphQL API + authorization" tone="aws" />
          </div>

          <div className="flex items-center justify-center gap-2 my-2 text-fg-subtle" aria-hidden="true">
            <ArrowDown size={14} />
            <span className="text-[10px] uppercase tracking-wide">verifies identity for</span>
          </div>

          <div className={cn("grid gap-3", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
            <Node icon={Database} label="Amazon DynamoDB" sublabel="Events, guestbook, comments, loves" tone="aws" />
            <Node icon={ImageIcon} label="Amazon S3" sublabel="Uploaded photos, event covers" tone="aws" />
          </div>
        </div>

        {!compact && (
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 mt-1">
            <Rocket size={16} className="text-gold shrink-0" />
            <p className="text-xs text-fg-muted leading-snug">
              Amplify builds and deploys the frontend and AWS backend together, including the production
              environment running in Oregon (us-west-2).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
