"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Keep the separate links subdomain untouched while sharing the original portfolio navigation. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "";
  const [isLinksHostname, setIsLinksHostname] = useState(false);
  useEffect(() => { setIsLinksHostname(window.location.hostname.toLowerCase() === "links.nebiyumekonnen.com"); }, []);
  if (isLinksHostname || path === "/links" || path.startsWith("/links/")) {
    return <main id="main-content" className="flex-1">{children}</main>;
  }
  return (
    <>
      <Header />
      <main id="main-content" className={path === "/" ? "flex-1 mone-home-main" : "flex-1 mone-content"}>
        {children}
      </main>
      <Footer />
    </>
  );
}
