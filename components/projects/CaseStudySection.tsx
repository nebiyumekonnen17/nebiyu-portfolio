import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function CaseStudySection({
  title,
  id,
  children,
  className,
  muted = false,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section id={id} className={cn("py-10 md:py-12 border-b border-border", muted && "bg-surface", className)}>
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-12">
        <Reveal className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <h2 className="text-xl md:text-2xl font-bold text-fg">{title}</h2>
          <div className="max-w-3xl">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
