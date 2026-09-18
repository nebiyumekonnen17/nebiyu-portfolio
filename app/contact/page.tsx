import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactChannels, ContactNote } from "@/components/ContactCTA";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nebiyu Mekonnen about full stack, cloud, or AI engineering roles.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="py-14 md:py-20">
      <Container>
        <Reveal className="max-w-2xl mb-10">
          <h1 className="text-[32px] md:text-[40px] font-bold text-fg mb-4">Let&apos;s build something useful.</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            I&apos;m open to full stack, cloud, and AI engineering roles. If you want to talk about a
            role, a project, or something you&apos;re building, reach out through any of these.
          </p>
        </Reveal>

        <ContactChannels />
        <ContactNote />

        {siteConfig.resumeUrl && (
          <div className="mt-10">
            <Button href={siteConfig.resumeUrl}>
              Download Resume <ArrowUpRight size={16} />
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
