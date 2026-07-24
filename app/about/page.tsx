import type { Metadata } from "next";
import Image from "next/image";
import { Search, ClipboardList, Palette, Hammer, FlaskConical, Rocket, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nebiyu Mekonnen builds full stack applications, AWS cloud systems, and AI platforms. Here is how he approaches building software, and the roles he is looking for.",
  alternates: { canonical: "/about" },
};

const approach = [
  { icon: Search, title: "Understand the problem", description: "Before writing code, I want to know who this is for and what it actually needs to do." },
  { icon: ClipboardList, title: "Plan the system", description: "I sketch out the data, the roles, and the boundaries before committing to an architecture." },
  { icon: Palette, title: "Design the experience", description: "I care about how it feels to use, not just whether it works." },
  { icon: Hammer, title: "Build", description: "I build in working slices instead of trying to finish everything at once." },
  { icon: FlaskConical, title: "Test", description: "I write tests as I go so I trust the system as it grows, not just at the end." },
  { icon: Rocket, title: "Deploy", description: "Shipping is part of the job. DegisSnap running in production on AWS is the clearest example of that." },
  { icon: RefreshCw, title: "Improve", description: "Real usage teaches you things planning never does, so I keep adjusting after launch." },
];

export default function AboutPage() {
  return (
    <div className="py-14 md:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start mb-16">
          <div className="relative aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-3xl border border-border-strong">
            <Image src={profile.portrait} alt={profile.name} fill priority sizes="(min-width: 1024px) 380px, 80vw" className="object-cover" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold mb-3">About</p>
            <h1 className="text-[30px] md:text-[38px] font-bold text-fg mb-5 text-balance">
              I like turning complicated ideas into software people can actually use.
            </h1>
            <div className="space-y-4 text-fg-muted leading-relaxed text-[17px]">
              <p>{profile.intro}</p>
              <p>
                My projects span event technology, AWS cloud applications, AI engineering, digital
                signage, business software, and marketplaces. DegisSnap, an event photo sharing
                platform, is running in production on AWS. NAEP is an AI engineering platform I am
                actively building. The rest range from a point of sale system already built for a
                real business to marketplace and commerce platforms still in architecture and
                development.
              </p>
              <p>
                I am based in Washington State. I am currently open to full stack, cloud, and AI
                engineering roles where I can keep building real systems, not just prototypes.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/projects">See my projects</Button>
              <Button href="/contact" variant="secondary">Get in touch</Button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-fg mb-2">How I approach building software</h2>
          <p className="text-fg-muted mb-8 max-w-2xl">
            The same rough process shows up across every project, whether it is a production AWS
            app or something still in architecture.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-border bg-surface-elevated p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold text-sm font-bold">
                    {i + 1}
                  </span>
                  <step.icon size={17} className="text-fg-subtle" />
                </div>
                <p className="text-sm font-semibold text-fg mb-1.5">{step.title}</p>
                <p className="text-xs text-fg-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <h2 className="text-xl font-bold text-fg mb-4">Roles I am interested in</h2>
          <div className="flex flex-wrap gap-2">
            {profile.targetRoles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-border-strong bg-surface-elevated px-4 py-2 text-sm text-fg-muted"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
