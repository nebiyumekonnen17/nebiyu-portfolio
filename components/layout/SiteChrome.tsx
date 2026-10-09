"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "";
  if (path === "/links" || path.startsWith("/links/")) return <main id="main-content" className="flex-1">{children}</main>;
  return <><Header/><main id="main-content" className="flex-1">{children}</main><Footer/></>;
}
