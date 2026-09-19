import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { skillCategories } from "@/data/skills";
import { absoluteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Skills tied to real projects rather than percentage bars: cloud and AWS, software engineering, AI and data, cybersecurity, and product and project management.",
  alternates: { canonical: absoluteUrl("/skills") },
};

const categoryId = (title: string) =>
  title.toLowerCase().replace(/\s+and\s+/g, "-").replace(/\s+/g, "-");

export default function SkillsPage() {
  return (
    <div className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Project-backed experience
          </p>
          <h1 className="mb-3 text-[32px] font-bold text-fg md:text-[40px]">Skills</h1>
          <p className="text-lg leading-relaxed text-fg-muted">
            Not a list of buzzwords or percentage bars. Every skill is connected to the projects
            where I used it, so you can open the work and see the context.
          </p>
        </Reveal>

        <Reveal className="mb-12" delay={0.08}>
          <nav aria-label="Skill categories" className="flex flex-wrap gap-2">
            {skillCategories.map((category) => (
              <a
                key={category.title}
                href={`#${categoryId(category.title)}`}
                className="rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:border-gold/50 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {category.title}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.title} id={categoryId(category.title)} className="scroll-mt-24">
              <Reveal className="rounded-2xl border border-border bg-surface-elevated p-6 md:p-8">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="mb-1.5 text-xl font-bold text-fg">{category.title}</h2>
                    <p className="max-w-2xl text-sm text-fg-muted">{category.description}</p>
                  </div>
                  <p className="shrink-0 text-xs font-medium uppercase tracking-wider text-fg-subtle">
                    {category.skills.length} demonstrated skills
                  </p>
                </div>

                <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.skills.map((skill) => (
                    <RevealItem
                      key={skill.name}
                      className="rounded-xl border border-border bg-surface p-4"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold leading-snug text-fg">{skill.name}</h3>
                        {skill.usedIn.length > 1 && (
                          <span className="shrink-0 rounded-full bg-surface-elevated px-2 py-0.5 text-[11px] font-medium text-fg-subtle">
                            {skill.usedIn.length} projects
                          </span>
                        )}
                      </div>
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
                        Used in
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.usedIn.map((usage) => (
                          <Link
                            key={usage.projectSlug}
                            href={`/projects/${usage.projectSlug}`}
                            className="relative z-10 rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 text-xs font-medium text-gold transition-colors hover:border-gold/45 hover:bg-gold/10 hover:text-gold-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                          >
                            {usage.projectName}
                          </Link>
                        ))}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
