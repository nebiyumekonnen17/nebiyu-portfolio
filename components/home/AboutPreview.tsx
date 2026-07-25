import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export function AboutPreview() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Reveal className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center rounded-3xl border border-border bg-surface-elevated p-8 md:p-10">
          <div className="relative mx-auto h-28 w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-2xl border border-border-strong">
            <Image
              src={profile.portrait}
              alt={profile.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold mb-3">About</p>
            <p className="text-lg text-fg leading-relaxed max-w-2xl">{profile.intro}</p>
            <Button href="/about" variant="secondary" size="sm" className="mt-6">
              More about how I work <ArrowRight size={15} />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
