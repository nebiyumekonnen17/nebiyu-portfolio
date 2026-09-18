import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CredentialCard } from "@/components/credentials/CredentialCard";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { credentials, credlyProfileUrl, awsTrainingCertificates } from "@/data/credentials";
import type { CredentialCategory } from "@/types/content";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Credentials and Learning",
  description:
    "Real badges, course completions, and training certificates Nebiyu Mekonnen has earned, connected to the projects they informed.",
  alternates: { canonical: absoluteUrl("/credentials") },
};

const categories: CredentialCategory[] = [
  "AWS",
  "Cloud",
  "Security",
  "Programming",
  "IT Fundamentals",
  "Career & Project Management",
];

export default function CredentialsPage() {
  return (
    <div className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <h1 className="text-[32px] md:text-[40px] font-bold text-fg mb-3">Credentials and Learning</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Badges, course completions, and training certificates. Not every item here is a formal
            certification exam, so I am calling this what it is: things I learned and can show.
          </p>
          <a
            href={credlyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-gold hover:text-gold-hover transition-colors"
          >
            View verified badges on Credly <ExternalLink size={14} />
          </a>
        </Reveal>

        {categories.map((category) => {
          const items = credentials.filter((c) => c.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} className="mb-12">
              <h2 className="text-sm font-semibold text-fg-muted uppercase tracking-wide mb-4">{category}</h2>
              <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((credential) => (
                  <RevealItem key={credential.name} className="flex flex-col gap-3">
                    <CredentialCard credential={credential} />
                    {credential.connectionNote && (
                      <p className="text-xs text-fg-subtle leading-relaxed px-1">
                        {credential.connectionNote}
                      </p>
                    )}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          );
        })}

        <Reveal className="mt-4 rounded-2xl border border-border bg-surface-elevated p-6 md:p-8">
          <SectionHeading
            eyebrow="Additional Training"
            title="AWS Skills Centers course certificates"
            description="Supplementary AWS training completed alongside the badges above."
            className="mb-6"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {awsTrainingCertificates.map((cert) => (
              <a
                key={cert.name}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 hover:border-border-strong transition-colors"
              >
                <FileText size={16} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-fg leading-snug">{cert.name}</p>
                  <p className="text-xs text-fg-subtle mt-1">{cert.issuer}</p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Button href={credlyProfileUrl} variant="secondary">
            View full Credly profile <ExternalLink size={15} />
          </Button>
        </div>
      </Container>
    </div>
  );
}
