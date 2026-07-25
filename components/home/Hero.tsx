"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Code2, Cloud, Sparkles, Boxes, Lightbulb } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { profile, quickCredibility } from "@/data/profile";
import { siteConfig } from "@/lib/config";

const roleIcons = [Code2, Cloud, Sparkles, Boxes, Lightbulb];
const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 20%, rgba(227,168,59,0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            {profile.openToOpportunities && (
              <div className="inline-flex items-center gap-2 rounded-full border border-status-production/30 bg-status-production/10 px-3 py-1.5 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-status-production" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wide text-status-production">
                  Open to new opportunities
                </span>
              </div>
            )}

            <h1 className="text-[38px] leading-[1.08] sm:text-[46px] md:text-[54px] font-bold text-fg text-balance tracking-tight">
              I build real software systems on <span className="text-gold">AWS</span> that
              solve problems and <span className="text-gold">create impact.</span>
            </h1>

            <p className="mt-6 text-lg text-fg-muted leading-relaxed max-w-xl">
              {profile.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {profile.roleTags.map((role, i) => {
                const Icon = roleIcons[i % roleIcons.length];
                return (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-fg-muted"
                  >
                    <Icon size={13} className="text-gold" />
                    {role}
                  </span>
                );
              })}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/projects">
                View My Work <ArrowRight size={16} />
              </Button>
              {siteConfig.resumeUrl ? (
                <Button href={siteConfig.resumeUrl} variant="secondary">
                  Download Resume <ArrowUpRight size={16} />
                </Button>
              ) : (
                <Button variant="secondary" disabled title="Resume coming soon">
                  Download Resume <ArrowUpRight size={16} />
                </Button>
              )}
              <Button href="/contact" variant="ghost" aria-label="Contact Nebiyu Mekonnen">
                <Mail size={16} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
          >
            <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-4 rounded-[28px] opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 30%, rgba(227,168,59,0.25), transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border-strong shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                <Image
                  src={profile.portrait}
                  alt={`${profile.name}, ${profile.positioning[0]}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 80vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickCredibility.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
