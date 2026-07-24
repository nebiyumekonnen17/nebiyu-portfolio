import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CredentialCard } from "@/components/credentials/CredentialCard";
import { Button } from "@/components/ui/Button";
import { featuredCredentials, credlyProfileUrl } from "@/data/credentials";

export function CredentialsPreview() {
  return (
    <section className="border-t border-border bg-surface py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Verified Credentials"
          title="Credentials and Learning"
          description="Real badges and course completions, connected to the projects they informed."
          action={
            <Button href="/credentials" variant="secondary" size="sm" className="shrink-0">
              View all credentials <ArrowRight size={15} />
            </Button>
          }
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCredentials.map((credential) => (
            <CredentialCard key={credential.name} credential={credential} />
          ))}
        </div>

        <p className="mt-6 text-sm text-fg-muted">
          All badges are issued and verifiable on{" "}
          <Link
            href={credlyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-hover transition-colors font-medium"
          >
            Credly
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
