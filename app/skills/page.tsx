import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Skills tied to real projects rather than percentage bars: cloud and AWS, software engineering, AI and data, cybersecurity, and product and project management.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <div className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          <h1 className="text-[32px] md:text-[40px] font-bold text-fg mb-3">Skills</h1>
          <p className="text-lg text-fg-muted leading-relaxed">
            Not a list of buzzwords or percentage bars. Every skill here is tied to a project where
            I actually used it.
          </p>
        </Reveal>

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <Reveal key={category.title} className="rounded-2xl border border-border bg-surface-elevated p-6 md:p-8">
              <h2 className="text-xl font-bold text-fg mb-1.5">{category.title}</h2>
              <p className="text-sm text-fg-muted mb-6 max-w-xl">{category.description}</p>

              <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.skills.map((skill) => (
                  <RevealItem key={skill.name} className="rounded-xl border border-border bg-surface p-4">
                    <p className="text-sm font-semibold text-fg mb-1.5">{skill.name}</p>
                    <div className="flex flex-wrap gap-x-1.5 gap-y-1">
                      {skill.usedIn.map((usage, i) => (
                        <span key={usage.projectSlug} className="text-xs text-fg-subtle">
                          Used in{" "}
                          <Link
                            href={`/projects/${usage.projectSlug}`}
                            className="text-gold hover:text-gold-hover transition-colors"
                          >
                            {usage.projectName}
                          </Link>
                          {i < skill.usedIn.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
