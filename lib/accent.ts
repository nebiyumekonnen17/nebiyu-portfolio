import type { ProjectAccent } from "@/types/content";

/**
 * Tailwind's scanner needs literal class strings, so accent colors are
 * mapped explicitly here rather than built with template strings.
 */
export const accentClasses: Record<
  ProjectAccent,
  { text: string; border: string; borderSoft: string; bg: string; bgSoft: string; ring: string; hoverBorder: string }
> = {
  violet: {
    text: "text-accent-violet",
    border: "border-accent-violet",
    borderSoft: "border-accent-violet/30",
    bg: "bg-accent-violet",
    bgSoft: "bg-accent-violet/15",
    ring: "focus-visible:outline-accent-violet",
    hoverBorder: "group-hover:border-accent-violet/60",
  },
  blue: {
    text: "text-accent-blue",
    border: "border-accent-blue",
    borderSoft: "border-accent-blue/30",
    bg: "bg-accent-blue",
    bgSoft: "bg-accent-blue/15",
    ring: "focus-visible:outline-accent-blue",
    hoverBorder: "group-hover:border-accent-blue/60",
  },
  teal: {
    text: "text-accent-teal",
    border: "border-accent-teal",
    borderSoft: "border-accent-teal/30",
    bg: "bg-accent-teal",
    bgSoft: "bg-accent-teal/15",
    ring: "focus-visible:outline-accent-teal",
    hoverBorder: "group-hover:border-accent-teal/60",
  },
  green: {
    text: "text-accent-green",
    border: "border-accent-green",
    borderSoft: "border-accent-green/30",
    bg: "bg-accent-green",
    bgSoft: "bg-accent-green/15",
    ring: "focus-visible:outline-accent-green",
    hoverBorder: "group-hover:border-accent-green/60",
  },
  amber: {
    text: "text-accent-amber",
    border: "border-accent-amber",
    borderSoft: "border-accent-amber/30",
    bg: "bg-accent-amber",
    bgSoft: "bg-accent-amber/15",
    ring: "focus-visible:outline-accent-amber",
    hoverBorder: "group-hover:border-accent-amber/60",
  },
  telegram: {
    text: "text-accent-telegram",
    border: "border-accent-telegram",
    borderSoft: "border-accent-telegram/30",
    bg: "bg-accent-telegram",
    bgSoft: "bg-accent-telegram/15",
    ring: "focus-visible:outline-accent-telegram",
    hoverBorder: "group-hover:border-accent-telegram/60",
  },
};
