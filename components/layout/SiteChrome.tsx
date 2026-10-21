"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * The links subdomain is rewritten from "/" to "/links/" by proxy.ts.
 * usePathname() still reads "/" in the visitor's browser, so checking
 * pathname alone incorrectly renders the portfolio header and footer.
 * Keep the portfolio chrome on the main domain, never on the link hub.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "";
  const [isLinksHostname, setIsLinksHostname] = useState(false);

  useEffect(() => {
    setIsLinksHostname(window.location.hostname.toLowerCase() === "links.nebiyumekonnen.com");
  }, []);

  if (isLinksHostname || path === "/links" || path.startsWith("/links/")) {
    return <main id="main-content" className="flex-1">{children}</main>;
  }
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
