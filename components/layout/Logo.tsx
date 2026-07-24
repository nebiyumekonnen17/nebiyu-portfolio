import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)] rounded-lg"
      aria-label="Nebiyu Mekonnen, home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-on-gold font-bold text-base tracking-tight">
        NM
      </span>
      <span className="hidden sm:block font-semibold tracking-wide text-fg text-[15px] group-hover:text-gold transition-colors">
        NEBIYU MEKONNEN
      </span>
    </Link>
  );
}
