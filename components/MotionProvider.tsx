"use client";

import { MotionConfig } from "framer-motion";

/**
 * reducedMotion="user" makes every Framer Motion animation in the app
 * automatically respect the OS/browser prefers-reduced-motion setting,
 * without checking it manually in each component.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
