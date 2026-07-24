import { ExternalLink } from "lucide-react";
import type { Credential } from "@/types/content";
import { cn } from "@/lib/utils";

const issuerLogo: Record<string, string> = {
  "Amazon Web Services": "AWS",
  "IBM SkillsBuild": "IBM",
  Cisco: "Cisco",
};

export function CredentialCard({ credential, className }: { credential: Credential; className?: string }) {
  const date = new Date(credential.dateEarned).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-surface-elevated p-5 h-full",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center rounded-lg bg-surface px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-fg-muted">
          {issuerLogo[credential.issuer] ?? credential.issuer}
        </span>
        {credential.certificateFile && (
          <a
            href={credential.certificateFile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-subtle hover:text-gold transition-colors"
            aria-label={`Open ${credential.name} certificate PDF`}
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>
      <h3 className="text-[15px] font-semibold text-fg leading-snug mb-1">{credential.name}</h3>
      <p className="text-xs text-fg-subtle mb-3">{credential.issuer}</p>
      <p className="text-xs text-fg-muted mt-auto">Issued {date}</p>
    </div>
  );
}
