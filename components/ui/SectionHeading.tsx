import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-10 md:mb-12",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn(align === "center" && "flex flex-col items-center")}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="text-[26px] leading-tight md:text-[32px] font-bold text-fg text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base text-fg-muted max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
