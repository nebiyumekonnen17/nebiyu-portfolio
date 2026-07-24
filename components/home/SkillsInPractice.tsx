import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { skillCategories } from "@/data/skills";

export function SkillsInPractice() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Skills in Practice"
          title="Not a list of buzzwords. Skills tied to real projects."
          action={
            <Button href="/skills" variant="secondary" size="sm" className="shrink-0">
              See all skills <ArrowRight size={15} />
            </Button>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skillCategories.map((category) => (
            <div key={category.title} className="rounded-2xl border border-border bg-surface-elevated p-5">
              <h3 className="text-sm font-semibold text-gold mb-3">{category.title}</h3>
              <ul className="space-y-2.5">
                {category.skills.slice(0, 4).map((skill) => (
                  <li key={skill.name}>
                    <p className="text-sm text-fg leading-snug">{skill.name}</p>
                    {skill.usedIn[0] && (
                      <p className="text-xs text-fg-subtle">
                        Used in{" "}
                        <Link href={`/projects/${skill.usedIn[0].projectSlug}`} className="hover:text-gold transition-colors">
                          {skill.usedIn[0].projectName}
                        </Link>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
